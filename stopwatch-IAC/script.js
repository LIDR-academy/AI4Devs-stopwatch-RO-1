(() => {
    'use strict';

    /** @typedef {'stopwatch' | 'countdown'} Mode */

    const timeDisplay = document.getElementById('time');
    const msDisplay = document.getElementById('ms');
    const startPauseBtn = document.getElementById('startPauseBtn');
    const clearBtn = document.getElementById('clearBtn');
    const modeToggle = document.getElementById('modeToggle');
    const countdownInput = document.getElementById('countdownInput');
    const setTimeInput = document.getElementById('setTime');
    const displayBox = document.querySelector('.display');

    let startTime = null;
    let elapsed = 0;
    let timerId = null;
    let running = false;
    /** @type {Mode} */
    let mode = localStorage.getItem('mode') || 'stopwatch';
    let countdownTarget = 0;
    let flashInterval = null;
    const beep = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=');

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const s = String(totalSeconds % 60).padStart(2, '0');
        const msStr = String(ms % 1000).padStart(3, '0');
        return { hms: `${h}:${m}:${s}`, ms: msStr };
    }

    function updateDisplay(ms) {
        const { hms, ms: msStr } = formatTime(ms);
        timeDisplay.textContent = hms;
        msDisplay.textContent = msStr;
    }

    function tick() {
        const now = Date.now();
        const delta = now - startTime + elapsed;
        let displayMs = delta;

        if (mode === 'countdown') {
            displayMs = Math.max(countdownTarget - delta, 0);
            if (displayMs === 0) {
                stopTimer();
                triggerCountdownEnd();
            }
        }

        updateDisplay(displayMs);
        timerId = requestAnimationFrame(tick);
    }

    function startTimer() {
        startTime = Date.now();
        running = true;
        timerId = requestAnimationFrame(tick);
        startPauseBtn.textContent = 'Pause';
    }

    function pauseTimer() {
        elapsed += Date.now() - startTime;
        running = false;
        cancelAnimationFrame(timerId);
        startPauseBtn.textContent = 'Resume';
    }

    function resetTimer() {
        cancelAnimationFrame(timerId);
        running = false;
        elapsed = 0;
        startTime = null;
        if (mode === 'countdown') {
            const input = parseInputTime(setTimeInput.value);
            countdownTarget = input || 0;
            updateDisplay(countdownTarget);
        } else {
            updateDisplay(0);
        }
        startPauseBtn.textContent = 'Start';
        displayBox.classList.remove('flash');
        clearInterval(flashInterval);
    }

    function stopTimer() {
        cancelAnimationFrame(timerId);
        running = false;
        startPauseBtn.textContent = 'Start';
    }

    function parseInputTime(str) {
        const parts = str.split(':').map(Number);
        if (parts.length !== 3) return 0;
        const [h, m, s] = parts;
        return ((h * 3600) + (m * 60) + s) * 1000;
    }

    function triggerCountdownEnd() {
        beep.play();
        displayBox.classList.add('flash');
        flashInterval = setInterval(() => {
            beep.play();
        }, 1000);
    }

    function switchMode() {
        mode = mode === 'stopwatch' ? 'countdown' : 'stopwatch';
        localStorage.setItem('mode', mode);
        resetTimer();
        if (mode === 'countdown') {
            modeToggle.textContent = 'Cambiar a Cronómetro';
            countdownInput.style.display = 'block';
        } else {
            modeToggle.textContent = 'Cambiar a Cuenta Atrás';
            countdownInput.style.display = 'none';
        }
    }

    // Event Listeners
    startPauseBtn.addEventListener('click', () => {
        if (!running) {
            if (mode === 'countdown' && elapsed === 0 && countdownTarget === 0) {
                countdownTarget = parseInputTime(setTimeInput.value);
                if (countdownTarget === 0) return alert('Introduce un tiempo válido.');
            }
            startTimer();
        } else {
            pauseTimer();
        }
    });

    clearBtn.addEventListener('click', resetTimer);
    modeToggle.addEventListener('click', switchMode);

    // Init
    switchMode();
})();
