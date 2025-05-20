# Prompt

Models used: GPT-4o and o4-mini-high

Chat URL: https://chatgpt.com/share/682cc599-cd20-8004-adfa-4dc7592d1dc7

```markdown
# Role

You are an expert javascript frontend developer.

# Goal

Create a web page that have two main features: a stopwatch and a countdown clock.

## Technical criteria

1. Separate the html and javascript code into index.html and script.js
2. Use JS Vanilla

## Functional criteria

* Select between use the stopwatch or countdown timer feature
* Once selected between stopwatch or countdown timer feature be able to come back to change selection

### Stopwatch features

* The UI is shown with:
   * A clock with zero hours, zero minutes, zero seconds and zero miliseconds with this format: hh:mm:ss mmm, so clock shows: 00:00:00 000
   * A "start button"
   * A "clear button"
* When user clicks "start button":
   * Timer starts, so the hours, minutes, seconds and miliseconds of the clock start counting and showing the time passed in real time.
      * Example:
         * At the start, the clock shows: 00:00:00 000
         * After 1 second and 345 miliseconds, the clock shows: 00:00:01 354
         * After 45 seconds and 678 miliseconds, the clock shows: 00:00:45 678
         * After 13 minutes 56 seconds and 492 miliseconds, the clock shows: 00:13:56 492
         * After 2 hours, 32 minutes 53 seconds and 987 miliseconds, the clock shows: 02:32:53 987
   * The "start button" hides and in its place a "pause button" is shown. So pause and clear buttons are shown.
   * If user clicks "pause button":
      * Timer stops and the hours, minutes, seconds and miliseconds of the clock as well
      * Pause button hides and in its place a "continue button" is shown. So continue and clear buttons are shown
      * If user clicks "continue button":
         * The time resumes from where it paused, so hours, minutes, seconds and miliseconds of the clock keep counting and showing the time passed in real time
         * The "continue button" hides and in its place the "pause button" is shown again
* When user clicks "clear button":
   * If timer has started, then stops and is reset the clock to zero. So hours, minutes, seconds and miliseconds are reset to zero as well showing 00:00:00 000
   * Only start and clear buttons are shown.

### Countdown clock features

* The UI is shown with:
   * A clock with zero hours, zero minutes, zero seconds and zero miliseconds with this format: hh:mm:ss mmm, so clock shows: 00:00:00 000
   * A "set button"
   * A "clear clock button"
   * Buttons with numbers from 0 to 9 (each button has one number)
* When user clicks on any number, the number is added at the right of the clock starting in the seconds and moving the numbers to the left. When all two digits of hours, minutes and seconds are set and the user click another number button, no change is made in the clock because all the numbers are already set.
   * Example:
      * Clock shows 00:00:00 000
      * User clicks on button with number 3
      * Clock shows 00:00:03 000
      * User clicks on button with number 5
      * Clock shows 00:00:35 000
      * User clicks on button with number 6
      * Clock shows 00:03:56 000
      * User clicks on button with number 1
      * Clock shows 00:35:61 000
      * User clicks on button with number 2
      * Clock shows 00:35:61 000
      * User clicks on button with number 3
      * Clock shows 03:56:13 000
      * User clicks on button with number 1
      * Clock shows 35:61:31 000
      * User clicks on button with number 8
      * Clock still shows 35:61:31 000
         * Nothing changes here
* If user clicks "clear clock button", clock numbers reset to zero again, so clock shows: 00:00:00 000
* If user clicks "set button", then:
   * If no number has been set in the clock (the clock still shows 00:00:00 000), then the countdown will be 10 seconds by default (the clock will show 00:00:10 000)
   * If a number has been set in the clock, then that will be the time for the count down.
   * The UI changes so now, the following items are shown:
     * The clock with the given time
     * A "start button"
     * A "clear button"
     * So this UI is the same that the one in the stopwatch feature explained above and the behavior is the same, except for the clock that must count down.
     * When timer reach to zero:
         * The "pause button" is hidden
         * A ring sound sounds
         * The clock background start blinking between red and white

# Next steps

I can provide you UI screenshots as examples of how the UI has to be implemented.

Doesn't write any code, design an execution plan.

Ask me all the extra information that you need before build it, one question at time.
```