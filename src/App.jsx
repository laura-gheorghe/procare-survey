import React, { useState, useEffect } from 'react'
import Layout from './components/Layout'
import CaseIntro from './components/CaseIntro'
import PublicationsTable from './components/PublicationsTable'
import SearchMethod from './components/SearchMethod'
import ProcareReview from './components/ProcareReview'
import ProcareAdditional from './components/ProcareAdditional'
import NoPublications from './components/NoPublications'
import Done from './components/Done'
import { STEPS, initialState, loadState, saveState, clearState } from './surveyState'

// ── Replace with your deployed Apps Script URL ──
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby-1z0dRxgrP6rwD0FOgfSbY_pvw4dzGlmiVpojwaKtmPyg1K8jQoSRuEQaYlfCQO-Z/exec'

const STEP_NUMBERS = {
  [STEPS.CASE_INTRO]: 1,
  [STEPS.FOUND_PUBLICATIONS]: 1,
  [STEPS.NO_PUBLICATIONS_COMMENT]: 2,
  [STEPS.PUBLICATIONS_TABLE]: 2,
  [STEPS.SEARCH_METHOD]: 3,
  [STEPS.PROCARE_REVIEW]: 4,
  [STEPS.PROCARE_ADDITIONAL]: 5,
  [STEPS.DONE]: 6,
}
const TOTAL_STEPS = 5

export default function App() {
  const [state, setState] = useState(() => loadState() || initialState())
  const [submitting, setSubmitting] = useState(false)

  // Persist to localStorage on every state change
  useEffect(() => {
    if (state.step !== STEPS.DONE) {
      saveState(state)
    }
  }, [state])

  function update(patch) {
    setState(prev => ({ ...prev, ...patch }))
  }

  function updateField(key, value) {
    update({ [key]: value })
  }

  // ── Submission ──
  async function submit(finalPatch = {}) {
    setSubmitting(true)
    const finalState = { ...state, ...finalPatch }

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalState),
      })
    } catch (e) {
      console.error('Submission error', e)
    }

    clearState()
    setState(prev => ({ ...prev, ...finalPatch, step: STEPS.DONE }))
    setSubmitting(false)
  }

  const { step } = state

  return (
    <Layout step={STEP_NUMBERS[step]} totalSteps={TOTAL_STEPS}>
      {step === STEPS.CASE_INTRO && (
        <CaseIntro
          onAnswer={found => update({
            foundPublications: found,
            step: found ? STEPS.PUBLICATIONS_TABLE : STEPS.NO_PUBLICATIONS_COMMENT,
          })}
        />
      )}

      {step === STEPS.NO_PUBLICATIONS_COMMENT && (
        <NoPublications
          comment={state.noPublicationsComment}
          onChange={v => update({ noPublicationsComment: v })}
          onFinish={() => submit()}
          submitting={submitting}
        />
      )}

      {step === STEPS.PUBLICATIONS_TABLE && (
        <PublicationsTable
          publications={state.publications}
          onChange={pubs => update({ publications: pubs })}
          onNext={() => update({ step: STEPS.SEARCH_METHOD })}
        />
      )}

      {step === STEPS.SEARCH_METHOD && (
        <SearchMethod
          searchMethod={state.searchMethod}
          timeSpent={state.timeSpentMinutes}
          onChange={updateField}
          onNext={() => {
            // Initialise procareRows from current publications
            const procareRows = state.publications.map(p => ({
              id: p.id,
              inProcare: null,
              discrepancies: {},
            }))
            update({ step: STEPS.PROCARE_REVIEW, procareRows })
          }}
        />
      )}

      {step === STEPS.PROCARE_REVIEW && (
        <ProcareReview
          publications={state.publications}
          procareRows={state.procareRows}
          onProcareRowsChange={rows => update({ procareRows: rows })}
          comment={state.procareComment}
          onCommentChange={v => update({ procareComment: v })}
          onNext={() => update({ step: STEPS.PROCARE_ADDITIONAL })}
        />
      )}

      {step === STEPS.PROCARE_ADDITIONAL && (
        <ProcareAdditional
          state={state}
          onChange={updateField}
          onFinish={() => submit()}
          submitting={submitting}
        />
      )}

      {step === STEPS.DONE && <Done />}
    </Layout>
  )
}
