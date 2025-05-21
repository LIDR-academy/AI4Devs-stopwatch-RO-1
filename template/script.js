document.addEventListener('DOMContentLoaded', () => {
    // --- Screen Navigation Elements ---
    const mainMenuScreen = document.getElementById('main-menu');
    const stopwatchScreen = document.getElementById('stopwatch-screen');
    const countdownScreen = document.getElementById('countdown-screen');

    const stopwatchBtn = document.getElementById('stopwatch-btn');
    const countdownBtn = document.getElementById('countdown-btn');
    const backButtons = document.querySelectorAll('.back-button');

    // --- Stopwatch Elements ---
    const swHoursSpan = document.getElementById('sw-hours');
    const swMinutesSpan = document.getElementById('sw-minutes');
    const swSecondsSpan = document.getElementById('sw-seconds');
    const swMillisecondsSpan = document.getElementById('sw-milliseconds');
    const swStartBtn = document.getElementById('sw-start-btn');
    const swPauseBtn = document.getElementById('sw-pause-btn');
    const swContinueBtn = document.getElementById('sw-continue-btn');
    const swClearBtn = document.getElementById('sw-clear-btn');

    let swInterval;
    let swElapsedTime = 0; // in milliseconds
    let swRunning = false;

    // --- Countdown Elements ---
    const cdHoursSpan = document.getElementById('cd-hours');
    const cdMinutesSpan = document.getElementById('cd-minutes');
    const cdSecondsSpan = document.getElementById('cd-seconds');
    const cdMillisecondsSpan = document.getElementById('cd-milliseconds');
    const cdNumButtons = document.querySelectorAll('.num-btn');
    const cdSetBtn = document.getElementById('cd-set-btn');
    const cdClearInputBtn = document.getElementById('cd-clear-input-btn');
    const cdStartBtn = document.getElementById('cd-start-btn');
    const cdPauseBtn = document.getElementById('cd-pause-btn');
    const cdContinueBtn = document.getElementById('cd-continue-btn');
    const cdClearRunBtn = document.getElementById('cd-clear-run-btn');

    const countdownInputSection = document.querySelector('.countdown-input-section');
    const countdownRunControls = document.querySelector('.countdown-run-controls');

    let cdInterval;
    let cdTargetTime = 0; // in milliseconds
    let cdRemainingTime = 0; // in milliseconds
    let cdInput = ''; // To store the 6 digits for HHMMSS
    let cdRunning = false;

    // --- Helper Functions ---

    function formatTime(ms) {
        let totalSeconds = Math.floor(ms / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;
        let milliseconds = ms % 1000;

        return {
            h: String(hours).padStart(2, '0'),
            m: String(minutes).padStart(2, '0'),
            s: String(seconds).padStart(2, '0'),
            ms: String(milliseconds).padStart(3, '0')
        };
    }

    function showScreen(screenToShow) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        screenToShow.classList.add('active');
    }

    // --- Navigation Logic ---

    stopwatchBtn.addEventListener('click', () => {
        showScreen(stopwatchScreen);
        resetStopwatch(); // Ensure stopwatch is reset when entering
    });

    countdownBtn.addEventListener('click', () => {
        showScreen(countdownScreen);
        resetCountdown(); // Ensure countdown is reset when entering
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            showScreen(mainMenuScreen);
            // Optionally reset timers when returning to main menu
            resetStopwatch();
            resetCountdown();
        });
    });

    // --- Stopwatch Logic ---

    function updateStopwatchDisplay() {
        const { h, m, s, ms } = formatTime(swElapsedTime);
        swHoursSpan.textContent = h;
        swMinutesSpan.textContent = m;
        swSecondsSpan.textContent = s;
        swMillisecondsSpan.textContent = ms;
    }

    function startStopwatch() {
        if (!swRunning) {
            swRunning = true;
            let startTime = Date.now() - swElapsedTime;
            swInterval = setInterval(() => {
                swElapsedTime = Date.now() - startTime;
                updateStopwatchDisplay();
            }, 10); // Update every 10 milliseconds for smooth milliseconds display

            swStartBtn.classList.add('hidden');
            swPauseBtn.classList.remove('hidden');
            swContinueBtn.classList.add('hidden');
        }
    }

    function pauseStopwatch() {
        if (swRunning) {
            swRunning = false;
            clearInterval(swInterval);
            swPauseBtn.classList.add('hidden');
            swContinueBtn.classList.remove('hidden');
            swStartBtn.classList.add('hidden'); // Ensure start button remains hidden
        }
    }

    function resetStopwatch() {
        clearInterval(swInterval);
        swRunning = false;
        swElapsedTime = 0;
        updateStopwatchDisplay();
        swStartBtn.classList.remove('hidden');
        swPauseBtn.classList.add('hidden');
        swContinueBtn.classList.add('hidden');
    }

    swStartBtn.addEventListener('click', startStopwatch);
    swPauseBtn.addEventListener('click', pauseStopwatch);
    swContinueBtn.addEventListener('click', startStopwatch); // Continue is the same as start logic
    swClearBtn.addEventListener('click', resetStopwatch);

    // --- Countdown Logic ---

    function updateCountdownDisplay() {
        const { h, m, s, ms } = formatTime(cdRemainingTime);
        cdHoursSpan.textContent = h;
        cdMinutesSpan.textContent = m;
        cdSecondsSpan.textContent = s;
        cdMillisecondsSpan.textContent = ms;

        if (cdRemainingTime <= 0) {
            clearInterval(cdInterval);
            cdRunning = false;
            cdRemainingTime = 0; // Ensure it doesn't go negative
            updateCountdownDisplay(); // Update display to 00:00:00.000
            alert("Countdown Finished!"); // Simple notification
            resetCountdown(); // Go back to input state
        }
    }

    function parseCountdownInput() {
        let inputString = cdInput.padStart(6, '0'); // Ensure 6 digits, pad with zeros if less
        let hours = parseInt(inputString.substring(0, 2), 10);
        let minutes = parseInt(inputString.substring(2, 4), 10);
        let seconds = parseInt(inputString.substring(4, 6), 10);

        // Handle overflow for minutes and seconds
        if (seconds >= 60) {
            minutes += Math.floor(seconds / 60);
            seconds %= 60;
        }
        if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes %= 60;
        }

        cdTargetTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
        cdRemainingTime = cdTargetTime;
        updateCountdownDisplay();
    }

    function startCountdown() {
        if (!cdRunning && cdRemainingTime > 0) {
            cdRunning = true;
            let startTime = Date.now();
            let startRemainingTime = cdRemainingTime;

            cdInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                cdRemainingTime = startRemainingTime - elapsed;

                if (cdRemainingTime <= 0) {
                    cdRemainingTime = 0;
                    clearInterval(cdInterval);
                    cdRunning = false;
                    updateCountdownDisplay();
                    alert("Countdown Finished!");
                    resetCountdown(); // Reset to input state
                } else {
                    updateCountdownDisplay();
                }
            }, 10);

            cdStartBtn.classList.add('hidden');
            cdPauseBtn.classList.remove('hidden');
            cdContinueBtn.classList.add('hidden');
        }
    }

    function pauseCountdown() {
        if (cdRunning) {
            cdRunning = false;
            clearInterval(cdInterval);
            cdPauseBtn.classList.add('hidden');
            cdContinueBtn.classList.remove('hidden');
            cdStartBtn.classList.add('hidden'); // Keep start hidden
        }
    }

    function resetCountdown() {
        clearInterval(cdInterval);
        cdRunning = false;
        cdInput = '';
        cdTargetTime = 0;
        cdRemainingTime = 0;
        updateCountdownDisplay(); // Display 00:00:00.000

        // Show input section, hide run controls
        countdownInputSection.classList.remove('hidden');
        countdownRunControls.classList.add('hidden');

        // Reset buttons for initial state
        cdStartBtn.classList.remove('hidden'); // Show start button
        cdPauseBtn.classList.add('hidden');
        cdContinueBtn.classList.add('hidden');
    }

    // Number button input for countdown
    cdNumButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (cdInput.length < 6) { // Max 6 digits (HHMMSS)
                cdInput += e.target.textContent;
                // Temporarily display input for user feedback (optional)
                const tempSeconds = parseInt(cdInput.slice(-2) || '0', 10);
                const tempMinutes = parseInt(cdInput.slice(-4, -2) || '0', 10);
                const tempHours = parseInt(cdInput.slice(-6, -4) || '0', 10);

                cdHoursSpan.textContent = String(tempHours).padStart(2, '0');
                cdMinutesSpan.textContent = String(tempMinutes).padStart(2, '0');
                cdSecondsSpan.textContent = String(tempSeconds).padStart(2, '0');
                cdMillisecondsSpan.textContent = '000'; // Always 000 when setting
            }
        });
    });

    cdSetBtn.addEventListener('click', () => {
        if (cdInput.length > 0) {
            parseCountdownInput();
            // Hide input section, show run controls
            countdownInputSection.classList.add('hidden');
            countdownRunControls.classList.remove('hidden');
            cdStartBtn.classList.remove('hidden'); // Ensure Start button is visible
            cdPauseBtn.classList.add('hidden');
            cdContinueBtn.classList.add('hidden');
        } else {
            alert("Please enter a time first using the number buttons.");
        }
    });

    cdClearInputBtn.addEventListener('click', () => {
        cdInput = '';
        cdTargetTime = 0;
        cdRemainingTime = 0;
        updateCountdownDisplay(); // Reset display to 00:00:00.000
    });

    cdStartBtn.addEventListener('click', startCountdown);
    cdPauseBtn.addEventListener('click', pauseCountdown);
    cdContinueBtn.addEventListener('click', startCountdown); // Continue is the same as start logic
    cdClearRunBtn.addEventListener('click', resetCountdown);
});