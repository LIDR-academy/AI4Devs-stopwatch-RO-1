# prompts.md

## Chatbot utilizado
ChatGPT (OpenAI) - Modelo GPT-4

---

## Prompt inicial utilizado

**Fecha:** 2025-05-20  
**Descripción:**

```
# Role
You are an expert fullstack JavaScript developer with solid knowledge of best practices, SOLID principles, modular architecture, and UI/UX for modern web apps.

# Goal
Create a responsive web stopwatch from scratch using Vanilla JavaScript and Tailwind CSS. Follow clean architecture principles.

## Requirements:

1. Structure the code with index.html and script.js as separate files.
2. Apply Vanilla JavaScript only — no external JS frameworks.
3. Apply SOLID principles: Separate concerns in individual functions or modules, and comment each function explaining what it does.
4. Use Tailwind CSS for styling — prefer a dark theme with warm, vibrant accent colors (as previously defined).
5. The page must be responsive for mobile, tablet, and desktop.
6. Add clear console.log statements showing app flow, user actions, and errors.
7. Implement robust error handling — catch any edge cases or unexpected behavior.

## Functional Criteria (Stopwatch):
- Start button: begins counting time.
- Pause button: pauses counting.
- Reset button: sets time to 0.
- Time must be displayed in format MM:SS:MS.
- Optional: add a lap/split time functionality.

## Aesthetic Criteria:
- Use a dark UI with warm and vibrant highlight colors (e.g., orange, teal, or amber).
- UI must be minimal and clean, but with elegant visuals using Tailwind.
- Buttons should have hover states, transitions, and accessibility in mind.

## General Criteria:
- The final code must be clean, readable, and scalable.
- Avoid code duplication.
- Comment where necessary to explain logic, especially for complex parts.

---

⚠️ Before you start, ask me:
- Would you like lap/split functionality included?
- Should the Stopwatch auto-reset after reaching a time limit?
- Do you want to persist stopwatch state between page reloads (e.g., via localStorage)?
- Should animations be added to the digits or transitions?
- Also, let me know if you want me to provide you with a custom palette or reuse a palette from a past project.
```
