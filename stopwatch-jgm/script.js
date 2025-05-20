
class TimerDisplay {
  constructor() {
    this.hoursEl = document.querySelector('[data-unit="hours"]');
    this.minutesEl = document.querySelector('[data-unit="minutes"]');
    this.secondsEl = document.querySelector('[data-unit="seconds"]');
    this.msEl = document.getElementById('milliseconds');
  }

  update(h, m, s, ms) {
    this.hoursEl.textContent = String(h).padStart(2, '0');
    this.minutesEl.textContent = String(m).padStart(2, '0');
    this.secondsEl.textContent = String(s).padStart(2, '0');
    this.msEl.textContent = String(ms).padStart(3, '0');
  }

  blinkAlert() {
    const display = document.getElementById('display');
    display.classList.add('animate-pulse');
    setTimeout(() => display.classList.remove('animate-pulse'), 2000);
  }
}

class TimerController {
  constructor(display) {
    this.display = display;
    this.isRunning = false;
    this.mode = 'stopwatch';
    this.initialCountdown = 0;
    this.startTime = 0;
    this.elapsed = 0;
    this.interval = null;

    this.sound = document.getElementById('alarmSound');

    document.getElementById('startPauseBtn').addEventListener('click', () => this.toggle());
    document.getElementById('clearBtn').addEventListener('click', () => this.clear());
    document.getElementById('modeToggle').addEventListener('click', () => this.switchMode());
    document.querySelectorAll('.time-part').forEach(part => {
      part.addEventListener('click', e => this.editTime(part));
    });

    this.render(0);
  }

  switchMode() {
    this.clear();
    this.mode = this.mode === 'stopwatch' ? 'countdown' : 'stopwatch';
    document.getElementById('modeToggle').textContent =
      this.mode === 'stopwatch' ? 'Switch to Countdown' : 'Switch to Stopwatch';
    console.log(`Switched mode to ${this.mode}`);
  }

  toggle() {
    if (this.isRunning) {
      clearInterval(this.interval);
      this.isRunning = false;
      document.getElementById('startPauseBtn').textContent = 'Resume';
      console.log('Paused');
    } else {
      if (this.mode === 'countdown' && this.elapsed === 0) {
        this.initialCountdown = this.getInputTimeMs();
      }
      this.startTime = performance.now() - this.elapsed;
      this.interval = setInterval(() => this.tick(), 10);
      this.isRunning = true;
      document.getElementById('startPauseBtn').textContent = 'Pause';
      console.log('Started');
    }
  }

  clear() {
    clearInterval(this.interval);
    this.isRunning = false;
    this.elapsed = 0;
    this.startTime = 0;
    this.render(0);
    document.getElementById('startPauseBtn').textContent = 'Start';
    console.log('Cleared');
  }

  tick() {
    const now = performance.now();
    this.elapsed = now - this.startTime;
    let timeLeft = this.mode === 'countdown' ? this.initialCountdown - this.elapsed : this.elapsed;
    if (timeLeft <= 0 && this.mode === 'countdown') {
      this.render(0);
      this.display.blinkAlert();
      this.sound.play();
      this.clear();
      return;
    }
    this.render(timeLeft);
  }

  render(ms) {
    ms = Math.max(0, ms);
    const total = Math.floor(ms);
    const milliseconds = total % 1000;
    const seconds = Math.floor(total / 1000) % 60;
    const minutes = Math.floor(total / 60000) % 60;
    const hours = Math.floor(total / 3600000);
    this.display.update(hours, minutes, seconds, milliseconds);
  }

  getInputTimeMs() {
    try {
      const h = parseInt(this.display.hoursEl.textContent, 10) || 0;
      const m = parseInt(this.display.minutesEl.textContent, 10) || 0;
      const s = parseInt(this.display.secondsEl.textContent, 10) || 0;
      if (h > 23 || m > 59 || s > 59) throw new Error('Invalid time input');
      return (h * 3600 + m * 60 + s) * 1000;
    } catch (e) {
      console.error('Invalid time input:', e);
      return 0;
    }
  }

  editTime(partEl) {
    if (this.mode !== 'countdown' || this.isRunning) return;
    const current = partEl.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = current;
    input.className = 'w-12 text-center text-4xl font-mono';
    partEl.replaceWith(input);
    input.focus();

    const save = () => {
      let val = parseInt(input.value, 10);
      const unit = partEl.dataset.unit;
      if (isNaN(val)) val = 0;
      if (unit === 'hours') val = Math.min(23, Math.max(0, val));
      if (unit === 'minutes' || unit === 'seconds') val = Math.min(59, Math.max(0, val));
      partEl.textContent = String(val).padStart(2, '0');
      input.replaceWith(partEl);
    };

    input.addEventListener('blur', save);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        input.blur();
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const display = new TimerDisplay();
  new TimerController(display);
});