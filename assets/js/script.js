let timerEl = document.querySelector("#timer");

let timeInterval;

function clearTimer() {
  clearInterval(timeInterval);
  timerEl.textContent = "";
}

function startTimer() {
  let time = 60;

  timeInterval = setInterval(function () {
    timerEl.textContent = "Time: " + time;
    if (time === 0) clearTimer();
    time--;
  }, 1000);
}
