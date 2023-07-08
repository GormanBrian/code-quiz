// Get the existing elements
let mainEl = document.querySelector("main");
let highScoresContainerEl = document.querySelector("#high-scores-container");
let backButtonEl = document.querySelector("#back-button");
// Create form elements
let newEntryFormEl = document.createElement("form");
let newEntryInputEl = document.createElement("input");

/**
 * Get an item from local storage, if it doesn't exist return a default value
 * @param {string} key Key of local storage item to retrieve
 * @param {T<any>} defaultValue Default value if no item by that key exists in local storage
 * @returns {T} Value of keyed item in local storage or default value
 */
function getLocalStorageItem(key, defaultValue) {
  let item = JSON.parse(localStorage.getItem(key));
  return item === null ? defaultValue : item;
}

/* Helper methods for getting scores and new score */
let getScores = () => getLocalStorageItem("scores", []);
let getNewScore = () => getLocalStorageItem("new-score", -1);
/* */

/**
 * Display the list of high scores
 */
function showHighScoresList() {
  // Reset high scores container
  highScoresContainerEl.innerHTML = "";
  // Get the high scores array
  let scores = getScores();
  // Create the high scores ordered list
  let highScoresListEl = document.createElement("ol");
  // Add each high score from the array to the list
  scores.forEach(({ initials, time }, index) => {
    // Create the high score list item
    let highScoreListItemEl = document.createElement("li");

    /* Create and set the high score's properties */
    let highScoreInitialsEl = document.createElement("p");
    highScoreInitialsEl.textContent = initials;

    let highScoreTimeEl = document.createElement("h3");
    highScoreTimeEl.textContent = time;
    /* */

    /* Add the property elements to the list item */
    highScoreListItemEl.appendChild(highScoreInitialsEl);
    highScoreListItemEl.appendChild(highScoreTimeEl);
    if (index === 0 || index % 2 === 0) {
      highScoreListItemEl.setAttribute("class", "alternate-item");
    }
    /* */

    // Add the list item to the list
    highScoresListEl.appendChild(highScoreListItemEl);
  });

  // Add the high scores list to the container
  highScoresContainerEl.appendChild(highScoresListEl);
}

/**
 * Remove the form and log the new entry, then display the updated high scores list
 * @param {Event} event Event object triggered by submit
 */
function submitNewEntryForm(event) {
  // Prevent reload of page
  event.preventDefault();

  let newEntryValue = newEntryInputEl.value.trim();
  // Return if no initials were provided
  if (newEntryValue === "") return;

  // Remove the form from the page
  newEntryFormEl.innerHTML = "";
  // Get current high scores
  let oldScores = getScores();
  // Add the new score to the current array
  oldScores.push({
    initials: newEntryValue,
    time: getNewScore(),
  });
  // Sort array by descending scores
  oldScores = oldScores.sort((a, b) => {
    return b.time - a.time;
  });
  // Set the new high scores array and reset the new score value
  localStorage.setItem("scores", JSON.stringify(oldScores));
  localStorage.setItem("new-score", -1);
  // Show the updated high scores list
  showHighScoresList();
}

/**
 * Display the new entry form
 */
function showNewEntryForm() {
  // Create new entry input
  newEntryInputEl.setAttribute("type", "text");
  newEntryInputEl.setAttribute("name", "initials-input");
  newEntryInputEl.setAttribute("id", "initials-input");
  // Create new entry label
  let newEntryLabelEl = document.createElement("label");
  newEntryLabelEl.setAttribute("for", "initials-input");
  newEntryLabelEl.setAttribute("id", "initials-label");
  newEntryLabelEl.textContent = "Enter your initials: ";
  // Add the label and input to the form
  newEntryFormEl.appendChild(newEntryLabelEl);
  newEntryFormEl.appendChild(newEntryInputEl);
  // Add the form to the main element
  mainEl.appendChild(newEntryFormEl);
}

// Navigate back to main page
backButtonEl.addEventListener("click", () => navigate("index.html"));
// Listen for submission of new event form
newEntryFormEl.addEventListener("submit", submitNewEntryForm);

/**
 * Display the high scores list, display the new entry form if a new entry is pending
 */
function start() {
  // Show high scores list by default
  showHighScoresList();
  // Show new entry form if a new entry is pending
  if (getNewScore() !== -1) {
    showNewEntryForm();
  }
}

start();
