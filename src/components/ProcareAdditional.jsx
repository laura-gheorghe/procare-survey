import React from 'react'
import styles from './ProcareAdditional.module.css'

export default function ProcareAdditional({ state, onChange, onFinish, submitting }) {
  const {
    foundAdditionalInProcare,
    additionalProcareCount,
    additionalProcareReferences,
    procareTimeMinutes,
    procareUsefulness,
    finalComments,
  } = state

  const canFinish =
    foundAdditionalInProcare !== null &&
    procareTimeMinutes !== '' &&
    procareUsefulness !== null

  return (
    <div>
      <div className={styles.eyebrow}>Procare — Additional Findings</div>
      <h2 className={styles.title}>Final questions</h2>

      {/* Additional case reports in Procare */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          Did you find any additional relevant case reports in Procare?
        </label>
        <div className={styles.optRow}>
          <button
            className={`${styles.optBtn} ${foundAdditionalInProcare === true ? styles.selected : ''}`}
            onClick={() => onChange('foundAdditionalInProcare', true)}
          >Yes</button>
          <button
            className={`${styles.optBtn} ${foundAdditionalInProcare === false ? styles.selected : ''}`}
            onClick={() => onChange('foundAdditionalInProcare', false)}
          >No</button>
        </div>
      </div>

      {foundAdditionalInProcare === true && (
        <div className={styles.subFields}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>How many?</label>
            <input
              className={styles.numberInput}
              type="number"
              min="0"
              value={additionalProcareCount}
              onChange={e => onChange('additionalProcareCount', e.target.value)}
              placeholder="0"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Please provide references</label>
            <textarea
              className={styles.textarea}
              value={additionalProcareReferences}
              onChange={e => onChange('additionalProcareReferences', e.target.value)}
              placeholder="List the references here..."
              rows={3}
            />
          </div>
        </div>
      )}

      <hr className={styles.divider} />

      {/* Procare time */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          How much time did you spend searching Procare for relevant case reports?
        </label>
        <div className={styles.timeRow}>
          <input
            className={styles.numberInput}
            type="number"
            min="0"
            value={procareTimeMinutes}
            onChange={e => onChange('procareTimeMinutes', e.target.value)}
            placeholder="0"
          />
          <span className={styles.unit}>minutes</span>
        </div>
      </div>

      {/* Usefulness */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          How would you rate the usefulness of Procare for this case?
        </label>
        <div className={styles.optRow}>
          <button
            className={`${styles.optBtn} ${procareUsefulness === 'not_useful' ? styles.selected : ''}`}
            onClick={() => onChange('procareUsefulness', 'not_useful')}
          >Not useful</button>
          <button
            className={`${styles.optBtn} ${procareUsefulness === 'useful' ? styles.selected : ''}`}
            onClick={() => onChange('procareUsefulness', 'useful')}
          >Useful</button>
        </div>
      </div>

      {/* Final comments */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          Do you have any additional comments about this case?
        </label>
        <textarea
          className={styles.textarea}
          value={finalComments}
          onChange={e => onChange('finalComments', e.target.value)}
          placeholder="Optional comments..."
          rows={3}
        />
      </div>

      <div className={styles.footer}>
        <button
          className="btn-primary"
          onClick={onFinish}
          disabled={!canFinish || submitting}
        >
          {submitting ? 'Submitting…' : 'Finish'}
        </button>
      </div>
    </div>
  )
}
