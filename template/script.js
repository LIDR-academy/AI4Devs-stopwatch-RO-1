// Variables para el cronómetro
let startTime = 0; // Momento en el que se inició
let elapsedTime = 0; // Tiempo transcurrido acumulado
let timerInterval; // Referencia al setInterval

// Elementos del DOM
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

// Formatear tiempo en mm:ss:ms
function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 1000;
  let ms = Math.floor(diffInMs);

  // Formato con ceros a la izquierda
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(3, "0");

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

// Actualiza el display cada intervalo
function print(txt) {
  display.innerHTML = txt;
}

// Función Start
function start() {
  startTime = Date.now() - elapsedTime; // Ajusta si se reanuda
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10); // actualiza cada 10ms
  startBtn.disabled = true; // Desactiva Start mientras corre
}

// Función Stop
function stop() {
  clearInterval(timerInterval);
  startBtn.disabled = false; // Habilita Start otra vez
}

// Función Reset
function reset() {
  clearInterval(timerInterval);
  print("00:00:000");
  elapsedTime = 0;
  startBtn.disabled = false;
}

// Event listeners
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
