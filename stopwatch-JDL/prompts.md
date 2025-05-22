1º Prompt a ChatGPT o4

    Si quisiera pedirte que me dieses el código HTML y JS para crear esta aplicación web:
    https://www.online-stopwatch.com/#google_vignette

    Que historia de usuario debería pedirte teneindo en cuenta que:

        Es clave que solo sean dos ficheros, uno HTML y otro JS.
        Te paso una captura de pantalla de cada funciónnalidad para que tengas info extra.
        Asegurate de tener en cuenta el diseño, colores y responsive.



2º Prompt a ChatGPT o4-mini-high.
    He usado la plantilla de Alvaro de la clase anterior y he incluido la historia de usaurio que he obtenido en el prompt anterior.
    Y he incluidotres capturas de pantalla de online-stopwatch.
        1. La home
        2. Al acceder a StopWatch
        3. Al acceder a Countdown


# Rol
Eres un experto en desarrollo de aplicaciones web con HTML y JavaScript.

# Objetivo
Dada la historia de usuario incluida y criterios de aceptación incluidos a continuación y apoyado en las capturas de pantalla que te adjunto, necesito que crees una aplicación web que contenga dos funiones: Un Stopwathch y un Countdown

# Formato
Necesito que me entregues el código en un archivo HTML y en otro JS

# Historia de Usuario
Como usuario que necesita medir intervalos y contar regresivamente de forma sencilla,
quiero una aplicación web en un único index.html y un único script.js que me permita:
	1.	Seleccionar modo (Cronómetro / Temporizador) desde una pantalla inicial.
	2.	Cronómetro con visualización de HH:MM:SS y milisegundos, botones Start/Pause y Clear.
	3.	Temporizador con teclado numérico para introducir horas, minutos y segundos (botones 5-6-7-8-9 / 0-1-2-3-4), botón Set para fijar el tiempo, Start/Pause y Clear.
para poder alternar fácilmente entre medir tiempo transcurrido y contar hacia atrás, con una interfaz clara y atractiva sin depender de múltiples archivos o librerías externas.

## Criterios de Aceptación
    1. Estructura de ficheros
        •	Solo dos ficheros:
        •	index.html (markup + estilos mínimos en <style>).
        •	script.js (toda la lógica).
        •	No se usan frameworks externos ni CSS/JS adicionales.

    2. Pantalla de selección de modo
        •	Header y footer con fondo azul oscuro (#003366).
        •	Área central dividida en dos paneles verticales:
        •	Panel izquierdo “Stopwatch” con flecha verde.
        •	Panel derecho “Countdown” con flecha roja.
        •	Al hacer clic en un panel, navegar a la pantalla correspondiente.

    3. Cronómetro
        •	Display grande con fondo claro (#eef2ff), borde redondeado y texto negro, formato 00:00:00 000.
        •	Botones debajo:
        •	Start: botón rectangular con degradado verde (#32CD32 → #7CFC00).
        •	Clear: botón rectangular rojo (#FF0000).
        •	Funcionalidad:
        •	Start ↔ Pause.
        •	Clear pone a 0 y vacía posibles “laps” (si se amplía luego).

    4. Temporizador
        •	Mismo Display que en cronómetro, muestra tiempo restante.
        •	Teclado numérico: dos filas de 5 teclas:
        •	Fila 1: 5 6 7 8 9 + botón Set (verde).
        •	Fila 2: 0 1 2 3 4 + botón Clear (gris claro #CCCCCC).
        •	Al pulsar dígitos, se va rellenando HHMMSS de izquierda a derecha.
        •	Set fija el temporizador y habilita Start.
        •	Clear borra la entrada antes de Set o reinicia a la duración original tras Set.
        •	Start inicia la cuenta atrás; Pause la detiene; al llegar a 0, parpadea el display en rojo y/o emite un pitido (opcional).

    5. Navegación y estados
        •	En ambas pantallas (cronómetro/temporizador) habrá un enlace “← Back” (barra azul) para volver a la selección de modo.
        •	Footer idéntico en todas las pantallas (botones “Add to My Page!”, “Go Fullscreen!”, etc.) con estilo consistente.

    6. Responsive y accesibilidad
        •	Layout fluido para móvil y escritorio.
        •	Botones con :hover y :active (ligera sombra o cambio de opacidad).
        •	Texto con contraste adecuado y tamaños legibles.
