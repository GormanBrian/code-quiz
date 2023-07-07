// Get the existing elements
let mainEl = document.querySelector("main");
let highScoresContainerEl = document.querySelector("#high-scores-container");
let backButtonEl = document.querySelector("#back-button");
// Create form
let newEntryFormEl = document.createElement("form");
let newEntryInputEl = document.createElement("input");

function getLocalStorageItem(key, defaultValue) {
  let item = JSON.parse(localStorage.getItem(key));
  return item === null ? defaultValue : item;
}

let getScores = () => getLocalStorageItem("scores", []);
let getNewScore = () => getLocalStorageItem("new-score", -1);

function showHighScoresList() {
  highScoresContainerEl.innerHTML = "";
  let scores = getScores();

  let highScoresListEl = document.createElement("ol");
  scores.forEach(({ initials, time }) => {
    let highScoreListItemEl = document.createElement("li");

    let highScoreInitialsEl = document.createElement("p");
    highScoreInitialsEl.textContent = initials;

    let highScoreTimeEl = document.createElement("h3");
    highScoreTimeEl.textContent = time;

    highScoreListItemEl.appendChild(highScoreInitialsEl);
    highScoreListItemEl.appendChild(highScoreTimeEl);
    highScoresListEl.appendChild(highScoreListItemEl);
  });

  highScoresContainerEl.appendChild(highScoresListEl);
}

function submitNewEntryForm(event) {
  event.preventDefault();
  mainEl.removeChild(newEntryFormEl);

  let oldScores = getScores();

  oldScores.push({
    initials: newEntryInputEl.value.trim(),
    time: getNewScore(),
  });

  oldScores = oldScores.sort((a, b) => b.score - a.score);
  localStorage.setItem("scores", JSON.stringify(oldScores));

  showHighScoresList();
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

  mainEl.appendChild(newEntryFormEl);
}

// Navigate back to main page
backButtonEl.addEventListener("click", () => navigate("index.html"));
newEntryFormEl.addEventListener("submit", submitNewEntryForm);

function start() {
  showHighScoresList();
  newScore = getNewScore();
  if (newScore !== -1) {
    showNewEntryForm();
  }
}

start();
