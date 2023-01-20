const cards = document.querySelectorAll(".memory-card");
const trigger = document.getElementById("trigger");
const rules = document.getElementById("rules");
const closeRules = document.getElementById("close-rules");
const lost = document.getElementById("lost");
let cardOne, cardTwo;
let boardFreeze = false;
let flipped = false;
let StartGame = false;
let matched;
let timer = 60;
let moves = 1;
let reset;

/* event */

cards.forEach(card => card.addEventListener('click', flipCard));
trigger.addEventListener("click", showRules);
closeRules.addEventListener("click", exitRules);


/* onclick function for cards, add flip class for css effects
codde take from https://www.youtube.com/playlist?list=PLngoRLGHq3kCpoT0urRHDPsNVTM7aYsiv and adapted */

function flipCard() {
    if (!StartGame) {
        StartGame = true;
        startCountdown(60);
    }
    
    if (boardFreeze) return; /* return is boardFreeze is true then the rest of the function wont be executed */
    if (this === cardOne) return; /* to identify the first card flipped */
    
    this.classList.add("flip");

    

    if (!flipped) {
        flipped = true;
        cardOne = this; /* fixed the cardOne identitiy */
        return;


    }
    cardTwo = this; /* identify the cardTwo */
    cardsMatchCheck();
}

function showRules() {
    rules.style.display = "block";
}


function exitRules() {
    rules.style.display = "none";
}

function cardsMatchCheck() {
    matched = cardOne.dataset.name === cardTwo.dataset.name;

    if (matched) {
        lockedCards();
    } else {
        notmached();
    }
}

function lockedCards() {

    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
    recountCards();
}

function notmached() {
    boardFreeze = true;
    setTimeout(() => {
        cardOne.classList.remove("flip");
        cardTwo.classList.remove("flip");

        recountCards();
    }, 900);

    addmoves();
}



function recountCards() {
    boardFreeze = false;
    flipped = false;
    cardOne = null;
    cardTwo = null;

}

/* add moves after a second so that it appears after the remove("flip") */

function addmoves() {
    setTimeout(() => {
        document.getElementById("moves").innerHTML = moves++;
    }, 1000);
}


/* function gameOver() {
    lost.style.display = "block";
} */

/* function CountDown() {
    setInterval(() => {
        timer--;
        document.getElementById("timer").innerHTML = timer;
        if (timer == 1) {
            clearInterval(timer);

        }
    }, 1000);

} */


function startCountdown(seconds) {
    let counter = seconds;
      
    const interval = setInterval(() => {
     counter--;
        document.getElementById("timer").innerHTML = counter;
      if (counter < 1 ) {
        clearInterval(interval);
        gameOver ();
      }
    }, 1000);
    
  }
  
  function gameOver () {

    lost.style.display = "block";
  }
   
  
  
