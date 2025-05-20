// ========== Constants ==========
const app = document.getElementById('app');
let stopwatchInterval = null;
let countdownInterval = null;

// ========== ROUTER ==========
const routes = {
    home: renderHome,
    stopwatch: renderStopwatch,
    countdown: renderCountdown
};

function navigateTo(route) {
    if (!routes[route]) {
        console.error(`Unknown route: ${route}`);
        return;
    }
    try {
        console.clear();
        console.log(`Navigating to: ${route}`);
        routes[route]();
    } catch (err) {
        console.error(`Error rendering route '${route}':`, err);
    }
}

// ========== HOME ==========
function renderHome() {
    app.innerHTML = `
    <h1>Timer and Countdown</h1>
    <p>This tool offers two time utilities: a stopwatch to track elapsed time and a countdown timer you can customize. Select one below:</p>
    <button class="button" id="btnStopwatch">Open Stopwatch</button>
    <button class="button secondary" id="btnCountdown">Open Countdown</button>
  `;

    document.getElementById('btnStopwatch').addEventListener('click', () => navigateTo('stopwatch'));
    document.getElementById('btnCountdown').addEventListener('click', () => navigateTo('countdown'));
}

// ========== STOPWATCH ==========
function renderStopwatch() {
    app.innerHTML = `
    <h1>Stopwatch</h1>
    <div class="timer-display" id="stopwatchDisplay">00:00:00.000</div>
    <div>
      <button class="button" id="stopwatchToggle">Start</button>
      <button class="button secondary" id="stopwatchClear">Clear</button>
    </div>
    <button class="button" id="btnBack">Back to Home</button>
  `;

    let startTime = null;
    let elapsed = 0;
    let running = false;

    const display = document.getElementById('stopwatchDisplay');
    const toggleBtn = document.getElementById('stopwatchToggle');
    const clearBtn = document.getElementById('stopwatchClear');

    const updateDisplay = () => {
        const total = elapsed + (running ? (Date.now() - startTime) : 0);
        display.textContent = formatTime(total);
    };

    toggleBtn.addEventListener('click', () => {
        try {
            if (!running) {
                // Start or continue
                startTime = Date.now();
                stopwatchInterval = setInterval(updateDisplay, 10);
                toggleBtn.textContent = elapsed ? 'Continue' : 'Pause';
                running = true;
                console.log('Stopwatch started/continued');
            } else {
                // Pause
                clearInterval(stopwatchInterval);
                elapsed += Date.now() - startTime;
                running = false;
                toggleBtn.textContent = 'Continue';
                console.log('Stopwatch paused');
            }
        } catch (e) {
            console.error('Stopwatch toggle error:', e);
        }
    });

    clearBtn.addEventListener('click', () => {
        try {
            clearInterval(stopwatchInterval);
            startTime = null;
            elapsed = 0;
            running = false;
            display.textContent = formatTime(0);
            toggleBtn.textContent = 'Start';
            console.log('Stopwatch cleared');
        } catch (e) {
            console.error('Stopwatch clear error:', e);
        }
    });

    document.getElementById('btnBack').addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        navigateTo('home');
    });
}

// ========== COUNTDOWN ==========
function renderCountdown() {
    app.innerHTML = `
    <h1>Countdown</h1>
    <div class="timer-display" id="countdownDisplay">00:00:00.000</div>
    <div class="keypad" id="keypad"></div>
    <div>
      <button class="button" id="countdownStart">Start</button>
      <button class="button secondary" id="countdownClear">Clear</button>
    </div>
    <button class="button" id="btnBack">Back to Home</button>
  `;

    const display = document.getElementById('countdownDisplay');
    const keypad = document.getElementById('keypad');
    const inputDigits = [];

    const updateDisplay = () => {
        const ms = parseDigitsToMs(inputDigits);
        display.textContent = formatTime(ms);
    };

    for (let i = 1; i <= 9; i++) {
        const btn = document.createElement('button');
        btn.textContent = i.toString();
        btn.addEventListener('click', () => {
            if (inputDigits.length < 8) {
                inputDigits.push(i);
                updateDisplay();
                console.log('Digit added:', i);
            }
        });
        keypad.appendChild(btn);
    }

    const zeroBtn = document.createElement('button');
    zeroBtn.textContent = '0';
    zeroBtn.addEventListener('click', () => {
        if (inputDigits.length < 8) {
            inputDigits.push(0);
            updateDisplay();
            console.log('Digit added: 0');
        }
    });
    keypad.appendChild(zeroBtn);

    document.getElementById('countdownStart').addEventListener('click', () => {
        try {
            const totalMs = parseDigitsToMs(inputDigits);
            if (totalMs <= 0) {
                alert('Enter a valid countdown time.');
                return;
            }
            console.log('Countdown started from', formatTime(totalMs));
            startCountdown(totalMs);
        } catch (e) {
            console.error('Countdown start error:', e);
        }
    });

    document.getElementById('countdownClear').addEventListener('click', () => {
        try {
            clearInterval(countdownInterval);
            inputDigits.length = 0;
            display.textContent = formatTime(0);
            console.log('Countdown cleared');
        } catch (e) {
            console.error('Countdown clear error:', e);
        }
    });

    document.getElementById('btnBack').addEventListener('click', () => {
        clearInterval(countdownInterval);
        navigateTo('home');
    });
}

function startCountdown(ms) {
    clearInterval(countdownInterval);
    const display = document.getElementById('countdownDisplay');
    const end = Date.now() + ms;

    countdownInterval = setInterval(() => {
        const left = end - Date.now();
        if (left <= 0) {
            display.textContent = formatTime(0);
            clearInterval(countdownInterval);
            console.log('Countdown finished');
            alert("⏰ Time's up! The countdown has finished.");
        } else {
            display.textContent = formatTime(left);
        }
    }, 10);
}

// ========== UTILS ==========
function formatTime(ms) {
    const milliseconds = ms % 1000;
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(value, length = 2) {
    return value.toString().padStart(length, '0');
}

function parseDigitsToMs(digits) {
    const padded = Array(8).fill(0);
    for (let i = 0; i < digits.length; i++) {
        padded[7 - i] = digits[digits.length - 1 - i];
    }

    const h = padded[0] * 10 + padded[1];
    const m = padded[2] * 10 + padded[3];
    const s = padded[4] * 10 + padded[5];
    const ms = (padded[6] * 100) + (padded[7] * 10); // 2 digits only

    // Wrap minutes and seconds if over 59
    const minutes = m % 60;
    const hours = h + Math.floor(m / 60);
    const seconds = s % 60;

    return ((hours * 3600 + minutes * 60 + seconds) * 1000 + ms);
}

// ========== INITIAL LOAD ==========
window.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});
