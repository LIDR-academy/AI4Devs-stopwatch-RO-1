document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startBtn = document.getElementById('startBtn');
    const clearBtn = document.getElementById('clearBtn');
    const modeSelector = document.getElementById('modeSelector');

    let timeInSeconds = 0;
    let isRunning = false;
    let intervalId = null;
    let isCountdown = false;

    // Make display editable for countdown mode
    display.addEventListener('click', () => {
        if (modeSelector.value === 'countdown' && !isRunning) {
            const time = prompt('Enter time in format HH:MM:SS');
            if (time && /^\d{2}:\d{2}:\d{2}$/.test(time)) {
                const [hours, minutes, seconds] = time.split(':').map(Number);
                timeInSeconds = hours * 3600 + minutes * 60 + seconds;
                updateDisplay();
            }
        }
    });

    // Handle mode changes
    modeSelector.addEventListener('change', () => {
        resetTimer();
        isCountdown = modeSelector.value === 'countdown';
        display.style.cursor = isCountdown ? 'pointer' : 'default';
    });

    // Format time to HH:MM:SS
    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Update display
    function updateDisplay() {
        display.textContent = formatTime(timeInSeconds);
    }

    // Start/Pause timer
    function toggleTimer() {
        if (!isRunning) {
            // Start timer
            if (isCountdown && timeInSeconds === 0) {
                alert('Please set a time first');
                return;
            }
            isRunning = true;
            startBtn.textContent = 'Pause';
            startBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
            startBtn.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
            
            intervalId = setInterval(() => {
                if (isCountdown) {
                    timeInSeconds--;                    if (timeInSeconds <= 0) {
                        resetTimer();
                        celebrateCountdownEnd();
                        return;
                    }
                } else {
                    timeInSeconds++;
                }
                updateDisplay();
            }, 1000);
        } else {
            // Pause timer
            isRunning = false;
            startBtn.textContent = 'Resume';
            startBtn.classList.remove('bg-yellow-500', 'hover:bg-yellow-600');
            startBtn.classList.add('bg-green-500', 'hover:bg-green-600');
            clearInterval(intervalId);
        }
    }

    // Reset timer
    function resetTimer() {
        isRunning = false;
        timeInSeconds = 0;
        clearInterval(intervalId);
        startBtn.textContent = 'Start';
        startBtn.classList.remove('bg-yellow-500', 'hover:bg-yellow-600');
        startBtn.classList.add('bg-green-500', 'hover:bg-green-600');
        updateDisplay();
    }

    // Event listeners
    startBtn.addEventListener('click', toggleTimer);
    clearBtn.addEventListener('click', resetTimer);    // Initialize display
    updateDisplay();

    // Celebration animation when countdown ends
    function celebrateCountdownEnd() {
        // Create emojis animation
        const emojis = ['🚀', '✨', '🎉', '🎊'];
        let emojiIndex = 0;
        
        // Show "Time's up!" with emojis
        display.innerHTML = `Time's up! ${emojis[0]}`;
        
        // Change emoji every 500ms
        const emojiInterval = setInterval(() => {
            emojiIndex = (emojiIndex + 1) % emojis.length;
            display.innerHTML = `Time's up! ${emojis[emojiIndex]}`;
        }, 500);

        // Stop emoji animation after 3 seconds
        setTimeout(() => {
            clearInterval(emojiInterval);
            updateDisplay();
        }, 3000);

        // Create confetti animation
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
            });
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
});
