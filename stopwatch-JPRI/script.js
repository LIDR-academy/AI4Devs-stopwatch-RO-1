// script.js

// Función para navegar entre pantallas (Home, Cronómetro, Temporizador)
function navigateTo(sectionId) {
  document.querySelectorAll("section").forEach(section => {
    section.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
}

// ------------------ CRONÓMETRO ------------------
let cronometroInterval;
let tiempoTranscurrido = 0; // en milisegundos
let enMarcha = false;

const cronometroDisplay = document.getElementById("cronometro-display");
const cronometroBotones = document.querySelectorAll("#cronometro .button");

cronometroBotones[0].onclick = function () { // Iniciar
  if (!enMarcha) {
    enMarcha = true;
    const inicio = Date.now() - tiempoTranscurrido;
    cronometroInterval = setInterval(() => {
      tiempoTranscurrido = Date.now() - inicio;
      actualizarCronometroDisplay();
    }, 100);
  }
};

cronometroBotones[1].onclick = function () { // Pausar
  if (enMarcha) {
    clearInterval(cronometroInterval);
    enMarcha = false;
  }
};

cronometroBotones[2].onclick = function () { // Reiniciar
  clearInterval(cronometroInterval);
  tiempoTranscurrido = 0;
  enMarcha = false;
  actualizarCronometroDisplay();
};

function actualizarCronometroDisplay() {
  const totalCentisegundos = Math.floor(tiempoTranscurrido / 10);
  const centesimas = totalCentisegundos % 100;
  const segundos = Math.floor(totalCentisegundos / 100) % 60;
  const minutos = Math.floor(totalCentisegundos / 6000);

  cronometroDisplay.textContent = `
    ${String(minutos).padStart(2, '0')}:
    ${String(segundos).padStart(2, '0')}:
    ${String(centesimas).padStart(2, '0')}
  `.replace(/\n/g, "");
}

// ------------------ TEMPORIZADOR ------------------
let temporizadorInterval;
let tiempoRestante = 0; // en milisegundos
let temporizadorActivo = false;

const temporizadorDisplay = document.getElementById("temporizador-display");
const minutosInput = document.getElementById("minutos");
const segundosInput = document.getElementById("segundos");
const temporizadorBotones = document.querySelectorAll("#temporizador .button");

// Generador de sonido corto (pitido)
function reproducirBeep() {
  const contexto = new (window.AudioContext || window.webkitAudioContext)();
  const oscilador = contexto.createOscillator();
  const ganancia = contexto.createGain();
  oscilador.connect(ganancia);
  ganancia.connect(contexto.destination);
  oscilador.type = "sine";
  oscilador.frequency.setValueAtTime(1000, contexto.currentTime);
  oscilador.start();
  oscilador.stop(contexto.currentTime + 0.5);
}

temporizadorBotones[0].onclick = function () { // Iniciar
  if (!temporizadorActivo) {
    const minutos = parseInt(minutosInput.value) || 0;
    const segundos = parseInt(segundosInput.value) || 0;
    tiempoRestante = (minutos * 60 + segundos) * 1000;
    temporizadorActivo = true;

    temporizadorInterval = setInterval(() => {
      tiempoRestante -= 1000;
      if (tiempoRestante <= 0) {
        clearInterval(temporizadorInterval);
        temporizadorDisplay.textContent = "00:00";
        reproducirBeep();
        temporizadorActivo = false;
      } else {
        actualizarTemporizadorDisplay();
      }
    }, 1000);
  }
};

temporizadorBotones[1].onclick = function () { // Pausar
  if (temporizadorActivo) {
    clearInterval(temporizadorInterval);
    temporizadorActivo = false;
  }
};

temporizadorBotones[2].onclick = function () { // Reiniciar
  clearInterval(temporizadorInterval);
  temporizadorActivo = false;
  tiempoRestante = 0;
  temporizadorDisplay.textContent = "00:00";
};

function actualizarTemporizadorDisplay() {
  const totalSegundos = Math.floor(tiempoRestante / 1000);
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  temporizadorDisplay.textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}
