const getComputerChoice = () => {
    let choices = ['rock', 'paper', 'scissor'];
    let choice = Math.floor(Math.random()*choices.length);
    return choices[choice];
}

const getPlayerChoice = () => {
    let option = window.prompt("Rock, Paper, Scissor:");
    return option.toLowerCase();
}

const playRound = (computerChoice, playerChoice) => {
    if(computerChoice == playerChoice) {
        return `DRAW! ${computerChoice} and ${playerChoice}`;
    }
    else if(computerChoice == "rock" && playerChoice == "paper" || 
            computerChoice == "paper" && playerChoice == "scissor" ||
            computerChoice == "scissor" && playerChoice == "rock") {
        return `You Won! ${playerChoice} beats ${computerChoice}`;
    }
    else {
        return `You Lost! ${computerChoice} beats ${playerChoice}`;
    }
}

(() => {
    console.log("Let's play a 5 rounds game.");
    for(let i = 0; i < 5; i++) {
        console.log(playRound(getComputerChoice(), getPlayerChoice()));
    }
    console.log("Game over.");
})();

