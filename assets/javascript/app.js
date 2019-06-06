//global variables
var index = 0;
var questionNumber = 1;
var answerClicked = false;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 25;
var interval;

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
        funFact: "Vietnam produces the 2nd most coffee in the world at 1.98 billion lbs/year, whereas Brazil produces the most at 5.61 billion lbs/year."
    }, {
        question: "Which month is National Grilled Cheese month?",
        choices: ["January", "February", "March", "April"],
        answer: "April",
        funFact: "Each April, San Francisco holds a Grilled Cheese Invitational grilled cheese cooking contest to commemorate it."
    }, {
        question: "What country is slurping not considered rude?",
        choices: ["Japan", "England", "India", "Austria"],
        answer: "Japan",
        funFact: "It is said that Japanese people slurp because it is considered evidence of enjoying the meal and it enhances the flavor."
    }, {
        question: "What is the offical state fruit of Texas?",
        choices: ["Plum", "Apricot", "Grapefruit", "Peach"],
        answer: "Grapefruit",
        funFact: "The Texas Red Grapefruit, first discovered by Texas citrus growers in 1929, was adopted as the Texas state fruit on May 17, 1993."
    }, {
        question: "Which one of these food ingredients will never spoil?",
        choices: ["Basil", "Cumin", "Paprika", "Honey"],
        answer: "Honey",
        funFact: "Due to its relatively-low levels of moisture and high levels of acidity, bacteria and microorganisms have a hard time making a permanent home out of honey."
    }, {
        question: "In what year was the McDonald's Happy Meal created?",
        choices: ["1968", "1977", "1980", "1995"],
        answer: "1977",
        funFact: "The Happy Meal, designed specifically for children, was originally fielded in 1977 and ultimately released nationwide in 1979."
    }, {
        question: "What type of pasta is shaped like bow ties?",
        choices: ["Farfalle", "Conchiglie", "Gnocchi", "Penne"],
        answer: "Farfalle",
        funFact: "The word farfalle means butterflies in Italian and is commonly referred to as bow tie pasta because of its shape."
    }, {
        question: "Egg tarts originated from which country?",
        choices: ["China", "Portugal", "Korea", "France"],
        answer: "Portugal",
        funFact: "Hong Kong received the pastel de nata egg tart from Macau, which was a colony of Portugal, and combined aspects of the Portuguese tart with their own."
    }, {
        question: "Which European country is credited for the invention of hot dogs?",
        choices: ["Italy", "England", "Denmark", "Germany"],
        answer: "Germany",
        funFact: ""
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
        //append fun fact
        if (answerClicked == false) {
            var exclaimationIcon = "<i class='fas fa-exclamation-circle'></i>";
            var funFact = "<p>" + questionList[index].funFact + "</p>";
            //create fun fact element first since checkAnswer() adds an index
            var funFactElement = $("<div>").addClass("fun-fact").append(exclaimationIcon).append(funFact);
        }
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
            setTimeout(createTrivia, 1000);
        //completed trivia
        } else {
            //delay to see answer and then display result screen
            setTimeout(result, 1000);
        }
    }

    //list out results
    function result() {
        $(".quiz-content").hide();
        $(".results").show();
        var totalCorrect = $("<div>").addClass("total-correct").append("<p>Correct</p><p>" + correct + "</p>");
        var totalIncorrect = $("<div>").addClass("total-incorrect").append("<p>Incorrect</p><p>" + incorrect + "</p>");
        var totalUnanswered = $("<div>").addClass("total-unanswered").append("<p>Unanswered</p><p>" + unanswered + "</p>");
        $(".result").append(totalCorrect).append(totalIncorrect).append(totalUnanswered);
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
        //25 sec timer start
        interval = setInterval(setTimer, 1000);
    }

    function stopCountdown() {
        //timer stop
        clearInterval(interval);
    }

    function resetCountdown() {
        //timer reset
        time = 25;
        //change back to original text
        $(".time").text("00:25");
    }
})