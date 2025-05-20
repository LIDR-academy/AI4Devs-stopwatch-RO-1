let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const timerDisplay = document.getElementById('timer');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapList = document.getElementById('lapList');

function formatTime(ms) {
  const date = new Date(ms);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  const now = Date.now();
  const currentElapsed = now - startTime + elapsedTime;
  timerDisplay.textContent = formatTime(currentElapsed);
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateDisplay, 10);
  isRunning = true;
  startPauseBtn.textContent = 'Pausar';
  startPauseBtn.setAttribute('aria-label', 'Pausar cronómetro');
}

function pauseTimer() {
  const now = Date.now();
  const currentElapsed = now - startTime + elapsedTime;
  clearInterval(timerInterval);
  elapsedTime = currentElapsed;
  isRunning = false;
  timerDisplay.textContent = formatTime(currentElapsed); // sincroniza visualmente
  startPauseBtn.textContent = 'Continuar';
  startPauseBtn.setAttribute('aria-label', 'Continuar cronómetro');
  addLapTime(currentElapsed); // mismo valor que en pantalla
}

function resetTimer() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  lapCount = 0;
  timerDisplay.textContent = '00:00:00.000';
  startPauseBtn.textContent = 'Iniciar';
  startPauseBtn.setAttribute('aria-label', 'Iniciar cronómetro');
  lapList.innerHTML = '';
}

function addLapTime(time) {
  lapCount++;
  const li = document.createElement('li');
  li.textContent = `${lapCount}. ${formatTime(time)}`;
  lapList.appendChild(li);
}

startPauseBtn.addEventListener('click', () => {
  if (!isRunning && elapsedTime === 0) {
    startTimer();
  } else if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener('click', resetTimer);
