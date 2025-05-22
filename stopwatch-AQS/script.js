
// Page Navigation
function showPage(pageId) {
  ['main-page', 'stopwatch-page', 'countdown-page'].forEach(id => {
    document.getElementById(id).classList.add('d-none');
  });
  document.getElementById(pageId).classList.remove('d-none');
  if (pageId === 'countdown-page') buildCountdownButtons();
}

// Stopwatch Logic
let stopwatchInterval;
let stopwatchStart = 0;
let elapsed = 0;
let running = false;

function formatTime(ms) {
  let milliseconds = ms % 1000;
  let totalSeconds = Math.floor(ms / 1000);
  let seconds = totalSeconds % 60;
  let minutes = Math.floor(totalSeconds / 60) % 60;
  let hours = Math.floor(totalSeconds / 3600);

  return (
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}` +
    `<span style="font-size:1.5rem;">${String(milliseconds).padStart(3, '0')}</span>`
  );
}

function updateStopwatch() {
  const now = Date.now();
  const diff = now - stopwatchStart + elapsed;
  document.getElementById('stopwatch-display').innerHTML = formatTime(diff);
}

function toggleStopwatch() {
  if (running) {
    clearInterval(stopwatchInterval);
    elapsed += Date.now() - stopwatchStart;
    running = false;
  } else {
    stopwatchStart = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 50);
    running = true;
  }
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  elapsed = 0;
  running = false;
  document.getElementById('stopwatch-display').innerHTML = '00:00:00<span style="font-size:1.5rem;">000</span>';
}

// Countdown Logic
let countdownDigits = '';
let countdownTime = 0;
let countdownInterval;
let countdownRunning = false;

function buildCountdownButtons() {
  const container = document.getElementById('countdown-buttons');
  if (container.children.length) return;
  for (let i = 1; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-dark m-1';
    btn.innerText = i;
    btn.style.width = '60px';
    btn.style.height = '60px';
    btn.onclick = () => appendCountdownDigit(i);
    container.appendChild(btn);
  }
  const zeroBtn = document.createElement('button');
  zeroBtn.className = 'btn btn-outline-dark m-1';
  zeroBtn.innerText = '0';
  zeroBtn.style.width = '60px';
  zeroBtn.style.height = '60px';
  zeroBtn.onclick = () => appendCountdownDigit(0);
  container.appendChild(zeroBtn);
}

function appendCountdownDigit(digit) {
  if (countdownDigits.length >= 6 || countdownRunning) return;
  countdownDigits += digit.toString();
  updateCountdownDisplay();
}

function updateCountdownDisplay() {
  const padded = countdownDigits.padStart(6, '0');
  const h = padded.substring(0, 2);
  const m = padded.substring(2, 4);
  const s = padded.substring(4, 6);
  countdownTime = (+h) * 3600 + (+m) * 60 + (+s);
  document.getElementById('countdown-display').innerText = `${h}:${m}:${s}`;
}

function startCountdown() {
  if (countdownTime <= 0 || countdownRunning) return;
  countdownRunning = true;
  document.getElementById('countdown-alert').style.display = 'none';
  countdownInterval = setInterval(() => {
    if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      countdownRunning = false;
      document.getElementById('countdown-alert').style.display = 'block';
      return;
    }
    countdownTime--;
    const h = String(Math.floor(countdownTime / 3600)).padStart(2, '0');
    const m = String(Math.floor((countdownTime % 3600) / 60)).padStart(2, '0');
    const s = String(countdownTime % 60).padStart(2, '0');
    document.getElementById('countdown-display').innerText = `${h}:${m}:${s}`;
  }, 1000);
}

function pauseCountdown() {
  clearInterval(countdownInterval);
  countdownRunning = false;
}

function clearCountdown() {
  clearInterval(countdownInterval);
  countdownDigits = '';
  countdownTime = 0;
  countdownRunning = false;
  document.getElementById('countdown-display').innerText = '00:00:00';
  document.getElementById('countdown-alert').style.display = 'none';
}
