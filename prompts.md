#Para elaborar este prompt se realizaron los siguientes pasos 
1) se redacto en ingles con la estructura sugerida en el modulo 1 del curso 
2) se solicita a una IA generativa que corriguiera ortagrafia y gramatica (correccion ortografica y gramatical con Gemini 2.5 pro preview)
3) se inicio el desarrollo y se continuo hasta desde el prompt #2 hasta el prompt #7 con  DeepSeek-V3 con DeepThink R1 activo
4) dado que el resultado no mejoraba se entrego todo el codigo y las instrucciones para correguir las fallas a Gemini Flash 2.0 

##Indicadores 
##Total de Interacciones 13
##Total de horas invertidas: 6 horas
##Porcentaje de horas invertidas en la funcionalidad Countdow %90
## Modulo con mayor dificultad:  1 countdown , llenado de datos






Prompt #1 Para Gemini 2.5 pro

 correct the grammar and spellig errors in this text
 
#Role
You are a front-end senior software developer with high skils in UX and a vast expertise in HTML and JS.
#Goal
With the information gived , you must write two scripts one in HTML and other in JS to create stopwatch and countdown tools
#Format
You will write the html code to show a windows with two options , at the rigth show the text stopwatch bellow the follow icon
<img width="40" height="40" src="https://img.icons8.com/office/40/timer.png" alt="timer"/>
and at the left add the word coundown bellow the follow icon <img width="48" height="48" src="https://img.icons8.com/color/48/timer--v1.png" alt="timer--v1"/>
, all the text and images must be simetrically distribuited, use a Google Bold 700 Italic font for the text.
Later in the stopwatch and countdown tools use the images gived you as examples, in each case use  the 
primary color used in the ICON to controls, this color for buttons #C2E41D and bold black for the numbers and letters .
The main window also must have an option to copy the HTML code 
#warning
ask if you have doubts about the process  and If you don't regconize the images and colors, the code allways must clean the window,

#Context
Both tools must have the option to stop, reset and comeback to the main window, the countdown must offer a keypad with numbers from 0 to 9 to get the inputs, the system have three boxes to fullfill the time in this format HH-MM-SS the minimun number for the HH box is 1 and the max is 99, for the MM and SS min number is 1 and the max is 99, the limit of digits is for 6 numbers the minimun is 1 digit with the number 1, if the user put in the SS box the number  99 the system must convert this number to minuts and seconds to fullfil the MM and SS boxes , this rule apply also for the MM and HH boxes in this case the system must conver the number into hours or minuts depending of the case  and fulfill boxes at the left , if the hour are higest to 99 then the HH box must add a space to set the set the number 100 in his box , in other hand the windows must also have a button with the label set, when the user press it the system must calculate the HH, MM, SS, also must have a button to with the label start that will be enable after press the set button
, the system also must offer a quick option to fullfill the HH or MM or SS to do it the windows must have a line in the footer of the windows 
with this values 24 hours , 60 minuts , 30 minuts, 60 seconds, 30 seconds when the user press anyelse of this buttons the system must clear the boxes and put the corresponding number chosed.



Respuesta de Gemini

Okay, here is the corrected and consolidated version of your prompt:

---

# Role
You are a senior front-end software developer with high skills in UX and vast expertise in HTML and JS.

# Goal
With the information provided, you must write two scripts, one in HTML and another in JS, to create interactive stopwatch and countdown tools.

# Format

## Main Selection Window:
You will write HTML code to display a main window offering two choices:

1.  **Countdown Option (Left):**
    * Display the text "Countdown".
    * Below the text, place the following icon: `<img width="48" height="48" src="https://img.icons8.com/color/48/timer--v1.png" alt="timer--v1"/>`
2.  **Stopwatch Option (Right):**
    * Display the text "Stopwatch".
    * Below the text, place the following icon: `<img width="40" height="40" src="https://img.icons8.com/office/40/timer.png" alt="timer"/>`

* **Layout:** The "Countdown" and "Stopwatch" options (text and icon pairings) should be displayed side-by-side and must be symmetrically distributed horizontally within the main window.
* **Text Styling:** All text (e.g., "Countdown", "Stopwatch", and any labels within the tools) should use a widely available sans-serif font (e.g., Arial) with `font-weight: 700;` (bold) and `font-style: italic;`. Numbers displayed (like the timer digits) should be bold black.
* **Tool Control Styling:** For buttons and interactive controls within both the Stopwatch and Countdown tools, use the color `#C2E41D`.
* **Copy Code Feature:** The main window must include an option (e.g., a button or link) labeled "Copy HTML Code" that allows the user to copy the HTML structure of this main selection window.

## Tool Interface (Stopwatch & Countdown):
* When a tool is selected, the main window's content should be cleared and replaced by the selected tool's interface.
* Use the icon images primarily for the main selection window. The control styling within the tools will rely on the specified color `#C2E41D` for buttons and bold black for text/numbers.

# Warning
* Ask for clarification if any requirements are ambiguous before proceeding with code generation.
* If specific image assets (beyond the menu icons) are intended for tool controls and are not recognized or provided, use standard HTML button elements styled with the specified color.
* The application should always "clean the window" when switching between the main menu and the tools, or between tools if direct switching were implemented, meaning the previous view is removed before the new one is rendered.

# Context

## Common Tool Features:
Both the Stopwatch and Countdown tools must include the following functionalities:
* **Stop/Pause:** A button to pause the timer.
* **Reset:** A button to reset the timer to its initial state (00:00:00:000 for stopwatch, or the set time for countdown before starting) and stop it.
* **Return to Main Window:** A button or link to go back to the main selection window.

## Countdown Tool Specifics:
* **Time Input:**
    * Provide three input boxes for the user to set the time in the format HH-MM-SS.
    * **HH (Hours):** Accepts values from 0 up to 100.
    * **MM (Minutes):** Accepts values from 0 up to 59.
    * **SS (Seconds):** Accepts values from 0 up to 59.
    * Input fields should visually suggest the two-digit format (e.g., placeholders like `00`) but allow for necessary digits (e.g., 3 for hours if > 99).
* **Keypad:**
    * Include a numerical keypad (0-9) for entering time into the HH, MM, SS input boxes. The keypad should input into the currently focused input box.
* **"Set" Button:**
    * After the user inputs values into HH, MM, SS boxes (either directly or via keypad), they press a "Set" button.
    * This action will validate and normalize the time. For example:
        * If SS field has `75`, it becomes `1` minute and `15` seconds; the `1` minute is carried over to the MM field.
        * If MM field then has `62` (after a carry-over or direct input), it becomes `1` hour and `2` minutes; the `1` hour is carried over to the HH field.
    * The "Start" button (see below) becomes enabled only after "Set" is successfully pressed and a valid time (greater than 0 seconds total) is configured.
* **"Start" Button:**
    * Once enabled, pressing "Start" begins the countdown from the time established via the "Set" button.
    * While counting down, this button's label could change to "Stop" or "Pause".
* **Quick Time Set Options:**
    * In the footer of the countdown tool's window, provide quick-set buttons with the following labels and actions (pressing one clears previous HH-MM-SS input and applies the new values, which then still need to be confirmed with "Set" before starting):
        * "24 hours" (sets HH=24, MM=00, SS=00)
        * "60 minutes" (sets HH=01, MM=00, SS=00)
        * "30 minutes" (sets HH=00, MM=30, SS=00)
        * "60 seconds" (sets HH=00, MM=01, SS=00)
        * "30 seconds" (sets HH=00, MM=00, SS=30)
* **Display:** Show the remaining time clearly, updating every second.

## Stopwatch Tool Specifics:
* **Display:**
    * Show the elapsed time in HH:MM:SS:MS format (Hours:Minutes:Seconds:Milliseconds). For milliseconds, display three digits (000-999). Example: `00:00:00:000`.
* **Controls:**
    * **Start Button:** Begins timing. When running, this button's text should change to "Stop".
    * **Stop Button:** Pauses timing. When paused, this button's text should change back to "Start" (or "Resume").
    * **Reset Button:** Stops the timer (if running or paused) and resets the displayed time to `00:00:00:000`.
You can check the attached examples to understand the boxes, buttons, layouts as example
---


Prompt # 2  Para DeepSeek-V3
The background in the countdown must be #7CB342. Also, when the user presses numbers on the number pad in the countdown application, the system doesn't fill the boxes, and the reset button doesn't clean the boxes. The number pad must have a 0 in the center.
On the other hand the stopwatch must have the background colour #8BB7F0, and the box for seconds must not exceed two digits,
Prompt #3 
give me all the HTML code again

Prompt #4
The stopwatch tool must have only three boxes with two digits the thirth box from the rigth to the left start with two digits and can increase each time that it  need space to record the cumulative hours so the HH can increase without limit. Give all the code again with these changes in separated files .

Prompt #5
The thirth box that is assigned to record the hours is starting with one digit instead two digits after press the start button, please correct it to armonize the visual experience, also add instructions in a litle banner in the windows footer, explaining the objetive of the tool and the functions of each button.
please give me the complete HTML code and the .JS with the changes in this last case if it is neccesary in separated files .

Prompt #6:
Related with the countdown tool, all the digits must strart with 0 and every time that the user press a number in the keypad this number must be copied to the first digit in the first time box, if the user press more numbers all the digits stored in the time box must move to the next digit ate the rigth in the time boxes, when the last digit in the thirth time box is filled the boxes can´t accept more imputs. Ask the neccesary questions before to write the code to understad your analisys.   

Example of this functionality:  The user enter 196808 the firts number is copied to the first digit in the first time box, when the user press the number 9
the number 1 is copied to the second digit in the time box and the number 9 is copied to the first digig in the firts box, please check the image Countdown Example Fill Digits.png as example of the final outcome, after all the user press the button Set and then is calculate the hours, minuts and seconds please check the file Countdown Example Calculate Time.png as example of final outcome, after this calc the start button is enable, also add instructions in a litle banner in the windows footer, explaining the objetive of the tool and the functions of each button. 

Prompt #7 
in this version of the code I lost the main menu and the sotpwatch tool, please corret it and, I´m attaching the previus version, use it to 
recover these functionalities, also I can now enter numbers using the keypad but the it does not working as I need, when I type a number it must be enteredto the fist digit in the time box undertanding that start from the rigth to the left, if is press another number the current digit mus be copied to the next space and the new number must be writed in the first digit, in other hand the calcutaltion is wrong, fos instante if I put a 80 minuts the script must calculate how much hours represent it, in this case dividing 80/60 minuts the results 1,333 so it is equal to one hour (60x1) and 20 minuts (1x0.3333),     
please give me the complete HTML code and the .JS with the changes in this last case if it is neccesary in separated files 

Prompt #8: Used in Gemini 2.0 Flash

# Role
You are a senior front-end software developer with high skills in UX and vast expertise in HTML and JS.

# Goal
With the information provided, you must correct two scripts, one is an HTML code and another in a JS, both create an interactive stopwatch and countdown tools.

# Format

## Main Selection Window:
You will write the final HTML and JS code to correct a problem in the Countdown Option, 

# Warning

don´t change fonts, layouts  and colors, use the HTML and JS as base

# Context

Take this specifications and both files attached to correct,  analize and test the code logic 

## Countdown Tool current Specifics:
* **Time Input:**
    * Provide three input boxes for the user to set the time in the format HH-MM-SS.
    * **HH (Hours):** Accepts values from 0 up to 100.
    * **MM (Minutes):** Accepts values from 0 up to 59.
    * **SS (Seconds):** Accepts values from 0 up to 59.
    * Input fields should visually suggest the two-digit format (e.g., placeholders like `00`) but allow for necessary digits (e.g., 3 for hours if > 99).
* **Keypad:**
    * Include a numerical keypad (0-9) for entering time into the HH, MM, SS input boxes. The keypad should input into the currently focused input box.
* **"Set" Button:**
    * After the user inputs values into HH, MM, SS boxes (either directly or via keypad), they press a "Set" button.
    * This action will validate and normalize the time. For example:
        * If SS field has `75`, it becomes `1` minute and `15` seconds; the `1` minute is carried over to the MM field.
        * If MM field then has `62` (after a carry-over or direct input), it becomes `1` hour and `2` minutes; the `1` hour is carried over to the HH field.
    * The "Start" button (see below) becomes enabled only after "Set" is successfully pressed and a valid time (greater than 0 seconds total) is configured.
* **"Start" Button:**
    * Once enabled, pressing "Start" begins the countdown from the time established via the "Set" button.
    * While counting down, this button's label could change to "Stop" or "Pause".

#Specifics that must be created also
* **Quick Time Set Options:**
    * In the footer of the countdown tool's window, provide quick-set buttons with the following labels and actions (pressing one clears previous HH-MM-SS input and applies the new values, which then still need to be confirmed with "Set" before starting):
        * "24 hours" (sets HH=24, MM=00, SS=00)
        * "60 minutes" (sets HH=01, MM=00, SS=00)
        * "30 minutes" (sets HH=00, MM=30, SS=00)
        * "60 seconds" (sets HH=00, MM=01, SS=00)
        * "30 seconds" (sets HH=00, MM=00, SS=30)
* **Display:** Show the remaining time clearly, updating every second.




Prompt #8.0
currently if you enter numbers in the keypad the system fill the firts digit in the first box later continue with the second digit, I need that the number in the firts digit always move to the left every time that the user entre a number until the user fullfill all the six digits, if the user press the Set button that will be enable allways until the user press the Start button. Ask the neccesary questions before to write the code to understad your analisys.   

Prompt 8.1

Answers below 1 ) Yes and Yes  2) After six digits, you can show a text message that tells the user that it is time to press the Set Button  3) no, the direct input in the fields never will be available only by keypad and with the Quick Enter located in the footer of the windows, that by the way must have his instructions 4) Yes after reset and after Set button are pressed, please proceed to write both  scripts 

Prompt 8.2
The set button is never activated, please check it. On the other hand we continue with the same problem when you try to input numbers, really don´t move the digits from the right to the left everytime that the user press a number, please review and ask question if you need change all the logic for this function please go ahead, give me both scripts

Prompt 8.3
Great job, the normalisation is working. Please add the star button to start the countdown and correct this problem, when the user type for example the corresponding keys to enter this 687965 , the Countdow tool must show the number 687965, this means that the tool start writing the 6 in the firs digit. When the user type the number 8 then the six is moved to the left, so the first box of second have the number 68, later when the user press the 7 and 9 the second box for minutes will have the number 68 and the box for seconds have the number 79 , after all the distribution is 68 for HH box, 79 for Minuts and 65 for seconds, please let me know how can you achieve this goal after codify.