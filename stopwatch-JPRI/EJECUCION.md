# EJECUCIÓN DEL PROMPT PARA CRONÓMETRO Y TEMPORIZADOR

## Etapa 1: HTML + CSS
Se generó un archivo `index.html` que incluye:

- Estructura HTML de las tres pantallas: Home, Cronómetro y Temporizador.
- Navegación entre pantallas sin recargar, usando `display: none` y clases `active`.
- Estilos CSS incrustados para diseño responsive, con botones estilizados, fondo neutro y tipografía legible.
- Elementos claves como:
  - `#cronometro-display` y `#temporizador-display` para mostrar el tiempo.
  - Inputs de minutos y segundos para el temporizador.
  - Botones claramente identificados para controlar cada función.

## Etapa 2: Lógica del Cronómetro
En `script.js` se implementó:

- Cronómetro incremental con:
  - Inicio (`setInterval`), pausa (`clearInterval`), reinicio.
  - Visualización en formato `MM:SS:CS` (minutos, segundos, centésimas).
  - Botones vinculados a su respectiva función.
- Uso de `Date.now()` para medir con precisión el tiempo real transcurrido.
- Estado gestionado con variables `tiempoTranscurrido` y `enMarcha`.

## Etapa 3: Lógica del Temporizador
También en `script.js`, se añadió:

- Temporizador con:
  - Definición del tiempo mediante inputs de minutos y segundos.
  - Inicio, pausa y reinicio del conteo regresivo.
  - Visualización en formato `MM:SS`.
- Al llegar a 00:00, el sistema reproduce un pitido de 0.5 segundos usando `AudioContext`.

## Resultado
El sistema completo cumple con los requisitos del prompt y refleja el diseño provisto en las imágenes `HOME.PNG`, `CRONOMETRO.PNG` y `TEMPORIZADOR.PNG`.

Archivos generados:
- `index.html`
- `script.js`
- `PROMPT.md` (prompt original usado)