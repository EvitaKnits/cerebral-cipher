document.addEventListener("DOMContentLoaded", function () {

}) // PUT CREATION OF FIRST GUESS ROW IN HERE. Take it out of the html and inject the first row in here to start playing the game. 

const COLOURS = ["red", "blue", "green", "yellow", "white", "black"];

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
    return setFourNumbers();
} //MAKE THE OUTPUT OF THIS FUNCTION BE THE ARRAY OF COLOURS

/**
 * This function submits the user's input and locks it in, preventing further changes.
 */
function userSubmission() {

}

/**
 * This function checks the four user-inputted guesses against the four computer-generated choices made at the start of the game in the gameSetup function. 
 * It provides the result of how many of the guesses were a) correct colour and in the correct place, b) correct colour in the incorrect place and c) not a
 * correct colour.
 */
function checkUserSubmission() {

}

/**
 * This function takes the output of the checkUserSubmission function and translates this into the number of red, white and null pegs should be presented for 
 * that row of guesses in the feedback section of the game. 
 */
function provideFeedback() {

}

/**
 * This function advances the round counter by one and provides a new row for guesses, pushing the previous row down the page.
 */
function advanceRound() {

}

/**
 * This function checks the round counter and if it is <10, it calls the advanceRound function to set up for a new round. Otherwise it ends the game with the
 * correct end game message, according to whether they won or lost and if they lost, depending on how many they got correct.
 */
function endOrContinue() {

}

/**
 * This function allows the user to remove the colour of the latest choice in the input row. 
 */
function undoChoice() {

}

/**
 * This function allows the user to remove the colours in the whole input row, however many have been entered so far. 
 */
function resetRow() {

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