let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const clearBtn = document.getElementById("clearBtn");

function formatTime(ms) {
  const milliseconds = ms % 1000;
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + ':' +
    String(milliseconds).padStart(3, '0')
  );
}

function updateDisplay() {
  const now = Date.now();
  const timePassed = now - startTime + elapsedTime;
  display.textContent = formatTime(timePassed);
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateDisplay, 10);
  startBtn.textContent = "Pause";
  isRunning = true;
}

function pauseTimer() {
  clearInterval(timerInterval);
  elapsedTime += Date.now() - startTime;
  startBtn.textContent = "Start";
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  display.textContent = "00:00:00:000";
  startBtn.textContent = "Start";
  isRunning = false;
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
});

clearBtn.addEventListener("click", resetTimer);

