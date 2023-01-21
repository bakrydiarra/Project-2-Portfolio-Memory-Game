const cards = document.querySelectorAll(".memory-card");
const trigger = document.getElementById("trigger");
const rules = document.getElementById("rules");
const lost = document.getElementById("lost");
const won = document.getElementById("won");
const btn_rules = document.getElementById("btn-rules");
const btn_won = document.getElementById("btn-won");
const btn_lost = document.getElementById("btn-lost");
const closeRules = document.getElementById("close-rules");
const closeWon = document.getElementById("close-won");
const closeLost = document.getElementById("close-lost");
const timer = document.getElementById("timer");


let cardOne, cardTwo;
let boardFreeze = false;
let flipped = false;
let StartGame = false;
let matched;
let totalMatched = 0;
let moves = 0;
let resultMoves;
let interval;
let counter = 100;
let resultTime;

/* event */

cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();
trigger.addEventListener("click", showRules);
closeRules.addEventListener("click", exitRules);
closeWon.addEventListener("click", exitWon);
closeLost.addEventListener("click", exitLost);
btn_rules.addEventListener("click", exitRules);
btn_won.addEventListener("click", exitWon);
btn_lost.addEventListener("click", exitLost);




/* onclick function for cards, add flip class for css effects
codde take from https://www.youtube.com/playlist?list=PLngoRLGHq3kCpoT0urRHDPsNVTM7aYsiv and adapted */

function flipCard() {
    if (!StartGame) {
        StartGame = true;
        startCountdown();
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
    rest();
}

function cardsMatchCheck() {
    matched = cardOne.dataset.name === cardTwo.dataset.name;
    if (matched) totalMatched += 1;
    if (totalMatched == 8) {
        showVictory();
    }


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

function addMatch() {
    totalMatched++;
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

/* function allows to count the next pair of cards */

function recountCards() {
    boardFreeze = false;
    flipped = false;
    cardOne = null;
    cardTwo = null;

}

/* add moves after a second so that it appears after the remove("flip") */

function addmoves() {
    moves = 1;
    setTimeout(() => {
        document.getElementById("moves").innerHTML = moves++;
    }, 1000);
}


/* Timer */

function startCountdown() {


    interval = setInterval(() => {
        counter--;
        document.getElementById("timer").innerHTML = counter;
        if (counter < 1) {

            gameOver();
        }
    }, 1000);

}

/* popup window lost */

function gameOver() {
    clearInterval(interval);
    lost.style.display = "block";
}

function exitLost() {
    lost.style.display = "none";
    rest();
}


/* popup window won */

function showVictory() {
    won.style.display = "block"
    clearInterval(interval);
    resultTime = document.getElementById("timer").innerHTML;
    document.getElementById("final-time").innerHTML = resultTime;
    resultMoves = document.getElementById("moves").innerHTML;
    document.getElementById("final-moves").innerHTML = resultMoves;

}

function exitWon() {
    won.style.display = "none";
    rest();
}

/* code taken from ...  */

function shuffle() {
    cards.forEach(cards => {
        let randomPosition = Math.floor(Math.random() * 16);
        cards.style.order = randomPosition;
    });

}

function rest() {
    setTimeout(() => {
    cardOne = null;
    cardTwo = null;
    boardFreeze = false;
    flipped = false;
    StartGame = false;
    totalMatched = 0;
    moves = 0;
    counter = 100;
    document.getElementById("timer").innerHTML = 100;
    cards.forEach(cardReturn => cardReturn.classList.remove('flip'));
    shuffle();
    cards.forEach(card => card.addEventListener('click', flipCard));
}, 500);

}