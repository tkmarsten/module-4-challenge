let quizMain = $('.quiz-main') // The main div container
let quizContent = $('.quiz-content') // The content div containing the elements inside used for the quiz
let startButton = $('.quiz-start') // The quiz start button on initial load
let quizButton = $('.quiz-button') // The buttons for options for each question
let quizTitle = $('.quiz-title') // The title for the introduction and each question
let score = 0 // User's current score
let i = 0 // Counter for checking question position
var secondsLeft = 60; // Timer amount

/*
* Sets the quiz timer to count down every second.
*/
let timer = $('.quiz-timer')
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timer.text('Time: ' + secondsLeft)
    if (secondsLeft === 0) {
      clearInterval(timerInterval)
    } else if (secondsLeft < 0) {
      clearInterval(timerInterval)
    }
  }, 1000);
}

/*
* Creates the initial introduction on page load.
*/
function createHome() {
  quizContent.children().remove()
  quizTitle.text('Coding Quiz Challenge')
  let quizIntro = $('<p>')
  quizIntro.text('Answer as many questions in the time possible. A correct answer will award 1 point. Incorrect answers decrease the timer by 5 seconds.')
  quizContent.append(quizIntro)
  let quizButton = $('<button>')
  quizButton.text('Start Quiz')
  quizButton.addClass('quiz-start')
  quizMain.append(quizButton)
  i = 0
  secondsLeft = 60
}

/*
* Displays each question for the quiz.
*/
function displayQuestions() {
  $('.quiz-content').children().remove()
  quizTitle.text(questions[i].question)
  for (let j = 0; j < questions[i].options.length; j++) {
    let button = $('<button>')
    button.addClass("quiz-button")
    button.text(questions[i].options[j])
    quizContent.append(button)
  }
}

/** 
 * Displays the end screen after all questions have been answered.
 * Prompts the user to enter their initials to submit their score to the highscores scoreboard.
 * 
*/
function displayEndScreen() {
  quizTitle.text('You scored ' + score + ' points')
  quizContent.children().remove()
  let inputForm = $('<form>')
  inputForm.addClass('score-form')
  let inputLabel = $('<label>')
  inputLabel.attr('for', 'initials')
  inputLabel.text('Enter initials:')
  let input = $('<input>')
  input.attr({ type: 'text', id: 'initials', name: 'initials' })
  let inputButton = $('<button>')
  inputButton.text('Submit Score')
  inputButton.addClass('score-submit')
  inputForm.append(inputLabel)
  inputForm.append(input)
  inputForm.append(inputButton)
  quizContent.append(inputForm)
}

/**
 * Displays all the scores stored in the local storage.
 */
function displayScoreboard() {
  quizContent.children().remove()
  quizTitle.text('Highscores')
  let list = $('<ol>')
  for (let i = 0; i < localStorage.length; i++) {
    let listItem = $('<li>')
    listItem.text(localStorage.key(i) + ' - ' + localStorage.getItem(localStorage.key(i)))
    list.append(listItem)
  }
  quizContent.append(list)
  let backButton = $('<button>')
  backButton.addClass('scoreboard-back')
  backButton.text('Go Back')
  quizContent.append(backButton)
  let clearButton = $('<button>')
  clearButton.addClass('scoreboard-clear')
  clearButton.text('Clear Highscores')
  quizContent.append(clearButton)
}

/* 
* Listener that checks for when the user clicks on an answer button.
* On click, if the answer is correct, it will increase the score.
* Incorrect answers decrease the timer.
*/
quizContent.on('click', '.quiz-button', function (event) {
  if (questions[i].options.indexOf(event.target.textContent) === questions[i].answer) {
    score++
    let scoreText = $('.quiz-score')
    scoreText.text("Score: " + score)
  } else {
    secondsLeft -= 5
  }

  i++

  if (i < questions.length) {
    displayQuestions()
  } else {
    displayEndScreen()
  }
})

/*
* Listener for the button that starts the quiz on the introduction.
* Removes unneccessary elements and displays the questions. Sets timer correctly.
*/
quizMain.on('click', '.quiz-start', function () {
  $('.quiz-content').children().remove()
  $('.quiz-start').remove()
  displayQuestions()
  setTime()
})

/**
 * Listener for the score submittal button.
 * Submits score with the given initials and displays the highscores after.
 */
quizContent.on('click', '.score-submit', function (event) {
  event.preventDefault()
  localStorage.setItem($('#initials').val(), score)
  displayScoreboard()
})

/**
 * Listener for the 'view highscores' button in the header.
 * Displays the highscores.
 */
let highscoreButton = $('.quiz-highscores')
highscoreButton.on('click', function () {
  displayScoreboard()
  $('.quiz-start').remove()
})

/**
 * Listener for the 'clear highscores' button on the highscores scoreboard screen.
 * Clears all scores saved in local storage.
 */
quizContent.on('click', '.scoreboard-clear', function () {
  localStorage.clear()
  displayScoreboard()
})

/**
 * Listener for the 'go back' button.
 * Sends the user back to the introduction.
 */
quizContent.on('click', '.scoreboard-back', function () {
  createHome()
})

/* 
* Array containing all of the questions.
* Each object contains the question, the potential answers, and the index of the correct answer.
*/
const questions = [{
  question: "Which is the best debugging tool?",
  options: [
    "console.log()", "Debugging tool", "Pair programming", "StackOverflow"
  ],
  answer: 0
}, {
  question: "What does the '==' operator do?",
  options: [
    "Stricly compares types of operands", "Converts and compares operands of different types", "Act as a mispelling of equals", "Sets the operand equal to another operand"
  ],
  answer: 1
}, {
  question: "Which of these keywords is NOT a valid way of setting a variable?",
  options: [
    "let", "var", "const", "set"
  ],
  answer: 3
}, {
  question: "What is an anonymous function?",
  options: [
    "A function that is a hacker", "A function without a name", "A function sponsored by NordVPN", "A function without parameters"
  ],
  answer: 1
}, {
  question: "How do you turn a JSON object into a string?",
  options: [
    "StringIt", "Flatify", "Stringify", "parseJason"
  ],
  answer: 2
}]