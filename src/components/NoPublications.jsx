import React from 'react'
import styles from './NoPublications.module.css'

export default function NoPublications({ comment, onChange, onFinish, submitting }) {
  return (
    <div>
      <div className={styles.eyebrow}>No Publications Found</div>
      <h2 className={styles.title}>Additional comments</h2>
      <p className={styles.desc}>
        No relevant case reports were found. Feel free to share any additional thoughts about this case.
      </p>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          Do you have any additional comments about this case?
        </label>
        <textarea
          className={styles.textarea}
          value={comment}
          onChange={e => onChange(e.target.value)}
          placeholder="Optional comments..."
          rows={5}
        />
      </div>

      <div className={styles.footer}>
        <button
          className="btn-primary"
          onClick={onFinish}
          disabled={submitting}
        >
          {submitting ? 'Submitting…' : 'Finish'}
        </button>
      </div>
    </div>
  )
}
