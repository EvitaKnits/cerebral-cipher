document.addEventListener("DOMContentLoaded", function () {
    gameSetup();
})

const COLOURS = ["red", "blue", "green", "yellow", "white", "black"];

const CURRENTGAMECOLOURS = [];

const GUESSROW = {
    currentRound: 0,
    circles: [],
    feedback: []
};

/* This refreshes the page when the 'New Game' button is clicked, thus clears the guess and feedback rows and resets the round counter. I learnt 
how to do this here: https://sentry.io/answers/how-do-i-refresh-a-page-using-javascript/ */

const newGame = document.getElementById("new-game-button");
newGame.addEventListener("click", createNewGame);

/**
 * This function refreshes the page in order to start a new game.
 */
function createNewGame() {
    window.location.reload();
}

/**
 * This function randomly chooses four colours and their positions in the code line up.
 */
function gameSetup() {
    //get a random number between two numbers (inclusive)
    function getRandomIntInclusive(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }
    //get four random numbers between 0 and 5
    function setFourNumbers() {
        const currentGame = [];
        for (let circle = 0; circle < 4; circle++) {
            currentGame.push(getRandomIntInclusive(0, 5));
        }
        return currentGame;
    }
    const game = setFourNumbers();
    for (let i = 0; i < game.length; i++) {
        const gameNumber = game[i];
        const gameColour = COLOURS[gameNumber]
        CURRENTGAMECOLOURS.push(gameColour)
    }
}

/* This event listener listens for the clicking of any element and invokes the colourAssignment function which only does something
if the element clicked is a circle in the control panel, and changes the colour of the current guess row circle to the correct colour. */

document.addEventListener("click", colourAssignment);

/**
 * This function takes the colour the user clicked on in the control panel and assigns it to the current guess row object, 
 * which is subsequently styled by the styleCurrentGuessRow function. 
 */
function colourAssignment(event) {
    if (GUESSROW.circles.length < 4) {
        if (event.target.classList.contains("red-control")) {
            GUESSROW.circles.push("red");
        } else if (event.target.classList.contains("blue-control")) {
            GUESSROW.circles.push("blue");
        } else if (event.target.classList.contains("green-control")) {
            GUESSROW.circles.push("green");
        } else if (event.target.classList.contains("yellow-control")) {
            GUESSROW.circles.push("yellow");
        } else if (event.target.classList.contains("white-control")) {
            GUESSROW.circles.push("white");
        } else if (event.target.classList.contains("black-control")) {
            GUESSROW.circles.push("black");
        }
        styleCurrentGuessRow();
    }
}
/**
 * This function styles the current guess row based on the values assigned in the GUESSROW object's circles array.
 */
function styleCurrentGuessRow() {
    const topRow = document.getElementsByClassName("guess-row")[0];
    const guessCircles = topRow.getElementsByClassName("circle");

    // if i is less than length of circles then use circles value otherwise grey 
    for (let i = 0; i < 4; i++) {
        if (i < GUESSROW.circles.length) {
            guessCircles[i].classList.replace(guessCircles[i].classList[1], GUESSROW.circles[i]);
        } else {
            guessCircles[i].classList.replace(guessCircles[i].classList[1], "grey");
        }
    }
}

//This event listener listens for the clicking of the undo button in the control panel and invokes the undoChoice function. 

document.addEventListener("click", undoChoice);

/**
 * This function allows the user to remove the colour of the latest choice in the input row. 
 */
function undoChoice(event) {
    if (event.target.classList.contains("undo-control")) {
        //remove last value of the circles array and style current guess row again
        GUESSROW.circles.pop();
        styleCurrentGuessRow();
    }
}

//This event listener listens for the clicking of the reset button in the control panel and invokes the resetRow function. 

document.addEventListener("click", resetRow);
/**
 * This function allows the user to remove the colours in the whole input row, however many have been entered so far. 
 */
function resetRow(event) {
    if (event.target.classList.contains("reset-control")) {
        //empty the current colours array and style current guess row again
        GUESSROW.circles = [];
        styleCurrentGuessRow();
    }
}

//This event listener listens for the clicking of the submit button in the control panel and invokes the userSubmission function.

document.addEventListener("click", userSubmission);

/**
 * This function prevents further changes to the user's input then invokes the checkUserSubmission function to check the answer
 * against the code that was set in gameSetup. It then invokes the provideFeedback function followed by the advanceRound function.
 */
function userSubmission(event) {
    if (event.target.classList.contains("submit-control")) {
        const undoButton = document.getElementsByClassName("undo-control");
        const resetButton = document.getElementsByClassName("reset-control");
        for (i = 0; i < undoButton.length; i++) {
            if (GUESSROW.circles.length === 4) {
                undoButton[i].disabled = true;
                resetButton[i].disabled = true;
            }
        }
        checkUserSubmission();
        provideFeedback();
    }

}
// advanceRound();


/**
 * This function checks the four user-inputted guesses against the four computer-generated choices made at the start of the game in the gameSetup function. 
 * It provides the result of how many of the guesses were a) correct colour and in the correct place (red), b) correct colour in the incorrect place (white) and c) not a
 * correct colour (light-grey).
 */
function checkUserSubmission() {
    GUESSROW.feedback = [];
    for (i = 0; i < CURRENTGAMECOLOURS.length; i++) {
        if (CURRENTGAMECOLOURS[i] === GUESSROW.circles[i]) {
            GUESSROW.feedback.push("red");
        } else if (CURRENTGAMECOLOURS.includes(GUESSROW.circles[i], [0])) {
            GUESSROW.feedback.push("white");
        } else {
            GUESSROW.feedback.push("light-grey");
        }
    }
}

/**
 * This function takes the output of the checkUserSubmission function and translates this into the number of red, white and light-grey(default colour) pegs should be presented for 
 * that row of guesses in the feedback section of the game. 
 */
function provideFeedback() {
    //Fisher Yates method of shuffling my feedback array - learnt at W3 schools
    for (let i = GUESSROW.feedback.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const k = GUESSROW.feedback[i];
        GUESSROW.feedback[i] = GUESSROW.feedback[j];
        GUESSROW.feedback[j] = k;
    }
    
    const topRow = document.getElementsByClassName("guess-row")[0];
    const feedbackCircles = topRow.getElementsByClassName("feedback");

    // if i is less than length of circles then use circles value otherwise light-grey 
    for (let i = 0; i < 4; i++) {
        if (i < GUESSROW.feedback.length) {
            feedbackCircles[i].classList.replace(feedbackCircles[i].classList[1], GUESSROW.feedback[i]);
        } else {
            feedbackCircles[i].classList.replace(feedbackCircles[i].classList[1], "light-grey");
        }
    }
}



/**
 * This function advances the round counter by one and provides a new row for guesses, pushing the previous row down the page.
 */
function advanceRound() {
    /*don't forget to re-enable the undo and reset buttons here when a new row is available
 
          undoButton.disabled = false;
            resetButton.disabled = false;*/
}

/**
 * This function checks the round counter and if it is <10, it calls the advanceRound function to set up for a new round. Otherwise it ends the game with the
 * correct end game message, according to whether they won or lost and if they lost, depending on how many they got correct.
 */
function endOrContinue() {

}

// Modal for rules box
/* Source for modal tutorial https://www.w3schools.com/howto/howto_css_modals.asp but I changed their method 
to use the functions and Event Listeners in the way I was taught at Code Institute */

const rulesButton = document.getElementById("rules-button");
const modal = document.getElementById("rules-modal");

rulesButton.addEventListener("click", showRules);

/**
 * This function shows the Rules modal box.
 */
function showRules() {
    modal.style.display = "block";
}

const closeButton = document.getElementsByClassName("close-modal")[0];

closeButton.addEventListener("click", hideRules);

/**
 * This function hides the Rules modal box.
 */
function hideRules() {
    modal.style.display = "none";
}