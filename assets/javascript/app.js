//global variables
var index = 0;
var questionNumber = 1;
var answerClicked = false;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 25;
var interval;
//font awesome icons
var exclaimationIcon = "<i class='fas fa-exclamation-circle'></i>";
var correctIcon = "<i class='fas fa-check-circle'></i>";
var incorrectIcon = "<i class='fas fa-times-circle'></i>";
var awardIcon = "<i class='fas fa-trophy'></i>";
var bell = "fas fa-bell";
var clock = "far fa-clock";
//variables for results
var finalResults;
var correctContainer;
var incorrectContainer;
var unansweredContainer;
var totalCorrect;
var totalIncorrect;
var totalUnanswered;

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
    //start trivia
    $(".start-button").on("click", function() {
        $(".start").hide();
        $(".quiz-content").show();
        createTrivia();
    })

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

    //click on answer
    $(".answer-container").on("click", ".answer-card", function() {
        if (answerClicked == false) {
            //show fun fact
            createFunFact();
            //picked correct answer
            if ($(this).text() === questionList[index].answer && answerClicked == false) {
                //correct counter
                correct++;
                //highlight correct answer
                checkAnswer(this, "correct", correctIcon);
            //picked incorrect answer
            } else {
                //incorrect counter
                incorrect++;
                //show correct answer
                searchCorrect();
                //highlight incorrect answer
                checkAnswer(this, "incorrect", incorrectIcon);
            }
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
        //stop timer
        stopCountdown();
        //next question
        advance();
    }

    //search through all divs to find correct answer and show correct answer
    function searchCorrect() {
        $("div").each(function() {
            //if div text = answer
            if ($(this).text() === questionList[index].answer) {
                //show correct answer display
                $(this).addClass("correct").append(correctIcon);
            }
        })
    }
    
    function createFunFact() {
        var funFact = "<p>" + questionList[index].funFact + "</p>";
        //create fun fact element first since checkAnswer() adds an index
        var funFactElement = $("<div>").addClass("fun-fact").append(exclaimationIcon).append(funFact);
        //attach to bottom of answer container
        $(".answer-container").append(funFactElement);
    }

    function checkUnanswered() {
        //unanswered counter
        unanswered++;
        //prevents from clicking answer choices
        answerClicked = true;
        //change clock icon to bell
        $(".timer").children("i").addClass(bell).removeClass(clock);
        //display time's up
        $(".time").text("Time's Up!");
        //shows correct answer
        searchCorrect();
        //shows fun fact
        createFunFact();
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

    function result() {
        //show result screen
        $(".quiz-content").hide();
        $(".result").show();
        $(".result").empty();
        //congrats image
        var congrats = "<h2>Congratulations!</h2>";
        var congratsElement = $("<div>").addClass("congrats").append(awardIcon).append(congrats);
        //new element to store results
        finalResults = $("<div>").addClass("final-results");
        resultElements(correctContainer, "total-correct", correct, "Correct", totalCorrect);
        resultElements(incorrectContainer, "total-incorrect", incorrect, "Incorrect", totalIncorrect);
        resultElements(unansweredContainer, "total-unanswered", unanswered, "Unanswered", totalUnanswered);
        //restart button
        var restart = $("<div>").addClass("restart-button button").text("Restart");
        $(".result").append(congratsElement).append(finalResults).append(restart);
    }

    //created element constructor for results
    function resultElements(element, resultClass, resultNumber, resultTitle, newElement) {
        //show numbers for correct, incorrect, and unanswered
        element = $("<div>").addClass(resultClass).append("<h2>" + resultNumber + "</h2><h4>" + resultTitle + "</h4>");
        newElement = $("<div>").addClass("total").append(element);
        $(finalResults).append(newElement);
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
        //update timer display
        $(".time").text(timeDisplay);
        //timer reaches zero or less
        if (time <= 0) {
            //stop timer
            stopCountdown();
            //update time's up display
            checkUnanswered();
            //delay to see answer and move onto next question
            setTimeout(advance, 5000);
        }
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
        //change bell back to clock
        $(".timer").children("i").addClass(clock).removeClass(bell);
        //change back to original text
        $(".time").text("00:25");
    }

    function restart() {
        //reset variables
        index = 0;
        questionNumber = 1;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        //start quiz again
        $(".quiz-content").show();
        $(".result").hide();
        createTrivia();
    }

    //restart quiz
    $(".result").on("click", ".restart-button", function() {
        restart();
    })
})