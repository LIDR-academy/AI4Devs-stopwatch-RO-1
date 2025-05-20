# Rol
 Eres un experto en desarrollo web.
 
# Objetivo
 Crear un pagina web que incluya un cronómetro.
 
# Formato
 Quiero el codigo necesario para incluirlo en la pagina web, el codigo debe estar dividido en html, css y javascript.
 
# Historia de Usuario: Funcionalidad de cronometro en pagina web
 ## Resumen
 La pagina web debe incluir un cronometro funcional que muestre el tiempo en horas, minutos, segundos y milisegundos. Debe tener dos botones, uno para iniciar, pausar o continuar, y otro boton para limpiar el tiempo medido.
 ## Descripción de la Funcionalidad
 Los usuarios pueden usar un cronometro que se puede acceder a traves de una pagina web.
 - El cronometro se visualizara de la siguiente manera: "HH:MM:ss.SSS" en donde "HH" es la hora transcurrida, "mm", son los minutos transcurridos, "ss" los segundos transcurridos, y "SSS" los milisegundos transcurridos.
 - El cronometro debe iniciar en "00:00:00.000".
 - El boton de iniciar tendra tres estados: "Iniciar", "Pausar", y "Continuar".
 - EL estado "Iniciar" despues de pulsado debe empezar a avanzar el cronometro y el estado del boton debe cambiar a "Pausar".
 - El estado "Pausar" debe tener como etiqueta la palabra "Pause", y al presionarse debe conservar en pantalla el tiempo transcurrido hasta ese momento y cambiar el estado a "Continuar".
 - El estado "Continuar" debe tener como etiqueta la palabra "Continue", y al presionarse debe permitir avanzar el cronometro y cambiar al estado "Pausar".
 - El boton de limpiar solo tendra un estado el cual permitira reiniciar el cronometro.
 - El cronometro estara ubicado en el centro de la pantalla y debajo estaran los botones de inicicar y limpiar.
 - El boton de inicicar estara ubicado a la izquierda y el de limpiar a la derecha.
 - la pagina sera responsiva, y tambien debera tener opciones de accesibilidad.
 
# Ajustes
 Con base en el codigo anterior, vamos a modificarlo para que incluya una lista que va a contener el tiempo que se toma cada vez que se pulsa el boton pausar y un titulo para la pagina.
 - La lista debera de estar ubicada debajo de los botones de iniciar y limpiar.
 - Cuando se presione el boton de iniciar en el estado de "Pausar" se debera adicionar el tiempo al final de la lista.
 - Cada item de la lista debera incluir un numero con el valor de la posicion del item en la liste empezando por el numero 1.
 - Cuando se presione el boton de limpiar se debera reiniciar el cronometro y adicionalmente limpiar la lista.
 - Adicionar un titulo que diga "Stopwatch" encima del cronometro.
 
# Ajustes
 Vamos a mover todo hacia la parte superior de la pagina
 
# Ajustes
 El valor del tiempo que se muestra al estar en el estado "Pausar" debe coincidir con el valor del respectivo item de la lista.
 
# Ajustes
 Generar la documentacion de uso de la aplicacion en formato markdown