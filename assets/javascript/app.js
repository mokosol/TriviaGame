// Questions and answers Array
var questions = [
{
question: 'Who won most championship in NBA?',
answers: [
{ answer: 'A. Laker', value: false },
{ answer: 'B. Celtics ',value: true },
{ answer: 'C. Knicks', value: false },
{ answer: "D. Heat", value: false }
]
},
{
question: 'who is best shooter in NBA?',
answers: [

{ answer: 'curry', value: true },
{ answer: 'thomson', value: false },
{ answer: 'harden', value: false },
{ answer: 'towns', value: false },
]
},
{
 question:'who won NBA title in 2018?',
answers: [
{ answer: 'Warriors',value: true },
{ answer: 'Lakers', value: false },
{ answer: 'Thunder', value: false },
{ answer: 'Nuggets', value: false }
]
},
{
 question:'Who is all time NBA scoring leader?',
answers: [
{ answer: 'Kobe', value: false },
{ answer: 'Jordan', value: false },
{ answer: 'Magic', value: false },
{ answer: "Kareem", value: true }
]
},
{
question: "What does 'reset' in CSS mean?",
answers: [
{ answer: 'Who won most NBA Title in 1990s', value: true },
{ answer: 'Pistons', value: false },
{ answer: 'Lakers', value: false },
{ answer: 'Bulls', value: false }
]
},
{
question: 'How many Champions ships Lakers won?',
answers: [
{ answer: '15', value: false },
{ answer: '18', value: false },
{ answer: '16', value: true },
{ answer: '9', value: false }
]
},
{
question: 'What NBA team Jordan play for?',
answers: [
{ answer: 'Bulls', value: true },
{ answer: 'Lakers', value: false },
{ answer: 'Celtics', value: false },
{ answer: 'Knics', value: false }
]
}
];

// Global variables
var game;
var counter = 0;
var clock;
var timer = 30;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

$(document).ready(function() {
// Start the game when that start button is clicked
$('.answers').css('visibility', 'hidden');
$('body').on('click', '.start-btn', function(event) {
event.preventDefault();
startGame();
$('.answers').css('visibility', 'visible');
});

$('body').on('click', '.answer', function(event) {
// console.log($(this));
chosenAnswer = $(this).text();
var answerCounter = questions[counter].answers;

var answer = $('.answer');
for (var i = 0; i < answerCounter.length; i++) {
if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === true) {
clearInterval(clock);
var right = $(this).attr('class', 'right-answer answer');
rightAnswer();
} else if (chosenAnswer === answerCounter[i].answer && answerCounter[i].value === false) {
clearInterval(clock);
$(this).attr('class', 'wrong-answer answer');
$('.first-answer').css('background-color', 'green');
$('.first-answer').css('color', 'white');
wrongAnswer();
}
}
});

$('body').on('click', '.reset-button', function(event) {
event.preventDefault();
resetGame();
});
});

function rightAnswer() {
correctCounter++;
$('.time').html(timer);
$('.right').html('<p>Right answers: ' + correctCounter + '</p><br>');
setTimeout(questionCounter, 2000);
}

function wrongAnswer() {
incorrectCounter++;
$('.time').html(timer);
$('.wrong').html('<p>Wrong answers: ' + incorrectCounter + '</p>');
setTimeout(questionCounter, 2000);
}

function unanswered() {
unanswered++;
$('.main').append("<p class='times-up'>Time's up!</p>");
$('.right-answer').css('background-color', 'green');
$('.times-up')
.delay(2000)
.fadeOut(400);
setTimeout(questionCounter, 2000);
}

// Start the game
function startGame() {
$('.start-page').css('display', 'none');
$('.questions-page').css('visibility', 'visible');
$('.timer').html('<p>Time remaining: <span class="time">30</span></p>');

$('.question').html(questions[counter].question);
var showingAnswers =
'<p class="answer first-answer">' +
questions[counter].answers[0].answer +
'</p><p class="answer">' +
questions[counter].answers[1].answer +
'</p><p class="answer">' +
questions[counter].answers[2].answer +
'</p><p class="answer">' +
questions[counter].answers[3].answer +
'</p>';

$('.answers').html(showingAnswers);

timerHolder();
}

function questionCounter() {
if (counter < 6) {
counter++;
startGame();
timer = 30;
timerHolder();
} else {
finishGame();
}
}

// Timer function
function timerHolder() {
clearInterval(clock);
clock = setInterval(seconds, 1000);
function seconds() {
if (timer === 0) {
clearInterval(clock);
unanswered();
} else if (timer > 0) {
timer--;
}
$('.time').html(timer);
}
}

// Finishing the game
function finishGame() {
var final = $('.main')
.html("<p>All done, here's how you did!<p><br><br>")
.append('<p>Correct Answers: ' + correctCounter + '</p><br>')
.append('<p>Wrong Answers: ' + incorrectCounter + '</p>');
$(final).attr('<div>');
$(final).attr('class', 'final');
$('.final').append('<p><a class="btn btn-primary btn-lg reset-button" href="#">Restart the game!</a></p>');
}

// Reset the game
function resetGame() {
counter = 0;
correctCounter = 0;
incorrectCounter = 0;
unansweredCounter = 0;
timer = 30;
startGame(30);
timerHolder();
}