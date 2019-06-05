$(document).ready(function() {
    var questionList = [
        {
            question: "question1",
            choices: ["a", "b", "c", "d"],
            answer: "a"
        }, {
            question: "question2",
            choices: ["a", "b", "c", "d"],
            answer: "a"
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

    //global variables
    var index = 0;
    var questionNumber = 1;
    var answerClicked = false;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var interval = 25;

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
    }
    createTrivia();

    //click on answer
    $(".answer-container").on("click", ".answer-card", function() {
        //picked correct answer
        if ($(this).text() === questionList[index].answer && answerClicked == false) {
            //correct counter
            correct++;
            checkAnswer(this, "correct");
        //picked incorrect answer
        } else if (answerClicked == false) {
            //incorrect counter
            incorrect++;
            checkAnswer(this, "incorrect");
        }
        //prevents from clicking afterwards
        answerClicked = true;
    })

    function checkAnswer(element, addClass) {
        //change color according to right or wrong
        $(element).addClass(addClass);
        advance();
    }

    //setinterval
    //if time runs out, unanswered++
    //advance();

    function advance() {
        //add 1 to index to set up for next question
        index++;
        //if user hasn't reached the end of object array
        if (index != questionList.length) {
            //advance to new question
            setTimeout(createTrivia, 1000);
        //completed trivia
        } else {
            //display result screen
            result();
        }
    }

    //list out results
    function result() {

    }
})