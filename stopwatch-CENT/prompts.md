### Promt 1
En el promt incluyo la imagen del mockup/wireframe del diseño solicitado
![Alt text](/res/stopwatch.png)
analiza este prompt y rescribelo segun el wireframe que te pasaré "

# Role
You are an expert fullstack JS developer

# Goal

Create a webpage that reverse a string wrote by the user, following those acceptance criteria:
Technical critera:

1. Separate the html and javascript code into index.html and script.js
2. Use JS Vanilla
3. Apply the SOLID principles, separarating the logic in functions and commenting what they do
4. Implement all necesary logs in the console
5. Catch all possible exceptions
6. For CSS use tailwind
7. Make it responsive website

Functional criteria:

1. There will be an input text to write the text to reverse and the button to trigger the reverse action.
2. The minimun lenght will be 3 characters and the maximun will be 20
3. If the min and max criteria aren't accomplished, mark the input with the most appropiated tailwind style and show an error alert with a error message
4. If the text given is valid:
   4.1. Reverse it and show it bellow the input, apply the style that you consider
   4.2. Show a succesful alert
   4.3. Clean the input
   4.4. Hide the reversed text and the succesful alert after 10 seconds to be ready to use again
5. The reverse action also will be triggerred with the enter/return key

General criteria:

1. Add an attractive and funny title and description
2. It has to be responsive

Ask me all the extra information that you need before build it"

### Promt 2

# Role  
You are an **expert full-stack JavaScript developer**.

# Goal  
Create a responsive web stopwatch that reproduces the behaviour shown in the supplied wireframe.

---

## Technical criteria  
1. Split the code into **`index.html`** (markup) and **`script.js`** (logic).  
2. Use **Vanilla JS** only (no external JS libraries).  
3. Follow **SOLID** principles: encapsulate responsibilities in clearly named functions/classes and add concise comments explaining their purpose.  
4. Add meaningful **console logs** for each state-change (start, pause, resume, clear, overflow).  
5. **Handle all foreseeable exceptions** (e.g. invalid DOM access, timer overflow) without breaking the UI.  
6. Style exclusively with **Tailwind CSS**.  
7. Ensure full **responsiveness** from mobile to desktop (flex layout, fluid typography).

---

## Functional criteria  
1. Display the elapsed time in **`HH:MM:SS.mmm`** format (hours:minutes:seconds.milliseconds).  
2. A **green primary button** toggles through these states:  
   * **Start** → begins counting and changes its label to **Pause**.  
   * **Pause** → stops counting and changes its label to **Resume**.  
   * **Resume** → continues counting and changes its label back to **Pause**.  
3. A **red secondary button (Clear)** resets the counter to `00:00:00.000`.  
   * While the stopwatch is running, the Clear button must be **disabled** (or safely ignored) to avoid accidental resets.  
4. The counter must update at least every **10 ms** to give a smooth millisecond display.  
5. **Keyboard shortcuts**:  
   * `Space` → Start / Pause / Resume  
   * `C` or `Esc` → Clear (only while paused)  
6. When the counter reaches **24 h** (`23:59:59.999 → 24:00:00.000`) it must either:  
   * stop automatically and log an overflow alert, **or**  
   * wrap back to `00:00:00.000` – pick one behaviour and document it in code comments.  
7. All ARIA labels must be present so the stopwatch is **accessible** to screen readers.

---

## General criteria  
1. Add a short, **catchy title** (e.g. “Ultra Stopwatch”) and a one-line description.  
2. Maintain a visually appealing, playful aesthetic that matches the green/red button scheme in the wireframe.  
3. The design must look good on phones, tablets and large screens.

---

**Ask me any further information you need before you start building.**

### Promt 3 - Analisis de la tarea a entregar.
analiza los requisitos de la tarea e indicame un promtp con los pasos, comando e informacion que debo imcluir para entregar la tarea en github, aqui paso la tarea 
"3. Entrega el ejercicio

Como se dice en la parte final de las instrucciones, esperamos tu entrega como un pull request en el repositorio.

Para ello, debes seguir los siguientes pasos:

Hacer un fork del repositorio (botón arriba a la derecha)
Clonar (Descargar) el fork, que será un proyecto con el mismo nombre pero bajo tu usuario
Completar el ejercicio: rellenar el prompt y los archivos en tu carpeta
Crear una nueva rama para la feature del tipo solved-stopwatch
Hacer commit
⁠Git push
En la interfaz de tu repositorio te saldrá un aviso arriba para hacer ⁠Pull request
"
