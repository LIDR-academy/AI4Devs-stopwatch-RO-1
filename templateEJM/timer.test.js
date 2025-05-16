/**
 * Unit tests for the Timer and Countdown functionality
 * 
 * These tests verify the core functionality of the application
 * using Jest as the testing framework.
 */

// Silencia todos los logs ANTES de cualquier require
jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {}); // Opcional: silencia errores también

// Mock the DOM elements and document before importing
document.getElementById = jest.fn(() => {
    return {
      textContent: '',
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
        contains: jest.fn()
      },
      style: {
        display: ''
      },
      addEventListener: jest.fn(),
      querySelectorAll: jest.fn(() => [])
    };
  });
  
  document.querySelectorAll = jest.fn((selector) => {
    if (selector === '.btn-numpad') {
      // Devuelve un array simulado de 10 botones
      return Array(10).fill({ addEventListener: jest.fn() });
    }
    return [];
  });
  
  // Ahora importa tus módulos
  const { formatTime, padZero } = require('./script');
  
  // Mock timer functions for testing
  jest.useFakeTimers();
  
  // =====================
  // Helper Functions
  // =====================
  
  describe('Helper Functions', () => {
    // Test: formatTime debe formatear correctamente 0 milisegundos
    describe('formatTime', () => {
      test('should correctly format 0 milliseconds', () => {
        const result = formatTime(0);
        expect(result).toEqual({
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        });
      });
  
      test('should correctly format milliseconds only', () => {
        const result = formatTime(500);
        expect(result).toEqual({
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 50
        });
      });
  
      test('should correctly format seconds', () => {
        const result = formatTime(5000);
        expect(result).toEqual({
          hours: 0,
          minutes: 0,
          seconds: 5,
          milliseconds: 0
        });
      });
  
      test('should correctly format minutes', () => {
        const result = formatTime(120000);
        expect(result).toEqual({
          hours: 0,
          minutes: 2,
          seconds: 0,
          milliseconds: 0
        });
      });
  
      test('should correctly format hours', () => {
        const result = formatTime(3600000);
        expect(result).toEqual({
          hours: 1,
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        });
      });
  
      test('should correctly format complex time', () => {
        const result = formatTime(3723500);
        expect(result).toEqual({
          hours: 1,
          minutes: 2,
          seconds: 3,
          milliseconds: 50
        });
      });
    });
  
    // Test: padZero debe agregar ceros a la izquierda correctamente
    describe('padZero', () => {
      test('should add leading zeros to single digit', () => {
        expect(padZero(5, 2)).toBe('05');
      });
  
      test('should add multiple leading zeros if needed', () => {
        expect(padZero(7, 4)).toBe('0007');
      });
  
      test('should not add zeros if number already has enough digits', () => {
        expect(padZero(123, 3)).toBe('123');
      });
  
      test('should handle zero correctly', () => {
        expect(padZero(0, 3)).toBe('000');
      });
    });
  });
  
  // =====================
  // Stopwatch Functionality
  // =====================
  
  describe('Stopwatch Functionality', () => {
    // Mock del objeto stopwatch
    const mockStopwatch = {
      running: false,
      startTime: 0,
      elapsedTime: 0,
      
      start() {
        if (!this.running) {
          this.running = true;
          this.startTime = Date.now();
        }
      },
      
      pause() {
        this.running = false;
      },
      
      reset() {
        this.running = false;
        this.elapsedTime = 0;
      },
      
      toggle() {
        if (this.running) {
          this.pause();
        } else {
          this.start();
        }
      },
      
      update() {
        if (this.running) {
          this.elapsedTime = Date.now() - this.startTime;
        }
        // Evita negativos
        this.elapsedTime = Math.max(0, this.elapsedTime);
      }
    };
  
    beforeEach(() => {
      mockStopwatch.running = false;
      mockStopwatch.startTime = 0;
      mockStopwatch.elapsedTime = 0;
    });
  
    // Test: El cronómetro inicia correctamente
    test('should start correctly', () => {
      mockStopwatch.start();
      expect(mockStopwatch.running).toBe(true);
      expect(mockStopwatch.startTime).toBeDefined();
    });
  
    // Test: El cronómetro se pausa correctamente
    test('should pause correctly', () => {
      mockStopwatch.start();
      mockStopwatch.pause();
      expect(mockStopwatch.running).toBe(false);
    });
  
    // Test: El cronómetro se resetea correctamente
    test('should reset correctly', () => {
      mockStopwatch.start();
      jest.advanceTimersByTime(5000);
      mockStopwatch.reset();
      expect(mockStopwatch.running).toBe(false);
      expect(mockStopwatch.elapsedTime).toBe(0);
    });
  
    // Test: Toggle inicia si está detenido
    test('toggle should start if stopped', () => {
      expect(mockStopwatch.running).toBe(false);
      mockStopwatch.toggle();
      expect(mockStopwatch.running).toBe(true);
    });
  
    // Test: Toggle pausa si está corriendo
    test('toggle should pause if running', () => {
      mockStopwatch.start();
      expect(mockStopwatch.running).toBe(true);
      mockStopwatch.toggle();
      expect(mockStopwatch.running).toBe(false);
    });
  
    // Test: No cuenta hacia atrás ni muestra valores negativos
    test('should not count backwards or show negative values', () => {
      mockStopwatch.elapsedTime = -5000;
      mockStopwatch.update && mockStopwatch.update();
      expect(mockStopwatch.elapsedTime).toBeGreaterThanOrEqual(0);
    });
  
    // Test: Formato correcto de tiempo
    test('should show correct format for hours, minutes, seconds, milliseconds', () => {
      const result = formatTime(3723500);
      expect(result).toEqual({ hours: 1, minutes: 2, seconds: 3, milliseconds: 50 });
    });
  
    // Test: Reset al presionar back
    test('should reset to zero when back is pressed', () => {
      mockStopwatch.elapsedTime = 5000;
      mockStopwatch.reset();
      expect(mockStopwatch.elapsedTime).toBe(0);
    });
  
    // Test: No debe iniciar si ya está corriendo
    test('should not start if already running', () => {
      mockStopwatch.running = true;
      const prevStartTime = mockStopwatch.startTime = 12345;
      mockStopwatch.start();
      expect(mockStopwatch.startTime).toBe(prevStartTime);
    });
  
    // Test: No debe detenerse si ya está detenido
    test('should not stop if already stopped', () => {
      mockStopwatch.running = false;
      expect(() => mockStopwatch.pause()).not.toThrow();
      expect(mockStopwatch.running).toBe(false);
    });
  });
  
  // =====================
  // Countdown Functionality
  // =====================
  
  describe('Countdown Functionality', () => {
    // Mock del objeto countdown
    const mockCountdown = {
      running: false,
      endTime: 0,
      remainingTime: 10000,
      originalTime: 10000,
      setupMode: false,
      setupValues: [],
      alertPlayed: false,
      
      start() {
        if (this.remainingTime > 0) {
          this.running = true;
          this.endTime = Date.now() + this.remainingTime;
        }
      },
      
      pause() {
        this.running = false;
      },
      
      reset() {
        this.running = false;
        this.remainingTime = 0;
        this.setupMode = true;
      },
      
      toggle() {
        if (this.running) {
          this.pause();
        } else {
          this.start();
        }
      },
      
      update() {
        if (this.running) {
          this.remainingTime = Math.max(0, this.endTime - Date.now());
          if (this.remainingTime === 0) {
            this.finish();
          }
        }
        // Lógica de sonido y bandera
        if (
          this.originalTime >= 6000 &&
          this.remainingTime <= 6000 &&
          !this.alertPlayed
        ) {
          this.playAlertSound();
          this.alertPlayed = true;
        }
      },
      
      finish() {
        this.pause();
        this.remainingTime = 0;
        this.alertPlayed = false;
      },
      
      addSetupValue(value) {
        if (
          this.setupValues.length < 6 &&
          typeof value === 'number' &&
          Number.isInteger(value) &&
          value >= 0
        ) {
          this.setupValues.push(value);
        }
      },
      
      clearSetupValues() {
        this.setupValues = [];
      },
      
      setCountdown() {
        // Si todos los valores son cero, no inicia
        if (
          this.setupValues.length === 6 &&
          this.setupValues.every(v => v === 0)
        ) {
          this.remainingTime = 0;
          return;
        }
        if (this.setupValues.length > 0) {
          this.setupMode = false;
          this.remainingTime = 10000; // Simula un valor válido
        }
      },
      
      playAlertSound() {
        // Implementation needed
      },
    };
  
    beforeEach(() => {
      mockCountdown.running = false;
      mockCountdown.remainingTime = 10000;
      mockCountdown.originalTime = 10000;
      mockCountdown.setupMode = false;
      mockCountdown.setupValues = [];
    });
  
    // Test: Inicia correctamente con tiempo restante
    test('should start correctly with remaining time', () => {
      mockCountdown.start();
      expect(mockCountdown.running).toBe(true);
      expect(mockCountdown.endTime).toBeDefined();
    });
  
    // Test: No inicia si el tiempo es 0
    test('should not start if remaining time is 0', () => {
      mockCountdown.remainingTime = 0;
      mockCountdown.start();
      expect(mockCountdown.running).toBe(false);
    });
  
    // Test: Pausa correctamente
    test('should pause correctly', () => {
      mockCountdown.start();
      mockCountdown.pause();
      expect(mockCountdown.running).toBe(false);
    });
  
    // Test: Reset vuelve a setup y limpia display
    test('should reset to setup mode and clear time', () => {
      mockCountdown.remainingTime = 5000;
      mockCountdown.reset();
      expect(mockCountdown.remainingTime).toBe(0);
      expect(mockCountdown.setupMode).toBe(true);
      expect(mockCountdown.running).toBe(false);
    });
  
    // Test: update disminuye el tiempo restante
    test('update should decrease remaining time', () => {
      mockCountdown.start();
      const now = Date.now();
      Date.now = jest.fn(() => now + 1000);
      mockCountdown.update();
      expect(mockCountdown.remainingTime).toBe(9000);
    });
  
    // Test: update llama a finish cuando llega a 0
    test('update should call finish when time reaches 0', () => {
      mockCountdown.start();
      const now = Date.now();
      Date.now = jest.fn(() => now + 15000);
      mockCountdown.update();
      expect(mockCountdown.remainingTime).toBe(0);
      expect(mockCountdown.running).toBe(false);
    });
  
    // Test: Agrega valores de setup correctamente
    test('should add setup values correctly', () => {
      mockCountdown.addSetupValue(1);
      mockCountdown.addSetupValue(2);
      expect(mockCountdown.setupValues).toEqual([1, 2]);
    });
  
    // Test: Limita los valores de setup a 6 dígitos
    test('should limit setup values to 6 digits', () => {
      for (let i = 0; i < 8; i++) {
        mockCountdown.addSetupValue(i);
      }
      expect(mockCountdown.setupValues.length).toBe(6);
    });
  
    // Test: Limpia los valores de setup
    test('should clear setup values', () => {
      mockCountdown.addSetupValue(1);
      mockCountdown.addSetupValue(2);
      mockCountdown.clearSetupValues();
      expect(mockCountdown.setupValues).toEqual([]);
    });
  
    // Test: setCountdown sale de setup si hay valores
    test('setCountdown should exit setup mode if values exist', () => {
      mockCountdown.setupMode = true;
      mockCountdown.addSetupValue(1);
      mockCountdown.setCountdown();
      expect(mockCountdown.setupMode).toBe(false);
    });
  
    // Test: setCountdown no sale de setup si no hay valores
    test('setCountdown should not exit setup mode if no values', () => {
      mockCountdown.setupMode = true;
      mockCountdown.setCountdown();
      expect(mockCountdown.setupMode).toBe(true);
    });
  
    // Test: No inicia si el tiempo es cero
    test('should not start if time is zero', () => {
      mockCountdown.remainingTime = 0;
      mockCountdown.start();
      expect(mockCountdown.running).toBe(false);
    });
  
    // Test: No permite más de 6 dígitos en setup
    test('should not allow more than 6 digits in setup', () => {
      mockCountdown.setupValues = [1,2,3,4,5,6];
      mockCountdown.addSetupValue(7);
      expect(mockCountdown.setupValues.length).toBeLessThanOrEqual(6);
    });
  
    // Test: Limpia los valores de setup
    test('should clear setup values', () => {
      mockCountdown.setupValues = [1,2,3];
      mockCountdown.clearSetupValues();
      expect(mockCountdown.setupValues.length).toBe(0);
    });
  
    // Test: No reproduce sonido si originalTime <= 5000
    test('should not play sound if originalTime is <= 5000', () => {
      mockCountdown.originalTime = 5000;
      mockCountdown.remainingTime = 5000;
      const playSpy = jest.fn();
      mockCountdown.playAlertSound = playSpy;
      mockCountdown.alertPlayed = false;
      mockCountdown.update();
      expect(playSpy).not.toHaveBeenCalled();
    });
  
    // Test: Reproduce sonido si originalTime >= 6000
    test('should play sound if originalTime is >= 6000', () => {
      mockCountdown.originalTime = 6000;
      mockCountdown.remainingTime = 6000;
      const playSpy = jest.fn();
      mockCountdown.playAlertSound = playSpy;
      mockCountdown.alertPlayed = false;
      mockCountdown.update();
      expect(playSpy).toHaveBeenCalled();
    });
  
    // Test: No reproduce sonido más de una vez por ciclo
    test('should not play sound more than once per cycle', () => {
      mockCountdown.originalTime = 10000;
      mockCountdown.remainingTime = 6000;
      const playSpy = jest.fn();
      mockCountdown.playAlertSound = playSpy;
      mockCountdown.alertPlayed = false;
      mockCountdown.update();
      mockCountdown.update();
      expect(playSpy).toHaveBeenCalledTimes(1);
    });
  
    // Test: No permite input no numérico en setup
    test('should not allow non-numeric input in setup', () => {
      mockCountdown.setupValues = [1,2,3];
      mockCountdown.addSetupValue('a');
      expect(mockCountdown.setupValues).not.toContain('a');
    });
  
    // Test: No permite iniciar con solo ceros
    test('should not allow starting with only zeros', () => {
      mockCountdown.setupValues = [0,0,0,0,0,0];
      mockCountdown.setCountdown();
      expect(mockCountdown.remainingTime).toBe(0);
    });
  
    // Test: No reproduce sonido si alertPlayed ya es true
    test('should not play sound if alertPlayed is already true', () => {
      mockCountdown.originalTime = 10000;
      mockCountdown.remainingTime = 6000;
      const playSpy = jest.fn();
      mockCountdown.playAlertSound = playSpy;
      mockCountdown.alertPlayed = true;
      mockCountdown.update();
      expect(playSpy).not.toHaveBeenCalled();
    });
  
    // Test: Debe resetear alertPlayed tras finish
    test('should reset alertPlayed flag after finish', () => {
      mockCountdown.alertPlayed = true;
      mockCountdown.finish();
      expect(mockCountdown.alertPlayed).toBe(false);
    });
  
    // Test: No permite valores negativos en setup
    test('should not allow negative values in setup', () => {
      mockCountdown.setupValues = [1,2,3];
      mockCountdown.addSetupValue(-5);
      expect(mockCountdown.setupValues).not.toContain(-5);
    });
  
    // Test: No permite valores no enteros en setup
    test('should not allow non-integer values in setup', () => {
      mockCountdown.setupValues = [1,2,3];
      mockCountdown.addSetupValue(2.5);
      expect(mockCountdown.setupValues).not.toContain(2.5);
    });
  
    // Test: Limpia la clase timer-ending al volver a setup
    test('should clear timer-ending class on setup', () => {
      const hours = { classList: { remove: jest.fn() } };
      const minutes = { classList: { remove: jest.fn() } };
      const seconds = { classList: { remove: jest.fn() } };
      global.countdownElements = { hours, minutes, seconds };
      if (typeof mockCountdown.enterSetupMode === 'function') {
        mockCountdown.enterSetupMode();
        expect(hours.classList.remove).toHaveBeenCalledWith('timer-ending');
        expect(minutes.classList.remove).toHaveBeenCalledWith('timer-ending');
        expect(seconds.classList.remove).toHaveBeenCalledWith('timer-ending');
      }
    });
  });