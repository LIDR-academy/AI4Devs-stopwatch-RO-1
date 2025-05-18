/**
 * Ultra Stopwatch - Logic
 * Follows SOLID principles: all logic is modular, clear, and robust.
 * - Keyboard support: Space toggles Start/Pause/Resume, 'C' or 'Esc' clears.
 * - When reaching 24h, stops and logs overflow.
 * - All DOM access/updates are exception-safe.
 * - Console logs on each state change.
 */

// ----- CONSTANTS -----
const MS_INTERVAL = 10;
const MS_MAX = 24 * 60 * 60 * 1000; // 24h in ms

// ----- STATE -----
let startTime = null;
let elapsed = 0;
let timerId = null;
let running = false;

// ----- DOM -----
const $hours = document.getElementById('hours');
const $minutes = document.getElementById('minutes');
const $seconds = document.getElementById('seconds');
const $milliseconds = document.getElementById('milliseconds');
const $startPauseBtn = document.getElementById('startPauseBtn');
const $clearBtn = document.getElementById('clearBtn');

// ----- UTILITIES -----

/**
 * Pads a number to a string with leading zeros
 */
function pad(num, size) {
  return String(num).padStart(size, '0');
}

/**
 * Formats milliseconds into {hh, mm, ss, ms}
 */
function formatTime(ms) {
  let hours = Math.floor(ms / 3600000);
  ms %= 3600000;
  let minutes = Math.floor(ms / 60000);
  ms %= 60000;
  let seconds = Math.floor(ms / 1000);
  ms %= 1000;
  return {
    hours: pad(hours, 2),
    minutes: pad(minutes, 2),
    seconds: pad(seconds, 2),
    ms: pad(ms, 3)
  };
}

/**
 * Updates the timer display safely.
 */
function updateDisplay(ms) {
  try {
    const t = formatTime(ms);
    $hours.textContent = t.hours;
    $minutes.textContent = t.minutes;
    $seconds.textContent = t.seconds;
    $milliseconds.textContent = t.ms;
  } catch (e) {
    console.error("Error updating display:", e);
  }
}

/**
 * Sets the correct label and ARIA on the main button
 */
function setButtonState(label, aria) {
  $startPauseBtn.textContent = label;
  $startPauseBtn.setAttribute('aria-label', aria);
}

// ----- TIMER LOGIC -----

/**
 * Starts the stopwatch
 */
function start() {
  if (running) return;
  try {
    startTime = Date.now() - elapsed;
    timerId = setInterval(tick, MS_INTERVAL);
    running = true;
    setButtonState('Pause', 'Pausar cronómetro');
    $clearBtn.disabled = true;
    console.log('[Start] Stopwatch started');
  } catch (e) {
    console.error("Start error:", e);
  }
}

/**
 * Pauses the stopwatch
 */
function pause() {
  if (!running) return;
  try {
    clearInterval(timerId);
    timerId = null;
    elapsed = Date.now() - startTime;
    running = false;
    setButtonState('Resume', 'Reanudar cronómetro');
    $clearBtn.disabled = false;
    console.log('[Pause] Stopwatch paused');
  } catch (e) {
    console.error("Pause error:", e);
  }
}

/**
 * Resumes the stopwatch
 */
function resume() {
  if (running) return;
  try {
    startTime = Date.now() - elapsed;
    timerId = setInterval(tick, MS_INTERVAL);
    running = true;
    setButtonState('Pause', 'Pausar cronómetro');
    $clearBtn.disabled = true;
    console.log('[Resume] Stopwatch resumed');
  } catch (e) {
    console.error("Resume error:", e);
  }
}

/**
 * Resets the stopwatch
 */
function clearAll() {
  try {
    clearInterval(timerId);
    timerId = null;
    running = false;
    startTime = null;
    elapsed = 0;
    updateDisplay(0);
    setButtonState('Start', 'Iniciar cronómetro');
    $clearBtn.disabled = true;
    console.log('[Clear] Stopwatch reset');
  } catch (e) {
    console.error("Clear error:", e);
  }
}

/**
 * Main tick: updates elapsed and handles overflow.
 */
function tick() {
  try {
    elapsed = Date.now() - startTime;
    if (elapsed >= MS_MAX) {
      updateDisplay(MS_MAX);
      pause(); // auto-pause
      $startPauseBtn.disabled = true;
      console.warn('[Overflow] Stopwatch reached 24 hours and stopped.');
      alert('¡El cronómetro ha llegado al máximo de 24 horas y se ha detenido!');
      return;
    }
    updateDisplay(elapsed);
  } catch (e) {
    console.error("Tick error:", e);
  }
}

// ----- EVENT HANDLERS -----

$startPauseBtn.addEventListener('click', () => {
  if (!running && elapsed === 0) {
    start();
  } else if (running) {
    pause();
  } else {
    resume();
  }
});

$clearBtn.addEventListener('click', () => {
  if (!running) clearAll();
});

/**
 * Handles all keyboard shortcuts.
 * Space: Start/Pause/Resume
 * C or Escape: Clear (if paused)
 */
document.addEventListener('keydown', (e) => {
  // Ignore if not on body (avoid interfering with forms)
  if (document.activeElement.tagName !== 'BODY' && document.activeElement.id !== 'timer') return;

  if (e.code === 'Space') {
    e.preventDefault();
    if (!running && elapsed === 0) start();
    else if (running) pause();
    else resume();
  }
  if ((e.key === 'c' || e.key === 'C' || e.key === 'Escape') && !running) {
    clearAll();
  }
});

// Accessibility: let tab reach display for screen readers
$hours.parentElement.tabIndex = 0;

// Initial render
updateDisplay(0);


