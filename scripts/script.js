/* ------------ CONSTANTS ------------ */
const newGameBtn = document.getElementById("newGame");
const rollBtn = document.getElementById("rollDice");
const popUp = document.getElementById("pop-up");
const btnClose = document.getElementById("btn-close");
const winner = document.getElementById("winner");
const rules = document.getElementById("rules");
const player = document.getElementById("player");
const playerDiceHeading = document.getElementById("p1.1");
const playerScoreHeading = document.getElementById("p1.2");

/* ------------ VARIABLES ------------ */
// Player dice 1 and 2 element
let playerDice1Image = document.getElementById("playerDiceOneImage");
let playerDice2Image = document.getElementById("playerDiceTwoImage");
// Player dice 1 and 2 face
let playerDiceFace1;
let playerDiceFace2;
// Player round score element
let playerRoundScore = document.getElementById("playerScoreValue");
// Player Total score element
let playerTotalScore = document.getElementById("playerTotalScoreValue");
// Player round score
let playerRScore;
// Array of total player score
let playerTScore = [];
// Sum of total score array
let playerSum;  

// Comp dice 1 and 2 element
let compDice1Image = document.getElementById("compDiceOneImage");
let compDice2Image = document.getElementById("compDiceTwoImage");
// Comp dice 1 and 2 face
let compDiceFace1;
let compDiceFace2;
// Comp round score element
let compRoundScore = document.getElementById("compScoreValue");
// Comp Total score element
let compTotalScore = document.getElementById("compTotalScoreValue");
// Comp round score
let compRScore;
// Array of total comp score
let compTScore = []; 
// Sum of total score array
let compSum;

// Counter to keep track of the score
let counter = 0;
// Delay timer
let delay = 200;


/* ------------ SCRIPT ------------ */
// Event listener based on the click
rollBtn.addEventListener('click', diceRoll); 

// Dice roll function
function diceRoll() {
    // Counter + boolean
    let maxRound = 2;
    let round = true;

    // if max round
    if (counter > maxRound) {
        rollBtn.removeEventListener('click', diceRoll);  
        round = false;
    }

    // Swap dice roll button with end game button
    if (counter == maxRound) {
        rollBtn.innerHTML = "End Game";
    }

    if(round) {
        // Counter to keep track of rounds
        counter++;

        // Randomize player dice 1 and 2 face
        playerDiceFace1 = Math.floor(Math.random() * 6) + 1;
        playerDiceFace2 = Math.floor(Math.random() * 6) + 1;
        // Randomize comp dice 1 and 2 face
        compDiceFace1 = Math.floor(Math.random() * 6) + 1;
        compDiceFace2 = Math.floor(Math.random() * 6) + 1;

        // Conditional statement for player scores
        if (playerDiceFace1 != 1 && playerDiceFace2 != 1) {
            if (playerDiceFace1 == playerDiceFace2) {
                playerRScore = (2*(playerDiceFace1 + playerDiceFace2));
                playerTScore.push(playerRScore);
            } else {
                playerRScore = playerDiceFace1 + playerDiceFace2;
                playerTScore.push(playerRScore);
            }
        } else {
            playerRScore = 0;
            playerTScore.push(playerRScore);
        }

        // Conditional statement for comp scores
        if (compDiceFace1 != 1 && compDiceFace2 != 1) {
            if (compDiceFace1 == compDiceFace2) {
                compRScore = (2*(compDiceFace1 + compDiceFace2));
                compTScore.push(compRScore);
            } else {
                compRScore = compDiceFace1 + compDiceFace2;
                compTScore.push(compRScore);
            }
        } else {
            compRScore = 0;
            compTScore.push(compRScore);
        } 

        // Total the arrays
        playerSum = playerTScore.reduce(arrayAdd, 0);
        compSum = compTScore.reduce(arrayAdd, 0);

        // Update player score
        playerRoundScore.innerHTML = playerRScore;
        compRoundScore.innerHTML = compRScore;
        playerTotalScore.innerHTML = playerSum;
        compTotalScore.innerHTML = compSum;

        // Update images on html
        playerDice1Image.src = `images/face${playerDiceFace1}.png`;
        playerDice2Image.src = `images/face${playerDiceFace2}.png`;
        compDice1Image.src = `images/face${compDiceFace1}.png`;
        compDice2Image.src = `images/face${compDiceFace2}.png`;
    }

    if(!round) {

        if (playerSum > compSum) {
            popUpIntervalHandler = setTimeout(function(){
                // set popup to fade in
                popUp.classList.toggle('fade');
                winner.innerHTML = `<h3><b>GAME OVER!!!</b></h3>`;
                winner.innerHTML += `<b>${person} Wins</b> <br>`;
                winner.innerHTML += `<br> Score: <br> ${person} = ${playerSum} points <br> Computer = ${compSum} points`;
        }, delay);
        } else if (compSum > playerSum) {
            popUpIntervalHandler = setTimeout(function(){
                // set popup to fade in
                popUp.classList.toggle('fade');
                winner.innerHTML = `<h3><b>GAME OVER!!!</b></h3>`;
                winner.innerHTML += `<b>Computer Wins</b> <br>`;
                winner.innerHTML += `<br> Score: <br> Computer = ${compSum} points <br> ${person} = ${playerSum} points`;
        }, delay);
        } else {
            popUpIntervalHandler = setTimeout(function(){
                // set popup to fade in
                popUp.classList.toggle('fade');
                winner.innerHTML = `<h3><b>GAME OVER!!!</b></h3>`;
                winner.innerHTML += `<b>It's a tie</b> <br>`;
                winner.innerHTML += `<br> Score: <br> ${person} = ${playerSum} points <br> Computer = ${compSum} points`;
        }, delay);
        }
    }   
};
 
// Function to add array values
function arrayAdd(total, num){
        return total + num;
    }

// Reset game to start new
newGameBtn.addEventListener('click', function(){
    window.location.reload();
});

// Event listener to close the popup
btnClose.addEventListener('click', function(){
    // set popup to hide
    popUp.style.opacity = 0;
    // end the popup interval handler
    clearInterval(popUpIntervalHandler);
});

// Hide and show instructions
rules.addEventListener('click', hideAndSeek);
function hideAndSeek() {
    let data = document.getElementById("hiddenRules");
    
    if (data.style.display === "none") {
        data.style.display = "block";
    } else {
        data.style.display = "none";
    }
}

// get player name, default is pikachu
let person = prompt("Please Enter your name:", "Pikachu");

// Player object
class Player{
    // Use user name entered
    constructor(name){
        this.name = name;
    }
    // Change innerhtml naming to user's entered name
    describeSelf(){
        let naming = player.innerHTML = person;
        naming += playerDiceHeading.innerHTML = person;
        naming += playerScoreHeading.innerHTML = person;
        return naming;
    }
}

// Instantiate the player object
const newPlayer = new Player(person);
newPlayer.describeSelf();



