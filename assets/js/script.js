let startButton = document.querySelector("#start-button");
let timerEl = document.querySelector("#timer");

let questionContainerEl = document.querySelector("#question-container");
let questionResultEl = document.querySelector("#question-result");

let timeInterval, time;
let currentIndex;

/**
 * Clear timeInterval and set the text content to an empty string
 */
function clearTimer() {
  clearInterval(timeInterval);
  timerEl.textContent = "";
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
      clearTimer();
    }
    time--;
  }, 1000);
}

function displayResult(result) {
  if (!result) {
    time -= 10;
    questionResultEl.textContent = "INCORRECT!";
  } else {
    questionResultEl.textContent = "CORRECT!";
  }
}

function answerQuestion(event) {
  let element = event.target;
  if (!element.matches("button")) {
    return;
  }

  let userAnswer = element.getAttribute("data-id");
  displayResult(userAnswer === question[currentIndex].correctAnswer);

  currentIndex++;
  if (currentIndex < questions.length) {
    displayQuestion();
  } else {
    // Finished game
  }
}

function displayQuestion() {
  questionContainerEl.innerHTML = "";

  let questionTextEl = document.createElement("h1");
  questionTextEl.textContent = question[currentIndex].text;
  questionContainerEl.insertBefore(questionTextEl, questionResultEl);

  let questionListEl = document.createElement("ul");
  question[currentIndex].answers.forEach(({ text, id }) => {
    console.log(text);
    let answerEl = document.createElement("button");
    answerEl.textContent = text;
    answerEl.setAttribute("data-id", id);
    questionListEl.appendChild(answerEl);
  });

  questionContainerEl.insertBefore(questionListEl, questionResultEl);
}

function startQuiz() {
  startTimer();
  questions = shuffle(questions);
  currentIndex = 0;
  displayQuestion(questions[0]);
}

startButton.addEventListener("click", startQuiz);
questionContainerEl.addEventListener("click", answerQuestion);
