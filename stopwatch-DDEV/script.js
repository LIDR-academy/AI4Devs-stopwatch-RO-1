// DOM Elements
// Main Screen
const mainScreen = document.getElementById('main-screen');
const stopwatchOption = document.getElementById('stopwatch-option');
const countdownOption = document.getElementById('countdown-option');

// Stopwatch Screen
const stopwatchScreen = document.getElementById('stopwatch-screen');
const stopwatchDisplay = document.getElementById('stopwatch-display');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('stopwatch-start');
const lapBtn = document.getElementById('stopwatch-lap');
const clearBtn = document.getElementById('stopwatch-clear');
const lapsBody = document.getElementById('laps-body');

// Countdown Screen
const countdownScreen = document.getElementById('countdown-screen');
const countdownDisplay = document.getElementById('countdown-display');
const countdownMilliseconds = document.getElementById('countdown-milliseconds');
const setBtn = document.getElementById('set-btn');
const countdownClearBtn = document.getElementById('countdown-clear');
const numBtns = document.querySelectorAll('.num-btn');

// Back buttons
const backButtons = document.querySelectorAll('.back-button');

// Stopwatch Variables
let stopwatchInterval;
let stopwatchStartTime;
let stopwatchElapsedTime = 0;
let stopwatchRunning = false;
let lapTimes = [];
let lapCounter = 0;
let lastLapTime = 0;

// Countdown Variables
let countdownInterval;
let countdownTime = 0;
let countdownRunning = false;
let countdownInput = '';

// Navigation Functions
stopwatchOption.addEventListener('click', () => {
    mainScreen.classList.remove('active');
    stopwatchScreen.classList.add('active');
});

countdownOption.addEventListener('click', () => {
    mainScreen.classList.remove('active');
    countdownScreen.classList.add('active');
});

backButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.screen.active').classList.remove('active');
        mainScreen.classList.add('active');
    });
});

// Helpers
function formatTime(timeInMs) {
    const hours = Math.floor(timeInMs / 3600000);
    const minutes = Math.floor((timeInMs % 3600000) / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const milliseconds = timeInMs % 1000;

    return {
        formattedTime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        milliseconds: milliseconds.toString().padStart(3, '0')
    };
}

// Stopwatch Functions
function updateStopwatchDisplay() {
    const currentTime = stopwatchRunning ? Date.now() - stopwatchStartTime + stopwatchElapsedTime : stopwatchElapsedTime;
    const { formattedTime, milliseconds } = formatTime(currentTime);
    
    stopwatchDisplay.textContent = formattedTime;
    millisecondsDisplay.textContent = milliseconds;
}

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        stopwatchStartTime = Date.now();
        startBtn.textContent = 'Pause';
        startBtn.classList.remove('start-btn', 'continue-btn');
        startBtn.classList.add('pause-btn');
        lapBtn.disabled = false;
        clearBtn.disabled = false;
        
        stopwatchInterval = setInterval(updateStopwatchDisplay, 10);
    } else {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        stopwatchElapsedTime += Date.now() - stopwatchStartTime;
        startBtn.textContent = 'Continue';
        startBtn.classList.remove('pause-btn');
        startBtn.classList.add('continue-btn');
        lapBtn.disabled = true;
    }
}

function addLap() {
    if (!stopwatchRunning) return;
    
    const currentTotalTime = Date.now() - stopwatchStartTime + stopwatchElapsedTime;
    const lapTime = currentTotalTime - lastLapTime;
    lastLapTime = currentTotalTime;
    lapCounter++;
    
    const { formattedTime: totalFormatted, milliseconds: totalMs } = formatTime(currentTotalTime);
    const { formattedTime: lapFormatted, milliseconds: lapMs } = formatTime(lapTime);
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${lapCounter}</td>
        <td>${lapFormatted}.${lapMs}</td>
        <td>${totalFormatted}.${totalMs}</td>
    `;
    
    lapsBody.prepend(row);
}

function clearStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchElapsedTime = 0;
    lastLapTime = 0;
    lapCounter = 0;
    
    startBtn.textContent = 'Start';
    startBtn.classList.remove('pause-btn', 'continue-btn');
    startBtn.classList.add('start-btn');
    lapBtn.disabled = true;
    clearBtn.disabled = true;
    
    updateStopwatchDisplay();
    
    // Clear lap table
    lapsBody.innerHTML = '';
}

// Countdown Functions
function updateCountdownDisplay() {
    if (countdownInput === '') {
        countdownDisplay.textContent = '00:00:00';
        countdownMilliseconds.textContent = '000';
        return;
    }
    
    // Format the input as a time string
    const paddedInput = countdownInput.padStart(6, '0');
    const hours = paddedInput.slice(0, 2);
    const minutes = paddedInput.slice(2, 4);
    const seconds = paddedInput.slice(4, 6);
    
    countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    countdownMilliseconds.textContent = '000';
    
    // Convert to milliseconds for the countdown
    countdownTime = (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)) * 1000;
}

function startCountdown() {
    if (countdownTime <= 0 || countdownRunning) return;
    
    const endTime = Date.now() + countdownTime;
    countdownRunning = true;
    
    numBtns.forEach(btn => {
        btn.disabled = true;
    });
    
    countdownInterval = setInterval(() => {
        const remaining = endTime - Date.now();
        
        if (remaining <= 0) {
            clearInterval(countdownInterval);
            countdownRunning = false;
            countdownDisplay.textContent = '00:00:00';
            countdownMilliseconds.textContent = '000';
            
            // Flash animation for completion
            countdownDisplay.parentElement.classList.add('timer-flash');
            
            setTimeout(() => {
                countdownDisplay.parentElement.classList.remove('timer-flash');
                
                numBtns.forEach(btn => {
                    btn.disabled = false;
                });
                
                countdownInput = '';
            }, 3000);
            
            return;
        }
        
        const { formattedTime, milliseconds } = formatTime(remaining);
        countdownDisplay.textContent = formattedTime;
        countdownMilliseconds.textContent = milliseconds;
    }, 10);
}

function clearCountdown() {
    clearInterval(countdownInterval);
    countdownRunning = false;
    countdownTime = 0;
    countdownInput = '';
    
    numBtns.forEach(btn => {
        btn.disabled = false;
    });
    
    countdownDisplay.textContent = '00:00:00';
    countdownMilliseconds.textContent = '000';
    countdownDisplay.parentElement.classList.remove('timer-flash');
}

// Event Listeners
startBtn.addEventListener('click', startStopwatch);
lapBtn.addEventListener('click', addLap);
clearBtn.addEventListener('click', clearStopwatch);

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (countdownRunning) return;
        
        if (countdownInput.length < 6) {
            countdownInput += btn.textContent;
            updateCountdownDisplay();
        }
    });
});

setBtn.addEventListener('click', startCountdown);
countdownClearBtn.addEventListener('click', clearCountdown);

// Initialize displays
updateStopwatchDisplay();
updateCountdownDisplay();