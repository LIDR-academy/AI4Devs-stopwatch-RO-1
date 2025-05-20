/**
 * Super Stopwatch & Countdown Timer
 * Vanilla JS, SOLID, Tailwind CSS, Accessible, based on reference image.
 */

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  // ---- State
  let mode = null; // "stopwatch" | "countdown"
  let timer = null;
  let running = false;
  let startTimestamp = null;
  let elapsed = 0;
  let countdownTarget = 0;
  let countdownInput = '';
  let countdownInterval = null;
  let focusIndex = 0; // For keyboard navigation

  // ---- UI renderers
  function renderMainMenu() {
    mode = null;
    clearTimers();
    app.innerHTML = `
      <div class="w-full">
        <div class="flex justify-around items-center bg-white border-b-4 border-blue-800 py-6">
          <button id="stopwatch-btn" class="flex flex-col items-center w-1/2 focus:outline-none group" tabindex="0" aria-label="Select Stopwatch mode">
            <span class="text-xl font-semibold mb-2">Stopwatch</span>
            <svg class="w-20 h-20 group-hover:scale-105 transition-transform" fill="none" viewBox="0 0 48 48"><polygon points="24,8 40,32 8,32" fill="#22d07a" stroke="#0d9f42" stroke-width="3"/></svg>
          </button>
          <div class="w-px h-28 bg-gray-200 mx-2"></div>
          <button id="countdown-btn" class="flex flex-col items-center w-1/2 focus:outline-none group" tabindex="0" aria-label="Select Countdown mode">
            <span class="text-xl font-semibold mb-2">Countdown</span>
            <svg class="w-20 h-20 group-hover:scale-105 transition-transform" fill="none" viewBox="0 0 48 48"><polygon points="8,16 40,16 24,40" fill="#fa5252" stroke="#c91d1d" stroke-width="3"/></svg>
          </button>
        </div>
      </div>
    `;

    // Animations: Add classes when mode is selected
    document.getElementById('stopwatch-btn').onclick = () => slideTransition('right', renderStopwatchScreen);
    document.getElementById('countdown-btn').onclick = () => slideTransition('left', renderCountdownScreen);

    // Keyboard navigation
    setMenuKeyboardEvents();
  }

  function slideTransition(direction, next) {
    try {
      app.classList.remove('animate-slide-right', 'animate-slide-left');
      void app.offsetWidth; // force reflow
      app.classList.add(direction === 'right' ? 'animate-slide-right' : 'animate-slide-left');
      setTimeout(() => {
        app.classList.remove('animate-slide-right', 'animate-slide-left');
        next();
      }, 320);
    } catch (e) {
      console.error('Transition error:', e);
      next();
    }
  }

  function renderStopwatchScreen() {
    mode = 'stopwatch';
    clearTimers();
    elapsed = 0;
    running = false;
    log('Switched to Stopwatch mode');
    app.innerHTML = `
      <div class="w-full flex flex-col items-center">
        <div class="flex justify-between w-full px-4 py-2">
          <span class="text-xl font-bold">Stopwatch</span>
          <button id="back-btn" class="text-blue-700 text-base focus:outline-none hover:underline" tabindex="0" aria-label="Back to main screen">⬅ Back</button>
        </div>
        <div class="flex flex-col items-center justify-center bg-gray-100 border-4 border-blue-800 rounded-lg w-full max-w-full my-2">
          <span id="stopwatch-time" class="text-5xl font-mono tracking-wider py-4 select-none">00:00:00:000</span>
        </div>
        <div class="flex w-full justify-around mt-4">
          <button id="start-pause-btn" class="flex-1 mx-2 py-3 rounded-lg text-2xl font-semibold bg-green-500 text-white shadow hover:bg-green-600 focus:outline-none transition-colors" tabindex="0" aria-label="Start stopwatch">Start</button>
          <button id="clear-btn" class="flex-1 mx-2 py-3 rounded-lg text-2xl font-semibold bg-red-500 text-white shadow hover:bg-red-600 focus:outline-none transition-colors" tabindex="0" aria-label="Clear stopwatch">Clear</button>
        </div>
      </div>
    `;

    document.getElementById('back-btn').onclick = () => {
      log('Returned to main menu from Stopwatch');
      renderMainMenu();
    };

    document.getElementById('start-pause-btn').onclick = () => {
      running ? pauseStopwatch() : startStopwatch();
    };
    document.getElementById('clear-btn').onclick = () => {
      clearTimers();
      elapsed = 0;
      updateStopwatchDisplay(0);
      log('Stopwatch cleared');
    };
    updateStopwatchDisplay(0);
  }

  function renderCountdownScreen() {
    mode = 'countdown';
    clearTimers();
    countdownInput = '';
    countdownTarget = 0;
    running = false;
    log('Switched to Countdown mode');
    renderCountdownInput();
  }

  function renderCountdownInput(errorMsg = '') {
    app.innerHTML = `
      <div class="w-full flex flex-col items-center">
        <div class="flex justify-between w-full px-4 py-2">
          <span class="text-xl font-bold">Countdown</span>
          <button id="back-btn" class="text-blue-700 text-base focus:outline-none hover:underline" tabindex="0" aria-label="Back to main screen">⬅ Back</button>
        </div>
        <div class="flex flex-col items-center justify-center bg-gray-100 border-4 border-blue-800 rounded-lg w-full max-w-full my-2 px-4">
          <span 
            id="countdown-time" 
            class="text-6xl font-mono tracking-wider py-4 select-none w-full text-center max-w-[420px] break-words"
            style="letter-spacing: 0.05em; font-variant-numeric: tabular-nums;"
          >${formatCountdownInput(countdownInput)}</span>
          ${errorMsg ? `<div class="text-red-600 text-base py-1 font-medium">${errorMsg}</div>` : ''}
        </div>
        <div class="grid grid-cols-4 gap-2 w-full max-w-md px-2 mt-2">
          <!-- First Row: 7 8 9 Set -->
          <button class="bg-green-500 hover:bg-green-600 focus:outline-none text-white text-2xl rounded-lg py-3 shadow transition-colors" tabindex="0" aria-label="Number 7">7</button>
          <button class="bg-green-500 hover:bg-green-600 focus:outline-none text-white text-2xl rounded-lg py-3 shadow transition-colors" tabindex="0" aria-label="Number 8">8</button>
          <button class="bg-green-500 hover:bg-green-600 focus:outline-none text-white text-2xl rounded-lg py-3 shadow transition-colors" tabindex="0" aria-label="Number 9">9</button>
          <button id="set-btn" class="bg-green-200 hover:bg-green-300 focus:outline-none text-green-800 font-bold text-2xl rounded-lg py-3 shadow transition-colors" tabindex="0" aria-label="Set countdown">Set</button>
          <!-- Second Row: 4 5 6 Clear -->
          <button class="bg-green-500 hover:bg-green-600 focus:outline-none text-white text-2xl rounded-lg py-3 shadow transition-colors" tabindex="0" aria-label="Number 4">4</button>
          <button class="bg-green-500 hover:bg-green-600 focus:outline-none text-white text-2xl rounded-lg py-3 shadow transition-colors" tabindex="0" aria-label="Number 5">5</button>
          <button class="bg-green-500 hover:bg-green-600 focus:outline-none text-white text-2xl rounded-lg py-3 shadow transition-colors" tabindex="0" aria-label="Number 6">6</button>
          <button id="clear-btn" class="bg-gray-300 hover:bg-gray-400 focus:outline-none text-gray-700 font-bold text-2xl rounded-lg py-3 shadow transition-colors" tabindex="0" aria-label="Clear input">Clear</button>
          <!-- Third Row: 1 2 3 (empty cell) -->
          <button class="bg-green-500 hover:bg-green-600 focus:outline-none text-white text-2xl rounded-lg py-3 shadow transition-colors" tabindex="0" aria-label="Number 1">1</button>
          <button class="bg-green-500 hover:bg-green-600 focus:outline-none text-white text-2xl rounded-lg py-3 shadow transition-colors" tabindex="0" aria-label="Number 2">2</button>
          <button class="bg-green-500 hover:bg-green-600 focus:outline-none text-white text-2xl rounded-lg py-3 shadow transition-colors" tabindex="0" aria-label="Number 3">3</button>
          <div></div>
          <!-- Fourth Row: (empty cell) 0 (empty cells) -->
          <div></div>
          <button class="bg-green-500 hover:bg-green-600 focus:outline-none text-white text-2xl rounded-lg py-3 shadow transition-colors" tabindex="0" aria-label="Number 0">0</button>
          <div></div>
          <div></div>
        </div>
      </div>
    `;
  
    document.getElementById('back-btn').onclick = () => {
      log('Returned to main menu from Countdown');
      renderMainMenu();
    };
  
    // Button events
    const buttons = [...app.querySelectorAll('.grid button')];
    buttons.forEach(btn => {
      const text = btn.textContent.trim();
      if (/^\d$/.test(text)) {
        btn.onclick = () => {
          if (countdownInput.length < 6) {
            countdownInput += text;
            renderCountdownInput();
          }
        };
      } else if (btn.id === 'clear-btn') {
        btn.onclick = () => {
          countdownInput = '';
          renderCountdownInput();
        };
      } else if (btn.id === 'set-btn') {
        btn.onclick = () => {
          try {
            const ms = parseCountdownInput(countdownInput);
            if (!ms) {
              renderCountdownInput('Please enter a valid time.');
              logError('Attempted to set countdown with zero/invalid time');
            } else {
              countdownTarget = ms;
              log('Countdown set for ' + formatTime(countdownTarget));
              renderCountdownRun();
            }
          } catch (err) {
            renderCountdownInput('Invalid time format.');
            logError(err.message);
          }
        };
      }
    });
  }

  function renderCountdownRun() {
    app.innerHTML = `
      <div class="w-full flex flex-col items-center">
        <div class="flex justify-between w-full px-4 py-2">
          <span class="text-xl font-bold">Countdown</span>
          <button id="back-btn" class="text-blue-700 text-base focus:outline-none hover:underline" tabindex="0" aria-label="Back to main screen">⬅ Back</button>
        </div>
        <div class="flex flex-col items-center justify-center bg-gray-100 border-4 border-blue-800 rounded-lg w-full max-w-full my-2">
          <span id="countdown-time" class="text-5xl font-mono tracking-wider py-4 select-none">${formatTime(countdownTarget)}</span>
          <div id="countdown-alert" class="text-red-600 font-bold text-lg mt-2 hidden"></div>
        </div>
        <div class="flex w-full justify-around mt-4">
          <button id="start-pause-btn" class="flex-1 mx-2 py-3 rounded-lg text-2xl font-semibold bg-green-500 text-white shadow hover:bg-green-600 focus:outline-none transition-colors" tabindex="0" aria-label="Start countdown">Start</button>
          <button id="clear-btn" class="flex-1 mx-2 py-3 rounded-lg text-2xl font-semibold bg-red-500 text-white shadow hover:bg-red-600 focus:outline-none transition-colors" tabindex="0" aria-label="Clear countdown">Clear</button>
        </div>
      </div>
    `;
    document.getElementById('back-btn').onclick = () => {
      log('Returned to main menu from Countdown');
      renderMainMenu();
    };
    document.getElementById('start-pause-btn').onclick = () => {
      running ? pauseCountdown() : startCountdown();
    };
    document.getElementById('clear-btn').onclick = () => {
      clearTimers();
      countdownTarget = 0;
      countdownInput = '';
      renderCountdownInput();
      log('Countdown cleared');
    };
    updateCountdownDisplay(countdownTarget);
  }

  // ---- Timer logic

  function startStopwatch() {
    if (running) return;
    running = true;
    startTimestamp = Date.now() - elapsed;
    log('Stopwatch started');
    document.getElementById('start-pause-btn').textContent = 'Pause';
    timer = setInterval(() => {
      elapsed = Date.now() - startTimestamp;
      updateStopwatchDisplay(elapsed);
    }, 10);
  }

  function pauseStopwatch() {
    if (!running) return;
    running = false;
    clearInterval(timer);
    log('Stopwatch paused at ' + formatTime(elapsed));
    document.getElementById('start-pause-btn').textContent = 'Start';
  }

  function updateStopwatchDisplay(ms) {
    const el = document.getElementById('stopwatch-time');
    if (el) el.textContent = formatTime(ms);
  }

  function startCountdown() {
    if (running) return;
    if (!countdownTarget) {
      showCountdownAlert('Please set a valid time first.');
      logError('Countdown start attempted with zero time');
      return;
    }
    running = true;
    log('Countdown started');
    document.getElementById('start-pause-btn').textContent = 'Pause';
    let target = countdownTarget;
    let lastTimestamp = Date.now();
    countdownInterval = setInterval(() => {
      const now = Date.now();
      target -= (now - lastTimestamp);
      lastTimestamp = now;
      countdownTarget = Math.max(0, target);
      updateCountdownDisplay(countdownTarget);

      if (countdownTarget <= 0) {
        clearInterval(countdownInterval);
        running = false;
        showCountdownAlert('⏰ Time\'s up!');
        log('Countdown reached zero');
      }
    }, 10);
  }

  function pauseCountdown() {
    if (!running) return;
    running = false;
    clearInterval(countdownInterval);
    log('Countdown paused at ' + formatTime(countdownTarget));
    document.getElementById('start-pause-btn').textContent = 'Start';
  }

  function updateCountdownDisplay(ms) {
    const el = document.getElementById('countdown-time');
    if (el) el.textContent = formatTime(ms);
  }

  function showCountdownAlert(msg) {
    const el = document.getElementById('countdown-alert');
    if (el) {
      el.textContent = msg;
      el.classList.remove('hidden');
      el.classList.add('animate-pulse');
      setTimeout(() => {
        el.classList.remove('animate-pulse');
      }, 1500);
    }
  }

  function clearTimers() {
    clearInterval(timer);
    clearInterval(countdownInterval);
    running = false;
    timer = null;
    countdownInterval = null;
  }

  // ---- Formatting & parsing

  function formatTime(ms) {
    ms = Math.max(0, ms | 0);
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const msDisplay = (ms % 1000).toString().padStart(3, '0');
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${msDisplay}`;
  }

  // Example: '123456' = 12:34:56
  function formatCountdownInput(str) {
    const digits = str.padStart(6, '0').slice(-6);
    const h = digits.slice(0,2), m = digits.slice(2,4), s = digits.slice(4,6);
    return `${h}:${m}:${s}`;
  }

  function parseCountdownInput(str) {
    if (!/^\d{1,6}$/.test(str)) return 0;
    const padded = str.padStart(6, '0').slice(-6);
    const h = parseInt(padded.slice(0,2), 10);
    const m = parseInt(padded.slice(2,4), 10);
    const s = parseInt(padded.slice(4,6), 10);
    if (isNaN(h) || isNaN(m) || isNaN(s)) throw new Error('Invalid time format');
    if (m > 59 || s > 59) throw new Error('Invalid time format: Minutes and seconds must be 0-59');
    if (h === 0 && m === 0 && s === 0) return 0;
    return ((h * 60 + m) * 60 + s) * 1000;
  }

  // ---- Logging

  function log(msg) {
    console.log('[Timer]', msg);
  }
  function logError(msg) {
    console.error('[Timer][ERROR]', msg);
  }

  // ---- Keyboard navigation for menu

  function setMenuKeyboardEvents() {
    const sw = document.getElementById('stopwatch-btn');
    const cd = document.getElementById('countdown-btn');
    if (!sw || !cd) return;
    sw.onkeydown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Tab') { cd.focus(); e.preventDefault(); }
      else if (e.key === 'Enter' || e.key === ' ') { sw.click(); }
    };
    cd.onkeydown = (e) => {
      if (e.key === 'ArrowLeft') { sw.focus(); e.preventDefault(); }
      else if (e.key === 'Enter' || e.key === ' ') { cd.click(); }
    };
    sw.focus();
  }

  // ---- Animations (Tailwind custom classes)

  injectTailwindAnimations();

  // ---- Initial render
  renderMainMenu();

  // ---- Tailwind animation helpers
  function injectTailwindAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slide-right { from {transform:translateX(0);} to {transform:translateX(80vw);} }
      @keyframes slide-left  { from {transform:translateX(0);} to {transform:translateX(-80vw);} }
      .animate-slide-right { animation: slide-right 0.3s cubic-bezier(.65,.05,.36,1) both;}
      .animate-slide-left  { animation: slide-left  0.3s cubic-bezier(.65,.05,.36,1) both;}
    `;
    document.head.appendChild(style);
  }
});
