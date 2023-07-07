// Get the existing elements
let highScoresContainerEl = document.querySelector("#high-scores-container");
let backButtonEl = document.querySelector("#back-button");
// Create form
let newEntryFormEl = document.createElement("form");
let newEntryInputEl = document.createElement("input");

let newScore;

function submitNewEntryForm(event) {
  event.preventDefault();

  let scores = JSON.parse(localStorage.getItem("scores"));
  if (scores === null) {
    scores = [];
  }

  scores.push({
    initials: newEntryInputEl.value.trim(),
    time: newScore,
  });

  scores = scores.sort((a, b) => b.score - a.score);
  localStorage.setItem("scores", JSON.stringify(scores));
}

function showNewEntryForm() {
  newEntryInputEl.setAttribute("type", "text");
  newEntryInputEl.setAttribute("name", "initials-input");
  newEntryInputEl.setAttribute("id", "initials-input");

  let newEntryLabelEl = document.createElement("label");
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

newEntryFormEl.addEventListener("submit", submitNewEntryForm);

function start() {
  newScore = JSON.parse(localStorage.getItem("new-score"));
  if (newScore === -1 || newScore === null) {
    // Just show the scores
  } else {
    // Get the new scores
    showNewEntryForm();
  }
}

start();
