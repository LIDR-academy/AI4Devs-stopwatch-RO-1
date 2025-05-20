// Variables to track the mode and timer states
let stopwatchInterval, countdownInterval;
let stopwatchRunning = false, countdownRunning = false;
let stopwatchTime = 0, countdownTime = 0;
let mode = "stopwatch";

// DOM elements
const toggleModeBtn = document.getElementById('toggleModeBtn');
const timerDisplay = document.getElementById('timer');
const startStopBtn = document.getElementById('startStopBtn');
const clearBtn = document.getElementById('clearBtn');
const setBtn = document.getElementById('setBtn');
const clearCountdownBtn = document.getElementById('clearCountdownBtn');

toggleModeBtn.addEventListener('click', toggleMode);
startStopBtn.addEventListener('click', toggleStopwatch);
clearBtn.addEventListener('click', clearStopwatch);
setBtn.addEventListener('click', setCountdown);
clearCountdownBtn.addEventListener('click', clearCountdown);

// Toggle between stopwatch and countdown
function toggleMode() {
  clearIntervals();
  mode = (mode === "stopwatch") ? "countdown" : "stopwatch";
  document.getElementById('stopwatch-controls').classList.toggle('hidden');
  document.getElementById('countdown-controls').classList.toggle('hidden');
  toggleModeBtn.textContent = mode === "stopwatch" ? "Switch to Countdown" : "Switch to Stopwatch";
  resetDisplay();
}

// Stopwatch functionality
function toggleStopwatch() {
  if (!stopwatchRunning) {
    stopwatchInterval = setInterval(() => {
      stopwatchTime += 10;
      updateDisplay(stopwatchTime);
    }, 10);
    startStopBtn.textContent = "Pause";
  } else {
    clearInterval(stopwatchInterval);
    startStopBtn.textContent = "Start";
  }
  stopwatchRunning = !stopwatchRunning;
}

function clearStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  stopwatchRunning = false;
  startStopBtn.textContent = "Start";
  resetDisplay();
}

// Countdown functionality
function setCountdown() {
  let hours = parseInt(document.getElementById('hours').value) || 0;
  let minutes = parseInt(document.getElementById('minutes').value) || 0;
  let seconds = parseInt(document.getElementById('seconds').value) || 0;
  countdownTime = ((hours * 3600) + (minutes * 60) + seconds) * 1000;

  if (countdownTime > 0) {
    if (countdownRunning) clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        countdownRunning = false;
        alert('Time up!');
        resetDisplay();
        return;
      }
      countdownTime -= 10;
      updateDisplay(countdownTime);
    }, 10);
    countdownRunning = true;
  }
}

function clearCountdown() {
  clearInterval(countdownInterval);
  countdownRunning = false;
  countdownTime = 0;
  resetDisplay();
}

// Clear active intervals
function clearIntervals() {
  clearInterval(stopwatchInterval);
  clearInterval(countdownInterval);
  stopwatchRunning = countdownRunning = false;
}

// Reset timer display to zero
function resetDisplay() {
  timerDisplay.textContent = "00:00:00:000";
}

// Update timer display based on given milliseconds
function updateDisplay(milliseconds) {
  let hours = Math.floor(milliseconds / 3600000);
  let minutes = Math.floor((milliseconds % 3600000) / 60000);
  let seconds = Math.floor((milliseconds % 60000) / 1000);
  let ms = milliseconds % 1000;

  timerDisplay.textContent =
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(ms, 3)}`;
}

// Helper function to pad numbers with leading zeros
function pad(num, size = 2) {
  return num.toString().padStart(size, '0');
}
