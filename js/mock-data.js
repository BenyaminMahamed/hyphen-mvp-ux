// Mock data — structure mirrors the Django models (Team, Profile, Meeting, MeetingNote, ActionItem)

const MOCK_TEAMS = [
  { id: 1, name: "Operations" },
  { id: 2, name: "Customer Success" },
];

const MOCK_USERS = [
  { id: 1, name: "Benyamin Mahamed", role: "manager", team_id: 1 },
  { id: 2, name: "Sam Patel", role: "member", team_id: 1 },
  { id: 3, name: "Jordan Lee", role: "member", team_id: 1 },
];

const MOCK_MEETINGS = [
  {
    id: 1,
    title: "Weekly Ops Sync",
    date: "2026-07-14",
    team_ids: [1],
    created_by: 1,
  },
  {
    id: 2,
    title: "Client Escalation Review",
    date: "2026-07-16",
    team_ids: [1, 2],
    created_by: 1,
  },
];

const MOCK_NOTES = [
  {
    id: 1,
    meeting_id: 1,
    submitted_by: 1,
    raw_text: "Sam to follow up with vendor. Jordan to update the SOP doc.",
    ai_summary: "Meeting covered 2 key points.",
  },
  {
    id: 2,
    meeting_id: 2,
    submitted_by: 1,
    raw_text: "Client X reported a missed deadline. Root cause unclear ownership.",
    ai_summary: "Meeting covered 1 key point.",
  },
];

const MOCK_ACTION_ITEMS = [
  { id: 1, note_id: 1, description: "Follow up: Sam to follow up with vendor", owner_id: 2, status: "open", created_from_ai: true },
  { id: 2, note_id: 1, description: "Follow up: Jordan to update the SOP doc", owner_id: 3, status: "open", created_from_ai: true },
  { id: 3, note_id: 2, description: "Draft ownership matrix for client accounts", owner_id: 1, status: "completed", created_from_ai: false },
];

// Simulated "logged in" user for this frontend-only mock
const CURRENT_USER = MOCK_USERS[0];