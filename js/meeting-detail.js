function renderMeetingDetail() {
  const id = parseInt(getQueryParam("id"), 10);
  const meeting = MOCK_MEETINGS.find(m => m.id === id);

  const contentEl = document.getElementById("meeting-detail-content");
  const notesEl = document.getElementById("notes-list");
  const actionsEl = document.getElementById("action-items-list");

  if (!meeting) {
    contentEl.innerHTML = "<p>Meeting not found.</p>";
    return;
  }

  const teamNames = meeting.team_ids
    .map(tid => MOCK_TEAMS.find(t => t.id === tid)?.name)
    .filter(Boolean)
    .join(", ");

  contentEl.innerHTML = `
    <h1>${meeting.title}</h1>
    <p class="meta">${meeting.date} · Teams: ${teamNames}</p>
  `;

  const notes = MOCK_NOTES.filter(n => n.meeting_id === id);
  notesEl.innerHTML = notes.length
    ? notes.map(note => `
        <div class="card">
          <p>${note.raw_text}</p>
          <p class="meta"><strong>AI Summary:</strong> ${note.ai_summary || "Not yet generated"}</p>
        </div>
      `).join("")
    : "<p>No notes yet.</p>";

  const noteIds = notes.map(n => n.id);
  const actionItems = MOCK_ACTION_ITEMS.filter(a => noteIds.includes(a.note_id));

  actionsEl.innerHTML = actionItems.length
    ? actionItems.map(item => {
        const owner = MOCK_USERS.find(u => u.id === item.owner_id);
        const statusClass = item.status === "completed" ? "status-completed" : "status-open";
        return `
          <div class="card">
            <h3><a href="action-item.html?id=${item.id}">${item.description}</a></h3>
            <p class="meta">Owner: ${owner ? owner.name : "Unassigned"} · <span class="${statusClass}">${item.status}</span></p>
          </div>
        `;
      }).join("")
    : "<p>No action items yet.</p>";
}

document.addEventListener("DOMContentLoaded", renderMeetingDetail);