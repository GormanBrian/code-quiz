let startButton = document.querySelector("#start-button");
let timerEl = document.querySelector("#timer");

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

function startQuiz() {
  startTimer();
}

startButton.addEventListener("click", startQuiz);
