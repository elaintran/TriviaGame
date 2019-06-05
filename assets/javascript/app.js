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

    var index = 0;
    var questionNumber = 1;
    var answerClicked = false;
    var correct = 0;
    var incorrect = 0;

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
    }
    createTrivia();

    //click on answer
    $(".answer-card").on("click", function() {
        //picked correct answer
        if ($(this).text() === questionList[index].answer && answerClicked == false) {
            checkAnswer(correct, this, "correct");
        //picked incorrect answer
        } else if (answerClicked == false) {
            checkAnswer(incorrect, this, "incorrect");
        }
        //prevents from clicking afterwards
        answerClicked = true;
    })

    function checkAnswer(answer, element, addClass) {
        //answer counter
        answer++;
        //change color according to right or wrong
        $(element).addClass(addClass);
    }
})