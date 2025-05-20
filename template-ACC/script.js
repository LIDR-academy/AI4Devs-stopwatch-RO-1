// script.js

// ======= STOPWATCH SECTION =======
let swInterval = null;
let swStart = 0;
let swElapsed = 0;

function formatTime(ms) {
  const totalMs = ms % 1000;
  const totalSec = Math.floor(ms / 1000);
  const secs = totalSec % 60;
  const mins = Math.floor(totalSec / 60) % 60;
  const hrs  = Math.floor(totalSec / 3600);
  return `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')} ${String(totalMs).padStart(3,'0')}`;
}

function createButton(text, bgColor, onClick) {
  const btn = document.createElement('button');
  btn.textContent = text;
  Object.assign(btn.style, {
    backgroundColor: bgColor,
    color: 'white',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.2em',
    cursor: 'pointer',
  });
  btn.addEventListener('click', onClick);
  return btn;
}

function makeStartButton(clock, group) { return createButton('Start','green',() => startStopwatch(clock, group)); }
function makePauseButton(clock, group) { return createButton('Pause','orange',() => { pauseStopwatch(); refreshButtons(clock, group, 'paused'); }); }
function makeContinueButton(clock, group) { return createButton('Continue','blue',() => resumeStopwatch(clock, group)); }
function makeClearButton(clock, group) { return createButton('Clear','red',() => resetStopwatch(clock, group)); }

function startStopwatch(clock, group) {
  swStart = Date.now();
  swInterval = setInterval(() => {
    clock.textContent = formatTime(swElapsed + (Date.now() - swStart));
  }, 33);
  refreshButtons(clock, group, 'running');
}

function pauseStopwatch() {
  clearInterval(swInterval);
  swElapsed += Date.now() - swStart;
}

function resumeStopwatch(clock, group) {
  swStart = Date.now();
  swInterval = setInterval(() => {
    clock.textContent = formatTime(swElapsed + (Date.now() - swStart));
  }, 33);
  refreshButtons(clock, group, 'running');
}

function resetStopwatch(clock, group) {
  clearInterval(swInterval);
  swElapsed = 0;
  swStart = 0;
  clock.textContent = '00:00:00 000';
  refreshButtons(clock, group, 'initial');
}

function refreshButtons(clock, group, state = 'initial') {
  group.innerHTML = '';
  if (state === 'initial') {
    group.append(makeStartButton(clock, group), makeClearButton(clock, group));
  } else if (state === 'running') {
    group.append(makePauseButton(clock, group), makeClearButton(clock, group));
  } else if (state === 'paused') {
    group.append(makeContinueButton(clock, group), makeClearButton(clock, group));
  }
}

// ======= COUNTDOWN SECTION =======
let cdInterval = null;
let cdRemaining = 0;
let cdLastTime = 0;
let blinkInterval = null;
const ringAudio = new Audio('https://upload.wikimedia.org/wikipedia/commons/6/69/Mechanical_Clock_Ring_%28Directory.Audio%29.mp3');

function makeCDStartButton(clock, group) { return createButton('Start','green',() => startCountdown(clock, group)); }
function makeCDPauseButton(clock, group) { return createButton('Pause','orange',() => { pauseCountdown(); refreshCDButtons(clock, group, 'paused'); }); }
function makeCDContinueButton(clock, group) { return createButton('Continue','blue',() => resumeCountdown(clock, group)); }
function makeCDClearButton(clock, group) { return createButton('Clear','red',() => resetCountdownInput()); }

function startCountdown(clock, group) {
  cdLastTime = Date.now();
  refreshCDButtons(clock, group, 'running');
  cdInterval = setInterval(() => {
    const now = Date.now();
    const delta = now - cdLastTime;
    cdLastTime = now;
    cdRemaining = Math.max(0, cdRemaining - delta);
    clock.textContent = formatTime(cdRemaining);
    if (cdRemaining <= 0) finishCountdown(clock, group);
  }, 33);
}

function pauseCountdown() {
  clearInterval(cdInterval);
}

function resumeCountdown(clock, group) {
  cdLastTime = Date.now();
  refreshCDButtons(clock, group, 'running');
  cdInterval = setInterval(() => {
    const now = Date.now();
    const delta = now - cdLastTime;
    cdLastTime = now;
    cdRemaining = Math.max(0, cdRemaining - delta);
    clock.textContent = formatTime(cdRemaining);
    if (cdRemaining <= 0) finishCountdown(clock, group);
  }, 33);
}

function resetCountdownInput() {
  clearInterval(cdInterval);
  clearInterval(blinkInterval);
  ringAudio.pause();
  ringAudio.currentTime = 0;
  renderCountdownInputUI();
}

function finishCountdown(clock, group) {
  clearInterval(cdInterval);
  ringAudio.play();
  setTimeout(() => ringAudio.pause(), 5000);
  blinkInterval = setInterval(() => {
    clock.style.backgroundColor = clock.style.backgroundColor === 'red' ? 'white' : 'red';
  }, 500);
  group.innerHTML = '';
  group.append(createButton('Clear','red',() => resetCountdownInput()));
}

function refreshCDButtons(clock, group, state = 'initial') {
  group.innerHTML = '';
  if (state === 'initial') {
    group.append(makeCDStartButton(clock, group), makeCDClearButton(clock, group));
  } else if (state === 'running') {
    group.append(makeCDPauseButton(clock, group), makeCDClearButton(clock, group));
  } else if (state === 'paused') {
    group.append(makeCDContinueButton(clock, group), makeCDClearButton(clock, group));
  }
}

function renderBackButton(container, above = false) {
  const btn = createButton('← Back','#007bff', renderSelectionScreen);
  Object.assign(btn.style, { marginTop: '20px' });
  if (above) container.prepend(btn);
  else container.appendChild(btn);
}

function renderSelectionScreen() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div style="display:flex;height:100vh;font-size:2em;">
      <div id="stopwatch-select" style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;cursor:pointer;background-color:white;">
        <div>Stopwatch</div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Eo_circle_green_arrow-up.svg" style="width:100px;height:100px;" />
      </div>
      <div id="countdown-select" style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;cursor:pointer;background-color:white;">
        <div>Countdown</div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Eo_circle_red_arrow-down.svg" style="width:100px;height:100px;" />
      </div>
    </div>
  `;
  ['stopwatch-select', 'countdown-select'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('mouseenter', () => el.style.backgroundColor = '#eef9f1');
    el.addEventListener('mouseleave', () => el.style.backgroundColor = 'white');
  });
  document.getElementById('stopwatch-select').addEventListener('click', renderStopwatchUI);
  document.getElementById('countdown-select').addEventListener('click', renderCountdownInputUI);
}

function renderStopwatchUI() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  const container = document.createElement('div');
  Object.assign(container.style, { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' });
  const clock = document.createElement('div'); clock.id = 'stopwatch-clock'; clock.textContent = '00:00:00 000';
  Object.assign(clock.style, { backgroundColor: '#007bff', color: 'black', padding: '30px 50px', borderRadius: '20px', fontSize: '2.5em', fontWeight: 'bold', marginBottom: '40px' });
  container.appendChild(clock);
  const group = document.createElement('div'); Object.assign(group.style, { display: 'flex', gap: '20px' }); container.appendChild(group);
  renderBackButton(container);
  app.appendChild(container);
  refreshButtons(clock, group, 'initial');
}

function renderCountdownInputUI() {
  const app = document.getElementById('app'); app.innerHTML = '';
  const container = document.createElement('div'); Object.assign(container.style, { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' });
  const clock = document.createElement('div'); clock.id = 'countdown-clock'; clock.textContent = '00:00:00 000';
  Object.assign(clock.style, { backgroundColor: '#007bff', color: 'black', padding: '30px 50px', borderRadius: '20px', fontSize: '2.5em', fontWeight: 'bold', marginBottom: '20px' });
  container.appendChild(clock);
  let buf = ['0','0','0','0','0','0'], count = 0;
  function update() { clock.textContent = `${buf[0]}${buf[1]}:${buf[2]}${buf[3]}:${buf[4]}${buf[5]} 000`; }
  update();
  const digits = document.createElement('div'); Object.assign(digits.style, { display: 'grid', gridTemplateColumns: 'repeat(3,80px)', gridGap: '10px', marginBottom: '20px' });
  for (let i = 1; i <= 9; i++) { digits.appendChild(createButton(String(i), 'green', () => { if (count < 6) { buf.shift(); buf.push(String(i)); count++; update(); } })); }
  digits.appendChild(document.createElement('div')); digits.appendChild(createButton('0', 'green', () => { if (count < 6) { buf.shift(); buf.push('0'); count++; update(); } })); digits.appendChild(document.createElement('div'));
  container.appendChild(digits);
  const ctrl = document.createElement('div'); Object.assign(ctrl.style, { display: 'flex', gap: '20px', marginBottom: '20px' });
  const setBtn = createButton('Set','green',() => {
    let totalMs = 0;
    if (count === 0 || buf.every(d => d === '0')) totalMs = 10000;
    else {
      const h = Number(buf.slice(0,2).join(''));
      const m = Number(buf.slice(2,4).join(''));
      const s = Number(buf.slice(4,6).join(''));
      totalMs = ((h*3600)+(m*60)+s)*1000;
    }
    cdRemaining = totalMs;
    renderCountdownRunUI(totalMs);
  });
  const clearCl = createButton('Clear Clock','gray',() => { buf = ['0','0','0','0','0','0']; count = 0; update(); });
  ctrl.append(setBtn, clearCl); container.appendChild(ctrl);
  renderBackButton(container);
  app.appendChild(container);
}

function renderCountdownRunUI(initialMs) {
  const app = document.getElementById('app'); app.innerHTML = '';
  const container = document.createElement('div'); Object.assign(container.style, { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' });
  const clock = document.createElement('div'); clock.id = 'countdown-clock'; clock.textContent = formatTime(initialMs);
  Object.assign(clock.style, { backgroundColor: '#007bff', color: 'black', padding: '30px 50px', borderRadius: '20px', fontSize: '2.5em', fontWeight: 'bold', marginBottom: '40px' });
  container.appendChild(clock);
  const group = document.createElement('div'); Object.assign(group.style, { display: 'flex', gap: '20px', marginBottom: '20px' }); container.appendChild(group);
  renderBackButton(container);
  app.appendChild(container);
  cdRemaining = initialMs;
  refreshCDButtons(clock, group, 'initial');
}

window.addEventListener('DOMContentLoaded', renderSelectionScreen);