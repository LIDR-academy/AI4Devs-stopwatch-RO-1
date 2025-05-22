/**
 * Advanced Timer Application
 * Professional Stopwatch and Countdown Timer
 * 
 * Features:
 * - High precision timing (millisecond accuracy)
 * - Stopwatch with lap functionality
 * - Countdown timer with audio alerts
 * - Responsive design with modern UI
 * - Input validation and error handling
 */

class AdvancedTimer {
    constructor() {
        // Timer state
        this.mode = 'stopwatch';
        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.interval = null;
        
        // Stopwatch specific
        this.laps = [];
        this.lapCounter = 1;
        
        // Countdown specific
        this.countdownDuration = 0;
        this.countdownRemaining = 0;
        this.isFinished = false;
        this.audioContext = null;
        this.finishInterval = null;
        
        // Performance optimization
        this.lastDisplayUpdate = 0;
        this.displayUpdateThreshold = 10; // Update display every 10ms
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
        this.showWelcomeAnimation();
    }
    
    /**
     * Initialize DOM element references
     */
    initializeElements() {
        // Mode selector
        this.modeInputs = document.querySelectorAll('input[name="mode"]');
        
        // Configuration elements
        this.countdownConfig = document.getElementById('countdown-config');
        this.hoursInput = document.getElementById('hours-input');
        this.minutesInput = document.getElementById('minutes-input');
        this.secondsInput = document.getElementById('seconds-input');
        this.errorMessage = document.getElementById('error-message');
        this.errorText = document.getElementById('error-text');
        
        // Display and control elements
        this.timeDisplay = document.getElementById('time-display');
        this.startStopBtn = document.getElementById('start-stop-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.lapBtn = document.getElementById('lap-btn');
        
        // Lap table elements
        this.lapTableContainer = document.getElementById('lap-table-container');
        this.lapTableBody = document.getElementById('lap-table-body');
        this.lapCount = document.getElementById('lap-count');
    }
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Mode selection
        this.modeInputs.forEach(input => {
            input.addEventListener('change', () => this.switchMode(input.value));
        });
        
        // Input validation for countdown
        [this.hoursInput, this.minutesInput, this.secondsInput].forEach(input => {
            input.addEventListener('input', (e) => this.validateInput(e.target));
            input.addEventListener('blur', (e) => this.formatInput(e.target));
            input.addEventListener('keydown', (e) => this.handleInputKeydown(e));
        });
        
        // Control buttons
        this.startStopBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.addLap());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Prevent page refresh on space bar
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && e.target === document.body) {
                e.preventDefault();
            }
        });
    }
    
    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        // Don't trigger shortcuts when typing in inputs
        if (e.target.tagName === 'INPUT') return;
        
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                this.toggleTimer();
                break;
            case 'KeyR':
                if (e.ctrlKey || e.metaKey) return; // Don't interfere with page refresh
                e.preventDefault();
                this.reset();
                break;
            case 'KeyL':
                if (this.mode === 'stopwatch' && this.isRunning) {
                    e.preventDefault();
                    this.addLap();
                }
                break;
        }
    }
    
    /**
     * Handle input keydown events
     */
    handleInputKeydown(e) {
        const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'];
        const isNumberKey = (e.key >= '0' && e.key <= '9');
        const isAllowedKey = allowedKeys.includes(e.key);
        
        if (!isNumberKey && !isAllowedKey) {
            e.preventDefault();
        }
        
        // Handle Enter key to start timer
        if (e.key === 'Enter' && this.mode === 'countdown') {
            this.toggleTimer();
        }
    }
    
    /**
     * Show welcome animation on page load
     */
    showWelcomeAnimation() {
        const elements = document.querySelectorAll('.scale-in');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'scale(0.9)';
                el.style.transition = 'all 0.5s ease-out';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'scale(1)';
                }, 50);
            }, index * 150);
        });
    }
    
    /**
     * Switch between stopwatch and countdown modes
     */
    switchMode(newMode) {
        if (this.mode === newMode) return;
        
        this.reset();
        this.mode = newMode;
        
        // Animate mode transition
        const configElement = this.countdownConfig;
        const lapElement = this.lapTableContainer;
        
        if (newMode === 'countdown') {
            // Show countdown configuration
            configElement.classList.remove('hidden');
            configElement.style.opacity = '0';
            configElement.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                configElement.style.transition = 'all 0.3s ease-out';
                configElement.style.opacity = '1';
                configElement.style.transform = 'translateY(0)';
            }, 50);
            
            // Hide lap table
            lapElement.classList.add('hidden');
        } else {
            // Hide countdown configuration
            configElement.classList.add('hidden');
            
            // Show lap table (remove hidden but don't make it visible until there are laps or mode is explicitly stopwatch)
            this.updateLapTableVisibility();
        }
        
        this.updateButtonStates();
        this.updateLapCount();
    }
    
    /**
     * Update lap table visibility based on mode and laps
     */
    updateLapTableVisibility() {
        if (this.mode === 'stopwatch') {
            // Always show the lap table in stopwatch mode
            this.lapTableContainer.classList.remove('hidden');
            this.lapTableContainer.style.opacity = '0';
            this.lapTableContainer.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                this.lapTableContainer.style.transition = 'all 0.3s ease-out';
                this.lapTableContainer.style.opacity = '1';
                this.lapTableContainer.style.transform = 'translateY(0)';
            }, 50);
        } else {
            this.lapTableContainer.classList.add('hidden');
        }
    }
    
    /**
     * Validate input fields for countdown
     */
    validateInput(input) {
        let value = input.value.replace(/\D/g, ''); // Remove non-digits
        
        // Apply maximum values
        let max = 59;
        if (input === this.hoursInput) max = 99;
        
        if (parseInt(value) > max) {
            value = max.toString();
        }
        
        input.value = value;
        
        this.hideError();
        this.updateButtonStates();
        
        // Add visual feedback
        this.addInputFeedback(input, true);
    }
    
    /**
     * Format input with leading zeros
     */
    formatInput(input) {
        if (input.value && input.value.length === 1) {
            input.value = '0' + input.value;
        }
        this.updateButtonStates();
    }
    
    /**
     * Add visual feedback to inputs
     */
    addInputFeedback(input, isValid) {
        input.classList.remove('border-red-400', 'border-green-400');
        
        if (input.value) {
            input.classList.add(isValid ? 'border-green-400' : 'border-red-400');
            
            setTimeout(() => {
                if (isValid) {
                    input.classList.remove('border-green-400');
                    input.classList.add('border-purple-300');
                }
            }, 1000);
        }
    }
    
    /**
     * Validate all countdown inputs
     */
    validateCountdownInputs() {
        const hours = parseInt(this.hoursInput.value) || 0;
        const minutes = parseInt(this.minutesInput.value) || 0;
        const seconds = parseInt(this.secondsInput.value) || 0;
        
        // Check for invalid minute/second values
        if (minutes > 59) {
            this.showError('Los minutos deben ser menores a 60');
            this.addInputFeedback(this.minutesInput, false);
            return false;
        }
        
        if (seconds > 59) {
            this.showError('Los segundos deben ser menores a 60');
            this.addInputFeedback(this.secondsInput, false);
            return false;
        }
        
        // Check if total time is zero
        if (hours === 0 && minutes === 0 && seconds === 0) {
            this.showError('Debe ingresar un tiempo válido mayor a cero');
            return false;
        }
        
        return true;
    }
    
    /**
     * Show error message with animation
     */
    showError(message) {
        this.errorText.textContent = message;
        this.errorMessage.classList.remove('hidden');
        this.errorMessage.style.opacity = '0';
        this.errorMessage.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            this.errorMessage.style.transition = 'all 0.3s ease-out';
            this.errorMessage.style.opacity = '1';
            this.errorMessage.style.transform = 'translateY(0)';
        }, 50);
    }
    
    /**
     * Hide error message
     */
    hideError() {
        this.errorMessage.style.opacity = '0';
        this.errorMessage.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            this.errorMessage.classList.add('hidden');
        }, 300);
    }
    
    /**
     * Toggle timer start/stop
     */
    toggleTimer() {
        if (this.mode === 'countdown' && this.isFinished) {
            this.finishCountdown();
            return;
        }
        
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }
    
    /**
     * Start the timer
     */
    start() {
        if (this.mode === 'countdown') {
            if (!this.validateCountdownInputs()) return;
            
            // Initialize countdown if not already set
            if (this.countdownRemaining === 0) {
                const hours = parseInt(this.hoursInput.value) || 0;
                const minutes = parseInt(this.minutesInput.value) || 0;
                const seconds = parseInt(this.secondsInput.value) || 0;
                
                this.countdownDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;
                this.countdownRemaining = this.countdownDuration;
            }
            
            this.startTime = performance.now() - (this.countdownDuration - this.countdownRemaining);
        } else {
            this.startTime = performance.now() - this.elapsedTime;
        }
        
        this.isRunning = true;
        this.interval = setInterval(() => this.updateTimer(), 10);
        this.updateButtonStates();
        this.hideError();
        
        // Add visual feedback
        this.addTimerStartFeedback();
    }
    
    /**
     * Stop the timer
     */
    stop() {
        this.isRunning = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.updateButtonStates();
    }
    
    /**
     * Reset the timer
     */
    reset() {
        this.stop();
        this.elapsedTime = 0;
        this.countdownRemaining = 0;
        this.isFinished = false;
        this.laps = [];
        this.lapCounter = 1;
        
        // Clear countdown finish effects
        if (this.finishInterval) {
            clearInterval(this.finishInterval);
            this.finishInterval = null;
        }
        
        this.timeDisplay.classList.remove('pulse-animation');
        this.updateDisplay();
        this.updateButtonStates();
        this.updateLapTable();
        this.updateLapCount();
        this.hideError();
        
        // Update lap table visibility
        this.updateLapTableVisibility();
        
        // Add visual feedback
        this.addResetFeedback();
    }
    
    /**
     * Update timer values
     */
    updateTimer() {
        const currentTime = performance.now();
        
        if (this.mode === 'stopwatch') {
            this.elapsedTime = currentTime - this.startTime;
        } else {
            const elapsed = currentTime - this.startTime;
            this.countdownRemaining = Math.max(0, this.countdownDuration - elapsed);
            
            if (this.countdownRemaining === 0 && !this.isFinished) {
                this.handleCountdownFinish();
            }
        }
        
        // Throttle display updates for performance
        if (currentTime - this.lastDisplayUpdate >= this.displayUpdateThreshold) {
            this.updateDisplay();
            this.lastDisplayUpdate = currentTime;
        }
    }
    
    /**
     * Handle countdown finish
     */
    handleCountdownFinish() {
        this.isFinished = true;
        this.stop();
        
        // Add pulsing animation
        this.timeDisplay.classList.add('pulse-animation');
        
        // Play notification sound
        this.playNotificationSound();
        
        // Show finish notification
        this.showFinishNotification();
        
        this.updateButtonStates();
    }
    
    /**
     * Play notification sound when countdown finishes
     */
    playNotificationSound() {
        try {
            // Create audio context for beep sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create beep sequence
            const beepSequence = [
                { frequency: 800, duration: 200 },
                { frequency: 1000, duration: 200 },
                { frequency: 1200, duration: 400 }
            ];
            
            let delay = 0;
            beepSequence.forEach(beep => {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(beep.frequency, audioContext.currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + beep.duration / 1000);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + beep.duration / 1000);
                }, delay);
                
                delay += beep.duration + 100;
            });
        } catch (error) {
            console.log('Audio notification not available');
        }
    }
    
    /**
     * Show finish notification
     */
    showFinishNotification() {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg z-50 transform translate-x-full transition-transform duration-500';
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-2xl">⏰</span>
                <div>
                    <div class="font-semibold">¡Tiempo terminado!</div>
                    <div class="text-sm opacity-90">La cuenta atrás ha finalizado</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(full)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
    }
    
    /**
     * Finish countdown and reset
     */
    finishCountdown() {
        this.reset();
    }
    
    /**
     * Add lap time (stopwatch mode)
     */
    addLap() {
        if (this.mode !== 'stopwatch' || !this.isRunning) return;
        
        const lapTime = this.elapsedTime;
        const lapData = {
            number: this.lapCounter++,
            time: lapTime,
            difference: this.laps.length > 0 ? lapTime - this.laps[this.laps.length - 1].time : 0
        };
        
        this.laps.push(lapData);
        
        // Ensure the lap table is visible when adding the first lap
        if (this.laps.length === 1) {
            this.updateLapTableVisibility();
        }
        
        this.updateLapTable();
        this.updateLapCount();
        
        // Add visual feedback
        this.addLapFeedback();
    }
    
    /**
     * Update lap table display
     */
    updateLapTable() {
        this.lapTableBody.innerHTML = '';
        
        // Display laps in reverse order (newest first)
        const reversedLaps = [...this.laps].reverse();
        
        reversedLaps.forEach((lap, index) => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-white/5 transition-colors duration-200';
            
            // Add animation for new entries
            if (index === 0 && this.laps.length > 0) {
                row.classList.add('scale-in');
            }
            
            const differenceFormatted = lap.difference > 0 ? 
                `+${this.formatTime(lap.difference)}` : 
                this.formatTime(Math.abs(lap.difference));
            
            const differenceClass = lap.difference > 0 ? 'text-red-300' : 'text-green-300';
            
            row.innerHTML = `
                <td class="py-4 px-6 text-white font-medium">#${lap.number}</td>
                <td class="py-4 px-6 text-purple-200 font-mono">${this.formatTime(lap.time)}</td>
                <td class="py-4 px-6 ${differenceClass} font-mono text-sm">${differenceFormatted}</td>
            `;
            
            this.lapTableBody.appendChild(row);
        });
    }
    
    /**
     * Update lap count display
     */
    updateLapCount() {
        const count = this.laps.length;
        this.lapCount.textContent = `${count} vuelta${count !== 1 ? 's' : ''} registrada${count !== 1 ? 's' : ''}`;
    }
    
    /**
     * Update display with current time
     */
    updateDisplay() {
        let timeToDisplay;
        
        if (this.mode === 'stopwatch') {
            timeToDisplay = this.elapsedTime;
        } else {
            timeToDisplay = this.countdownRemaining;
        }
        
        this.timeDisplay.textContent = this.formatTime(timeToDisplay);
    }
    
    /**
     * Format time for display
     */
    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const ms = Math.floor(milliseconds % 1000);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(3, '0')}`;
    }
    
    /**
     * Update button states and text
     */
    updateButtonStates() {
        // Start/Stop button
        if (this.mode === 'countdown' && this.isFinished) {
            this.startStopBtn.innerHTML = '<span class="mr-2">🔄</span>Nuevo';
            this.startStopBtn.className = 'px-10 py-5 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold rounded-2xl btn-hover-effect shadow-lg text-lg min-w-40';
        } else if (this.isRunning) {
            this.startStopBtn.innerHTML = '<span class="mr-2">⏸️</span>Pausar';
            this.startStopBtn.className = 'px-10 py-5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-2xl btn-hover-effect shadow-lg text-lg min-w-40';
        } else {
            this.startStopBtn.innerHTML = '<span class="mr-2">▶️</span>Comenzar';
            this.startStopBtn.className = 'px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl btn-hover-effect shadow-lg text-lg min-w-40';
        }
        
        // Lap button (only visible in stopwatch mode)
        if (this.mode === 'stopwatch') {
            this.lapBtn.classList.remove('hidden');
            this.lapBtn.disabled = !this.isRunning;
            this.lapBtn.style.opacity = this.isRunning ? '1' : '0.5';
        } else {
            this.lapBtn.classList.add('hidden');
        }
        
        // Disable start button for countdown if inputs are invalid
        if (this.mode === 'countdown' && !this.isRunning && !this.isFinished) {
            const hasValidInput = this.hasValidCountdownInput();
            this.startStopBtn.disabled = !hasValidInput;
            this.startStopBtn.style.opacity = hasValidInput ? '1' : '0.5';
        } else {
            this.startStopBtn.disabled = false;
            this.startStopBtn.style.opacity = '1';
        }
    }
    
    /**
     * Check if countdown has valid input
     */
    hasValidCountdownInput() {
        const hours = parseInt(this.hoursInput.value) || 0;
        const minutes = parseInt(this.minutesInput.value) || 0;
        const seconds = parseInt(this.secondsInput.value) || 0;
        
        return hours > 0 || minutes > 0 || seconds > 0;
    }
    
    /**
     * Add visual feedback when timer starts
     */
    addTimerStartFeedback() {
        this.startStopBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.startStopBtn.style.transform = 'scale(1)';
        }, 150);
    }
    
    /**
     * Add visual feedback when timer resets
     */
    addResetFeedback() {
        this.timeDisplay.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.timeDisplay.style.transform = 'scale(1)';
        }, 200);
    }
    
    /**
     * Add visual feedback when lap is added
     */
    addLapFeedback() {
        this.lapBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.lapBtn.style.transform = 'scale(1)';
        }, 150);
        
        // Flash effect on lap table
        this.lapTableContainer.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.5)';
        setTimeout(() => {
            this.lapTableContainer.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.3)';
        }, 300);
    }
}

// Initialize the timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedTimer();
});
