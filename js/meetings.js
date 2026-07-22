function renderMeetingList(filterText = "") {
  const container = document.getElementById("meeting-list");
  if (!container) return;

  const filtered = MOCK_MEETINGS.filter(m =>
    m.title.toLowerCase().includes(filterText.toLowerCase())
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filtered.length === 0) {
    container.innerHTML = "<p>No meetings found.</p>";
    return;
  }

  container.innerHTML = filtered.map(meeting => {
    const teamNames = meeting.team_ids
      .map(id => MOCK_TEAMS.find(t => t.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    return `
      <div class="card">
        <h3><a href="meeting-detail.html?id=${meeting.id}">${meeting.title}</a></h3>
        <p class="meta">${meeting.date} · ${teamNames}</p>
      </div>
    `;
  }).join("");
}

function setupMeetingSearch() {
  const input = document.getElementById("meeting-search");
  if (!input) return;

  input.addEventListener("input", (e) => {
    renderMeetingList(e.target.value);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderMeetingList();
  setupMeetingSearch();
});