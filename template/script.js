// script.js
document.addEventListener('DOMContentLoaded', () => {
  /* --- GESTIÓN DE PANTALLAS --- */
  const ms = id => document.getElementById(id);
  const modeSelection   = ms('mode-selection');
  const stopwatchScreen = ms('stopwatch-screen');
  const countdownScreen = ms('countdown-screen');

  function showScreen(name) {
    [modeSelection, stopwatchScreen, countdownScreen]
      .forEach(el => el.classList.remove('active'));
    if (name === 'mode-selection')      modeSelection.classList.add('active');
    else if (name === 'stopwatch')      stopwatchScreen.classList.add('active');
    else if (name === 'countdown')      countdownScreen.classList.add('active');
  }

  // botones modo
  ms('stopwatch-panel').onclick = () => showScreen('stopwatch');
  ms('countdown-panel').onclick = () => showScreen('countdown');
  document.querySelectorAll('.back-button')
          .forEach(b => b.onclick = () => showScreen('mode-selection'));

  /* --- CRONÓMETRO --- */
  let swStartTime = 0, swElapsed = 0, swInterval = null, swRunning = false;
  const swDisplay  = ms('sw-display');
  const swStartBtn = ms('sw-start');
  const swClearBtn = ms('sw-clear');

  swStartBtn.onclick = () => {
    if (!swRunning) {
      swRunning   = true;
      swStartTime = Date.now() - swElapsed;
      swInterval  = setInterval(updateSw, 10);
      swStartBtn.textContent = 'Pause';
    } else {
      swRunning = false;
      clearInterval(swInterval);
      swElapsed = Date.now() - swStartTime;
      swStartBtn.textContent = 'Start';
    }
  };

  swClearBtn.onclick = () => {
    clearInterval(swInterval);
    swRunning = false;
    swElapsed = 0;
    swStartBtn.textContent = 'Start';
    updateSw();
  };

  function updateSw() {
    swElapsed = Date.now() - swStartTime;
    swDisplay.textContent = formatTime(swElapsed);
  }

  /* --- TEMPORIZADOR --- */
  let cdInputDigits = [], cdInitial = 0, cdRemaining = 0, cdInterval = null, cdRunning = false;
  const cdDisplay  = ms('cd-display');
  const cdNumpad   = ms('cd-numpad');
  const cdControls = ms('cd-controls');
  const cdSetBtn   = ms('cd-set');
  const cdClearPad = ms('cd-clear');
  const cdStartBtn = ms('cd-start');
  const cdResetBtn = ms('cd-reset');

  // Entrada de dígitos
  document.querySelectorAll('.num-btn').forEach(btn => {
    btn.onclick = () => {
      if (cdInputDigits.length < 6) {
        cdInputDigits.push(btn.dataset.num);
        updateCdDisplayInput();
      }
    };
  });
  cdClearPad.onclick = () => {
    cdInputDigits = [];
    updateCdDisplayInput();
  };

  // Set → fija duración y muestra controles
  cdSetBtn.onclick = () => {
    if (cdInputDigits.length === 0) return;
    const s = cdInputDigits.join('').padStart(6, '0');
    const h = parseInt(s.slice(0,2),10);
    const m = parseInt(s.slice(2,4),10);
    const s2 = parseInt(s.slice(4,6),10);
    cdInitial   = ((h*60 + m)*60 + s2)*1000;
    cdRemaining = cdInitial;
    updateCdDisplay();
    cdNumpad.classList.add('hidden');
    cdControls.classList.remove('hidden');
  };

  // Start / Pause
  cdStartBtn.onclick = () => {
    if (!cdRunning) {
      cdRunning = true;
      cdStartBtn.textContent = 'Pause';
      let last = Date.now();
      cdInterval = setInterval(() => {
        const now = Date.now();
        cdRemaining -= now - last;
        last = now;
        if (cdRemaining <= 0) {
          clearInterval(cdInterval);
          cdRemaining = 0;
          updateCdDisplay();
          cdDisplay.classList.add('blink');
        } else {
          updateCdDisplay();
        }
      }, 10);
    } else {
      cdRunning = false;
      clearInterval(cdInterval);
      cdStartBtn.textContent = 'Start';
    }
  };

  // Reset → a la duración original
  cdResetBtn.onclick = () => {
    clearInterval(cdInterval);
    cdRunning    = false;
    cdRemaining  = cdInitial;
    cdStartBtn.textContent = 'Start';
    updateCdDisplay();
  };

  // Actualizar display mientras se introduce
  function updateCdDisplayInput() {
    const s = cdInputDigits.join('').padStart(6, '0');
    cdDisplay.textContent = 
      `${s.slice(0,2)}:${s.slice(2,4)}:${s.slice(4,6)} 000`;
  }
  function updateCdDisplay() {
    cdDisplay.textContent = formatTime(cdRemaining);
  }

  /* --- UTILIDADES --- */
  function formatTime(ms) {
    const msecs = ms % 1000;
    const totSec = Math.floor(ms/1000);
    const sec    = totSec % 60;
    const totMin = Math.floor(totSec/60);
    const min    = totMin % 60;
    const hrs    = Math.floor(totMin/60);
    return `${pad(hrs,2)}:${pad(min,2)}:${pad(sec,2)} ${pad(msecs,3)}`;
  }
  function pad(n, z) {
    return n.toString().padStart(z,'0');
  }

  // inicializa ambos displays
  updateSw();
  updateCdDisplayInput();
});
