const cards = document.querySelectorAll(".memory-card");
const trigger = document.getElementById("trigger");
const rules = document.getElementById("rules");
const  closeRules = document.getElementById("close-rules");
let cardOne, cardTwo;
let boardFreeze = false;
let flipped = false;
let matched;
let win;
let lost;
let timer = 60;
let reset;

/* event */

cards.forEach(card => card.addEventListener('click', flipCard));
trigger.addEventListener("click", showRules);
closeRules.addEventListener("click", exitRules);


/* onclick function for cards, add flip class for css effects
codde take from https://www.youtube.com/playlist?list=PLngoRLGHq3kCpoT0urRHDPsNVTM7aYsiv and adapted */

function flipCard() {
if (boardFreeze) return;  /* return is boardFreeze is true then the rest of the function wont be executed */
if (this === cardOne) return; /* to identify the first card flipped */

this.classList.add("flip");

if (!flipped) {
    flipped = true;
    cardOne = this;  /* fixed the cardOne identitiy */
    return;
    
}
cardTwo = this; /* identify the cardTwo */
cardsMatchCheck ();
}

function showRules() {
    rules.style.display = "block";
}


function exitRules () {
    rules.style.display = "none";
}

function cardsMatchCheck () {
    matched = cardOne.dataset.name === cardTwo.dataset.name;

    if (matched) {
        unFlipCard();
    } else {
        notmached ();
    }
}

function unFlipCard () {

    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
    recountCards ();
}

function notmached () {
    cardOne.classList.remove("flip");
    cardTwo.classList.remove("flip");
}

function recountCards () {
    boardFreeze = false;
    flipped = false;
    cardOne = null;
    cardTwo =  null;
}
