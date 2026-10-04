# The Road to 1994: A South African History Quiz

For this project I went back to my History teacher roots and built an interactive history quiz built with **HTML, CSS, and JavaScript**. It covers the key events on South Africa's road to democracy, from the 1948 election to the first democratic election on 27 April 1994. Players answer multiple-choice and free-response questions, get instant feedback, and read a short "teacher's note" after every answer that explains why the event mattered.

## Features

* 11 questions in chronological order, mixing multiple-choice and free-response
* Instant feedback after every answer, shown with colour **and** an icon (✓ / ✗)
* The correct answer is revealed when a player gets a question wrong
* A **teacher's note** after each question explaining the history behind the answer
* Free-response answers ignore capitalisation and extra spaces, and accept alternative spellings
* Progress bar and "Question X of Y" label
* Final score screen with a **Try again** button
* Answers lock after one attempt, and Enter submits free-response answers
* Responsive card layout, with the answer buttons stacking on small screens
* Keyboard-friendly, with visible focus states and reduced-motion support

## Technologies Used

* **HTML**: Page structure
* **CSS**: Card layout, feedback states, responsive design
* **JavaScript**: Builds each question from data, checks answers, tracks the score

## How It Works

All of the questions live in a single `questions` array at the top of `script.js`. The page builds itself from that list, so adding or changing a question never requires touching the HTML.

### Multiple choice

The player clicks an option. The chosen answer turns green if it is correct, or red if it is wrong (and the right answer is highlighted in green). All options are then disabled.

### Free response

The player types an answer and presses **Check answer** (or Enter). The input is compared with the accepted answers after trimming spaces and ignoring capitalisation. An empty answer asks the player to type something first.

### Teacher's note and results

After each answer, a short note explains the history behind it. After the last question, the score screen shows the final result with an option to try again.


## Project Structure

```text
trivia/
├── index.html
├── styles.css
└── script.js
```

## What I Learned

This project gave me practical experience with:

* Structuring and styling a page with semantic HTML and CSS (custom properties, grid, flexbox, responsive layouts)
* Separating data from presentation by keeping the questions in an array and generating the page from it
* Creating and updating DOM elements with JavaScript instead of hard-coding them in HTML
* Handling events (clicks and the Enter key) and managing quiz state such as the score and current question
* Normalising user input so answers are checked fairly
* Giving clear feedback, including accessibility basics like focus states, `aria-live` messages and not relying on colour alone
* Turning subject knowledge from my teaching background into content that teaches as well as tests

## Running the Project

Clone the repository and open `index.html` in a web browser.

No installation or dependencies are required. An internet connection is only needed to load the Google Fonts (the page falls back to system fonts without one).

## Project Context

This project started as **CS50's Introduction to Computer Science**, Problem Set 8: Trivia, and I then redesigned it with a card-based layout, a progress bar, a score screen and a South African history theme.