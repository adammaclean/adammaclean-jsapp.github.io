/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

- a player loses their entire score when they roll two sixes in a row.
- add input field to enable players to change target score from the default 100 points.
- add another di, if player rolls a 1 on either they lose their round score.

*/


var scores, roundScore, activePlayer, diceDOM, diceDOM2, gameRunning, lastRoll;


diceDOM = document.querySelector(".dice");
diceDOM2 = document.querySelector(".dice2");


//init new game
function newGame(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameRunning = true;
    lastRoll = 0;
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}

newGame();


document.querySelector(".btn-roll").addEventListener("click", function(){
    if(gameRunning){
         //1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    
    //2. Display result
    
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    
    diceDOM2.style.display = "block";
    diceDOM2.src = "dice-" + dice2 + ".png";
    
    //3. Update round score if number was not a 1 & player didn't roll 2 sixes
    /*if (dice === 6 && lastRoll === 6){
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = "0";
        nextPlayer();
    } 
    else */if (dice !== 1 && dice2 !== 1){
        //Add score
        roundScore += (dice + dice2);
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    }
    else {
        //Next player
        nextPlayer();
    }
        lastRoll = dice;
        
        
}
});
   
document.querySelector(".btn-hold").addEventListener("click", function(){
    if(gameRunning){
        //update global score
    scores[activePlayer] += roundScore;
    
    //update UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    
    //check for target score input, if empty use default
    var input = document.querySelector(".input").value;
    var scoreToWin;   
    if(input) {
        scoreToWin = input;
    }else{
        scoreToWin = 20;
    }
        
    //check if there is a winner, if not next player
    if (scores[activePlayer] >= scoreToWin){
        
        diceDOM.style.display = "none";
        document.querySelector("#name-" + activePlayer).textContent = "Winner!";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        gameRunning = false;
    } else{
     
        nextPlayer();
    
    }
    }    
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById("current-0").textContent = "0";
        document.getElementById("current-1").textContent = "0";
        
        document.querySelector(".player-0-panel").classList.toggle("active");
        document.querySelector(".player-1-panel").classList.toggle("active");
        
        //diceDOM.style.display = "none";
        //diceDOM2.style.display = "none";
        
}

document.querySelector(".btn-new").addEventListener("click", newGame);
















