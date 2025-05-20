// SOLID Principles applied:
// - Single Responsibility: Each class has a single purpose
// - Open/Closed: Classes are open for extension but closed for modification
// - Liskov Substitution: TimerInterface implementations are interchangeable
// - Interface Segregation: Specific interfaces with focused methods
// - Dependency Inversion: High-level modules depend on abstractions

// Logger Utility - Single Responsibility for logging
class Logger {
    static log(message) {
        console.log(`[${new Date().toISOString()}] ${message}`);
    }

    static error(message, error) {
        console.error(`[${new Date().toISOString()}] ERROR: ${message}`, error);
    }

    static warn(message) {
        console.warn(`[${new Date().toISOString()}] WARNING: ${message}`);
    }
}

// Interface for Timer/Stopwatch functionality
class TimerInterface {
    start() { throw new Error('Method not implemented'); }
    stop() { throw new Error('Method not implemented'); }
    reset() { throw new Error('Method not implemented'); }
    getTimeString() { throw new Error('Method not implemented'); }
}

// Observer pattern for UI updates
class UIObserver {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        if (typeof observer !== 'function') {
            throw new Error('Observer must be a function');
        }
        this.observers.push(observer);
        Logger.log('New observer subscribed');
    }

    notify(data) {
        this.observers.forEach(observer => {
            try {
                observer(data);
            } catch (error) {
                Logger.error('Error notifying observer', error);
            }
        });
    }
}

// Stopwatch implementation
class Stopwatch extends TimerInterface {
    constructor() {
        super();
        this.uiObserver = new UIObserver();
        this.reset();
        Logger.log('Stopwatch initialized');
    }

    start() {
        if (this.isRunning) {
            Logger.warn('Stopwatch already running');
            return;
        }

        Logger.log('Stopwatch started');
        this.isRunning = true;
        this.startTime = Date.now() - this.elapsedTime;
        
        this.timerInterval = setInterval(() => {
            this.elapsedTime = Date.now() - this.startTime;
            this.uiObserver.notify(this.getTimeString());
        }, 10); // Update every 10ms for smooth milliseconds
    }

    stop() {
        if (!this.isRunning) {
            Logger.warn('Stopwatch not running');
            return;
        }

        Logger.log('Stopwatch stopped');
        this.isRunning = false;
        clearInterval(this.timerInterval);
    }

    reset() {
        Logger.log('Stopwatch reset');
        if (this.isRunning) {
            this.stop();
        }
        this.elapsedTime = 0;
        this.startTime = 0;
        this.isRunning = false;
        this.uiObserver.notify(this.getTimeString());
    }

    getTimeString() {
        try {
            const milliseconds = Math.floor((this.elapsedTime % 1000));
            const seconds = Math.floor((this.elapsedTime / 1000) % 60);
            const minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
            const hours = Math.floor((this.elapsedTime / (1000 * 60 * 60)) % 100);
            
            return {
                hours: hours.toString().padStart(2, '0'),
                minutes: minutes.toString().padStart(2, '0'),
                seconds: seconds.toString().padStart(2, '0'),
                milliseconds: milliseconds.toString().padStart(3, '0')
            };
        } catch (error) {
            Logger.error('Error formatting time string', error);
            return { hours: '00', minutes: '00', seconds: '00', milliseconds: '000' };
        }
    }
}

// CountdownTimer implementation
class CountdownTimer extends TimerInterface {
    constructor() {
        super();
        this.uiObserver = new UIObserver();
        this.audioElement = document.getElementById('timer-complete-sound');
        this.reset();
        Logger.log('CountdownTimer initialized');
    }

    setDuration(hours, minutes, seconds) {
        try {
            hours = parseInt(hours) || 0;
            minutes = parseInt(minutes) || 0;
            seconds = parseInt(seconds) || 0;
            
            // Validate input values
            if (hours < 0 || minutes < 0 || seconds < 0) {
                throw new Error('Time values cannot be negative');
            }
            
            this.totalDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;
            this.remainingTime = this.totalDuration;
            this.uiObserver.notify(this.getTimeString());
            
            Logger.log(`Timer duration set to ${hours}h ${minutes}m ${seconds}s`);
            return true;
        } catch (error) {
            Logger.error('Error setting timer duration', error);
            return false;
        }
    }

    start() {
        if (this.isRunning) {
            Logger.warn('Timer already running');
            return;
        }
        
        if (this.remainingTime <= 0) {
            Logger.warn('Cannot start timer with zero duration');
            return;
        }

        Logger.log('Timer started');
        this.isRunning = true;
        this.endTime = Date.now() + this.remainingTime;
        
        this.timerInterval = setInterval(() => {
            const currentTime = Date.now();
            this.remainingTime = Math.max(0, this.endTime - currentTime);
            this.uiObserver.notify(this.getTimeString());
            
            if (this.remainingTime <= 0) {
                this.timerComplete();
            }
        }, 10); // Update every 10ms for smooth milliseconds
    }

    stop() {
        if (!this.isRunning) {
            Logger.warn('Timer not running');
            return;
        }

        Logger.log('Timer stopped');
        this.isRunning = false;
        clearInterval(this.timerInterval);
    }

    reset() {
        Logger.log('Timer reset');
        if (this.isRunning) {
            this.stop();
        }
        this.totalDuration = 0;
        this.remainingTime = 0;
        this.endTime = 0;
        this.isRunning = false;
        this.uiObserver.notify(this.getTimeString());
    }

    timerComplete() {
        Logger.log('Timer completed');
        this.stop();
        
        try {
            this.audioElement.play()
                .catch(error => Logger.error('Error playing audio', error));
        } catch (error) {
            Logger.error('Error playing completion sound', error);
        }
    }

    getTimeString() {
        try {
            const milliseconds = Math.floor((this.remainingTime % 1000));
            const seconds = Math.floor((this.remainingTime / 1000) % 60);
            const minutes = Math.floor((this.remainingTime / (1000 * 60)) % 60);
            const hours = Math.floor((this.remainingTime / (1000 * 60 * 60)) % 100);
            
            return {
                hours: hours.toString().padStart(2, '0'),
                minutes: minutes.toString().padStart(2, '0'),
                seconds: seconds.toString().padStart(2, '0'),
                milliseconds: milliseconds.toString().padStart(3, '0')
            };
        } catch (error) {
            Logger.error('Error formatting time string', error);
            return { hours: '00', minutes: '00', seconds: '00', milliseconds: '000' };
        }
    }
}

// UI Controller - Handles DOM interactions
class UIController {
    constructor() {
        // Tabs
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        // Stopwatch elements
        this.stopwatchDisplay = document.getElementById('stopwatch-display');
        this.stopwatchStartBtn = document.getElementById('stopwatch-start');
        this.stopwatchClearBtn = document.getElementById('stopwatch-clear');
        
        // Timer elements
        this.timerDisplay = document.getElementById('timer-display');
        this.timerStartBtn = document.getElementById('timer-start');
        this.timerClearBtn = document.getElementById('timer-clear');
        this.hoursInput = document.getElementById('hours');
        this.minutesInput = document.getElementById('minutes');
        this.secondsInput = document.getElementById('seconds');
        
        // Initialize models
        this.stopwatch = new Stopwatch();
        this.timer = new CountdownTimer();
        
        this.setupEventListeners();
        Logger.log('UI Controller initialized');
    }
    
    setupEventListeners() {
        try {
            // Tab switching
            this.tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.switchTab(button.dataset.tab);
                });
            });
            
            // Stopwatch controls
            this.stopwatchStartBtn.addEventListener('click', () => {
                this.toggleStopwatch();
            });
            
            this.stopwatchClearBtn.addEventListener('click', () => {
                this.stopwatch.reset();
            });
            
            // Timer controls
            this.timerStartBtn.addEventListener('click', () => {
                this.toggleTimer();
            });
            
            this.timerClearBtn.addEventListener('click', () => {
                this.resetTimerWithInputs();
            });
            
            // Timer input validation and formatting
            [this.hoursInput, this.minutesInput, this.secondsInput].forEach(input => {
                input.addEventListener('input', () => {
                    this.validateTimerInput(input);
                });
                
                input.addEventListener('blur', () => {
                    this.formatTimerInput(input);
                });
            });
            
            // Subscribe to time updates
            this.stopwatch.uiObserver.subscribe((timeData) => {
                this.updateTimeDisplay(this.stopwatchDisplay, timeData);
            });
            
            this.timer.uiObserver.subscribe((timeData) => {
                this.updateTimeDisplay(this.timerDisplay, timeData);
            });
            
            Logger.log('Event listeners set up successfully');
        } catch (error) {
            Logger.error('Error setting up event listeners', error);
        }
    }
    
    switchTab(tabId) {
        try {
            // Update tab buttons
            this.tabButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === tabId);
            });
            
            // Update tab content
            this.tabContents.forEach(content => {
                const isActive = content.id === `${tabId}-tab`;
                content.classList.toggle('active', isActive);
            });
            
            Logger.log(`Switched to ${tabId} tab`);
        } catch (error) {
            Logger.error('Error switching tabs', error);
        }
    }
    
    toggleStopwatch() {
        try {
            if (this.stopwatch.isRunning) {
                this.stopwatch.stop();
                this.stopwatchStartBtn.textContent = 'Start';
                this.stopwatchStartBtn.classList.remove('active');
            } else {
                this.stopwatch.start();
                this.stopwatchStartBtn.textContent = 'Stop';
                this.stopwatchStartBtn.classList.add('active');
            }
        } catch (error) {
            Logger.error('Error toggling stopwatch', error);
        }
    }
    
    toggleTimer() {
        try {
            if (this.timer.isRunning) {
                this.timer.stop();
                this.timerStartBtn.textContent = 'Start';
                this.timerStartBtn.classList.remove('active');
            } else {
                // If timer is not set or is at zero, set it from inputs first
                if (this.timer.remainingTime <= 0) {
                    const hours = this.hoursInput.value || 0;
                    const minutes = this.minutesInput.value || 0;
                    const seconds = this.secondsInput.value || 0;
                    
                    if (hours === 0 && minutes === 0 && seconds === 0) {
                        Logger.warn('Cannot start timer with zero duration');
                        return;
                    }
                    
                    this.timer.setDuration(hours, minutes, seconds);
                }
                
                this.timer.start();
                this.timerStartBtn.textContent = 'Stop';
                this.timerStartBtn.classList.add('active');
            }
        } catch (error) {
            Logger.error('Error toggling timer', error);
        }
    }
    
    resetTimerWithInputs() {
        try {
            this.timer.reset();
            this.timerStartBtn.textContent = 'Start';
            this.timerStartBtn.classList.remove('active');
            
            // Clear input fields
            this.hoursInput.value = '';
            this.minutesInput.value = '';
            this.secondsInput.value = '';
        } catch (error) {
            Logger.error('Error resetting timer', error);
        }
    }
    
    validateTimerInput(input) {
        try {
            let value = parseInt(input.value) || 0;
            
            // Apply min/max constraints
            if (input === this.hoursInput) {
                value = Math.min(99, Math.max(0, value));
            } else { // minutes or seconds
                value = Math.min(59, Math.max(0, value));
            }
            
            // Update input value only if it's different (avoid cursor jumping)
            if (parseInt(input.value) !== value && !isNaN(parseInt(input.value))) {
                input.value = value;
            }
        } catch (error) {
            Logger.error('Error validating timer input', error);
        }
    }
    
    formatTimerInput(input) {
        try {
            // Format to two digits when leaving the field
            if (input.value) {
                input.value = input.value.padStart(2, '0');
            }
        } catch (error) {
            Logger.error('Error formatting timer input', error);
        }
    }
    
    updateTimeDisplay(display, timeData) {
        try {
            const { hours, minutes, seconds, milliseconds } = timeData;
            display.innerHTML = `${hours}:${minutes}:${seconds}<span class="milliseconds">${milliseconds}</span>`;
        } catch (error) {
            Logger.error('Error updating time display', error);
        }
    }
}

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        const app = new UIController();
        Logger.log('Application started');
    } catch (error) {
        Logger.error('Error initializing application', error);
    }
});

// Handle visibility change to keep timer running in background
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        Logger.log('Tab visibility restored');
    } else {
        Logger.log('Tab hidden but timers will continue in background');
    }
});

// Error handling for uncaught exceptions
window.addEventListener('error', (event) => {
    Logger.error('Uncaught error', {
        message: event.message,
        source: event.filename,
        lineNo: event.lineno,
        colNo: event.colno,
        error: event.error
    });
});
