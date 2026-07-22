// Renders outstanding actions and recent meetings on the dashboard.

function renderOutstandingActions() {
  const container = document.getElementById("outstanding-actions-list");
  if (!container) return;

  const openItems = MOCK_ACTION_ITEMS.filter(item => item.status === "open");

  if (openItems.length === 0) {
    container.innerHTML = "<p>No outstanding actions.</p>";
    return;
  }

  container.innerHTML = openItems.map(item => {
    const owner = MOCK_USERS.find(u => u.id === item.owner_id);
    return `
      <div class="card">
        <h3><a href="action-item.html?id=${item.id}">${item.description}</a></h3>
        <p class="meta">Owner: ${owner ? owner.name : "Unassigned"} · <span class="status-open">Open</span></p>
      </div>
    `;
  }).join("");
}

function renderRecentMeetings() {
  const container = document.getElementById("recent-meetings-list");
  if (!container) return;

  const sorted = [...MOCK_MEETINGS].sort((a, b) => new Date(b.date) - new Date(a.date));

  container.innerHTML = sorted.map(meeting => `
    <div class="card">
      <h3><a href="meeting-detail.html?id=${meeting.id}">${meeting.title}</a></h3>
      <p class="meta">${meeting.date}</p>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderOutstandingActions();
  renderRecentMeetings();
});