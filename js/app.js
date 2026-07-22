// Shared logic: renders the top nav on every page (except login).

function renderNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  nav.innerHTML = `
    <div class="nav-brand">Ops Tracker</div>
    <nav>
      <a href="dashboard.html">Dashboard</a>
      <a href="meetings.html">Meetings</a>
      <a href="create-meeting.html">New Meeting</a>
    </nav>
    <div class="nav-user">${CURRENT_USER.name} (${CURRENT_USER.role})</div>
  `;
}

// Helper: get a URL query param (used by detail pages to read ?id=)
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Login form handler — this is a frontend-only mock, so any submitted
// credentials are accepted and the user is redirected to the dashboard.
function setupLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.location.href = "dashboard.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  setupLoginForm();
});