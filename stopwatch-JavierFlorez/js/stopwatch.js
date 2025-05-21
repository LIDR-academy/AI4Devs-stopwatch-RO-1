// stopwatch.js

// Elementos del DOM
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// Variables del estado del cronómetro
let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let running = false;

/**
 * Formatea el tiempo en milisegundos a HH:mm:ss.SSS
 * @param {number} time - Tiempo en milisegundos
 * @returns {string}
 */
function formatTime(time) {
  const ms = time % 1000;
  const totalSeconds = Math.floor(time / 1000);
  const secs = totalSeconds % 60;
  const mins = Math.floor(totalSeconds / 60) % 60;
  const hrs = Math.floor(totalSeconds / 3600);

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${ms.toString().padStart(3, '0')}`;
}

/**
 * Añade ceros a la izquierda si es necesario
 * @param {number} num
 * @returns {string}
 */
function pad(num) {
  return num.toString().padStart(2, '0');
}

/**
 * Inicia o pausa el cronómetro
 */
function toggleStopwatch() {
  try {
    if (!running) {
      startTime = Date.now() - elapsedTime;
      intervalId = setInterval(updateDisplay, 10);
      startBtn.textContent = 'Pausar';
      running = true;
      console.log('Cronómetro iniciado');
    } else {
      clearInterval(intervalId);
      elapsedTime = Date.now() - startTime;
      startBtn.textContent = 'Iniciar';
      running = false;
      console.log('Cronómetro pausado');
    }
  } catch (error) {
    console.error('Error al iniciar/pausar:', error);
  }
}

/**
 * Limpia el cronómetro
 */
function resetStopwatch() {
  try {
    clearInterval(intervalId);
    elapsedTime = 0;
    running = false;
    display.textContent = '00:00:00.000';
    startBtn.textContent = 'Iniciar';
    console.log('Cronómetro reiniciado');
  } catch (error) {
    console.error('Error al reiniciar:', error);
  }
}

/**
 * Actualiza el display del cronómetro
 */
function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime;
  display.textContent = formatTime(diff);
}

// Eventos
startBtn.addEventListener('click', toggleStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
