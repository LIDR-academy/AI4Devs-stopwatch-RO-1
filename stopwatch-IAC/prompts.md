chatgpt | 4o

## Rol
Eres un **desarrollador front-end senior** experto en HTML5, CSS3 y JavaScript sin frameworks (Vanilla JS). Tu meta es entregar código listo para producción, legible y bien comentado.

## Objetivo
Construye una página web que combine un **cronómetro (stopwatch)** y un **temporizador de cuenta atrás (countdown)** con una apariencia igual o muy similar a la imagen adjunta (estilo *online-stopwatch.com*).

### Diseño base
- Display rectangular de bordes redondeados, fondo azul muy claro (#ecf0ff aprox.) y borde gris oscuro.
- Dígitos negros gigantes para HH:MM:SS y milisegundos más pequeños alineados abajo a la derecha.
- Dos botones grandes centrados debajo del display:
    - **Start / Pause / Resume** verde (gradiente vertical lima).
    - **Clear / Reset** rojo (gradiente vertical rojo vivo).
- Tipografía sans-serif gruesa (por ejemplo, *Digital 7* o monoespaciada como fallback).

### Funcionalidades mínimas
1. **Cronómetro**
    - `Start`, `Pause/Resume`, `Clear`.
    - Actualización cada ~33 ms usando `requestAnimationFrame` o `setInterval`.
    - El tiempo no se pierde al pausar y reanudar.

2. **Cuenta atrás**
    - Campo de entrada HH:MM:SS o modal para fijar duración.
    - Misma lógica de botones; al llegar a 00:00:00 suena un beep HTML5 y el display parpadea.

3. **Extras (opcionales)**
    - Persistir último modo y valor en `localStorage`.

## Entregables ❗
- **index.html**
    - Estructura semántica (`<main>`, `<section>`, etc.).
    - Incluir **todo el CSS dentro de un bloque `<style>`** al final del `<head>`. No se debe generar un archivo CSS aparte.
    - Enlazar un único archivo externo **`script.js`** mediante `<script src="script.js" defer></script>` al final del `<body>`.

- **script.js**
    - Código modular en Vanilla JS, sin librerías.
    - Comentarios JSDoc y buenas prácticas (ESLint recommended).
    - Funciones separadas: `formatTime`, `startTimer`, `pauseTimer`, `resetTimer`, `switchMode`, etc.
    - Evitar contaminar el scope global usando IIFE o módulos ES6.

## Buenas prácticas
- Indentación de 2 espacios.
- Nombres en *camelCase* en inglés.
- Accesibilidad: roles ARIA y contraste AA.
- Todo debe funcionar abriendo **index.html** con doble clic, sin build tools.

## Instrucciones de salida
1. Devuélveme **solo dos bloques de código**:
    - Un bloque ```html``` con **el archivo completo `index.html`** (incluyendo el `<style>` interno).
    - Un bloque ```javascript``` con **el archivo completo `script.js`**.
2. Después de los archivos, añade **una guía de uso** de ≤ 5 líneas (cómo iniciar cronómetro y cuenta atrás).

