let highScoresButtonEl = document.querySelector("#high-scores-button");
let timerEl = document.querySelector("#timer");

let startButtonEl = document.querySelector("#start-button");

let questionContainerEl = document.querySelector("#question-container");
let questionResultEl = document.querySelector("#question-result");

let gameResultTitleEl = document.createElement("h1");
let gameResultDetailsEl = document.createElement("h3");

let timeInterval, time;
let currentIndex;

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
    gameResultTitleEl.textContent = "YOU LOSE...";
    gameResultTitleEl.style.color = "red";
    gameResultDetailsEl.textContent = `You had ${
      questions.length - currentIndex
    } questions left.`;
  } else {
    gameResultTitleEl.textContent = "YOU WIN!!!";
    gameResultTitleEl.style.color = "green";
    gameResultDetailsEl.textContent = `Your score is ${time}!`;
  }

  // Add result elements to container
  questionContainerEl.appendChild(gameResultTitleEl);
  questionContainerEl.appendChild(gameResultDetailsEl);

  setTimeout(() => {
    let res = time <= 0 ? -1 : time;
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
function displayResult(result) {
  if (!result) {
    time -= 10;
    questionResultEl.textContent = "INCORRECT!";
  } else {
    questionResultEl.textContent = "CORRECT!";
  }

  let fadeEffect = setInterval(function () {
    if (!questionResultEl.style.opacity) {
      questionResultEl.style.opacity = 1;
    }
    if (questionResultEl.style.opacity > 0) {
      questionResultEl.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 200);
}

function answerQuestion(event) {
  let element = event.target;
  if (!element.matches("button")) {
    return;
  }

  let userAnswer = element.getAttribute("data-id");
  displayResult(userAnswer === questions[currentIndex].correctAnswer);

  currentIndex++;
  if (currentIndex < questions.length) {
    displayQuestion();
  } else {
    endGame();
  }
}

function displayQuestion() {
  questionContainerEl.innerHTML = "";

  let questionTextEl = document.createElement("h1");
  questionTextEl.textContent = questions[currentIndex].text;
  questionContainerEl.appendChild(questionTextEl);

  let questionListEl = document.createElement("ul");
  questions[currentIndex].answers.forEach(({ text, id }) => {
    console.log(text);
    let answerEl = document.createElement("button");
    answerEl.textContent = text;
    answerEl.setAttribute("data-id", id);
    questionListEl.appendChild(answerEl);
  });

  questionContainerEl.appendChild(questionListEl);
}

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
  displayQuestion(questions[0]);
}

highScoresButtonEl.addEventListener("click", () => navigate("highscores.html"));
startButtonEl.addEventListener("click", startQuiz);
questionContainerEl.addEventListener("click", answerQuestion);
