# Chat bot utilizado

Chat GPT (Normal) : https://chatgpt.com/

# Prompt 1

    # Role
    You are an expert software engineer full-stack, that must create a web app

    # Purpose
    Create a web app that give option two options, one of them is a stopwatcher, and second is countdown

    # Tecnical Criteria
    1. Use html and basic javascript
    2. Keep html and js file spread
    3. For styling use bootstrap with CDN
    4. Web only work with tap/clic

    # Functional Criteria
    1. Site must have three pages with navigation system:
        1.1 Page one is main, with a two buttons, to choose wich action will be start
        1.2 Page two is option for stopwatch, must have options need it for it
        1.3 Page three is option for countdown, must have options need it for it.
        1.4 All this pages must be in same html file, and must show/hide dependes of user actions.
        1.5 User could navigate between main page and options and vice versa.
    2. Option of stopwatch must implement buttons to start/pause and clear
    3. Option of countdown must implement buttons to set time, clear time, and start coundown and pause countdown

    # General Criteria
    Follow html file provided and image file as references for final presentation of web app

    # Extra information
    Ask me any information that you need to perform this task using best practices

# Answer 1

Thanks for the details and files! To build your web app following the given specs, I’ll extend your index.html to include three logical pages (main menu, stopwatch, and countdown), and create a separate script.js to handle interactivity.

Before proceeding, I have a few quick questions:

    1. Countdown input format: Should users set the countdown using dropdowns, input fields (e.g., minutes/seconds), or something else?

    2. Visual layout preference: Should the stopwatch/countdown layouts exactly match the provided stopwatch.png, or is close similarity acceptable (e.g., colors, button sizes)?

    3. Sound or alert: Do you want a sound or visual alert when the countdown reaches zero?

Let me know so I can generate the best version for you.

# Prompt 2

    The answers for your questions are:
    1. Countdown input format is clic on numbers, as buttons, and works like this example: first clic on 1, mean 00:00:01, then clic on 5, now mean 00:00:15, then clic on 0, now mean 00:01:50. With this clear mean input will start in before first clic
    2. Visual layout must be exactly in colors, button sizes and shape could be similars
    3. As alert use a visual message in the way you considere better, sounds not be included.

