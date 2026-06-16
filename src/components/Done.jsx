import React from 'react'
import styles from './Done.module.css'

export default function Done() {
  return (
    <div className={styles.root}>
      <div className={styles.icon}>✓</div>
      <h2 className={styles.title}>Thank you</h2>
      <p className={styles.desc}>
        Your responses have been submitted successfully. You may close this tab.
      </p>
    </div>
  )
}
