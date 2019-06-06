//global variables
var index = 0;
var questionNumber = 1;
var answerClicked = false;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 25;
var interval;
var running = false;

//question and answer object array
var questionList = [
    {
        question: "Where did French fries originate from?",
        choices: ["France", "Belgium", "USA", "Italy"],
        answer: "Belgium",
        funFact: "The origins of the French fry have been traced back to Belgium, where historians claim potatoes were being fried in the late-1600s."
    }, {
        question: "Which country produces the second most coffee in one year?",
        choices: ["Vietnam", "Columbia", "India", "Brazil"],
        answer: "Vietnam",
        funFact: "Vietnam produces the 2nd most coffee in the world at 1.98 billion lbs./year, whereas Brazil produces about 5.61 billion lbs./year."
    }, {
        question: "question3",
        choices: ["a", "b", "c", "d"],
        answer: "a"
    }, {
        question: "question4",
        choices: ["a", "b", "c", "d"],
        answer: "a"
    }, {
        question: "question5",
        choices: ["a", "b", "c", "d"],
        answer: "a"
    }, {
        question: "question6",
        choices: ["a", "b", "c", "d"],
        answer: "a"
    }, {
        question: "question7",
        choices: ["a", "b", "c", "d"],
        answer: "a"
    }, {
        question: "question8",
        choices: ["a", "b", "c", "d"],
        answer: "a"
    }, {
        question: "question9",
        choices: ["a", "b", "c", "d"],
        answer: "a"
    }, {
        question: "question10",
        choices: ["a", "b", "c", "d"],
        answer: "a"
    }
]

$(document).ready(function() {
    //need to create the start button
    // $(".start-button").on("click", function() {
    //     $(".start").hide();
    //     $(".quiz-content").show();
    //     createTrivia();
    // })

    function createTrivia() {
        //current question number
        $(".question-number").text(questionNumber);
        //total question number
        $(".total-questions").text(questionList.length)
        //current question
        $(".question").text(questionList[index].question);
        //clear answer container
        $(".answer-container").empty();
        //add in answer options to answer container
        for (var i = 0; i < 4; i++) {
            var answerChoices = questionList[index].choices[i];
            var answerCard = $("<div>").addClass("answer-card").append("<p>" + answerChoices + "</p>");
            $(".answer-container").append(answerCard);
        }
        //change answer back to unclicked
        answerClicked = false;
        //reset countdown
        resetCountdown();
        //start interval function
        //startCountdown();
    }
    createTrivia();

    //click on answer
    $(".answer-container").on("click", ".answer-card", function() {
        var exclaimationIcon = "<i class='fas fa-exclamation-circle'></i>";
        var funFact = "<p>" + questionList[index].funFact + "</p>";
        //create fun fact element first since checkAnswer() adds an index
        var funFactElement = $("<div>").addClass("fun-fact").append(exclaimationIcon).append(funFact);
        //attach to bottom of answer container
        $(".answer-container").append(funFactElement);
        //picked correct answer
        if ($(this).text() === questionList[index].answer && answerClicked == false) {
            //correct counter
            correct++;
            checkAnswer(this, "correct", "<i class='fas fa-check-circle'></i>");
        //picked incorrect answer
        } else if (answerClicked == false) {
            //incorrect counter
            incorrect++;
            checkAnswer(this, "incorrect", "<i class='fas fa-times-circle'></i>");
        }
        //prevents from clicking afterwards
        answerClicked = true;
        //append fun fact
    })

    //if correct, show correct answer; if incorrect, show incorrect answer
    function checkAnswer(element, addClass, answerIcon) {
        //change color according to right or wrong
        $(element).addClass(addClass);
        //add right or wrong icon
        $(element).append(answerIcon);
        stopCountdown();
        advance();
    }

    //set up and move on to next question or result
    function advance() {
        //add 1 to index to set up for next question
        index++;
        //reset time back to normal
        time = 25;
        //if user hasn't reached the end of object array
        if (index != questionList.length) {
            //next question number
            questionNumber++;
            //delay to see answer and advance to new question
            //setTimeout(createTrivia, 5000);
        //completed trivia
        } else {
            //display result screen
            result();
        }
    }

    //list out results
    function result() {

    }

    function setTimer() {
        //subtract one every time timer goes down
        time--;
        //timer display for 2 digit number
        var timeDisplay = "00:" + time;
        if (time < 10) {
            //timer display for 1 digit number
            timeDisplay = "00:0" + time;
        }
        //timer reaches zero or less
        if (time <= 0) {
            //stop timer
            stopCountdown();
            //unanswered counter
            unanswered++;
            //delay to see answer and move onto next question
            setTimeout(advance, 5000);
        }
        //update timer display
        $(".time").text(timeDisplay);
    }

    function startCountdown() {
        //if not running
        if (!running) {
            //25 sec timer start
            interval = setInterval(setTimer, 1000);
            //prevents from setting interval multiple times
            running = true;
        }
    }

    function stopCountdown() {
        //timer stop
        clearInterval(interval);
        //allows interval to start again
        running = false;
    }

    function resetCountdown() {
        //timer reset
        time = 25;
        //change back to original text
        $(".time").text("00:25");
    }
})