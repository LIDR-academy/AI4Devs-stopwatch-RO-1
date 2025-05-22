// ---------------------------------------------------
//   NAVEGACIÓN Y SONIDO
// ---------------------------------------------------
const wrapper = document.getElementById('wrapper');
const stopwatchOption = document.getElementById('stopwatchOption');
const countdownOption = document.getElementById('countdownOption');
const backButtons = document.querySelectorAll('.backBtn');

// pequeña función que dispara un beep con Web Audio API
function playBeep() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 600;
    osc.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
        osc.stop();
        ctx.close();
    }, 100);
}

// cambiar pantalla: menú → stopwatch / countdown
stopwatchOption.addEventListener('click', () => {
    playBeep();
    wrapper.classList.replace('state-menu', 'state-stopwatch');
});
countdownOption.addEventListener('click', () => {
    playBeep();
    wrapper.classList.replace('state-menu', 'state-countdown');
});
// botón “Back” vuelve a menú y resetea timers
backButtons.forEach(btn =>
    btn.addEventListener('click', () => {
        playBeep();
        resetStopwatch();
        resetCountdown();
        wrapper.className = 'wrapper state-menu';
    })
);

// ---------------------------------------------------
//    LÓGICA STOPWATCH
// ---------------------------------------------------
let swStart = document.getElementById('swStart');
let swClear = document.getElementById('swClear');
let swDisplay = document.getElementById('swDisplay');
let swInterval = null;
let swStartTime = 0;
let swElapsed = 0;
let swRunning = false;

// Start / Stop / Resume
swStart.addEventListener('click', () => {
    playBeep();
    if (!swRunning) {
        swStartTime = Date.now() - swElapsed;
        swInterval = setInterval(updateSw, 25);
        swStart.textContent = 'Stop';
        swRunning = true;
    } else {
        clearInterval(swInterval);
        swElapsed = Date.now() - swStartTime;
        swStart.textContent = 'Resume';
        swRunning = false;
    }
});

// Clear
swClear.addEventListener('click', () => {
    playBeep();
    resetStopwatch();
});

// actualizar display
function updateSw() {
    const diff = Date.now() - swStartTime;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const ms = diff % 1000;
    swDisplay.textContent =
        String(h).padStart(2, '0') + ':' +
        String(m).padStart(2, '0') + ':' +
        String(s).padStart(2, '0') + '.' +
        String(ms).padStart(3, '0');
}

// restablecer por completo
function resetStopwatch() {
    clearInterval(swInterval);
    swInterval = null;
    swElapsed = 0;
    swRunning = false;
    swStart.textContent = 'Start';
    swDisplay.textContent = '00:00:00.000';
}

// ---------------------------------------------------
//   LÓGICA COUNTDOWN
// ---------------------------------------------------
const numButtons = document.querySelectorAll('.num');
const cdSet = document.getElementById('cdSet');
const cdClearInput = document.getElementById('cdClearInput');
const cdDisplay = document.getElementById('cdDisplay');
const numpad = document.getElementById('numpad');
const cdControls = document.getElementById('cdControls');
const cdPause = document.getElementById('cdPause');
const cdReset = document.getElementById('cdReset');

let cdInput = '';
let cdTotal = 0;
let cdRemaining = 0;
let cdInterval = null;
let cdRunning = false;

// formatear mientras se ingresa
function updateCdDisplayInput() {
    const pad = cdInput.padStart(6, '0');
    const h = pad.slice(0, 2);
    const m = pad.slice(2, 4);
    const s = pad.slice(4, 6);
    cdDisplay.textContent = `${h}:${m}:${s}`;
}
updateCdDisplayInput();

// capturar dígitos
numButtons.forEach(btn => {
    btn.addEventListener('click', e => {
        playBeep();
        if (cdInput.length < 6) {
            cdInput += e.target.textContent;
            updateCdDisplayInput();
        }
    });
});

// limpiar input
cdClearInput.addEventListener('click', () => {
    playBeep();
    cdInput = '';
    updateCdDisplayInput();
});

// al hacer “Set” inicio el countdown
cdSet.addEventListener('click', () => {
    playBeep();
    if (!cdInput) return;
    const pad = cdInput.padStart(6, '0');
    const h = parseInt(pad.slice(0, 2), 10);
    const m = parseInt(pad.slice(2, 4), 10);
    const s = parseInt(pad.slice(4, 6), 10);
    cdTotal = h * 3600 + m * 60 + s;
    if (cdTotal <= 0) return;

    cdRemaining = cdTotal;
    numpad.hidden = true;
    cdControls.hidden = false;
    cdPause.textContent = 'Pause';
    cdRunning = true;
    updateCdDisplay();

    cdInterval = setInterval(() => {
        if (cdRemaining > 0) {
            cdRemaining--;
            updateCdDisplay();
        } else {
            clearInterval(cdInterval);
            playBeep();
            cdRunning = false;
        }
    }, 1000);
});

// actualizar display de countdown
function updateCdDisplay() {
    const h = Math.floor(cdRemaining / 3600);
    const m = Math.floor((cdRemaining % 3600) / 60);
    const s = cdRemaining % 60;
    cdDisplay.textContent =
        String(h).padStart(2, '0') + ':' +
        String(m).padStart(2, '0') + ':' +
        String(s).padStart(2, '0');
}

// Pause / Resume
cdPause.addEventListener('click', () => {
    playBeep();
    if (cdRunning) {
        clearInterval(cdInterval);
        cdPause.textContent = 'Resume';
        cdRunning = false;
    } else {
        cdInterval = setInterval(() => {
            if (cdRemaining > 0) {
                cdRemaining--;
                updateCdDisplay();
            } else {
                clearInterval(cdInterval);
                playBeep();
                cdRunning = false;
            }
        }, 1000);
        cdPause.textContent = 'Pause';
        cdRunning = true;
    }
});

// Reset completo
cdReset.addEventListener('click', () => {
    playBeep();
    resetCountdown();
});

function resetCountdown() {
    clearInterval(cdInterval);
    cdInterval = null;
    cdRunning = false;
    cdInput = '';
    cdTotal = 0;
    cdRemaining = 0;
    updateCdDisplayInput();
    numpad.hidden = false;
    cdControls.hidden = true;
}
