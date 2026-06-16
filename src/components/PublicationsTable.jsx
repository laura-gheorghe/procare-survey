import React from 'react'
import { EMPTY_PUBLICATION_ROW, RESPONSE_OPTIONS } from '../surveyState'
import styles from './PublicationsTable.module.css'

export default function PublicationsTable({ publications, onChange, onNext }) {
  function updateRow(id, field, value) {
    onChange(publications.map(r => r.id === id ? { ...r, [field]: value } : r))
  }

  function addRow() {
    onChange([...publications, EMPTY_PUBLICATION_ROW()])
  }

  function removeRow(id) {
    if (publications.length === 1) return
    onChange(publications.filter(r => r.id !== id))
  }

  const canProceed = publications.some(r => r.pmid.trim() || r.diagnosis.trim())

  return (
    <div>
      <div className={styles.eyebrow}>Publications</div>
      <h2 className={styles.title}>Relevant case reports found</h2>
      <p className={styles.instructions}>
        Please complete the table with the relevant information from each publication.
        Use a separate row for each patient and treatment reported in the publication.
      </p>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thPmid}>PMID</th>
              <th>Patient Diagnosis</th>
              <th>Molecular Biomarker</th>
              <th>Drug</th>
              <th className={styles.thResponse}>Response</th>
              <th className={styles.thTime}>Time on Treatment (months)</th>
              <th className={styles.thDel}></th>
            </tr>
          </thead>
          <tbody>
            {publications.map((row, idx) => (
              <tr key={row.id} className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                <td>
                  <input
                    className={styles.input}
                    value={row.pmid}
                    onChange={e => updateRow(row.id, 'pmid', e.target.value)}
                    placeholder="e.g. 12345678"
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    value={row.diagnosis}
                    onChange={e => updateRow(row.id, 'diagnosis', e.target.value)}
                    placeholder="Diagnosis"
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    value={row.biomarker}
                    onChange={e => updateRow(row.id, 'biomarker', e.target.value)}
                    placeholder="e.g. EGFR exon 19 del"
                  />
                </td>
                <td>
                  <input
                    className={styles.input}
                    value={row.drug}
                    onChange={e => updateRow(row.id, 'drug', e.target.value)}
                    placeholder="Drug name"
                  />
                </td>
                <td>
                  <select
                    className={styles.select}
                    value={row.response}
                    onChange={e => updateRow(row.id, 'response', e.target.value)}
                  >
                    <option value="">—</option>
                    {RESPONSE_OPTIONS.map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    className={`${styles.input} ${styles.numberInput}`}
                    type="number"
                    min="0"
                    value={row.timeOnTreatment}
                    onChange={e => updateRow(row.id, 'timeOnTreatment', e.target.value)}
                    placeholder="0"
                  />
                </td>
                <td>
                  <button
                    className={styles.delBtn}
                    onClick={() => removeRow(row.id)}
                    disabled={publications.length === 1}
                    title="Remove row"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className={styles.addBtn} onClick={addRow}>
        + Add another row
      </button>

      <div className={styles.footer}>
        <button
          className="btn-primary"
          onClick={onNext}
          disabled={!canProceed}
        >
          Next
        </button>
      </div>
    </div>
  )
}
