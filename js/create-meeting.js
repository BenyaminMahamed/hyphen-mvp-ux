function setupAiGenerateButton() {
  const btn = document.getElementById("generate-ai-btn");
  const preview = document.getElementById("ai-preview");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const notesText = document.querySelector('textarea[name="notes"]').value;

    if (!notesText.trim()) {
      preview.innerHTML = "<p>Enter some notes first.</p>";
      return;
    }

    const sentences = notesText.split(".").map(s => s.trim()).filter(Boolean);
    const summary = `Meeting covered ${sentences.length} key points.`;
    const actionItems = sentences.filter(s =>
      s.toLowerCase().includes("to") || s.toLowerCase().includes("follow")
    ).slice(0, 5);

    preview.innerHTML = `
      <div class="card">
        <p><strong>AI Summary:</strong> ${summary}</p>
        <p><strong>Suggested Action Items:</strong></p>
        <ul>${actionItems.map(a => `<li>Follow up: ${a}</li>`).join("")}</ul>
      </div>
    `;
  });
}

function setupCreateMeetingForm() {
  const form = document.getElementById("create-meeting-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Mock save — frontend-only, so just redirect back to the meeting list.
    window.location.href = "meetings.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupAiGenerateButton();
  setupCreateMeetingForm();
});