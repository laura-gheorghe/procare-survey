# Procare Case Survey

A React + SurveyJS-free survey for the Procare MTB case review workflow. Stores progress in `localStorage`, submits to Google Sheets via Apps Script.

## Stack

- React 18 + Vite
- Vanilla CSS modules (no UI library)
- Google Apps Script as backend
- GitHub Pages for hosting

---

## Setup

### 1. Google Sheets backend

1. Create a new Google Sheet (name it e.g. "Procare Survey Results")
2. Go to **Extensions → Apps Script**
3. Delete the default code, paste the contents of `Code.gs`
4. Click **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, copy the **Web app URL**

### 2. Wire the URL into the frontend

Open `src/App.jsx` and replace:

```js
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
```

with your actual deployment URL.

### 3. Install dependencies

```bash
npm install
```

### 4. Run locally

```bash
npm run dev
```

### 5. Deploy to GitHub Pages

```bash
# First time: create a GitHub repo and push your code
git init
git remote add origin https://github.com/YOUR_USERNAME/procare-survey.git
git add .
git commit -m "Initial commit"
git push -u origin main

# Deploy
npm run deploy
```

This builds the app and pushes to the `gh-pages` branch. GitHub Pages will serve it at:
`https://YOUR_USERNAME.github.io/procare-survey/`

> **Note:** In your GitHub repo settings → Pages → set source to the `gh-pages` branch.

---

## Data structure in Google Sheets

Submissions create rows in three sheets:

| Sheet | Contents |
|-------|----------|
| `Responses` | One row per submission — search method, time, Procare usefulness, comments |
| `Publications` | One row per publication entry — PMID, diagnosis, biomarker, drug, response, time |
| `ProcareReview` | One row per publication — whether it was found in Procare, which fields had discrepancies |

All sheets share a **Session ID** so you can join rows from the same respondent.

---

## localStorage behaviour

Progress is saved after every interaction. If a user refreshes the page, they continue where they left off. If they close the browser, progress is lost and they start over.

To clear saved progress manually (for testing), open the browser console and run:
```js
localStorage.removeItem('procare_survey_v1')
```
