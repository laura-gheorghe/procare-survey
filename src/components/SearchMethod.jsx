import React, { useState } from 'react'
import styles from './SearchMethod.module.css'

export default function SearchMethod({ searchMethod, timeSpent, onChange, onNext }) {
  const canProceed = searchMethod.trim() && timeSpent !== ''

  return (
    <div>
      <div className={styles.eyebrow}>Search Process</div>
      <h2 className={styles.title}>About your literature search</h2>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          How did you search for these publications?
        </label>
        <textarea
          className={styles.textarea}
          value={searchMethod}
          onChange={e => onChange('searchMethod', e.target.value)}
          placeholder="e.g. PubMed search using terms 'EGFR exon 19 deletion pancreatic cancer', filtered to last 10 years..."
          rows={4}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          How much time did you spend finding the publications and extracting the information?
        </label>
        <div className={styles.timeRow}>
          <input
            className={styles.numberInput}
            type="number"
            min="0"
            value={timeSpent}
            onChange={e => onChange('timeSpentMinutes', e.target.value)}
            placeholder="0"
          />
          <span className={styles.unit}>minutes</span>
        </div>
      </div>

      <div className={styles.footer}>
        <button className="btn-primary" onClick={onNext} disabled={!canProceed}>
          Next
        </button>
      </div>
    </div>
  )
}
