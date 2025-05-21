### PROMPT PARA GENERAR UN CRONÓMETRO Y TEMPORIZADOR

#### Etapa 1: Generar estructura HTML y estilos CSS puros basados en imágenes de referencia

ChatGPT, necesito que actúes como un desarrollador experto en front-end.

Toma como base de diseño las siguientes imágenes que representan una interfaz limpia y moderna para una aplicación web con dos funcionalidades: un **cronómetro** (conteo incremental) y un **temporizador** (cuenta regresiva):
- HOME.PNG (pantalla inicial con botones para acceder a cronómetro y temporizador)
- CRONOMETRO.PNG (interfaz del cronómetro)
- TEMPORIZADOR.PNG (interfaz del temporizador)

No copies el estilo de https://www.online-stopwatch.com. Usa únicamente HTML, CSS y JavaScript puros (sin frameworks, sin librerías externas). Los colores, formas de botones, disposición de textos y tipografías deben reflejarse lo más fielmente posible según las imágenes.

Genera un archivo `index.html` que incluya:
- La estructura HTML para las tres pantallas: Home, Cronómetro y Temporizador. Cada pantalla puede estar dentro de una sección o div que se muestre u oculte según navegación.
- Incluye comentarios detallados en el código explicando la función de cada sección.

Genera también un bloque `<style>` embebido o una hoja CSS interna para los estilos básicos. El diseño debe ser responsive y estar optimizado para pantallas móviles.

**NO INCLUYAS aún ninguna funcionalidad de cronómetro o temporizador en JavaScript en esta etapa.**

---

#### Etapa 2: Agregar funcionalidad en JavaScript puro para el cronómetro

Añade a `script.js` la funcionalidad de un **cronómetro incremental** que permita:
- Iniciar
- Pausar
- Reiniciar

Utiliza `setInterval()` para actualizar el cronómetro cada segundo (con precisión de décimas si se puede). Refleja el tiempo en formato `MM:SS` o `MM:SS:DS` si agregas décimas.

El botón "Iniciar" cambia a "Pausar" dinámicamente cuando el cronómetro está corriendo. Al presionar "Reiniciar", el contador vuelve a cero.

Agrega comentarios explicativos en el código.

---

#### Etapa 3: Agregar funcionalidad en JavaScript puro para el temporizador

Añade al mismo archivo `script.js` la lógica para un **temporizador regresivo**:
- Permite al usuario definir un tiempo inicial con controles (selects o inputs para minutos y segundos)
- Iniciar la cuenta regresiva
- Pausar
- Reiniciar
- Al llegar a 00:00, el temporizador emite un pitido de 0,5 segundos de duración (usa `AudioContext` o un archivo `.wav` o `.mp3` corto)

Asegúrate de que el diseño se mantenga fiel a la imagen TEMPORIZADOR.PNG y que se use `setInterval()` de forma eficiente.

Agrega comentarios detallados para explicar el funcionamiento.

---

#### Consideraciones finales

- La navegación entre pantallas (Home → Cronómetro / Temporizador y viceversa) debe manejarse sin recargar la página, ocultando y mostrando elementos.
- Toda la solución debe entregarse en dos archivos principales: `index.html` y `script.js`.
- La estructura, el diseño y las funcionalidades deben replicar con fidelidad las imágenes entregadas.

---

**Chatbot utilizado:** ChatGPT (GPT-4)

Este prompt debe ser incluido en el archivo `prompts.md` del repositorio y también copiado como comentario en el Pull Request final.