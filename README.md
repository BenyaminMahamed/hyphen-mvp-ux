# Ops Tracker — Product Thinking (Part 1)

Frontend-only MVP (HTML, CSS, JavaScript — no backend, no build step) for the Hyphen take-home assessment. Demonstrates the intended user experience for capturing meeting notes, extracting action items via a mocked AI integration, assigning owners, and tracking completion.

All data is mocked in `js/mock-data.js` — there is no real backend, database, or authentication. The companion Django backend implementing this same product is at [hyphen-mvp-backend](https://github.com/BenyaminMahamed/hyphen-mvp-backend).

## Pages

| File | Purpose |
|---|---|
| `index.html` | Login (mock — any input redirects to dashboard) |
| `dashboard.html` | Outstanding actions + recent meetings |
| `meetings.html` | Meeting list with live search |
| `meeting-detail.html` | Meeting info, notes, and linked action items |
| `create-meeting.html` | Create a meeting, trigger mock AI summary/action item generation |
| `action-item.html` | Action item detail — reassign owner, update status |

## Running locally

No build tools or dependencies required. Either:

```
# Open directly in a browser
index.html

# Or serve locally
py -m http.server 8000
```

Then visit `http://localhost:8000/index.html`.

## Structure

```
hyphen-mvp-ux/
├── index.html
├── dashboard.html
├── meetings.html
├── meeting-detail.html
├── create-meeting.html
├── action-item.html
├── css/
│   └── style.css
└── js/
    ├── mock-data.js      # mock Team, User, Meeting, MeetingNote, ActionItem data
    ├── app.js             # shared nav rendering, login handling, URL param helper
    ├── dashboard.js
    ├── meetings.js
    ├── meeting-detail.js
    ├── create-meeting.js
    └── action-item.js
```

## Mock Data Design

The mock data in `js/mock-data.js` deliberately mirrors the Django model structure built in the backend repo (`Team`, `Profile`/`User`, `Meeting`, `MeetingNote`, `ActionItem`), including the same relationships — e.g. an action item links to a `note_id` (not directly to a meeting), matching the backend's `ActionItem → MeetingNote` foreign key. This was a deliberate choice to keep both parts of the submission telling one consistent product story rather than two disconnected exercises.

## AI Integration (Mocked)

The "Generate Summary + Action Items (AI)" button on `create-meeting.html` runs a client-side mock that mirrors the backend's `ai_integration/services.py` logic: it splits pasted notes into sentences and flags any containing "to" or "follow" as likely action items. This means the output actually varies with the input text rather than returning static placeholder content, which is closer to how a real AI integration would behave and makes for a more convincing live demo.

## Assumptions

- No real authentication — the login form is a placeholder to satisfy the "Login" page requirement; submitting it always redirects to the dashboard.
- The "logged-in" user is a hardcoded mock (`CURRENT_USER` in `mock-data.js`) with a `manager` role, so the UI reflects manager-level visibility by default.
- Status changes and owner reassignment on the Action Item page update only in-memory mock data and reset on page reload — there is no persistence layer in this part of the submission by design (per the brief, backend functionality is not required for Part 1).

## Notes for Reviewers

This repo focuses on user experience and interaction design per the brief's Part 1 requirements. For data modelling, permissions, business logic, and the real AI integration, see the [Django backend repository](https://github.com/BenyaminMahamed/hyphen-mvp-backend) and its README.
