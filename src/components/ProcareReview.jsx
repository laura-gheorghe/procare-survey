import React, { useState } from 'react'
import styles from './ProcareReview.module.css'

const COLUMNS = [
  { key: 'pmid', label: 'PMID' },
  { key: 'diagnosis', label: 'Patient Diagnosis' },
  { key: 'biomarker', label: 'Molecular Biomarker' },
  { key: 'drug', label: 'Drug' },
  { key: 'response', label: 'Response' },
  { key: 'timeOnTreatment', label: 'Time on Treatment' },
]

export default function ProcareReview({ publications, procareRows, onProcareRowsChange, comment, onCommentChange, onNext }) {
  // procareRows: array of { id, inProcare: bool|null, discrepancies: { [colKey]: bool } }
  function getRow(id) {
    return procareRows.find(r => r.id === id) || { id, inProcare: null, discrepancies: {} }
  }

  function updateRow(id, patch) {
    const existing = getRow(id)
    const updated = { ...existing, ...patch }
    const others = procareRows.filter(r => r.id !== id)
    onProcareRowsChange([...others, updated])
  }

  function setInProcare(id, val) {
    updateRow(id, { inProcare: val, discrepancies: {} })
  }

  function toggleDiscrepancy(id, colKey) {
    const row = getRow(id)
    const disc = { ...row.discrepancies }
    disc[colKey] = !disc[colKey]
    updateRow(id, { discrepancies: disc })
  }

  return (
    <div>
      <div className={styles.eyebrow}>Procare Knowledge Base</div>
      <h2 className={styles.title}>Cross-reference with Procare</h2>
      <p className={styles.instructions}>
        Please check whether any of the publications you found are also included in the Procare
        knowledge base. For each row, indicate whether it is present in Procare. If present,
        click any cell where you notice a discrepancy.
      </p>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thStatus}>In Procare?</th>
              {COLUMNS.map(c => <th key={c.key}>{c.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {publications.map((pub, idx) => {
              const row = getRow(pub.id)
              const isPresent = row.inProcare === true

              return (
                <tr key={pub.id} className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td className={styles.statusCell}>
                    <div className={styles.presenceToggle}>
                      <button
                        className={`${styles.presenceBtn} ${row.inProcare === true ? styles.yes : ''}`}
                        onClick={() => setInProcare(pub.id, true)}
                      >Yes</button>
                      <button
                        className={`${styles.presenceBtn} ${row.inProcare === false ? styles.no : ''}`}
                        onClick={() => setInProcare(pub.id, false)}
                      >No</button>
                    </div>
                  </td>
                  {COLUMNS.map(col => {
                    const hasDiscrepancy = row.discrepancies?.[col.key]
                    return (
                      <td
                        key={col.key}
                        className={`${styles.dataCell} ${isPresent ? styles.clickable : ''} ${hasDiscrepancy ? styles.discrepant : ''}`}
                        onClick={() => isPresent && toggleDiscrepancy(pub.id, col.key)}
                        title={isPresent ? (hasDiscrepancy ? 'Click to remove discrepancy' : 'Click to mark discrepancy') : ''}
                      >
                        <span className={styles.cellValue}>
                          {pub[col.key] || <span className={styles.empty}>—</span>}
                        </span>
                        {hasDiscrepancy && (
                          <span className={styles.discrepancyBadge}>discrepancy</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {publications.some(pub => getRow(pub.id).inProcare === true) && (
        <p className={styles.hint}>
          Click any cell in a row marked as present in Procare to flag a discrepancy.
          Click again to remove the flag.
        </p>
      )}

      <div className={styles.commentSection}>
        <label className={styles.label}>Additional comments</label>
        <textarea
          className={styles.textarea}
          value={comment}
          onChange={e => onCommentChange(e.target.value)}
          placeholder="Any notes about discrepancies or the comparison process..."
          rows={3}
        />
      </div>

      <div className={styles.footer}>
        <button className="btn-primary" onClick={onNext}>Next</button>
      </div>
    </div>
  )
}
