let startButton = document.querySelector("#start-button");
let timerEl = document.querySelector("#timer");

let questionContainerEl = document.querySelector("#question-container");

let timeInterval, time;

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
  timeInterval = setInterval(function () {
    timerEl.textContent = "Time: " + time;
    if (time <= 0) {
      clearTimer();
    }
    time--;
  }, 1000);
}

function displayQuestion(question) {
  questionContainerEl.innerHTML = "";
  questionContainerEl.setAttribute("data-id", question.id);

  let questionTextEl = document.createElement("h1");
  questionTextEl.textContent = question.text;
  questionContainerEl.appendChild(questionTextEl);

  let questionListEl = document.createElement("ul");
  question.answers.forEach(({ text, id }) => {
    console.log(text);
    let answerEl = document.createElement("button");
    answerEl.textContent = text;
    answerEl.setAttribute("data-id", id);
    questionListEl.appendChild(answerEl);
  });

  questionContainerEl.appendChild(questionListEl);
}

function startQuiz() {
  startTimer();
  questions = shuffle(questions);
  displayQuestion(questions[0]);
}

startButton.addEventListener("click", startQuiz);
