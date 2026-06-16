import React from 'react'
import styles from './Layout.module.css'

export default function Layout({ children, step, totalSteps }) {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>Procare</span>
          <span className={styles.subtitle}>Case Survey</span>
        </div>
        {totalSteps && (
          <div className={styles.progress}>
            <div
              className={styles.progressBar}
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        )}
      </header>
      <main className={styles.main}>
        <div className={styles.card}>
          {children}
        </div>
      </main>
      <footer className={styles.footer}>
        Answers are saved in your browser. Do not close this tab to preserve your progress.
      </footer>
    </div>
  )
}
