class Stopwatch {
    constructor() {
        this.displayElement = document.getElementById('display');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        
        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.toggleStart());
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    toggleStart() {
        try {
            if (!this.isRunning) {
                console.log('Conteo de tiempo iniciado');
                this.startTime = Date.now() - this.elapsedTime;
                this.timerInterval = setInterval(() => this.updateTimer(), 10);
                this.startBtn.textContent = 'Pause';
                this.isRunning = true;
            } else {
                console.log('Conteo de tiempo pausado');
                clearInterval(this.timerInterval);
                this.startBtn.textContent = 'Start';
                this.isRunning = false;
            }
        } catch (error) {
            console.error(`Error en toggleStart: ${error.message}`);
        }
    }

    updateTimer() {
        try {
            const currentTime = Date.now();
            this.elapsedTime = currentTime - this.startTime;
            this.displayElement.textContent = this.formatTime(this.elapsedTime);
        } catch (error) {
            console.error(`Error en updateTimer: ${error.message}`);
        }
    }

    formatTime(milliseconds) {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const ms = Math.floor(milliseconds % 1000);
        
        return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}:${this.pad(ms, 3)}`;
    }

    pad(number, digits = 2) {
        try {
            return String(number).padStart(digits, '0');
        } catch (error) {
            console.error(`Error formateando número: ${error.message}`);
            return '00';
        }
    }

    reset() {
        try {
            console.log('Reiniciando cronómetro');
            clearInterval(this.timerInterval);
            this.isRunning = false;
            this.elapsedTime = 0;
            this.displayElement.textContent = '00:00:00:000';
            this.startBtn.textContent = 'Start';
        } catch (error) {
            console.error(`Error en reset: ${error.message}`);
        }
    }
}

// Inicialización después de cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    const stopwatch = new Stopwatch();
});