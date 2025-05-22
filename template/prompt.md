en Gemini 2.5 preparar el prompt

Actúa como un prompt engineering especializado en prompts para la programación web en html y javascript. Debes darme el mejor prompt posible para la creación de una aplicación web que contenga un cronometro.
##Funcionalidades:
Poder elegir cronometro normal o cuenta atrás
Opciones de parada y reinicio y reiniciar el cronometro
El usuario debe poder elegir las horas, minutos, y segundos para la cuenta atras
En la cuenta atrás debe finalizar al llegar a cero. Parpadear los números del reloj y emitir un sonido cada 2 segundos hasta pulsar finalizar
En la funcionalidad de cronometro debe poder registrar el tiempo al pulsar la opción vuelta. Este tiempo debe ir aparecien debajo del cronometro aumentando el número de vuelta en 1 cada vez que se pulse.
##Criterios técnicos minimos
Debe cumplir con las buenas practicas en programación
Ser una web responsitive
Optimizar la carga de la misma
Usar html5
Usar taiwind CSS
Control de errores
Debe ser una página moderna y atractiva visualmente.
Incluye todas las especificaciones que consideres oportunas en el prompt para llevar a cabo esta tarea.
Realizame todas las preguntas que consideres necesarias para llegar al mejor prompt
Una vez contestadas estas preguntas dame el prompt en formato markdown
Usa la imagen como ejemplo de presentación del cronometro.

---------

Respuesta:

¡Excelente! Para poder generar el mejor prompt posible, necesito entender algunos detalles más sobre tu visión para esta aplicación.

Aquí van mis preguntas:

Selección de Modo (Cronómetro/Cuenta Atrás):

¿Cómo imaginas que el usuario seleccionará entre el modo cronómetro normal y el modo cuenta atrás? ¿Será mediante pestañas, botones de radio, un menú desplegable, o alguna otra interfaz?

Entrada para Cuenta Atrás:

Para la cuenta atrás, ¿cómo debería el usuario ingresar las horas, minutos y segundos? ¿Campos de texto separados para cada unidad? ¿Selectores numéricos (number inputs)? ¿Un solo campo donde se espera un formato como HH:MM:SS?

Comportamiento al Finalizar Cuenta Atrás:

Cuando la cuenta atrás llega a cero y comienza a parpadear y sonar, mencionas "hasta pulsar finalizar". ¿Este botón "Finalizar" es el mismo que "Parar" (que cambiaría su texto y función), o es un botón nuevo que aparece en ese momento?

¿Qué tipo de sonido tienes en mente? ¿Un beep simple? ¿Debe ser un archivo de audio específico?

Botones y su Texto:

La imagen muestra "Start" y "Clear". Entiendo que "Start" se alternará con "Stop" (o "Parar"). "Clear" imagino que es "Reiniciar".

Para la funcionalidad de "vuelta" en el cronómetro, ¿qué texto debería tener ese botón? (Ej: "Vuelta", "Lap", "Marcar Tiempo").

Visualización de Vueltas:

¿Cómo te gustaría que se muestren las vueltas debajo del cronómetro? ¿Una lista simple? ¿Una tabla con "Vuelta #" y "Tiempo"? ¿Hay un límite de vueltas a mostrar o debería ser una lista con scroll si hay muchas?

Diseño Visual y Ejemplo:

La imagen proporcionada es bastante clara para la disposición del temporizador en sí. ¿Quieres que el diseño se adhiera estrictamente a los colores y estilo de esa imagen (fondo del display celeste claro, botón Start verde, botón Clear rojo), o prefieres que se tome como inspiración para la disposición general y se aplique un estilo moderno y atractivo usando Tailwind CSS con más libertad creativa (quizás con un tema claro/oscuro, o paletas de colores sugeridas por Tailwind)?

¿Hay alguna preferencia por la tipografía?

Optimización de Carga:

¿Alguna técnica específica de optimización en mente además de las generales (minificación, etc.)? Por ejemplo, ¿carga diferida de algún recurso si fuera aplicable? (Probablemente no mucho para esta app, pero por preguntar).

Control de Errores Específico:

Además del control general de errores, ¿hay algún escenario particular que te preocupe? (Ej: ¿qué pasa si el usuario introduce texto no numérico en los campos de cuenta atrás?)

Milisegundos:

La imagen de ejemplo muestra "000" para milisegundos. ¿Debería el cronómetro/cuenta atrás mostrar milisegundos siempre, o es opcional/configurable?

Una vez que tenga tus respuestas, podré construir un prompt mucho más preciso y completo.

Esperando tus respuestas...

-------------

1.- Botón de radio
2.- Campos de texto separados. Asegura que el usuario ingrese solo valores validos y advierte si no es correcta la entrada en alguno.
3.- Es el mismo cambiando de función
4.- Botón de "Start": Sera "Comenzar" y se alternará con "Parar". "Clear" será el de "Reiniciar". La función "vuelta" tendrá el texto "Marcar tiempo"
5.- En una tabla con "Vuelta #" y "Tiempo" y deberá tener un scroll si hay muchas
6.- Aplica un estilo moderno y atractivo con Tailwind y total libertad creativa
7.- ninguna
8.- El del ejemplo es uno de los que me preocupa
9.- Debe aparecer siempre

-------------

¡Perfecto! Con estas respuestas, puedo construir un prompt mucho más detallado y efectivo.

Aquí tienes el prompt:

## Prompt para Desarrollo de Aplicación Web: Cronómetro Avanzado

**Objetivo Principal:**
Crear una aplicación web de una sola página (SPA) que funcione como un cronómetro y un temporizador de cuenta atrás, utilizando HTML5, JavaScript moderno (ES6+), y Tailwind CSS. La aplicación debe ser responsive, visualmente moderna y atractiva, y seguir las buenas prácticas de programación.

**Estructura General y Diseño:**
*   **Inspiración Visual:** Tomar como referencia la disposición general del display de tiempo y los botones principales de la imagen proporcionada.
*   **Estilo Moderno con Tailwind CSS:** Utilizar Tailwind CSS para todo el estilizado. Se busca un diseño limpio, moderno y atractivo. Tienes libertad creativa para elegir una paleta de colores y tipografía que cumplan con este criterio, más allá de los colores específicos de la imagen de ejemplo (que sirve más como guía de layout del display).
*   **Responsividad:** La aplicación debe ser completamente responsive y funcional en dispositivos móviles, tablets y ordenadores de escritorio.
*   **Layout:**
    *   **Selector de Modo:** En la parte superior o en una sección claramente diferenciada.
    *   **Display Principal del Tiempo:** Grande, legible, centrado.
    *   **Controles de Entrada (para Cuenta Atrás):** Lógicamente agrupados, preferiblemente cerca del selector de modo o del display si el modo "Cuenta Atrás" está activo.
    *   **Botones de Acción Principales:** Debajo del display del tiempo.
    *   **Tabla de Vueltas (para Cronómetro):** Debajo de los botones de acción, visible solo en modo cronómetro.

**Funcionalidades Detalladas:**

1.  **Selector de Modo:**
    *   Implementar dos **botones de radio** para que el usuario elija entre "Cronómetro" y "Cuenta Atrás".
    *   Al seleccionar un modo, la interfaz debe ajustarse para mostrar solo los controles y la información relevante para ese modo.
    *   Por defecto, al cargar la página, el modo "Cronómetro" debe estar seleccionado.

2.  **Modo Cronómetro:**
    *   **Display Principal:** Mostrar el tiempo en formato `HH:MM:SS:mmm` (Horas:Minutos:Segundos:Milisegundos). Inicialmente `00:00:00:000`.
    *   **Botón "Comenzar" / "Parar":**
        *   Texto inicial: "Comenzar".
        *   Al pulsar "Comenzar": Inicia el cronómetro. El texto del botón cambia a "Parar".
        *   Al pulsar "Parar": Detiene el cronómetro. El tiempo se congela en el display. El texto del botón cambia a "Comenzar" (para reanudar).
    *   **Botón "Reiniciar":**
        *   Detiene el cronómetro si está en marcha.
        *   Resetea el display a `00:00:00:000`.
        *   Borra todas las vueltas registradas en la tabla de vueltas.
        *   Si el cronómetro estaba parado, el botón "Comenzar"/"Parar" vuelve a mostrar "Comenzar".
    *   **Botón "Marcar tiempo":**
        *   Este botón solo debe estar visible y activo cuando el modo "Cronómetro" está seleccionado Y el cronómetro está en marcha.
        *   Al pulsar: Registra el tiempo actual del display y lo añade a la "Tabla de Vueltas".
    *   **Tabla de Vueltas:**
        *   Mostrar debajo de los botones de acción.
        *   Columnas: "Vuelta #" (numeración secuencial iniciando en 1) y "Tiempo" (el tiempo registrado en formato `HH:MM:SS:mmm`).
        *   Si la lista de vueltas excede la altura visible, la tabla debe tener un scroll vertical.

3.  **Modo Cuenta Atrás:**
    *   **Campos de Entrada para Configuración:**
        *   Tres campos de texto separados para que el usuario ingrese:
            *   Horas (HH): Placeholder "HH", validación para números entre 0 y 99.
            *   Minutos (MM): Placeholder "MM", validación para números entre 0 y 59.
            *   Segundos (SS): Placeholder "SS", validación para números entre 0 y 59.
        *   **Validación de Entrada:**
            *   Solo permitir la entrada de valores numéricos.
            *   Si el usuario ingresa un valor no válido (ej. letras, número fuera de rango), mostrar un mensaje de error claro y conciso junto al campo correspondiente o en una sección de notificaciones. Impedir el inicio de la cuenta atrás si hay valores inválidos.
            *   Los campos deben limpiarse o permitir la edición para una nueva configuración.
    *   **Display Principal:** Mostrar el tiempo restante en formato `HH:MM:SS:mmm`. Inicialmente, puede mostrar `00:00:00:000` o el último tiempo configurado si se reinicia. Al configurar y comenzar, muestra el tiempo establecido.
    *   **Botón "Comenzar" / "Parar":**
        *   Texto inicial: "Comenzar". Solo se activa si se ha introducido un tiempo válido (mayor a cero segundos).
        *   Al pulsar "Comenzar": Inicia la cuenta atrás desde el tiempo configurado. El texto del botón cambia a "Parar". Los campos de entrada pueden deshabilitarse o ocultarse.
        *   Al pulsar "Parar": Detiene la cuenta atrás. El tiempo se congela. El texto del botón cambia a "Comenzar" (para reanudar).
    *   **Botón "Reiniciar":**
        *   Detiene la cuenta atrás si está en marcha.
        *   Resetea el display al último tiempo configurado por el usuario. Si no se ha configurado ninguno previamente o se desea un reseteo total, puede volver a `00:00:00:000` y habilitar los campos de entrada.
        *   Si la cuenta atrás estaba en marcha o parada, el botón "Comenzar"/"Parar" vuelve a mostrar "Comenzar". Cancela cualquier estado de "finalización" (parpadeo/sonido).
    *   **Comportamiento al Finalizar la Cuenta Atrás (Al llegar a `00:00:00:000`):**
        *   **Parpadeo:** Los números en el display principal (`HH:MM:SS:mmm`) deben comenzar a parpadear.
        *   **Sonido:** Emitir un sonido simple (ej. un "beep" generado con `AudioContext`) cada 2 segundos.
        *   **Botón "Finalizar":** El botón que antes era "Comenzar" / "Parar" debe cambiar su texto a "Finalizar".
        *   Al pulsar "Finalizar":
            *   Detiene el parpadeo de los números.
            *   Detiene la emisión del sonido.
            *   Resetea el display (ej. al último tiempo configurado o a `00:00:00:000`).
            *   El botón vuelve a su estado inicial ("Comenzar") para permitir una nueva configuración y cuenta atrás.

**Requisitos Técnicos Mínimos:**
*   **HTML5:** Utilizar estructura semántica de HTML5.
*   **JavaScript (ES6+):**
    *   Código limpio, bien organizado en funciones/módulos si es aplicable.
    *   Evitar el uso de `eval()`.
    *   Manejo preciso del tiempo (usar `Date.now()` o `performance.now()` para el cronómetro, y `setInterval`/`setTimeout` gestionados cuidadosamente, asegurando la cancelación de intervalos/timeouts al parar/reiniciar para evitar fugas de memoria o comportamientos inesperados).
    *   Buenas prácticas de programación (DRY, KISS, YAGNI).
    *   Comentarios en el código donde sea necesario para explicar lógica compleja.
*   **Tailwind CSS:**
    *   Utilizar clases de utilidad de Tailwind para todo el estilizado.
    *   Se puede incluir Tailwind vía CDN para simplificar el setup en este contexto, o si prefieres, especificar la necesidad de un archivo `tailwind.config.js` y un `style.css` compilado. (Para el LLM, CDN es más directo).
*   **Control de Errores:**
    *   Validación robusta de las entradas del usuario como se especificó para la cuenta atrás.
    *   Manejo de cualquier otro error potencial de JavaScript para que la aplicación no se rompa.
*   **Optimización de Carga:**
    *   Asegurar que el código sea eficiente.
    *   Minimizar el uso de recursos externos si no son estrictamente necesarios.

**Entregables Esperados:**
1.  Un único archivo `index.html` que contenga la estructura de la página.
2.  Un archivo `script.js` que contenga toda la lógica de JavaScript.
3.  (Si no se usa CDN para Tailwind) Un archivo `style.css` (o las instrucciones para generarlo) y el `tailwind.config.js` básico. Si se usa CDN, indicar la etiqueta `<link>` o `<script>` necesaria en el HTML.

**Consideraciones Adicionales:**
*   La precisión del cronómetro y la cuenta atrás es fundamental.
*   La interfaz debe ser intuitiva y fácil de usar.
*   Priorizar la claridad del código y la mantenibilidad.
*   Para el sonido de la cuenta atrás, generar un "beep" simple usando `AudioContext` es preferible a depender de un archivo de audio externo para este prompt.


Usando este prompt en claude 3.7 Sonnet dio el código. Para que funcionase correctamente hubo que pedir que solucionase la presentación de las tomas de tiempo.
