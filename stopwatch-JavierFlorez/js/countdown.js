// countdown.js

const timeDisplay = document.getElementById('timeDisplay');
const keypad = document.getElementById('keypad');
const setBtn = document.getElementById('setBtn');
const clearBtn = document.getElementById('clearBtn');
const startPauseBtn = document.getElementById('startPauseBtn');
const clearBtn2 = document.getElementById('clearBtn2');
const setupButtons = document.getElementById('setupButtons');
const actionButtons = document.getElementById('actionButtons');

let inputDigits = '';
let countdownInterval = null;
let totalMilliseconds = 0;
let paused = false;

function createKeypad() {
  for (let i = 1; i <= 9; i++) {
    createKey(i);
  }
  createKey(0);
}

function createKey(number) {
  const btn = document.createElement('button');
  btn.textContent = number;
  btn.className = 'bg-white text-gray-900 font-bold py-4 w-20 rounded-xl shadow text-xl hover:bg-gray-200';
  btn.addEventListener('click', () => handleDigitInput(number));
  keypad.appendChild(btn);
}

function handleDigitInput(digit) {
  if (inputDigits.length >= 6) return;
  inputDigits += digit.toString();
  updateDisplayFromDigits(0); // Inicialmente ms = 0
  console.log(`Digit entered: ${digit}`);
}

function updateDisplayFromDigits(ms) {
  const padded = inputDigits.padStart(6, '0');
  const hrs = padded.substring(0, 2);
  const mins = padded.substring(2, 4);
  const secs = padded.substring(4, 6);
  timeDisplay.textContent = `${hrs}:${mins}:${secs}.${padMilliseconds(ms)}`;
}

function convertToMilliseconds() {
  const [timePart] = timeDisplay.textContent.split('.');
  const [h, m, s] = timePart.split(':').map(Number);
  return ((h * 3600 + m * 60 + s) * 1000);
}

function handleSet() {
  totalMilliseconds = convertToMilliseconds();
  if (totalMilliseconds <= 0) {
    alert('Ingresa un tiempo válido');
    return;
  }
  keypad.classList.add('hidden');
  setupButtons.classList.add('hidden');
  actionButtons.classList.remove('hidden');
  console.log('Tiempo configurado:', totalMilliseconds, 'ms');
}

function handleInitialClear() {
  inputDigits = '';
  totalMilliseconds = 0;
  updateDisplayFromDigits(0);
}

function handleResetCountdown() {
  clearInterval(countdownInterval);
  inputDigits = '';
  totalMilliseconds = 0;
  paused = false;
  updateDisplayFromDigits(0);
  keypad.classList.remove('hidden');
  setupButtons.classList.remove('hidden');
  actionButtons.classList.add('hidden');
  startPauseBtn.textContent = 'Start';
  clearBtn2.classList.remove('w-full');
  clearBtn2.classList.remove('bg-red-600');
  clearBtn2.classList.add('bg-red-400');
  console.log('Cuenta regresiva reiniciada');
}

function toggleCountdown() {
  if (!paused) {
    startCountdown();
    startPauseBtn.textContent = 'Pause';
    paused = true;
  } else {
    pauseCountdown();
    startPauseBtn.textContent = 'Start';
    paused = false;
  }
}

function startCountdown() {
  const endTime = Date.now() + totalMilliseconds;
  countdownInterval = setInterval(() => {
    const remaining = endTime - Date.now();
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      timeDisplay.textContent = '00:00:00.000';
      notifyFinish();
      return;
    }
    totalMilliseconds = remaining;
    updateDisplayFromMilliseconds(remaining);
  }, 50);
}

function pauseCountdown() {
  clearInterval(countdownInterval);
}

function updateDisplayFromMilliseconds(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const milliseconds = ms % 1000;
  timeDisplay.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${padMilliseconds(milliseconds)}`;
}

function pad(n) {
  return n.toString().padStart(2, '0');
}

function padMilliseconds(ms) {
  return ms.toString().padStart(3, '0');
}

function notifyFinish() {
  alert('⏰ ¡Tiempo finalizado!');
  try {
    const beep = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
    beep.play().catch(() => console.log('🔇 Sonido bloqueado por navegador'));
  } catch (e) {
    console.warn('Error al reproducir sonido:', e);
  }
}

setBtn.addEventListener('click', handleSet);
clearBtn.addEventListener('click', handleInitialClear);
clearBtn2.addEventListener('click', handleResetCountdown);
startPauseBtn.addEventListener('click', toggleCountdown);

createKeypad();