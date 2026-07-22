function renderActionItemDetail() {
  const id = parseInt(getQueryParam("id"), 10);
  const item = MOCK_ACTION_ITEMS.find(a => a.id === id);
  const container = document.getElementById("action-item-detail");

  if (!item) {
    container.innerHTML = "<p>Action item not found.</p>";
    return;
  }

  const owner = MOCK_USERS.find(u => u.id === item.owner_id);
  const statusClass = item.status === "completed" ? "status-completed" : "status-open";

  container.innerHTML = `
    <h1>${item.description}</h1>
    <p class="meta">Status: <span class="${statusClass}">${item.status}</span></p>
    <p class="meta">Source: ${item.created_from_ai ? "AI-generated" : "Manually created"}</p>

    <label>Owner
      <select id="owner-select">
        ${MOCK_USERS.map(u => `<option value="${u.id}" ${u.id === item.owner_id ? "selected" : ""}>${u.name}</option>`).join("")}
      </select>
    </label>

    <label>Status
      <select id="status-select" ${item.status === "completed" && CURRENT_USER.role !== "manager" ? "disabled" : ""}>
        <option value="open" ${item.status === "open" ? "selected" : ""}>Open</option>
        <option value="completed" ${item.status === "completed" ? "selected" : ""}>Completed</option>
      </select>
    </label>

    <button id="save-action-item">Save Changes</button>
  `;

  document.getElementById("save-action-item").addEventListener("click", () => {
    item.owner_id = parseInt(document.getElementById("owner-select").value, 10);
    item.status = document.getElementById("status-select").value;
    renderActionItemDetail(); // re-render to reflect change
  });
}

document.addEventListener("DOMContentLoaded", renderActionItemDetail);