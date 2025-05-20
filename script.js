let stopwatchInterval;
let countdownInterval;
let startTime;
let elapsedTime = 0;
let remainingTime = 0;
let inputBuffer = "";
let digitCount = 0;
let isCountdownSet = false;
let isCountingDown = false;

const appState = {
    currentView: 'main',
    countdownTime: { hours: 0, minutes: 0, seconds: 0 }
};

function pad(num, size) {
    return num.toString().padStart(size, '0');
}

// Main menu functions (no changes)
function showMainMenu() {
    const mainMenuHTML = `
        <div class="main-menu">
            <div class="option" onclick="showCountdown()">
                <div class="tool-title">Countdown</div>
                <img width="48" height="48" src="https://img.icons8.com/color/48/timer--v1.png" alt="countdown"/>
            </div>
            <div class="option" onclick="showStopwatch()">
                <div class="tool-title">Stopwatch</div>
                <img width="40" height="40" src="https://img.icons8.com/office/40/timer.png" alt="stopwatch"/>
            </div>
        </div>
        <button onclick="copyHTML()" style="margin-top: 1rem;">Copy HTML Code</button>
        <div class="instructions">
            <strong>Welcome to Time Tools Pro!</strong><br>
            • Choose <strong>Countdown</strong> to set custom timers<br>
            • Choose <strong>Stopwatch</strong> to measure elapsed time<br>
            • Use the copy button to save your configuration
        </div>
    `;
    document.getElementById('mainContainer').innerHTML = mainMenuHTML;
}

// Stopwatch functions (no changes)
function showStopwatch() {
    const stopwatchHTML = `
        <div class="stopwatch-container">
            <div class="tool-title">Stopwatch</div>
            <div class="time-display">
                <span id="stopwatchHours" class="time-part">00</span>:
                <span id="stopwatchMinutes" class="time-part">00</span>:
                <span id="stopwatchSeconds" class="time-part">00</span>
            </div>
            <div class="controls">
                <button onclick="toggleStopwatch()" id="stopwatchControl">Start</button>
                <button onclick="resetStopwatch()">Reset</button>
                <button onclick="showMainMenu()">Back</button>
            </div>
            <div class="instructions">
                <strong>Stopwatch Controls:</strong><br>
                • <strong>Start/Stop:</strong> Toggle timing<br>
                • <strong>Reset:</strong> Reset to zero position<br>
                • <strong>Back:</strong> Return to main menu
            </div>
        </div>
    `;
    document.getElementById('mainContainer').innerHTML = stopwatchHTML;
}

function toggleStopwatch() {
    const button = document.getElementById('stopwatchControl');
    if (button.textContent === 'Start') {
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        button.textContent = 'Stop';
    } else {
        clearInterval(stopwatchInterval);
        elapsedTime = Date.now() - startTime;
        button.textContent = 'Start';
    }
}

function updateStopwatch() {
    const elapsed = Date.now() - startTime;
    const seconds = Math.floor(elapsed / 1000) % 60;
    const minutes = Math.floor(elapsed / 60000) % 60;
    const hours = Math.floor(elapsed / 3600000);

    document.getElementById('stopwatchHours').textContent = pad(hours, 2);
    document.getElementById('stopwatchMinutes').textContent = pad(minutes, 2);
    document.getElementById('stopwatchSeconds').textContent = pad(seconds, 2);
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    document.getElementById('stopwatchHours').textContent = '00';
    document.getElementById('stopwatchMinutes').textContent = '00';
    document.getElementById('stopwatchSeconds').textContent = '00';
    document.getElementById('stopwatchControl').textContent = 'Start';
}

// Countdown functions
function showCountdown() {
    inputBuffer = "";
    digitCount = 0;
    isCountdownSet = false;
    isCountingDown = false;
    const countdownHTML = `
        <div class="countdown-container">
            <div class="tool-title">Countdown</div>
            <div class="time-display-countdown">
                <span id="countdownDisplay" class="time-part">00:00:00</span>
            </div>
            <div class="controls">
                <input type="text" id="hours" value="00" readonly placeholder="HH">
                <span>:</span>
                <input type="text" id="minutes" value="00" readonly placeholder="MM">
                <span>:</span>
                <input type="text" id="seconds" value="00" readonly placeholder="SS">
            </div>
            <div class="keypad">
                ${[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map(num =>
                    num === 0 ?
                    `<button style="grid-column: 2" onclick="addDigit(${num})">${num}</button>` :
                    `<button onclick="addDigit(${num})">${num}</button>`
                ).join('')}
            </div>
            <div class="controls">
                <button onclick="setCountdown()" id="setBtn">Set</button>
                <button onclick="startCountdown()" id="startBtn" disabled>Start</button>
                <button onclick="clearCountdown()">Clear</button>
                <button onclick="showMainMenu()">Back</button>
            </div>
            <div class="quick-set">
                <button onclick="quickSetTime(24, 0, 0)">24 hours</button>
                <button onclick="quickSetTime(1, 0, 0)">60 minutes</button>
                <button onclick="quickSetTime(0, 30, 0)">30 minutes</button>
                <button onclick="quickSetTime(0, 1, 0)">60 seconds</button>
                <button onclick="quickSetTime(0, 0, 30)">30 seconds</button>
            </div>
            <div class="instructions">
                <strong>Countdown Instructions:</strong><br>
                • Enter digits from left to right (HH-MM-SS)<br>
                • Max 6 digits<br>
                • Invalid values auto-correct on SET<br>
                • Example: Entering 6, then 8, then 7, then 9, then 6, then 5 will set 68:79:65<br>
                <strong>Quick Set:</strong><br>
                • Use these buttons to quickly set common countdown times.
            </div>
            <div id="countdownMessage" class="message"></div>
        </div>
    `;
    document.getElementById('mainContainer').innerHTML = countdownHTML;
    document.getElementById('setBtn').disabled = false; // Enable Set button initially
    document.getElementById('startBtn').disabled = true; // Initially disable Start button
    updateCountdownDisplay(); // Initial display
}

function addDigit(num) {
    if (digitCount < 6) {
        inputBuffer += num; // Append the new digit
        digitCount++;
        updateCountdownDisplay();
        document.getElementById('setBtn').disabled = false; // Enable Set after any digit input
    } else {
        document.getElementById('countdownMessage').textContent = "Max 6 digits entered";
        setTimeout(() => {
            document.getElementById('countdownMessage').textContent = "";
        }, 2000);
    }
}

function updateCountdownDisplay() {
    const padded = inputBuffer.padStart(6, '0');
    const hours = padded.slice(0, 2);
    const minutes = padded.slice(2, 4);
    const seconds = padded.slice(4, 6);

    document.getElementById('hours').value = hours;
    document.getElementById('minutes').value = minutes;
    document.getElementById('seconds').value = seconds;
    document.getElementById('countdownDisplay').textContent = `${hours}:${minutes}:${seconds}`;
}

function setCountdown() {
    let hours = parseInt(document.getElementById('hours').value) || 0;
    let minutes = parseInt(document.getElementById('minutes').value) || 0;
    let seconds = parseInt(document.getElementById('seconds').value) || 0;

    // Normalize time
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;

    appState.countdownTime = { hours, minutes, seconds };
    document.getElementById('hours').value = pad(hours, 2);
    document.getElementById('minutes').value = pad(minutes, 2);
    document.getElementById('seconds').value = pad(seconds, 2);
    document.getElementById('countdownDisplay').textContent = `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
    isCountdownSet = true;
    document.getElementById('startBtn').disabled = (hours === 0 && minutes === 0 && seconds === 0);
    document.getElementById('countdownMessage').textContent = "";
}

function startCountdown() {
    if (isCountingDown) {
        clearInterval(countdownInterval);
        isCountingDown = false;
        document.getElementById('startBtn').textContent = 'Start';
        document.getElementById('setBtn').disabled = false; // Re-enable Set button
        return;
    }

    let hours = parseInt(document.getElementById('hours').value);
    let minutes = parseInt(document.getElementById('minutes').value);
    let seconds = parseInt(document.getElementById('seconds').value);
    remainingTime = hours * 3600 + minutes * 60 + seconds;

    if (remainingTime <= 0) {
        document.getElementById('countdownDisplay').textContent = "00:00:00";
        return;
    }

    isCountingDown = true;
    document.getElementById('startBtn').textContent = 'Stop';
    document.getElementById('startBtn').disabled = false; // Ensure Start is enabled
    document.getElementById('setBtn').disabled = true; // Disable Set during countdown

    countdownInterval = setInterval(() => {
        remainingTime--;
        if (remainingTime < 0) {
            clearInterval(countdownInterval);
            isCountingDown = false;
            document.getElementById('countdownDisplay').textContent = "00:00:00";
            document.getElementById('startBtn').textContent = 'Start';
            document.getElementById('setBtn').disabled = false; // Re-enable Set button
            return;
        }

        const displayHours = Math.floor(remainingTime / 3600);
        const displayMinutes = Math.floor((remainingTime % 3600) / 60);
        const displaySeconds = remainingTime % 60;

        document.getElementById('countdownDisplay').textContent = `${pad(displayHours, 2)}:${pad(displayMinutes, 2)}:${pad(displaySeconds, 2)}`;
    }, 1000);
}

function clearCountdown() {
    inputBuffer = "";
    digitCount = 0;
    isCountdownSet = false;
    isCountingDown = false;
    clearInterval(countdownInterval); // Clear any running countdown
    document.getElementById('hours').value = "00";
    document.getElementById('minutes').value = "00";
    document.getElementById('seconds').value = "00";
    document.getElementById('countdownDisplay').textContent = "00:00:00";
    document.getElementById('setBtn').disabled = false; // Enable Set after clear
    document.getElementById('startBtn').disabled = true; // Disable Start after clear
    document.getElementById('startBtn').textContent = 'Start'; // Reset Start button text
    document.getElementById('countdownMessage').textContent = "";
}

function quickSetTime(hours, minutes, seconds) {
    inputBuffer = pad(hours, 2) + pad(minutes, 2) + pad(seconds, 2); // Set buffer for left-to-right display
    digitCount = 6;
    updateCountdownDisplay();
    document.getElementById('countdownMessage').textContent = "Time to press Set";
    document.getElementById('setBtn').disabled = false; // Enable Set after a quick set
}

function copyHTML() {
    const html = document.documentElement.outerHTML;
    navigator.clipboard.writeText(html);
    alert('HTML code copied to clipboard!');
}

// Initialize app
showMainMenu();