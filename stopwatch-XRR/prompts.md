El código ha sido generado utilizando ChatGPT-4.1
-------------------------------------------------------------------------------------------------------------------------------------

## You are an expert web developer

Create a webpage that functions as both a stopwatch and a countdown timer, following these acceptance criteria:

### Technical criteria

1. Separate the code into `index.html` and `script.js`.
2. Use only Vanilla JS (no frameworks).
3. Apply SOLID principles in the JavaScript code.
4. Implement clear logs in the console for every main action (start, pause, reset, set countdown, switch mode, errors, etc).
5. Catch all possible exceptions and log them.
6. For styling, use Tailwind CSS.
7. The website must be responsive and display correctly on both desktop and mobile.
8. Ensure accessibility (keyboard navigation, ARIA labels where needed).

### Functional criteria

1. **Main screen:** Allow the user to choose between **Stopwatch** and **Countdown** modes. Each mode should be clearly indicated with a large button/icon (see the attached image for reference).
2. **Stopwatch Mode:**
    - Display the time in `HH:MM:SS:MS` format.
    - Buttons: **Start** (turns into **Pause** when running), **Clear**.
    - While running, update the time every 10ms or less.
    - The Start button should be disabled or changed to Pause while running.
3. **Countdown Mode:**
    - Before starting, allow the user to set the countdown time using numeric buttons (0-9) and a **Set** button (see example image). There should also be a **Clear** button to reset the entry.
    - Show the set time in the same `HH:MM:SS:MS` format.
    - Once set, show **Start** (turns into **Pause**) and **Clear** buttons.
    - When the countdown reaches zero, display a clear alert (visual effect and sound).
    - Do not allow starting with zero seconds.
    - If the user tries to start with an invalid/empty time, show an error with Tailwind styles and prevent starting.
4. In both modes, include a **Back** button to return to the main selection screen.
5. All controls (mode selection, number input, start/pause, clear, back) must be usable with keyboard navigation.
6. Log every significant action to the console (including errors and resets).
7. After **Clear** or when switching modes, the timer should return to the initial state.
8. Prevent starting the timer multiple times at once.
9. The interface must follow the structure, colors, and general feel of the attached example image (see attached "Screenshots.png").

### General criteria

1. Add an attractive, fun title and a brief description of the tool’s use.
2. Ask me for any missing details you need before building (such as preferred alert sound, custom colors, text language, etc.).
3. The layout, colors, and elements must be inspired by the attached reference image ("Screenshots.png") that shows all the different app screens and flows.
4. If you have suggestions for extra features or improvements, let me know before coding.

**Attachment:**  
I am providing a sample image (“Screenshots.png”) that shows the reference design and screen flows for all the main screens and interactions.  
**Base your design and user flow on this image.**

-------------------------------------------------------------------------------------------------------------------------------------
RESPUESTA ChatGPT
-------------------------------------------------------------------------------------------------------------------------------------

¡Perfecto! Antes de crear el prompt final y el código, me lo dices si quieres matizar alguno de estos detalles:

Dudas para afinar el desarrollo
	1.	Idioma:
	•	¿Prefieres la interfaz en español, catalán, inglés, o que sea multilenguaje?
	2.	Colores:
	•	¿Mantengo los colores de la imagen (verde para iniciar/pausar, rojo para borrar, azul para cabecera/fondos)?
	•	¿Algún color corporativo o personalización extra?
	3.	Sonido de alerta:
	•	¿Quieres un beep clásico, un sonido divertido o prefieres poder subir tu propio sonido?
	4.	Fuente/tipografía:
	•	¿Alguna fuente específica, o tipo de letra grande y legible como en la referencia?
	5.	Animaciones:
	•	¿Te gustaría algún efecto cuando termina la cuenta atrás (parpadeo, shake, etc.), o con la aparición de errores?
	6.	Accesibilidad:
	•	Además de navegación por teclado y ARIA, ¿quieres soporte para lectores de pantalla?
	7.	Funcionalidad extra sugerida (opcional):
	•	Historial de tiempos: Mostrar los últimos 5 tiempos completados.
	•	Tema claro/oscuro: Cambio rápido de apariencia.
	•	Botón de copiar tiempo: Para copiar el resultado al portapapeles.
	•	Persistencia temporal: Guardar el estado si el usuario recarga la página.

⸻

¿Te gustaría alguno de estos extras?

-------------------------------------------------------------------------------------------------------------------------------------
RESPUESTA USUARIO
-------------------------------------------------------------------------------------------------------------------------------------

1. Inglés.
2. Mantén el diseño de la imagen.
3. No, sin sonidos.
4. Lo mas parecido a la imagen.
5. Los botones al hacer hover que tengan un fondo verde o sombreado verde pero muy sutil. Al cambiar de vista, cuando seleccionamos Stopwatch, que haga una pequeña animación hacia la derecha y el Countdown hacia la izquierda.
6. No.
7. No.

-------------------------------------------------------------------------------------------------------------------------------------
RESPUESTA ChatGPT
-------------------------------------------------------------------------------------------------------------------------------------

¡Gracias, Xavi! Perfecto, aquí tienes el prompt en formato Markdown listo para usar en ingeniería de prompts, totalmente adaptado a tus respuestas y a la imagen de referencia.

# Prompt: Stopwatch & Countdown Web App

Create a responsive web application that functions as both a **stopwatch** and a **countdown timer**.  
**Base all design and user flow decisions on the attached reference image "Screenshots.png"**.

---

## Technical criteria

1. **Separation:**  
   - All code must be separated into `index.html` and `script.js`.
2. **JavaScript:**  
   - Use only Vanilla JS (no frameworks).
   - Code must apply SOLID principles.
3. **Logging:**  
   - Log all significant actions (start, pause, clear, set countdown, switch mode, errors, etc.) to the console with clear messages.
   - Catch and log all possible exceptions.
4. **Styling:**  
   - Use [Tailwind CSS](https://tailwindcss.com/) for all styles.
   - The UI must closely match the reference image:
     - Green for start/pause buttons, red for clear, blue for header/borders, etc.
     - Use a large, clear, accessible font similar to the example.
     - Responsive design (mobile & desktop).
   - On button hover, apply a subtle green background or shadow.
   - When switching between Stopwatch and Countdown, animate the view sliding: Stopwatch slides right, Countdown slides left.
5. **Accessibility:**  
   - Ensure full keyboard navigation for all controls.
   - Use ARIA labels where appropriate.

---

## Functional criteria

1. **Main selection screen:**  
   - User can select either Stopwatch or Countdown.
   - Each option has a large icon and clear text label ("Stopwatch" with up arrow, "Countdown" with down arrow), as in the reference.
2. **Stopwatch mode:**  
   - Show time in `HH:MM:SS:MS` format.
   - Buttons: **Start** (switches to **Pause**), **Clear**, **Back**.
   - Timer updates every 10 ms or less.
   - Prevent multiple starts; "Start" button changes to "Pause" when running.
   - Back button always returns to main selection screen and resets timer.
3. **Countdown mode:**  
   - Before starting, allow the user to enter the countdown time via numeric buttons (0-9), a **Set** button, and a **Clear** button.
   - Time display in `HH:MM:SS:MS` format.
   - Once set, show **Start** (switches to **Pause**), **Clear**, **Back**.
   - Do not allow starting if time is zero. If attempted, show a clear error message (using Tailwind styles) and prevent start.
   - When the countdown reaches zero, show a clear visual alert (no sound required).
   - All transitions and button states must follow the image reference (see "Screenshots.png").
   - Prevent multiple starts.
   - Back button resets timer and returns to main selection.
4. **General:**  
   - After "Clear" or switching modes, timers always reset to initial state.
   - All controls and interactions must be accessible via keyboard.
   - All main actions and errors must be logged to the console.

---

## General requirements

- **Title & Description:**  
  - Add a fun and attractive title and a short description of the tool’s purpose at the top of the main page.
- **Language:**  
  - All interface and messages in English.
- **Design:**  
  - Match the visual structure, colors, button sizes, icons, and layout as closely as possible to the attached "Screenshots.png".
- **Animations:**  
  - When switching between modes, animate the panel sliding (Stopwatch to right, Countdown to left).
  - On button hover, use a subtle green highlight or shadow.
- **No alert sounds needed.**
- **No additional features required.**

---

**Attachment:**  
- "Screenshots.png" (reference for design, layout, and flow)

---

**IMPORTANT:**  
- If any action or screen is ambiguous, always prioritize what is shown in the reference image.
- Do not add extra functionality beyond what’s specified.