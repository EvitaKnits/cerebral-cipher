document.addEventListener("DOMContentLoaded", function () {
    gameSetup();
})

const COLOURS = ["red", "blue", "green", "yellow", "white", "black"];

const CURRENTGAMECOLOURS = [];

const CODECIRCLES = document.getElementsByClassName("code-circle");

const GUESSROW = {
    currentRound: 1,
    circles: [],
    feedback: []
};

let CURRENTTRACKER = {

}

const SUBMITBUTTON = document.getElementsByClassName("submit-control");
const UNDOBUTTON = document.getElementsByClassName("undo-control");
const RESETBUTTON = document.getElementsByClassName("reset-control");

let WIN = false;

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
    if (event.target.classList.contains("submit-control") && (GUESSROW.circles.length < 4)) {
        alert("You cannot submit your guess until you've got all four colour choices for this round.")
    } else if (event.target.classList.contains("submit-control")) {
        for (i = 0; i < UNDOBUTTON.length; i++) {
            UNDOBUTTON[i].disabled = true;
            RESETBUTTON[i].disabled = true;
        }
        checkUserSubmission();
        provideFeedback();
        if (WIN === false) {
            advanceRound();
        }

    }
}

/**
 * This function checks the four user-inputted guesses against the four computer-generated choices made at the start of the game in the gameSetup function. 
 * It provides the result of how many of the guesses were a) correct colour and in the correct place (red), b) correct colour in the incorrect place (white) and c) not a
 * correct colour (light-grey).
 */
function checkUserSubmission() {
    GUESSROW.feedback = [];
    //populate the CURRENTTRACKER with names of CURRENTGAMECOLOURS but not more than once
    for (i = 0; i < CURRENTGAMECOLOURS.length; i++) {
        if ('CURRENTGAMECOLOURS[i]' in CURRENTTRACKER === false) {
            CURRENTTRACKER[CURRENTGAMECOLOURS[i]] = 0;
        }
    }
    // check if each CURRENTGAMECOLOURS value appears in the current GUESSROW.circles and assign a feedback peg accordingly
    for (i = 0; i < CURRENTGAMECOLOURS.length; i++) {
        if (CURRENTGAMECOLOURS[i] === GUESSROW.circles[i]) {
            GUESSROW.feedback.push("red");
            //increment the tracker for that colour
            CURRENTTRACKER[CURRENTGAMECOLOURS[i]]++;
        } else if (GUESSROW.circles.includes(CURRENTGAMECOLOURS[i], [0])) {
            //check how many times the current colour appears in the guess
            let colourNumber = 0;
            for (h = 0; h < GUESSROW.circles.length; h++) {
                if (GUESSROW.circles[h] === CURRENTGAMECOLOURS[i]) {
                    colourNumber++;
                }
            }

            //if number of that colour in the guess is less than the number of that colour in the tracker
            if (colourNumber > CURRENTTRACKER[CURRENTGAMECOLOURS[i]]) {
                GUESSROW.feedback.push("white");
                CURRENTTRACKER[CURRENTGAMECOLOURS[i]]++;
            } else {
                GUESSROW.feedback.push("grey");
                CURRENTTRACKER[CURRENTGAMECOLOURS[i]]++;
            }

        } else {
            GUESSROW.feedback.push("grey");
            CURRENTTRACKER[CURRENTGAMECOLOURS[i]]++;
        }
    }

    //clear the current tracker
    CURRENTTRACKER = {};

    for (i = 0; i < GUESSROW.feedback.length; i++) {
        if (GUESSROW.feedback[i] === "red") {
            WIN = true;
        } else {
            WIN = false;
            break;
        }
    }

    if (WIN === true) {
        endGame();
    }

}


/**
 * This function takes the output of the checkUserSubmission function and translates this into the number of red, white and light-grey(default colour) pegs should be presented for 
 * that row of guesses in the feedback section of the game. 
 */
function provideFeedback() {
    if (GUESSROW.currentRound < 10) {
        //Fisher Yates method of shuffling my feedback array - learnt at W3 schools
        for (let i = GUESSROW.feedback.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const k = GUESSROW.feedback[i];
            GUESSROW.feedback[i] = GUESSROW.feedback[j];
            GUESSROW.feedback[j] = k;
        }

        const topRow = document.getElementsByClassName("guess-row")[0];
        const feedbackCircles = topRow.getElementsByClassName("feedback");

        for (let i = 0; i < 4; i++) {
            if (i < GUESSROW.feedback.length) {
                feedbackCircles[i].classList.replace(feedbackCircles[i].classList[1], GUESSROW.feedback[i]);
            }
        }
    } else {
        for (i = 0; i < GUESSROW.feedback.length; i++) {
            if (GUESSROW.feedback[i] === "red") {
                CODECIRCLES[i].classList.add("glow");
            }
        }
    }
}

/**
 * This function advances the round counter by one, enables the undo and reset buttons and provides a new 
 * row for guesses, pushing the previous row down the page.
 */
function advanceRound() {
    GUESSROW.currentRound++;
    if (GUESSROW.currentRound < 11) {
        for (i = 0; i < UNDOBUTTON.length; i++) {
            if (GUESSROW.circles.length === 4) {
                UNDOBUTTON[i].disabled = false;
                RESETBUTTON[i].disabled = false;
            }
        }

        const rowContainer = document.getElementById("game-area");
        rowContainer.innerHTML = `
    <div class="guess-row">
        <div class="round-number"><b></b></div>
        <div class="colour-circles">
            <span class="circle grey"></span>
            <span class="circle grey"></span>
            <span class="circle grey"></span>
            <span class="circle grey"></span>
        </div>
        <div class="feedback-circles">
            <div class="feedback-row">
                <span class="feedback light-grey"></span>
                <span class="feedback light-grey"></span>
            </div>
            <div class="feedback-row">
                <span class="feedback light-grey"></span>
                <span class="feedback light-grey"></span>
            </div>
        </div>
    </div> ` + rowContainer.innerHTML;

        const round = document.getElementsByClassName("round-number")[0];
        round.innerHTML = [GUESSROW.currentRound];
        GUESSROW.circles = [];

        const secondRowDown = document.getElementsByClassName("guess-row")[1];
        secondRowDown.classList.add("unhighlight");
    } else {
        endGame();
    }
}

/**
 * Once 10 rounds have elapsed, the advanceRound function stops allowing further guess rows and calls this function
 * to provide the win or lose at the end of the game. 
 */
function endGame() {
    //reveal the colours of the code in the top regardless of win or lose 
    const CODECIRCLES = document.getElementsByClassName("code-circle");
    for (i = 0; i < CURRENTGAMECOLOURS.length; i++) {
        CODECIRCLES[i].classList.replace(CODECIRCLES[i].classList[1], CURRENTGAMECOLOURS[i])
    };

    let lossNumber = 0;

    for (i = 0; i < GUESSROW.feedback.length; i++) {
        if (GUESSROW.feedback[i] === "red") {
            lossNumber++;
        }

        const codeMessage = document.getElementById("code-message");

        if (WIN === true) {
            codeMessage.innerHTML = "YOU WIN!";
            CODECIRCLES[i].classList.add("glow");
        } else {
            if (lossNumber === 0) {
                codeMessage.innerHTML = "Oof! Wipeout.";
            } else if (lossNumber === 1) {
                codeMessage.innerHTML = "25% there!";
            } else if (lossNumber === 2) {
                codeMessage.innerHTML = "Halfway there!";
            } else {
                codeMessage.innerHTML = "So close!";
            }
        }
    }
    SUBMITBUTTON[0].disabled = true;
    SUBMITBUTTON[1].disabled = true;
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