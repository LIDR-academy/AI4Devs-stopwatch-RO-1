/**
 * Stopwatch and Countdown Application
 * Compatible with the provided index.html
 * 
 * This script implements both stopwatch and countdown functionalities
 * with a responsive design, SOLID principles, and exception handling.
 */

// IIFE to avoid polluting the global scope
(function() {
    'use strict';

    // DOM Element Service - Single Responsibility Principle
    class DOMService {
        constructor() {
            // Pages
            this.mainPage = document.getElementById('main-page');
            this.stopwatchPage = document.getElementById('stopwatch-page');
            this.countdownSetupPage = document.getElementById('countdown-setup-page');
            this.countdownPage = document.getElementById('countdown-page');
            
            // Navigation buttons
            this.gotoStopwatchBtn = document.getElementById('goto-stopwatch');
            this.gotoCountdownBtn = document.getElementById('goto-countdown');
            this.backButton = document.getElementById('back-button');
            
            // Stopwatch elements
            this.stopwatchDisplay = document.getElementById('stopwatch-display');
            this.stopwatchStartBtn = document.getElementById('stopwatch-start');
            this.stopwatchClearBtn = document.getElementById('stopwatch-clear');
            
            // Countdown setup elements
            this.countdownSetupDisplay = document.getElementById('countdown-setup-display');
            this.numPadButtons = document.querySelectorAll('.num-pad');
            this.countdownSetBtn = document.getElementById('countdown-set');
            this.countdownSetupClearBtn = document.getElementById('countdown-setup-clear');
            
            // Countdown elements
            this.countdownDisplay = document.getElementById('countdown-display');
            this.countdownStartBtn = document.getElementById('countdown-start');
            this.countdownClearBtn = document.getElementById('countdown-clear');
            
            // Audio for countdown completion
            this.alarmSound = new Audio('https://www.soundjay.com/buttons/beep-05.mp3');
        }

        showPage(pageId) {
            console.log(`Showing page: ${pageId}`);
            
            // Hide all pages
            [this.mainPage, this.stopwatchPage, this.countdownSetupPage, this.countdownPage].forEach(page => {
                if (page) page.classList.add('hidden');
            });
            
            // Show the requested page
            const pageToShow = document.getElementById(pageId);
            if (pageToShow) {
                pageToShow.classList.remove('hidden');
                // Show back button except on main page
                this.backButton.parentElement.style.display = pageId === 'main-page' ? 'none' : 'block';
            } else {
                console.error(`Page with ID ${pageId} not found!`);
            }
        }

        updateTimeDisplay(element, hours, minutes, seconds, milliseconds) {
            try {
                if (!element) {
                    console.error('Display element not found!');
                    return;
                }
                
                // Format time parts with leading zeros
                const formattedHours = hours.toString().padStart(2, '0');
                const formattedMinutes = minutes.toString().padStart(2, '0');
                const formattedSeconds = seconds.toString().padStart(2, '0');
                const formattedMilliseconds = milliseconds.toString().padStart(3, '0');
                
                // Update the display with the formatted time
                element.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}<span class="text-2xl">${formattedMilliseconds}</span>`;
            } catch (error) {
                console.error('Error updating time display:', error);
            }
        }

        setButtonText(button, text) {
            if (button) {
                button.textContent = text;
            }
        }

        startBlinkingBackground(element) {
            if (element) {
                element.classList.add('flash-animation');
            }
        }

        stopBlinkingBackground(element) {
            if (element) {
                element.classList.remove('flash-animation');
            }
        }

        playAlarmSound() {
            try {
                this.alarmSound.play();
            } catch (error) {
                console.error('Error playing alarm sound:', error);
            }
        }
    }

    // Timer Interface - Interface Segregation Principle
    class TimerInterface {
        start() {}
        pause() {}
        continue() {}
        clear() {}
        update() {}
    }

    // Stopwatch Implementation - Open/Closed Principle
    class Stopwatch extends TimerInterface {
        constructor(domService) {
            super();
            this.domService = domService;
            this.startTime = 0;
            this.elapsedTime = 0;
            this.intervalId = null;
            this.running = false;
            this.paused = false;
        }
        
        start() {
            try {
                console.log('Stopwatch started/continued');
                if (this.running && !this.paused) {
                    // Already running, so pause it
                    this.pause();
                    return;
                }
                
                if (!this.running || this.paused) {
                    if (this.paused) {
                        // Continue from paused state
                        this.startTime = Date.now() - this.elapsedTime;
                    } else {
                        // Fresh start
                        this.startTime = Date.now();
                        this.elapsedTime = 0;
                    }
                    
                    this.intervalId = setInterval(() => this.update(), 10);
                    this.running = true;
                    this.paused = false;
                    this.domService.setButtonText(this.domService.stopwatchStartBtn, 'Pause');
                }
            } catch (error) {
                console.error('Error in stopwatch start/continue:', error);
            }
        }
        
        pause() {
            try {
                console.log('Stopwatch paused');
                if (this.running && !this.paused) {
                    clearInterval(this.intervalId);
                    this.elapsedTime = Date.now() - this.startTime;
                    this.paused = true;
                    this.domService.setButtonText(this.domService.stopwatchStartBtn, 'Continue');
                }
            } catch (error) {
                console.error('Error pausing stopwatch:', error);
            }
        }
        
        continue() {
            // Just use start for simplicity since it handles continue logic already
            this.start();
        }
        
        clear() {
            try {
                console.log('Stopwatch cleared');
                clearInterval(this.intervalId);
                this.elapsedTime = 0;
                this.running = false;
                this.paused = false;
                this.domService.setButtonText(this.domService.stopwatchStartBtn, 'Start');
                this.updateDisplay();
            } catch (error) {
                console.error('Error clearing stopwatch:', error);
            }
        }
        
        update() {
            try {
                if (this.running && !this.paused) {
                    this.elapsedTime = Date.now() - this.startTime;
                }
                this.updateDisplay();
            } catch (error) {
                console.error('Error updating stopwatch:', error);
            }
        }
        
        updateDisplay() {
            // Convert elapsed time to hours, minutes, seconds, milliseconds
            const totalMilliseconds = this.elapsedTime;
            const hours = Math.floor(totalMilliseconds / 3600000);
            const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
            const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
            const milliseconds = Math.floor((totalMilliseconds % 1000));
            
            this.domService.updateTimeDisplay(
                this.domService.stopwatchDisplay,
                hours,
                minutes,
                seconds,
                milliseconds
            );
        }
    }

    // Countdown Implementation - Open/Closed Principle
    class Countdown extends TimerInterface {
        constructor(domService) {
            super();
            this.domService = domService;
            this.totalTime = 0;
            this.remainingTime = 0;
            this.startTime = 0;
            this.intervalId = null;
            this.running = false;
            this.paused = false;
            this.setupInput = '';
        }
        
        // Methods for setup phase
        handleNumPadInput(value) {
            try {
                // Only allow up to 6 digits (hhmmss)
                if (this.setupInput.length < 6) {
                    this.setupInput += value;
                    this.updateSetupDisplay();
                }
            } catch (error) {
                console.error('Error handling numpad input:', error);
            }
        }
        
        clearSetup() {
            try {
                this.setupInput = '';
                this.updateSetupDisplay();
            } catch (error) {
                console.error('Error clearing setup:', error);
            }
        }
        
        updateSetupDisplay() {
            try {
                // Convert input string to time parts with padding
                let input = this.setupInput.padStart(6, '0');
                const hours = parseInt(input.substring(0, 2)) || 0;
                const minutes = parseInt(input.substring(2, 4)) || 0;
                const seconds = parseInt(input.substring(4, 6)) || 0;
                
                this.domService.updateTimeDisplay(
                    this.domService.countdownSetupDisplay,
                    hours,
                    minutes,
                    seconds,
                    0
                );
            } catch (error) {
                console.error('Error updating setup display:', error);
            }
        }
        
        setTime() {
            try {
                if (this.setupInput === '') {
                    alert('Please enter a time for the countdown');
                    return false;
                }
                
                // Convert input string to time parts
                let input = this.setupInput.padStart(6, '0');
                const hours = parseInt(input.substring(0, 2)) || 0;
                const minutes = parseInt(input.substring(2, 4)) || 0;
                const seconds = parseInt(input.substring(4, 6)) || 0;
                
                // Calculate total time in milliseconds
                this.totalTime = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
                this.remainingTime = this.totalTime;
                
                // Reset the setup input for next time
                this.setupInput = '';
                
                console.log(`Countdown time set: ${this.totalTime}ms`);
                
                // Update countdown display
                this.updateDisplay();
                
                return true;
            } catch (error) {
                console.error('Error setting countdown time:', error);
                return false;
            }
        }
        
        // Methods for countdown phase
        start() {
            try {
                console.log('Countdown started/continued');
                if (this.running && !this.paused) {
                    // Already running, so pause it
                    this.pause();
                    return;
                }
                
                if (this.remainingTime <= 0) {
                    console.log('Cannot start: no time remaining');
                    return;
                }
                
                if (!this.running || this.paused) {
                    // Remove any blinking from previous completed countdown
                    this.domService.stopBlinkingBackground(this.domService.countdownDisplay);
                    
                    if (this.paused) {
                        // Continue from paused state
                        this.startTime = Date.now() - (this.totalTime - this.remainingTime);
                    } else {
                        // Fresh start
                        this.startTime = Date.now();
                    }
                    
                    this.intervalId = setInterval(() => this.update(), 10);
                    this.running = true;
                    this.paused = false;
                    this.domService.setButtonText(this.domService.countdownStartBtn, 'Pause');
                }
            } catch (error) {
                console.error('Error in countdown start/continue:', error);
            }
        }
        
        pause() {
            try {
                console.log('Countdown paused');
                if (this.running && !this.paused) {
                    clearInterval(this.intervalId);
                    this.remainingTime = Math.max(0, this.totalTime - (Date.now() - this.startTime));
                    this.paused = true;
                    this.domService.setButtonText(this.domService.countdownStartBtn, 'Continue');
                }
            } catch (error) {
                console.error('Error pausing countdown:', error);
            }
        }
        
        continue() {
            // Just use start for simplicity since it handles continue logic already
            this.start();
        }
        
        clear() {
            try {
                console.log('Countdown cleared');
                clearInterval(this.intervalId);
                this.remainingTime = this.totalTime;
                this.running = false;
                this.paused = false;
                this.domService.setButtonText(this.domService.countdownStartBtn, 'Start');
                this.domService.stopBlinkingBackground(this.domService.countdownDisplay);
                this.updateDisplay();
            } catch (error) {
                console.error('Error clearing countdown:', error);
            }
        }
        
        update() {
            try {
                if (this.running && !this.paused) {
                    this.remainingTime = Math.max(0, this.totalTime - (Date.now() - this.startTime));
                    
                    if (this.remainingTime <= 0) {
                        this.complete();
                    }
                }
                this.updateDisplay();
            } catch (error) {
                console.error('Error updating countdown:', error);
            }
        }
        
        updateDisplay() {
            // Convert remaining time to hours, minutes, seconds, milliseconds
            const totalMilliseconds = this.remainingTime;
            const hours = Math.floor(totalMilliseconds / 3600000);
            const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
            const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
            const milliseconds = Math.floor((totalMilliseconds % 1000));
            
            this.domService.updateTimeDisplay(
                this.domService.countdownDisplay,
                hours,
                minutes,
                seconds,
                milliseconds
            );
        }
        
        complete() {
            try {
                console.log('Countdown completed!');
                clearInterval(this.intervalId);
                this.running = false;
                this.paused = false;
                this.domService.setButtonText(this.domService.countdownStartBtn, 'Start');
                
                // Play alarm sound
                this.domService.playAlarmSound();
                
                // Start blinking background
                this.domService.startBlinkingBackground(this.domService.countdownDisplay);
            } catch (error) {
                console.error('Error completing countdown:', error);
            }
        }
    }

    // App Controller - Dependency Inversion Principle
    class AppController {
        constructor() {
            this.domService = new DOMService();
            this.stopwatch = new Stopwatch(this.domService);
            this.countdown = new Countdown(this.domService);
            
            this.initEventListeners();
            
            // Show the main page on load
            this.domService.showPage('main-page');
            this.domService.backButton.parentElement.style.display = 'none';
        }
        
        initEventListeners() {
            try {
                console.log('Initializing event listeners');
                
                // Navigation buttons
                this.domService.gotoStopwatchBtn.addEventListener('click', () => {
                    this.domService.showPage('stopwatch-page');
                    this.stopwatch.clear();
                });
                
                this.domService.gotoCountdownBtn.addEventListener('click', () => {
                    this.domService.showPage('countdown-setup-page');
                    this.countdown.clearSetup();
                });
                
                this.domService.backButton.addEventListener('click', () => {
                    this.stopwatch.clear();
                    this.countdown.clear();
                    this.domService.showPage('main-page');
                });
                
                // Stopwatch controls
                this.domService.stopwatchStartBtn.addEventListener('click', () => {
                    this.stopwatch.start();
                });
                
                this.domService.stopwatchClearBtn.addEventListener('click', () => {
                    this.stopwatch.clear();
                });
                
                // Countdown setup controls
                this.domService.numPadButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const value = button.getAttribute('data-value');
                        this.countdown.handleNumPadInput(value);
                    });
                });
                
                this.domService.countdownSetupClearBtn.addEventListener('click', () => {
                    this.countdown.clearSetup();
                });
                
                this.domService.countdownSetBtn.addEventListener('click', () => {
                    if (this.countdown.setTime()) {
                        this.domService.showPage('countdown-page');
                    }
                });
                
                // Countdown controls
                this.domService.countdownStartBtn.addEventListener('click', () => {
                    this.countdown.start();
                });
                
                this.domService.countdownClearBtn.addEventListener('click', () => {
                    this.countdown.clear();
                });
                
                // Handle page refresh - will automatically show main page due to showPage in constructor
                window.addEventListener('beforeunload', () => {
                    console.log('Page is being refreshed');
                });
                
                // Add keyboard support for countdown setup
                document.addEventListener('keydown', (event) => {
                    if (this.domService.countdownSetupPage.classList.contains('hidden')) {
                        return;
                    }
                    
                    const key = event.key;
                    
                    // Numbers 0-9
                    if (/^[0-9]$/.test(key)) {
                        this.countdown.handleNumPadInput(key);
                    } 
                    // Enter for Set
                    else if (key === 'Enter') {
                        if (this.countdown.setTime()) {
                            this.domService.showPage('countdown-page');
                        }
                    } 
                    // Backspace or Delete for Clear
                    else if (key === 'Backspace' || key === 'Delete') {
                        this.countdown.clearSetup();
                    }
                });
                
            } catch (error) {
                console.error('Error initializing event listeners:', error);
            }
        }
    }

    // Initialize the application when the DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        try {
            console.log('Initializing application...');
            const app = new AppController();
            console.log('Application initialized successfully');
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    });
})();