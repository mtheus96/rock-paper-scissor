// Nodes references
const BUTTONS = document.querySelectorAll(".opt");
const ROUNDS = document.querySelector(".rounds");
const POINTS = document.querySelector(".points");
const MSG = document.querySelector(".message");
const RESULT = document.querySelector(".result");

  // keep records of the game
let rounds = 1;
let player = 0;
let pc = 0;
let draw = 0;


// Choose a random option for the computer
const getComputerChoice = () => {
    let choices = ['rock', 'paper', 'scissor'];
    let choice = Math.floor(Math.random()*choices.length);
    return choices[choice];
}

// Pick the player option
const getPlayerChoice = (element) => {
    let playerChoice = element.getAttribute("value");
    return playerChoice;
}

// Check which one won the round
const playRound = (computerChoice, playerChoice) => {
    if(computerChoice == playerChoice) {
        return "DRAW";
    }
    else if(computerChoice == "rock" && playerChoice == "paper" || 
            computerChoice == "paper" && playerChoice == "scissor" ||
            computerChoice == "scissor" && playerChoice == "rock") {
        return "WIN";
    }
    else {
        return "LOSS";
    }
}

// Put the necessary content in the UI
const setUIResult = (result, playerChoice, computerChoice) => {
    if(RESULT.hasChildNodes()) {
        RESULT.removeChild(RESULT.firstChild);
    }

    // Write the game result in the UI
    MSG.textContent = `${result}!!! Player: ${playerChoice} Computer: ${computerChoice}`;
    POINTS.textContent = "Points: " + player;
    ROUNDS.textContent = "Rounds: " + rounds;

    // Put the img corresponding to the computer selection
    let img = document.createElement("img");
    img.setAttribute("src", `img/${computerChoice}.png`);
    img.setAttribute("z-index","999");

    RESULT.appendChild(img);
}

// reset the game
const reset = () => {
    ROUNDS.textContent = "Rounds: " + 1;
    POINTS.textContent = "Points: " + 0;
    MSG.textContent = "Choose your option below.";
    RESULT.removeChild(RESULT.firstChild);
    

    rounds = 0;
    player = 0;
    pc = 0;
    draw = 0;
}

// show final results of the game
const showEndResults = ()  => {
    let result;
    if(player > pc) {
        result = "Congratulations, You WON!!!";
    }
    else if(player == pc) {
        result = "Nobody won this game";
    }
    else {
        result = "Computer won";
    }
    alert(`Game results:\n
            Rounds played: ${rounds}\n
            Player points: ${player}\n
            Computer points: ${pc}\n
            Number of draws: ${draw}\n
            ${result}\n
        `);
}

// game main function
const game = (clickedOption) => {
    if(rounds >= 5) {
        alert("GAME OVER!");
        showEndResults();
        reset();

        // without return the game will restart involuntary
        return false;
    }  

    // get player and computer choice
    let playerChoice = getPlayerChoice(clickedOption);
    let computerChoice = getComputerChoice();

    // see who won the game
    let result = playRound(computerChoice, playerChoice);
    // debug:
    console.log(result);
    
    rounds += 1;

    // manage the UI according to the result 
    switch(result) {
        case "DRAW": 
            draw += 1;
            setUIResult("DRAW", playerChoice, computerChoice);
        break;
        case "WIN": 
            player += 1;
            setUIResult("WIN", playerChoice, computerChoice);
        break;
        case "LOSS": 
            pc += 1;
            setUIResult("LOSS", playerChoice, computerChoice);
        break;
        default:
            console.log("Something unexpected happened.");
    }

    //debug:
    console.log(`Round: ${rounds} Player: ${player} PC: ${pc} Draw: ${draw}`);
}

// get player's click
BUTTONS.forEach(element => {
    element.addEventListener("click", (element) => game(element.target));
});

