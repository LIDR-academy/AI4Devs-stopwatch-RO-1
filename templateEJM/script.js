/**
 * Timer and Countdown Application
 * 
 * This script implements both a stopwatch and countdown timer functionality
 * with a modern, user-friendly interface.
 * 
 * Features:
 * - Stopwatch with hours, minutes, seconds, and milliseconds
 * - Countdown timer with number pad for time input
 * - Audio alert when countdown reaches zero
 * - Responsive design with intuitive navigation
 */

// DOM Elements
const views = {
    homepage: document.getElementById('homepage'),
    stopwatch: document.getElementById('stopwatch-view'),
    countdown: document.getElementById('countdown-view')
};

// Stopwatch elements
const stopwatchElements = {
    hours: document.getElementById('stopwatch-hours'),
    minutes: document.getElementById('stopwatch-minutes'),
    seconds: document.getElementById('stopwatch-seconds'),
    milliseconds: document.getElementById('stopwatch-milliseconds'),
    startBtn: document.getElementById('stopwatch-start'),
    stopBtn: document.getElementById('stopwatch-stop'),
    resumeBtn: document.getElementById('stopwatch-resume'),
    clearBtn: document.getElementById('stopwatch-clear'),
    backBtn: document.getElementById('stopwatch-back')
};

// Countdown elements
const countdownElements = {
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds'),
    milliseconds: document.getElementById('countdown-milliseconds'),
    startBtn: document.getElementById('countdown-start'),
    clearBtn: document.getElementById('countdown-clear'),
    backBtn: document.getElementById('countdown-back'),
    setBtn: document.getElementById('countdown-set'),
    clearSetupBtn: document.getElementById('countdown-clear-setup'),
    setup: document.getElementById('countdown-setup'),
    controls: document.getElementById('countdown-controls'),
    numpadBtns: document.querySelectorAll('.btn-numpad')
};

// Audio element for countdown completion
const alertSound = document.getElementById('alert-sound');

// Homepage navigation elements
const stopwatchOption = document.getElementById('stopwatch-option');
const countdownOption = document.getElementById('countdown-option');

/**
 * Timer state and utilities
 */
const stopwatch = {
    running: false,
    startTime: 0,
    elapsedTime: 0,
    interval: null,
    
    // Starts the stopwatch
    start() {
        if (!this.running) {
            this.running = true;
            this.startTime = Date.now() - this.elapsedTime;
            this.interval = setInterval(() => this.update(), 10);
            
            // Update UI
            if (stopwatchElements.startBtn) {
                stopwatchElements.startBtn.style.display = 'none';
            }
            if (stopwatchElements.stopBtn) {
                stopwatchElements.stopBtn.style.display = 'inline-block';
            }
            if (stopwatchElements.resumeBtn) {
                stopwatchElements.resumeBtn.style.display = 'none';
            }
        }
    },
    
    // Stops the stopwatch without resetting
    stop() {
        if (this.running) {
            this.running = false;
            clearInterval(this.interval);
            
            // Update UI
            if (stopwatchElements.stopBtn) {
                stopwatchElements.stopBtn.style.display = 'none';
            }
            if (stopwatchElements.resumeBtn) {
                stopwatchElements.resumeBtn.style.display = 'inline-block';
            }
        }
    },
    
    // Resumes the stopwatch from the current time
    resume() {
        this.start();
    },
    
    // Resets the stopwatch to zero
    reset() {
        this.running = false;
        clearInterval(this.interval);
        this.elapsedTime = 0;
        this.updateDisplay();
        
        // Update UI
        if (stopwatchElements.startBtn) {
            stopwatchElements.startBtn.style.display = 'inline-block';
        }
        if (stopwatchElements.stopBtn) {
            stopwatchElements.stopBtn.style.display = 'none';
        }
        if (stopwatchElements.resumeBtn) {
            stopwatchElements.resumeBtn.style.display = 'none';
        }
    },
    
    // Updates the stopwatch display
    update() {
        this.elapsedTime = Date.now() - this.startTime;
        this.updateDisplay();
    },
    
    // Formats and displays the elapsed time
    updateDisplay() {
        const { hours, minutes, seconds, milliseconds } = formatTime(this.elapsedTime);
        
        if (stopwatchElements.hours) {
            stopwatchElements.hours.textContent = padZero(hours, 2);
        }
        if (stopwatchElements.minutes) {
            stopwatchElements.minutes.textContent = padZero(minutes, 2);
        }
        if (stopwatchElements.seconds) {
            stopwatchElements.seconds.textContent = padZero(seconds, 2);
        }
        if (stopwatchElements.milliseconds) {
            stopwatchElements.milliseconds.textContent = padZero(milliseconds, 3);
        }
    }
};

const countdown = {
    running: false,
    endTime: 0,
    remainingTime: 0,
    originalTime: 0,
    interval: null,
    setupMode: true,
    setupValues: [],
    alertPlayed: false,
    
    // Starts or pauses the countdown
    toggle() {
        if (this.running) {
            this.pause();
        } else {
            this.start();
        }
    },
    
    // Starts the countdown
    start() {
        if (!this.running && this.remainingTime > 0) {
            this.running = true;
            this.endTime = Date.now() + this.remainingTime;
            this.interval = setInterval(() => this.update(), 10);
            countdownElements.startBtn.textContent = 'Pause';
            countdownElements.startBtn.classList.add('pause');
            countdownElements.setup.style.display = 'none';
            countdownElements.controls.style.display = 'flex';
        }
    },
    
    // Pauses the countdown
    pause() {
        if (this.running) {
            this.running = false;
            clearInterval(this.interval);
            this.remainingTime = this.endTime - Date.now();
            countdownElements.startBtn.textContent = 'Start';
            countdownElements.startBtn.classList.remove('pause');
        }
    },
    
    // Resets the countdown to the last set time
    reset() {
        this.pause();
        this.remainingTime = 0;
        this.originalTime = 0;
        this.enterSetupMode();
        this.updateDisplay();
        this.alertPlayed = false;
        this.stopAlertSound();
    },
    
    // Updates the countdown display and checks for completion
    update() {
        this.remainingTime = Math.max(0, this.endTime - Date.now());
        this.updateDisplay();
        
        // Check if countdown finished
        if (this.remainingTime === 0) {
            this.finish();
        } else if (this.remainingTime <= 6000) {
            // Add visual indication when almost finished
            countdownElements.hours.classList.add('timer-ending');
            countdownElements.minutes.classList.add('timer-ending');
            countdownElements.seconds.classList.add('timer-ending');
            // Reproducir sonido si no se ha hecho y el tiempo original es mayor o igual a 6 segundos
            if (!this.alertPlayed && this.originalTime >= 6000) {
                this.playAlertSound();
                this.alertPlayed = true;
            }
        }
    },
    
    // Formats and displays the remaining time
    updateDisplay() {
        const { hours, minutes, seconds, milliseconds } = formatTime(this.remainingTime);
        
        countdownElements.hours.textContent = padZero(hours, 2);
        countdownElements.minutes.textContent = padZero(minutes, 2);
        countdownElements.seconds.textContent = padZero(seconds, 2);
        countdownElements.milliseconds.textContent = padZero(milliseconds, 3);
    },
    
    // Handles countdown completion
    finish() {
        this.pause();
        this.alertPlayed = false;
        countdownElements.hours.classList.add('timer-ending');
        countdownElements.minutes.classList.add('timer-ending');
        countdownElements.seconds.classList.add('timer-ending');
        
        // Reset the display after a delay
        setTimeout(() => {
            countdownElements.hours.classList.remove('timer-ending');
            countdownElements.minutes.classList.remove('timer-ending');
            countdownElements.seconds.classList.remove('timer-ending');
            this.enterSetupMode();
        }, 3000);
    },
    
    // Plays the alert sound
    playAlertSound() {
        if (alertSound) {
            alertSound.currentTime = 0;
            alertSound.play().catch(error => {
                console.warn('Could not play sound:', error);
            });
        }
    },
    
    // Detiene el sonido de alerta
    stopAlertSound() {
        if (alertSound) {
            alertSound.pause();
            alertSound.currentTime = 0;
        }
    },
    
    // Enters setup mode for the countdown
    enterSetupMode() {
        this.setupMode = true;
        this.setupValues = [];
        if (countdownElements.setup) {
            countdownElements.setup.style.display = 'block';
        }
        if (countdownElements.controls) {
            countdownElements.controls.style.display = 'none';
        }
        if (countdownElements.hours) countdownElements.hours.classList.remove('timer-ending');
        if (countdownElements.minutes) countdownElements.minutes.classList.remove('timer-ending');
        if (countdownElements.seconds) countdownElements.seconds.classList.remove('timer-ending');
        this.updateSetupDisplay();
        this.remainingTime = 0;
        this.originalTime = 0;
        this.alertPlayed = false;
        this.stopAlertSound();
    },
    
    // Adds a number to the setup sequence
    addSetupValue(value) {
        if (this.setupValues.length < 6) {
            this.setupValues.push(value);
            this.updateSetupDisplay();
        }
    },
    
    // Clears the current setup values
    clearSetupValues() {
        this.setupValues = [];
        this.updateSetupDisplay();
    },
    
    // Updates the display based on current setup values
    updateSetupDisplay() {
        const padded = Array(6).fill(0);
        
        // Fill from right to left
        for (let i = 0; i < this.setupValues.length; i++) {
            padded[padded.length - this.setupValues.length + i] = this.setupValues[i];
        }
        
        countdownElements.hours.textContent = `${padded[0]}${padded[1]}`;
        countdownElements.minutes.textContent = `${padded[2]}${padded[3]}`;
        countdownElements.seconds.textContent = `${padded[4]}${padded[5]}`;
        countdownElements.milliseconds.textContent = '000';
    },
    
    // Sets the countdown based on the current setup values
    setCountdown() {
        // Siempre sobrescribe los valores previos
        this.remainingTime = 0;
        this.originalTime = 0;
        if (this.setupValues.length === 0) {
            return;
        }
        // Pad the array to 6 digits, filling from the right
        const padded = Array(6).fill(0);
        for (let i = 0; i < this.setupValues.length; i++) {
            padded[5 - i] = this.setupValues[this.setupValues.length - 1 - i];
        }
        const hours = parseInt(`${padded[0]}${padded[1]}`);
        const minutes = parseInt(`${padded[2]}${padded[3]}`);
        const seconds = parseInt(`${padded[4]}${padded[5]}`);
        // Calculate total milliseconds
        this.remainingTime = 
            (hours * 60 * 60 * 1000) + 
            (minutes * 60 * 1000) + 
            (seconds * 1000);
        this.originalTime = this.remainingTime;
        // Clear setup values after setting
        this.setupValues = [];
        if (this.remainingTime > 0) {
            this.setupMode = false;
            if (countdownElements.setup) {
                countdownElements.setup.style.display = 'none';
            }
            if (countdownElements.controls) {
                countdownElements.controls.style.display = 'flex';
            }
            this.updateDisplay();
        }
    }
};

/**
 * Helper functions
 */

// Formats a time in milliseconds to hours, minutes, seconds, milliseconds
function formatTime(timeInMs) {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    
    const hours = totalHours;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((timeInMs % 1000) / 10);
    
    return { hours, minutes, seconds, milliseconds };
}

// Adds leading zeros to a number
function padZero(number, length) {
    return number.toString().padStart(length, '0');
}

// Shows a specific view and hides others
function showView(viewName) {
    console.log(`Showing view: ${viewName}`);
    Object.keys(views).forEach(key => {
        views[key].classList.remove('active');
    });
    
    views[viewName].classList.add('active');
}

/**
 * Event Listeners
 */

// Homepage navigation
if (stopwatchOption) {
    stopwatchOption.addEventListener('click', () => {
        console.log('Stopwatch clicked');
        showView('stopwatch');
        stopwatch.updateDisplay();
    });
} else {
    console.error('Stopwatch option element not found!');
}

if (countdownOption) {
    countdownOption.addEventListener('click', () => {
        console.log('Countdown clicked');
        showView('countdown');
        countdown.enterSetupMode();
        countdown.updateDisplay();
    });
} else {
    console.error('Countdown option element not found!');
}

// Stopwatch controls
if (stopwatchElements.startBtn) {
    stopwatchElements.startBtn.addEventListener('click', () => stopwatch.start());
    console.log('Added event listener to start button');
} else {
    console.error('Stopwatch start button not found!');
}

if (stopwatchElements.stopBtn) {
    stopwatchElements.stopBtn.addEventListener('click', () => stopwatch.stop());
    console.log('Added event listener to stop button');
} else {
    console.error('Stopwatch stop button not found!');
}

if (stopwatchElements.resumeBtn) {
    stopwatchElements.resumeBtn.addEventListener('click', () => stopwatch.resume());
    console.log('Added event listener to resume button');
} else {
    console.error('Stopwatch resume button not found!');
}

if (stopwatchElements.clearBtn) {
    stopwatchElements.clearBtn.addEventListener('click', () => stopwatch.reset());
    console.log('Added event listener to clear button');
} else {
    console.error('Stopwatch clear button not found!');
}

if (stopwatchElements.backBtn) {
    stopwatchElements.backBtn.addEventListener('click', () => {
        stopwatch.reset();
        showView('homepage');
    });
    console.log('Added event listener to back button');
} else {
    console.error('Stopwatch back button not found!');
}

// Countdown controls
if (countdownElements.startBtn) {
    countdownElements.startBtn.addEventListener('click', () => countdown.toggle());
} else {
    console.error('Countdown start button not found!');
}

if (countdownElements.clearBtn) {
    countdownElements.clearBtn.addEventListener('click', () => countdown.reset());
} else {
    console.error('Countdown clear button not found!');
}

if (countdownElements.backBtn) {
    countdownElements.backBtn.addEventListener('click', () => {
        countdown.pause();
        countdown.stopAlertSound();
        showView('homepage');
    });
} else {
    console.error('Countdown back button not found!');
}

// Countdown setup
if (countdownElements.numpadBtns && countdownElements.numpadBtns.length > 0) {
    countdownElements.numpadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const value = parseInt(btn.getAttribute('data-value'));
            countdown.addSetupValue(value);
        });
    });
} else {
    console.error('Countdown numpad buttons not found!');
}

if (countdownElements.setBtn) {
    countdownElements.setBtn.addEventListener('click', () => countdown.setCountdown());
} else {
    console.error('Countdown set button not found!');
}

if (countdownElements.clearSetupBtn) {
    countdownElements.clearSetupBtn.addEventListener('click', () => countdown.clearSetupValues());
} else {
    console.error('Countdown clear setup button not found!');
}

// Debug helper to check if elements are found
function logElementsStatus() {
    console.log('Homepage:', views.homepage);
    console.log('Stopwatch view:', views.stopwatch);
    console.log('Countdown view:', views.countdown);
    console.log('Stopwatch option:', stopwatchOption);
    console.log('Countdown option:', countdownOption);
    
    // Log stopwatch control elements
    console.log('Stopwatch Start Button:', stopwatchElements.startBtn);
    console.log('Stopwatch Stop Button:', stopwatchElements.stopBtn);
    console.log('Stopwatch Resume Button:', stopwatchElements.resumeBtn);
}

// Call debug helper on page load
window.addEventListener('load', logElementsStatus);

// Initialize displays
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Configure initial button visibility
    if (stopwatchElements.stopBtn) {
        stopwatchElements.stopBtn.style.display = 'none';
    }
    if (stopwatchElements.resumeBtn) {
        stopwatchElements.resumeBtn.style.display = 'none';
    }
    if (countdownElements.controls) {
        countdownElements.controls.style.display = 'none';
    }
    if (countdownElements.setup) {
        countdownElements.setup.style.display = 'block';
    }
    
    // Initialize displays
    if (stopwatch) {
        stopwatch.updateDisplay();
    }
    if (countdown) {
        countdown.updateDisplay();
    }
});

// Document keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Only process if we're in the relevant views
    if (views.stopwatch && views.stopwatch.classList.contains('active')) {
        if (e.key === ' ' || e.key === 'Enter') {
            if (stopwatch.running) {
                stopwatch.stop();
            } else {
                stopwatch.start();
            }
            e.preventDefault();
        } else if (e.key === 'r' || e.key === 'R') {
            stopwatch.resume();
        } else if (e.key === 'c' || e.key === 'C') {
            stopwatch.reset();
        } else if (e.key === 'Escape') {
            stopwatch.stop();
            showView('homepage');
        }
    } else if (views.countdown && views.countdown.classList.contains('active')) {
        if (countdown.setupMode) {
            if (e.key >= '0' && e.key <= '9') {
                countdown.addSetupValue(parseInt(e.key));
            } else if (e.key === 'Enter') {
                countdown.setCountdown();
            } else if (e.key === 'Backspace' || e.key === 'Delete') {
                countdown.clearSetupValues();
            }
        } else {
            if (e.key === ' ' || e.key === 'Enter') {
                countdown.toggle();
                e.preventDefault();
            } else if (e.key === 'c' || e.key === 'C') {
                countdown.reset();
            }
        }
        
        if (e.key === 'Escape') {
            countdown.pause();
            showView('homepage');
        }
    }
});

// Export objects for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stopwatch,
        countdown,
        formatTime,
        padZero
    };
}