AI Agent => ChatGPT Free Tier (aka GPT-4o or GPT-4o mini)

1) Prompt

# ROL
You are a skilled frontend developer specialized onto Vanilla JS and CSS

# PREREQUISITS
With only this 2 files 
## index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timer and Countdown</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Timer and Countdown</h1>
    <script src="script.js"></script>
</body>
</html>

## script.js
// Empty file

# GOAL
Build a webpage that offers to the user a stopwatch and countdown

# ACCEPTANCE CRITERIA
Separate the HTML and JavaScript code into index.html and script.js
Use JS Vanilla
Apply the SOLID principles
Implement all necessary logs in the console
Catch all possible exceptions
USE CSS Vanilla
Make it responsive website

# FUNCTIONAL CRITERIA
## MAIN PAGE
There will be a short description of what offers this webpage (can you be creative), with two buttons, one for the stopwatch and the other for the countdown, both of them will open a corresponding utility page

All other pages will have a back button that brings back to the main page
Add a trademark into all pages indicating you and me as creators

## STOPWATCH PAGE
There will be a watch with a digital display with milliseconds precision that can be started and stopped at will for exact timing, designed to measure the amount of time that elapses between its activation and deactivation
By default, it will show the watch initialized to zeros, waiting the activation with the user pushing the button 'Start'
There will be two buttons, one button with three states beginning with 'Start' and another button for 'Clear'
Every time the user pushes 'Clear' the watch will reset to zeros and remains idle
On the other hand, when the user pushes 'Start' the button changes its text to 'Pause' and the watch starts to count the elapsed time passed
When the user pushes 'Pause' the button changes its text to 'Continue' and the count of the elapsed time must be stopped
Finally, when the user pushes 'Continue' the watch should continue to count the elapsed time from now on without resetting the watch

## COUNTDOWN PAGE
There will be the same watch with a digital display from STOPWATCH PAGE, but this time there will be only two buttons 'Start' and 'Clear' and a numeric keypad from 0 to 9
When the user pushes 'Start' the watch should count down from the displayed time to 0 showing a millisecond precision
When the user pushes any of the numeric buttons, the watch should be filled from right to left as a FIFO queue where each position is a time degree (so if the user pushes 8, 7, 3 and 1 in this order the corresponding starting time will be 00:87:31.000)
When the count-down will reach 0 show a pop-up message telling the time has finished

# EXPECTED 
The format of the watch is a digital display following this pattern hh:MM:ss.mmm (where hh is a 24 formatted hour, MM for minutes, ss for seconds and mmm for milliseconds)
Use an attractive and fancy design

# QUESTIONS
Ask me all the extra information that you need before start


--------------------------------------------------------------------------------------------------------------------------------


1) Response
❓ QUESTIONS BEFORE STARTING
Page Structure:

You mentioned that Stopwatch and Countdown will be on separate utility pages.
✅ Should I dynamically load content via JavaScript (SPA-style) or should I create separate HTML files (e.g., stopwatch.html, countdown.html)?

URL Routing:

If separate pages: Should I make use of HTML files per tool, or are you okay with everything embedded in a single-page app using JS to toggle views?

Storage:

Should the application persist any state (e.g., session-based last timer) using localStorage or should everything reset on page refresh?

Design:

You said “fancy and attractive design”. Do you have a color scheme, style (e.g., modern, retro, minimal, cyberpunk), or any example UI you'd like me to take inspiration from?

Keyboard Input (Countdown Page):

Just to confirm: When user types digits (e.g., 8, 7, 3, 1), it becomes 00:87:31.000.
That’s not a standard time, so:

✅ Is this correct and intentional?

❓ Do you want a parser that wraps values (e.g., if minutes > 59, convert to hours)?

Or do you want to keep exact digits as they were input even if they overflow regular time formats?

Trademark Display:

How exactly should the trademark appear?
✅ Should I just include a footer like:

© 2025 Created by You and OpenAI ChatGPT
Or do you want something more specific?

Languages / Accessibility:

Should this support multiple languages (e.g., English/Catalan)?

Do you need any ARIA accessibility support or screen reader compatibility?


--------------------------------------------------------------------------------------------------------------------------------


2) Prompt

I answer you point by point.
1. It's all load dynamically via JavaScript
2. None of this, according to the answer to question 1
3. Storage isn't needed
4. A modern (not necessary the same but something like these, see https://m3.material.io/develop/web) and minimalistic will be great
5. Good point, add a parser that wraps the final value to a valid standard time
6. It's just fine, but use my name instead of "you", my name is Genís Ortiz
7. You can be creative because this is an academic exercise

Remember to use only the two provided files, so if you need to define some styles (I hope so) they will be in lined at the HTML file

With all this, you can proceed