

var choiceDivTag = document.querySelector('.the-choices');

var startButton = document.querySelector('#start-button');

var startWrapper = document.querySelector('.start-wrapper');

var questionWrapper = document.querySelector('.question-wrapper');

var outputTime = document.querySelector('#output-time');

var scoreWrapper = document.querySelector('.score-wrapper');

var saveBtn = document.querySelector('#save-our-score');


var questionTracker = 0;
var time = 60;
var timer;

var clicked = false;


function startTheQuiz() {
    startWrapper.classList.add('hide');
    questionWrapper.classList.remove('hide');

    displayTheQuestion();
    startTheCountdown();

    time = 60;

    questionTracker = 0;
}

function startTheCountdown() {
    outputTime.innerText = 'Time remaining ' + time;

    timer = setInterval(function () {
        time = (time - 1) < 0 ? 0 : time -1;

        outputTime.innerText = 'Time remaining ' + time;
        if (time <= 0) {
            endTheGame();
        }
    }, 1000);
}

function displayTheQuestion() {
    var currentQuestionAtm = questions[questionTracker];
    var textElement = document.querySelector('.questions-text');

    textElement.innerText = currentQuestionAtm.questionsText;
    choiceDivTag.innerHTML = '';

    for (var index = 0; index < currentQuestionAtm.choices.length; index++) {
        var choiceButton = document.createElement('button');
        choiceButton.innerText = currentQuestionAtm.choices[index];
        choiceDivTag.append(choiceButton);
    }
}

function checkOurAnswer(eventObject) {
    eventObject.stopPropagation();

    if (clicked) {
        return;
    }

    var element = eventObject.target;
    if (element.tagName === 'BUTTON') {
        var usersAnswer = element.innerText;
        var ourAnswerAlert = document.querySelector('.our-answer-alert');

        if (usersAnswer === questions[questionTracker].correctAnswer) {
            ourAnswerAlert.innerText = 'correct';
            ourAnswerAlert.classList.add('show');
        } else { 
        ourAnswerAlert.innerText = 'wrong';
        ourAnswerAlert.classList.add('show');

        time -= 10;
        time = (time - 10) < 0 ? 0 : time -10;
        }

        clicked = true;

        setTimeout(function() {
            ourAnswerAlert.classList.remove('show');
            questionTracker++;

            if (questionTracker === questions.length) {
                endTheGame();
            } else {
                displayTheQuestion();
                clicked = false;
            }
        }, 1500);
    }

    if (questionTracker === questions.length - 1) {
        console.log('Game Over');
    }
}

function saveOurScore() {
    var inputInitials = document.querySelector('#input-initials');
    var theInitials = inputInitials.value;

    var theRawData = localStorage.getItem('highScores');
    var highScores = JSON.parse(theRawData) || [];

    highScores.push({
        initials: theInitials,
        score: time
    });

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location = './JavaScript/highscorelist.html';
}

function endTheGame() {
    clearInterval(timer);
    questionWrapper.classList.add('hide');
    var outputScore = document.querySelector('#output-score');

    outputScore.innerText = 'score: ' + time;
    scoreWrapper.classList.remove('hide');
}

choiceDivTag.addEventListener('click', checkOurAnswer);

startButton.addEventListener('click', startTheQuiz);

saveBtn.addEventListener('click', saveOurScore);

