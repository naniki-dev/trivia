# Trivia Quiz

A simple interactive trivia webpage built with **HTML, CSS, and JavaScript**. The project allows users to answer both multiple-choice and free-response trivia questions, with immediate visual feedback indicating whether their answers are correct or incorrect.

## Features

* Multiple-choice trivia question with several answer options
* Instant feedback for selected answers
* Correct answers are highlighted in **green**
* Incorrect answers are highlighted in **red**
* Free-response trivia question using a text input
* Case-insensitive answer validation
* Immediate feedback for free-response answers
* Responsive and simple user interface

## Technologies Used

* **HTML** — Structure and content of the webpage
* **CSS** — Styling and visual feedback
* **JavaScript** — Answer validation and interactive behaviour

## How It Works

### Part 1: Multiple Choice

Users are presented with a trivia question and several possible answers. When an answer is selected, JavaScript checks whether the selected option is correct.

* Correct answer → button turns green and displays **"Correct!"**
* Incorrect answer → button turns red and displays **"Incorrect"**

### Part 2: Free Response

Users can type their answer into a text field and submit it using the confirmation button.

JavaScript compares the user's response with the expected answer and provides visual feedback.

* Correct answer → input field turns green and displays **"Correct!"**
* Incorrect answer → input field turns red and displays **"Incorrect"**

## Project Structure

```text
trivia/
├── index.html
├── styles.css
└── script.js
```

## What I Learned

This project gave me practical experience with:

* Structuring webpages using HTML
* Styling elements with CSS
* Using JavaScript to respond to user interactions
* Adding event listeners to buttons
* Validating user input
* Manipulating HTML elements and their styles using JavaScript
* Providing immediate feedback based on user actions

## Running the Project

Clone the repository and open `index.html` in a web browser.

No external dependencies or installation are required.

## Project Context

This project was completed as part of **CS50's Introduction to Computer Science**, specifically Problem Set 8: Trivia.
