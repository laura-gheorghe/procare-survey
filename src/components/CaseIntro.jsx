import React from 'react'
import styles from './CaseIntro.module.css'

export default function CaseIntro({ onAnswer }) {
  return (
    <div>
      <div className={styles.eyebrow}>Clinical Case</div>
      <h1 className={styles.title}>Pancreatic Ductal Adenocarcinoma</h1>

      <div className={styles.caseBox}>
        <p>
          A 61-year-old woman with resected pancreatic ductal adenocarcinoma (pT1cN2; 17/23 positive
          lymph nodes) underwent pancreaticoduodenectomy followed by 12 cycles of adjuvant mFOLFIRINOX.
          Sixteen months later, she developed locoregional recurrence involving the celiac trunk,
          pancreatic bed, and hepatic hilum, initially treated with first-line gemcitabine plus
          nab-paclitaxel. Comprehensive genomic profiling by NGS identified an{' '}
          <strong>EGFR exon 19 deletion</strong> and no mutation in KRAS, NRAS or BRAF.
        </p>
      </div>

      <div className={styles.question}>
        <p className={styles.questionText}>
          Did you find any published case reports that are relevant to this case?{' '}
          <span className={styles.note}>Please focus on publications from the last 10 years.</span>
        </p>
        <div className={styles.options}>
          <button className={`${styles.optBtn} ${styles.yes}`} onClick={() => onAnswer(true)}>
            Yes
          </button>
          <button className={`${styles.optBtn} ${styles.no}`} onClick={() => onAnswer(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}
