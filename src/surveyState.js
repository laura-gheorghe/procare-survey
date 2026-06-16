// Survey steps
export const STEPS = {
  CASE_INTRO: 'case_intro',
  FOUND_PUBLICATIONS: 'found_publications',
  NO_PUBLICATIONS_COMMENT: 'no_publications_comment',
  PUBLICATIONS_TABLE: 'publications_table',
  SEARCH_METHOD: 'search_method',
  PROCARE_REVIEW: 'procare_review',
  PROCARE_ADDITIONAL: 'procare_additional',
  PROCARE_TIME: 'procare_time',
  DONE: 'done',
}

export const RESPONSE_OPTIONS = ['CR', 'PR', 'SD', 'PD', 'NA']

export const EMPTY_PUBLICATION_ROW = () => ({
  id: crypto.randomUUID(),
  pmid: '',
  diagnosis: '',
  biomarker: '',
  drug: '',
  response: '',
  timeOnTreatment: '',
})

export const STORAGE_KEY = 'procare_survey_v1'

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export function clearState() {
  try { localStorage.removeItem(STORAGE_KEY) } catch {}
}

export function initialState() {
  return {
    step: STEPS.CASE_INTRO,
    foundPublications: null,       // true | false
    noPublicationsComment: '',
    publications: [EMPTY_PUBLICATION_ROW()],
    searchMethod: '',
    timeSpentMinutes: '',
    procareRows: [],               // enriched from publications after table step
    procareComment: '',
    foundAdditionalInProcare: null,
    additionalProcareCount: '',
    additionalProcareReferences: '',
    procareTimeMinutes: '',
    procareUsefulness: null,
    finalComments: '',
  }
}
