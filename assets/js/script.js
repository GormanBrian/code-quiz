// Select header elements
let highScoresButtonEl = document.querySelector("#high-scores-button");
let timerEl = document.querySelector("#timer");
// Select start button element
let startButtonEl = document.querySelector("#start-button");
// Select question elements
let questionContainerEl = document.querySelector("#question-container");
let questionResultEl = document.querySelector("#question-result");
// Create game result elements
let gameResultTitleEl = document.createElement("h1");
let gameResultDetailsEl = document.createElement("p");

let fadeEffect, timeInterval, time, currentIndex;

function endGame() {
  // Clear the timer
  clearInterval(timeInterval);
  timerEl.textContent = "";
  // Remove the last question from the container
  questionContainerEl.innerHTML = "";

  // Create result elements
  gameResultTitleEl.setAttribute("id", "game-result");
  gameResultDetailsEl.setAttribute("id", "game-result-details");

  // Display correct message based on result
  if (time <= 0) {
    // Display losing message
    gameResultTitleEl.textContent = "YOU LOSE...";
    gameResultTitleEl.setAttribute("class", "game-result-lose");
    gameResultDetailsEl.textContent = `You had ${
      questions.length - currentIndex
    } questions left.`;
  } else {
    // Display winning message
    gameResultTitleEl.textContent = "YOU WIN!";
    gameResultTitleEl.setAttribute("class", "game-result-win");
    gameResultDetailsEl.textContent = `Your score is ${time}!`;
  }

  // Add result elements to container
  questionContainerEl.appendChild(gameResultTitleEl);
  questionContainerEl.appendChild(gameResultDetailsEl);

  setTimeout(() => {
    // Clear the fade effect interval if it still exists
    clearInterval(fadeEffect);
    // Set the result to the time left or -1 if failed
    let res = time <= 0 ? -1 : time;
    // Go to the high scores screen
    navigate("highscores.html", res);
  }, 5000);
}

/**
 * Start the timer and update the text content every second
 * @param {number} duration How many seconds to run timer
 */
function startTimer(duration = 60) {
  time = duration;
  timeInterval = setInterval(() => {
    timerEl.textContent = "Time: " + time;
    if (time <= 0) {
      endGame();
    }
    time--;
  }, 1000);
}

/**
 * Display the result of the previous answer
 * @param {boolean} result True for correct, false for incorrect
 */
function showResult(result) {
  if (!result) {
    // Apply time penalty, show incorrect message
    time -= 10;
    questionResultEl.textContent = "INCORRECT!";
  } else {
    // Show correct message
    questionResultEl.textContent = "CORRECT!";
  }

  // Reset the opacity
  questionResultEl.style.opacity = 1;

  /* Fade out the previous question result element */
  fadeEffect = setInterval(function () {
    // Reduce opacity until question result is invisible
    if (questionResultEl.style.opacity > 0) {
      questionResultEl.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 200);
  /* */
}

/**
 * Gets the result of the answered question, moves to next question or high scores screen
 * @param {Event} event Event object triggered by click
 * @returns {null} Return if the event was not triggered by a button
 */
function answerQuestion(event) {
  let element = event.target;
  // Return if the target of the event is not a button
  if (!element.matches("button")) return;

  /* Check if the user selected the correct answer, display that result */
  let isCorrect =
    element.getAttribute("data-id") == questions[currentIndex].correctAnswerId;
  showResult(isCorrect);
  /* */

  // Increment current question index
  currentIndex++;
  // Check if there are more questions remaining
  if (currentIndex < questions.length) {
    showQuestion(); // Show new question
  } else {
    endGame(); // End game successfully
  }
}

/**
 * Display the current question
 */
function showQuestion() {
  // Reset the question container
  questionContainerEl.innerHTML = "";
  // Create the question text
  let questionTextEl = document.createElement("h1");
  questionTextEl.textContent = questions[currentIndex].text;

  // Create the question answers list
  let questionListEl = document.createElement("ul");
  // Shuffle the answers and display a button for each answer
  shuffle(questions[currentIndex].answers).forEach(({ text, id }) => {
    let answerEl = document.createElement("button");
    answerEl.textContent = text;
    // Set the data-id attribute to make answer identifiable
    answerEl.setAttribute("data-id", id);
    // Add the answer button to the answers list
    questionListEl.appendChild(answerEl);
  });

  // Add the question's elements
  questionContainerEl.appendChild(questionTextEl);
  questionContainerEl.appendChild(questionListEl);
}

/**
 * Hide the start container, start the game
 */
function startQuiz() {
  // Hide the start section
  document.querySelector("#start-section").style.display = "none";
  // Start the timer
  startTimer();
  // Shuffle questions
  questions = shuffle(questions);
  // Start at index 0
  currentIndex = 0;
  // Start the first question
  showQuestion(questions[0]);
}

// Listen for high scores button click
highScoresButtonEl.addEventListener("click", () => navigate("highscores.html"));
// Listen for start button click
startButtonEl.addEventListener("click", startQuiz);
// Listen for answer button click
questionContainerEl.addEventListener("click", answerQuestion);
