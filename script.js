let startButton = $('.quiz-start')
let quizButton = $('.quiz-button')
let quizContent = $('.quiz-content')

const questions = [{
  question: "Which is the best debugging tool?",
  options: [
    "console.log()", "Debugging tool", "Pair work", "StackOverflow"
  ],
  answer: 0
}, {
  question: "who u gonna call",
  options: [
    "ur mom", "the popo", "dogs", "no"
  ],
  answer: 1
}, {
  question: "waaaaaal",
  options: [
    "waaaaa", "thloooo", "dfdas", "no"
  ],
  answer: 1
}]

let i = 0

function displayQuestions() {
  $('.quiz-content').children().remove()
  let quizTitle = $('.quiz-title')
  quizTitle.text(questions[i].question)
  for (let j = 0; j < questions[i].options.length; j++) {
    let button = $('<button>')
    button.addClass("quiz-button")
    button.text(questions[i].options[j])
    quizContent.append(button)
  }
}

quizContent.on('click', '.quiz-button', function () {
  i++
  displayQuestions()
})

startButton.on('click', function () {
  $('.quiz-content').children().remove()
  displayQuestions()
})