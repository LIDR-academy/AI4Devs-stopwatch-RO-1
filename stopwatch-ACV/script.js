let timerInterval;
let startTime;
let elapsed = 0;
let countdown = false;
let countdownEndTime;

function selectMode(mode) {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('timer').style.display = 'block';
  countdown = (mode === 'countdown');
  document.getElementById('countdownInput').style.display = countdown ? 'block' : 'none';
  clearTimer();
}

function start() {
  if (countdown && !countdownEndTime) {
    alert("Please set countdown time first.");
    return;
  }
  startTime = Date.now() - elapsed;
  timerInterval = setInterval(() => {
    if (countdown) {
      const remaining = countdownEndTime - Date.now();
      if (remaining <= 0) {
        updateDisplay(0);
        clearInterval(timerInterval);
        alert("Countdown finished!");
        return;
      }
      updateDisplay(remaining);
    } else {
      elapsed = Date.now() - startTime;
      updateDisplay(elapsed);
    }
  }, 50);
}

function pause() {
  clearInterval(timerInterval);
  if (!countdown) {
    elapsed = Date.now() - startTime;
  }
}

function clearTimer() {
  clearInterval(timerInterval);
  elapsed = 0;
  countdownEndTime = null;
  updateDisplay(countdown ? 0 : 0);
}

function setCountdown() {
  const minutes = parseInt(document.getElementById('countdownMinutes').value);
  if (isNaN(minutes) || minutes <= 0) {
    alert("Please enter a valid number.");
    return;
  }
  countdownEndTime = Date.now() + minutes * 60000;
  updateDisplay(minutes * 60000);
}

function updateDisplay(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(ms % 1000).padStart(3, '0');
  document.getElementById('display').innerHTML = `${minutes}:${seconds}:<span id="ms">${milliseconds}</span>`;
}

function goHome() {
  clearTimer();
  document.getElementById('timer').style.display = 'none';
  document.getElementById('menu').style.display = 'block';
}
