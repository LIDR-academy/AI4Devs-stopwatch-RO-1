// Variables globales del cronómetro
let startTime = 0;
let elapsedTime = 0;
let interval = null;
let isRunning = false;
let lapCounter = 0;

/**
 * Formatea el tiempo en MM:SS:MS
 * @param {number} time - tiempo en milisegundos
 * @returns {string} - tiempo formateado
 */
function formatTime(time) {
  const minutes = String(Math.floor(time / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}

/**
 * Actualiza el display del cronómetro
 */
function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = formatTime(elapsedTime);
}

/**
 * Inicia el cronómetro
 */
function startTimer() {
  if (isRunning) return;
  try {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
    console.log("⏱ Cronómetro iniciado");
    toggleButtons("start");
  } catch (error) {
    console.error("❌ Error al iniciar el cronómetro:", error);
  }
}

/**
 * Pausa el cronómetro
 */
function pauseTimer() {
  if (!isRunning) return;
  try {
    clearInterval(interval);
    isRunning = false;
    console.log("⏸ Cronómetro pausado");
    toggleButtons("pause");
  } catch (error) {
    console.error("❌ Error al pausar el cronómetro:", error);
  }
}

/**
 * Reinicia el cronómetro y limpia laps
 */
function resetTimer() {
  try {
    clearInterval(interval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCounter = 0;
    updateDisplay();
    document.getElementById("laps").innerHTML = "";
    document.getElementById("lapsContainer").classList.add("hidden");
    console.log("🔁 Cronómetro reiniciado");
    toggleButtons("reset");
  } catch (error) {
    console.error("❌ Error al reiniciar el cronómetro:", error);
  }
}

/**
 * Guarda una vuelta (lap)
 */
function recordLap() {
  try {
    if (!isRunning) return;
    const lapTime = formatTime(elapsedTime);
    lapCounter++;
    const lapElement = document.createElement("li");
    lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
    document.getElementById("laps").appendChild(lapElement);
    document.getElementById("lapsContainer").classList.remove("hidden");
    console.log(`🏁 Vuelta ${lapCounter} registrada: ${lapTime}`);
  } catch (error) {
    console.error("❌ Error al registrar la vuelta:", error);
  }
}

/**
 * Cambia visibilidad de botones según acción
 * @param {string} action
 */
function toggleButtons(action) {
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const lapBtn = document.getElementById("lapBtn");

  switch (action) {
    case "start":
      startBtn.classList.add("hidden");
      pauseBtn.classList.remove("hidden");
      resetBtn.classList.remove("hidden");
      lapBtn.classList.remove("hidden");
      break;
    case "pause":
      startBtn.classList.remove("hidden");
      pauseBtn.classList.add("hidden");
      break;
    case "reset":
      startBtn.classList.remove("hidden");
      pauseBtn.classList.add("hidden");
      resetBtn.classList.add("hidden");
      lapBtn.classList.add("hidden");
      break;
  }
}

// Asociar eventos a botones
document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("lapBtn").addEventListener("click", recordLap);
