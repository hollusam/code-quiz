import {quizQuestion} from './questions.js';

//
var quizChoices = document.querySelector('#choices');
var startBtn = document.querySelector('#start');
var feedback = document.querySelector('#feedback');
var timeDisplay = document.querySelector('#time');
var finalScore = document.querySelector('#final-score'); 
var submitButton = document.querySelector('#submit');
var inputElement = document.querySelector('#initials');

//hide all
function hide(curr, next) {
    document.getElementById(curr).classList.add('hide');
    document.getElementById(next).removeAttribute('class')
}

function hideFeedback() {
    feedback.setAttribute('class', 'feedback');
    setTimeout(function() {
        feedback.setAttribute('class', 'feedback hide');
    },
    1000);
}

//variables required globally
var timeInterval;
var time;
var currentQuestion;

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    hide('start-screen', 'questions');

    //displaying the current question
    currentQuestion = 0;
    displayQuestion();

    //set total time depending on number of questions
    time = quizQuestion.length * 15;

    //countdown time display on page
    timeInterval = setInterval(countdown, 1000);

    displayTime();
}

//time reduction by 1 and display new value
function countdown() {
    time--;
    displayTime();
    if (time < 1) {
        endQuiz();
    }
}

//display time on page
function displayTime() {
    timeDisplay.textContent = time;
}

//display the question and answer options for current question
function displayQuestion() {
    var question = quizQuestion[currentQuestion];
    var choices =  question.choices;
    // console.log(question);

    var questionText = document.querySelector('#question-title');
    questionText.textContent = question.questionTitle;
// console.log(questionText);
    for (var i = 0; i < choices.length; i++) {
        var choice = choices[i];
        var choiceBtn = document.querySelector('#choice' + i);
        choiceBtn.textContent = choice; 
    }
}

quizChoices.addEventListener('click', checkAnswer);

function correctChoice(choiceBtn) {
    return choiceBtn.textContent === quizQuestion[currentQuestion].correct;
}

//conditions and penalise time for incorrect answers
function checkAnswer(event) {
    var choiceBtn = event.target;

    if (correctChoice(choiceBtn)) {
        feedback.textContent = 'Correct!';
        hideFeedback();
    } else {
        feedback.textContent = 'Incorrect!';
        hideFeedback();
        if (time >= 10) {
            time = time - 10;
            displayTime();
        } else {
            time = 0;
            displayTime();
            endQuiz();
        }
    }
    //increase current question by 1
    currentQuestion++;
    if (currentQuestion < quizQuestion.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

//display score
function endQuiz() {
    clearInterval(timeInterval);
    hide('questions', 'end-screen');
    finalScore.textContent = time;
}

submitButton.addEventListener('click', storeScore);

function storeScore(event) {
    event.preventDefault();

    //check for input
    if (!inputElement.value) {
        alert('Please enter your initials before pressing submit!');
        return;
    } else {
        var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
        //new format for score update
        var updatedScore = {
            initials: inputElement.value,
            finalScore: time,
    };
    //saving to the localstorage
    highscores.push(updatedScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    window.location.href = 'highscores.html';
        
}};
