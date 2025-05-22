class ClockManager {
  constructor() {
    this.clocks = {
      chrono: [],
      countdown: []
    };
    this.maxPerType = 3;
    this.historyEl = document.getElementById('history');
  }

  addClock(type) {
    if (this.clocks[type].length >= this.maxPerType) {
      showModal(`⚠️ Solo puedes tener hasta ${this.maxPerType} ${type === 'chrono' ? 'cronómetros' : 'cuentas regresivas'}. Por favor detén uno. Sugerencia: detén el más antiguo.`);
      return;
    }
    const clock = type === 'chrono' ? new ChronoClock(this) : new CountdownClock(this);
    this.clocks[type].push(clock);
    clock.init();
  }

  removeClock(clock) {
    const type = clock.type;
    const index = this.clocks[type].indexOf(clock);
    if (index !== -1) this.clocks[type].splice(index, 1);
  }

  addToHistory(entry) {
    const item = document.createElement('li');
    item.textContent = entry;
    this.historyEl.appendChild(item);
  }
}

class BaseClock {
  constructor(manager, type) {
    this.manager = manager;
    this.type = type;
    this.id = Date.now() + Math.random();
    this.running = false;
    this.startTime = null;
    this.interval = null;
    this.container = document.createElement('div');
    this.container.className = 'bg-white shadow-md rounded p-4 w-80';
  }

  format(ms) {
    const totalSec = Math.floor(ms / 1000);
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    const millis = String(ms % 1000).padStart(3, '0');
    return `${hrs}:${mins}:${secs}.${millis}`;
  }

  destroy() {
    this.manager.removeClock(this);
    this.container.remove();
  }

  log(message) {
    console.log(`[${this.type.toUpperCase()}-${this.id}]: ${message}`);
  }
}

class ChronoClock extends BaseClock {
  constructor(manager) {
    super(manager, 'chrono');
  }

  init() {
    this.display = document.createElement('div');
    this.display.className = 'text-3xl font-mono mb-2';
    this.display.textContent = '00:00:00.000';

    const startBtn = this.createButton('Start', 'bg-green-500', () => this.toggle());
    const clearBtn = this.createButton('Clear', 'bg-red-500', () => this.stop());

    this.container.appendChild(this.display);
    this.container.appendChild(startBtn);
    this.container.appendChild(clearBtn);
    document.getElementById('clocks').appendChild(this.container);
    this.log('Cronómetro iniciado.');
  }

  toggle() {
    if (this.running) {
      clearInterval(this.interval);
      this.running = false;
      const elapsed = Date.now() - this.startTime;
      this.manager.addToHistory(`🟢 Cronómetro detenido: ${this.format(elapsed)} (creado a ${new Date(this.startTime).toLocaleTimeString()})`);
      this.log(`Detenido a ${this.format(elapsed)}`);
    } else {
      this.startTime = Date.now();
      this.interval = setInterval(() => {
        const elapsed = Date.now() - this.startTime;
        this.display.textContent = this.format(elapsed);
      }, 100);
      this.running = true;
      this.log('Iniciado');
    }
  }

  stop() {
    if (this.running) {
      clearInterval(this.interval);
      const elapsed = Date.now() - this.startTime;
      this.manager.addToHistory(`🟢 Cronómetro detenido: ${this.format(elapsed)} (creado a ${new Date(this.startTime).toLocaleTimeString()})`);
    }
    this.destroy();
  }

  createButton(text, colorClass, onClick) {
    const btn = document.createElement('button');
    
    btn.textContent = text;
    if (text === 'Start') { btn.id = 'startBtn'; } else if (text === 'Stop') { btn.id = 'stopBtn'; }
    
    btn.className = `${colorClass} text-white font-bold py-1 px-3 m-1 rounded`;
    btn.onclick = () => {
      try {
        onClick();
      } catch (e) {
        this.log('Error: ' + e.message);
      }
    };
    return btn;
  }
}

class CountdownClock extends BaseClock {
  constructor(manager) {
    super(manager, 'countdown');
    this.totalMs = 0;
  }

  init() {
    
    const h = prompt("⏳ Horas:");
    const m = prompt("⏳ Minutos:");
    const s = prompt("⏳ Segundos:");
    const input = (parseInt(h || 0) * 3600 + parseInt(m || 0) * 60 + parseInt(s || 0));
    
    if (!input || isNaN(input) || input <= 0) {
      showModal("Debes ingresar un número válido mayor que cero.");
      return;
    }

    this.totalMs = parseInt(input) * 1000;
    this.display = document.createElement('div');
    this.display.className = 'text-3xl font-mono mb-2';
    this.display.textContent = this.format(this.totalMs);

    const clearBtn = this.createButton('Clear', 'bg-red-500', () => this.stop());

    this.container.appendChild(this.display);
    this.container.appendChild(clearBtn);
    document.getElementById('clocks').appendChild(this.container);

    this.startTime = Date.now();
    this.interval = setInterval(() => {
      const remaining = this.totalMs - (Date.now() - this.startTime);
      if (remaining <= 0) {
        clearInterval(this.interval);
        this.display.textContent = '00:00:00.000';
        this.playSound();
        showModal("⏰ ¡Cuenta regresiva finalizada!");
        this.manager.addToHistory(`🔵 Cuenta regresiva finalizada (original: ${this.format(this.totalMs)})`);
        this.destroy();
      } else {
        this.display.textContent = this.format(remaining);
      }
    }, 100);

    this.log(`Cuenta regresiva creada por ${this.totalMs} ms`);
  }

  playSound() {
    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
    audio.play();
  }

  stop() {
    clearInterval(this.interval);
    this.manager.addToHistory(`🔵 Cuenta regresiva detenida antes de finalizar (original: ${this.format(this.totalMs)})`);
    this.destroy();
  }

  createButton(text, colorClass, onClick) {
    const btn = document.createElement('button');
    
    btn.textContent = text;
    if (text === 'Start') { btn.id = 'startBtn'; } else if (text === 'Stop') { btn.id = 'stopBtn'; }
    
    btn.className = `${colorClass} text-white font-bold py-1 px-3 m-1 rounded`;
    btn.onclick = () => {
      try {
        onClick();
      } catch (e) {
        this.log('Error: ' + e.message);
      }
    };
    return btn;
  }
}

const manager = new ClockManager();

document.getElementById('addChrono').addEventListener('click', () => {
  try {
    manager.addClock('chrono');
  } catch (e) {
    console.error(e);
  }
});

document.getElementById('addCountdown').addEventListener('click', () => {
  try {
    manager.addClock('countdown');
  } catch (e) {
    console.error(e);
  }
});

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('bg-gray-100');
  body.classList.toggle('bg-gray-900');
  body.classList.toggle('text-white');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function showModal(message) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-message').textContent = message;
  modal.classList.remove('hidden');
}

function exportHistory() {
  const listItems = document.querySelectorAll('#history li');
  const lines = Array.from(listItems).map(item => `"${item.textContent}"`);
  const csvContent = 'data:text/csv;charset=utf-8,' + lines.join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'clock_history.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
