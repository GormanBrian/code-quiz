// Get the existing elements
let highScoresContainerEl = document.querySelector("#high-scores-container");
let backButtonEl = document.querySelector("#back-button");
// Create form elements
let newEntryFormEl = document.createElement("form");
let newEntryInputEl = document.createElement("input");
let newEntryLabelEl = document.createElement("label");

function showNewEntryForm() {
  newEntryInputEl.setAttribute("type", "text");
  newEntryInputEl.setAttribute("name", "initials-input");
  newEntryInputEl.setAttribute("id", "initials-input");

  newEntryLabelEl.setAttribute("for", "initials-input");
  newEntryLabelEl.setAttribute("id", "initials-label");
  newEntryLabelEl.textContent = "Enter your initials: ";

  newEntryFormEl.appendChild(newEntryLabelEl);
  newEntryFormEl.appendChild(newEntryInputEl);
  highScoresContainerEl.appendChild(newEntryFormEl);
}

// Navigate back to main page
backButtonEl.addEventListener("click", () => {
  window.location.href = "index.html";
});

function start() {
  let newScore = JSON.parse(localStorage.getItem("new-score"));
  if (newScore === -1) {
    // Just show the scores
  } else {
    // Get the new scores
    showNewEntryForm();
  }
}

start();
