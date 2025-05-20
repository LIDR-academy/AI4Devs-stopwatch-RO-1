// script.js
(function () {
  'use strict';

  const views = {
    initial: document.getElementById('initial-view'),
    stopwatch: document.getElementById('stopwatch-view'),
    countdown: document.getElementById('countdown-view')
  };

  const displayStopwatch = document.getElementById('stopwatch-display');
  const displayCountdown = document.getElementById('countdown-display');
  let intervalId = null, startTime = null, elapsed = 0;
  let countdownTime = 0, countdownInterval = null;
  const inputDigits = [];

  // UTILIDADES
  function formatTime(ms) {
    const h = String(Math.floor(ms / 3600000)).padStart(2, '0');
    const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const msRemain = String(ms % 1000).padStart(3, '0');
    return `${h}:${m}:${s} <span class="text-2xl align-top">${msRemain}</span>`;
  }

  function showView(view) {
    Object.values(views).forEach(v => v.classList.add('hidden'));
    views[view].classList.remove('hidden');
  }

  window.goBack = function () {
    clearInterval(intervalId);
    clearInterval(countdownInterval);
    elapsed = 0;
    countdownTime = 0;
    inputDigits.length = 0;
    updateCountdownDisplay();
    displayStopwatch.innerHTML = formatTime(0);
    showView('initial');
    console.log('[INFO] Regresando al menú principal.');
  };

  // STOPWATCH
  document.getElementById('btn-stopwatch').addEventListener('click', () => {
    showView('stopwatch');
    console.log('[INFO] Modo cronómetro iniciado.');
  });

  document.getElementById('stopwatch-start').addEventListener('click', () => {
    try {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        console.log('[INFO] Cronómetro pausado.');
      } else {
        startTime = Date.now() - elapsed;
        intervalId = setInterval(() => {
          elapsed = Date.now() - startTime;
          displayStopwatch.innerHTML = formatTime(elapsed);
        }, 10);
        console.log('[INFO] Cronómetro iniciado.');
      }
    } catch (error) {
      console.error('[ERROR] Stopwatch: ', error);
    }
  });

  document.getElementById('stopwatch-clear').addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null;
    elapsed = 0;
    displayStopwatch.innerHTML = formatTime(0);
    console.log('[INFO] Cronómetro reiniciado.');
  });

  // COUNTDOWN
  document.getElementById('btn-countdown').addEventListener('click', () => {
    showView('countdown');
    updateCountdownDisplay();
    console.log('[INFO] Modo cuenta atrás iniciado.');
  });

  function updateCountdownDisplay() {
    displayCountdown.innerHTML = formatTime(countdownTime);
  }

  document.querySelectorAll('.digit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      try {
        if (inputDigits.length >= 9) return;
        inputDigits.push(e.target.textContent);
        const padded = inputDigits.join('').padStart(9, '0');
        const h = +padded.slice(0, 2);
        const m = +padded.slice(2, 4);
        const s = +padded.slice(4, 6);
        const ms = +padded.slice(6, 9);
        countdownTime = h * 3600000 + m * 60000 + s * 1000 + ms;
        updateCountdownDisplay();
        console.log(`[INFO] Digit input: ${inputDigits.join('')}`);
      } catch (err) {
        console.error('[ERROR] Digit input: ', err);
      }
    });
  });

  document.getElementById('countdown-set').addEventListener('click', () => {
    try {
      if (countdownInterval) return;
      countdownInterval = setInterval(() => {
        countdownTime -= 10;
        if (countdownTime <= 0) {
          clearInterval(countdownInterval);
          countdownTime = 0;
          alert('¡Cuenta atrás terminada!');
          console.log('[INFO] Cuenta atrás finalizada.');
        }
        updateCountdownDisplay();
      }, 10);
      console.log('[INFO] Cuenta atrás iniciada.');
    } catch (error) {
      console.error('[ERROR] Set Countdown: ', error);
    }
  });

  document.getElementById('countdown-clear').addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownTime = 0;
    inputDigits.length = 0;
    updateCountdownDisplay();
    console.log('[INFO] Cuenta atrás reiniciada.');
  });
})();
