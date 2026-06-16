/**
 * Procare Survey — Google Apps Script receiver
 *
 * Setup:
 * 1. Open your Google Sheet
 * 2. Extensions → Apps Script
 * 3. Paste this entire file
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment URL into App.jsx → APPS_SCRIPT_URL
 */

const SHEET_RESPONSES = 'Responses'
const SHEET_PUBLICATIONS = 'Publications'
const SHEET_PROCARE = 'ProcareReview'

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const sessionId = Utilities.getUuid()
    const timestamp = new Date().toISOString()

    writeResponseSummary(ss, sessionId, timestamp, data)

    if (data.foundPublications) {
      writePublications(ss, sessionId, timestamp, data)
      writeProcareReview(ss, sessionId, timestamp, data)
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function writeResponseSummary(ss, sessionId, timestamp, data) {
  const sheet = getOrCreateSheet(ss, SHEET_RESPONSES, [
    'Session ID', 'Timestamp', 'Found Publications',
    'No Publications Comment',
    'Search Method', 'Time Spent (min)',
    'Found Additional in Procare', 'Additional Procare Count',
    'Additional Procare References', 'Procare Time (min)',
    'Procare Usefulness', 'Procare Comment', 'Final Comments',
  ])

  sheet.appendRow([
    sessionId,
    timestamp,
    data.foundPublications ? 'Yes' : 'No',
    data.noPublicationsComment || '',
    data.searchMethod || '',
    data.timeSpentMinutes || '',
    data.foundAdditionalInProcare === null ? '' : (data.foundAdditionalInProcare ? 'Yes' : 'No'),
    data.additionalProcareCount || '',
    data.additionalProcareReferences || '',
    data.procareTimeMinutes || '',
    data.procareUsefulness || '',
    data.procareComment || '',
    data.finalComments || '',
  ])
}

function writePublications(ss, sessionId, timestamp, data) {
  const sheet = getOrCreateSheet(ss, SHEET_PUBLICATIONS, [
    'Session ID', 'Timestamp', 'Row #',
    'PMID', 'Patient Diagnosis', 'Molecular Biomarker',
    'Drug', 'Response', 'Time on Treatment (months)',
  ])

  const pubs = data.publications || []
  pubs.forEach((pub, idx) => {
    sheet.appendRow([
      sessionId,
      timestamp,
      idx + 1,
      pub.pmid || '',
      pub.diagnosis || '',
      pub.biomarker || '',
      pub.drug || '',
      pub.response || '',
      pub.timeOnTreatment || '',
    ])
  })
}

function writeProcareReview(ss, sessionId, timestamp, data) {
  const sheet = getOrCreateSheet(ss, SHEET_PROCARE, [
    'Session ID', 'Timestamp', 'Row #', 'PMID',
    'In Procare?',
    'Discrepancy: PMID',
    'Discrepancy: Diagnosis',
    'Discrepancy: Biomarker',
    'Discrepancy: Drug',
    'Discrepancy: Response',
    'Discrepancy: Time on Treatment',
  ])

  const pubs = data.publications || []
  const rows = data.procareRows || []

  pubs.forEach((pub, idx) => {
    const review = rows.find(r => r.id === pub.id) || {}
    const disc = review.discrepancies || {}

    sheet.appendRow([
      sessionId,
      timestamp,
      idx + 1,
      pub.pmid || '',
      review.inProcare === null ? '' : (review.inProcare ? 'Yes' : 'No'),
      disc.pmid ? 'Yes' : 'No',
      disc.diagnosis ? 'Yes' : 'No',
      disc.biomarker ? 'Yes' : 'No',
      disc.drug ? 'Yes' : 'No',
      disc.response ? 'Yes' : 'No',
      disc.timeOnTreatment ? 'Yes' : 'No',
    ])
  })
}

function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name)
  if (!sheet) {
    sheet = ss.insertSheet(name)
    sheet.appendRow(headers)
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
  return sheet
}

// For testing in the Apps Script editor
function doGet(e) {
  return ContentService
    .createTextOutput('Procare survey endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT)
}
