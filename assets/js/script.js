let timerEl = document.querySelector("#timer");

function startTimer() {
  let time = 60;

  let timeInterval = setInterval(function () {
    timerEl.textContent = "Time: " + time;

    if (time === 0) {
      clearInterval(timeInterval);
    }

    time--;
  }, 1000);
}
