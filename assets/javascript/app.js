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

    function createTrivia() {
        $(".question-number").text(questionNumber);
        $(".total-questions").text(questionList.length)
        $(".question").text(questionList[index].question);
        for (var i = 0; i < 4; i++) {
            var answerChoices = questionList[index].choices[i];
            var answerCard = $("<div>").addClass("answer-card").append("<p>" + answerChoices + "</p>");
            $(".answer-container").append(answerCard);
        }
    }
    createTrivia();

    $(".answer-card").on("click", function() {
        if ($(this).text() === questionList[index].answer && answerClicked == false) {
            console.log("hi");
        } else if (answerClicked == false) {
            console.log("bye");
        }
        answerClicked = true;
    })

})