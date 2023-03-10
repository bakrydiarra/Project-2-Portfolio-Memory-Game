/* DomContenLoaded function  take from the love-maths challenge and adapted
Wait for the DOM to finish loading before running the game */

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll(".memory-card");
    const trigger = document.getElementById("trigger");
    const reload = document.getElementById("reload");
    const rules = document.getElementById("rules");
    const lost = document.getElementById("lost");
    const won = document.getElementById("won");
    const btn_rules = document.getElementById("btn-rules");
    const btn_won = document.getElementById("btn-won");
    const btn_lost = document.getElementById("btn-lost");
    const closeRules = document.getElementById("close-rules"); 
    const closeWon = document.getElementById("close-won");
    const closeLost = document.getElementById("close-lost");
    let cardOne, cardTwo;
    let boardFreeze = false;
    let flipped = false;
    let startGame = false;
    let matched;
    let totalMatched = 0;
    let moves = 0;
    let resultMoves = 0;
    let interval;
    let timer = 60;
    let resultTime;

    /* event */

    cards.forEach(card => card.addEventListener('click', flipCard));
    shuffle();
    trigger.addEventListener("click", showRules);
    reload.addEventListener("click", rest);
    closeRules.addEventListener("click", exitRules);
    closeWon.addEventListener("click", exitWon);
    closeLost.addEventListener("click", exitLost);
    btn_rules.addEventListener("click", exitRules);
    btn_won.addEventListener("click", exitWon);
    btn_lost.addEventListener("click", exitLost);






    function flipCard() {
        if (!startGame) {
            /*  used a startGame variable in a  condition  in oder to set the function startCountdown at the moment when the user click a card */
            startGame = true;
            startCountdown();
        }

        if (boardFreeze) return; /* return is boardFreeze is true then the rest of the function wont be executed */
        if (this === cardOne) return; /* to identify the first card flipped */

        this.classList.add("flip");
        /* onclick function for cards, add flip class for css effects
           codde take from https://www.youtube.com/watch?v=HsD6f7_3nIg&list=PLngoRLGHq3kCpoT0urRHDPsNVTM7aYsiv&index=2 and adapted */


        if (!flipped) {
            flipped = true;
            cardOne = this; /* fixed the cardOne identitiy */
            return;
        }
        cardTwo = this; /* identify the cardTwo */
        moves += 1;
        showMoves(moves);
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
        /* checking if CardOne & CardTwo 'data-id' are a match initial code from https://www.youtube.com/watch?v=CtFOeJneBaA&list=PLngoRLGHq3kCpoT0urRHDPsNVTM7aYsiv */
        if (matched) totalMatched += 1;
        matched ? lockedCards() : unflipCards();
        if (totalMatched == 8) {
            setTimeout(() => {
                showVictory();
            }, 900);
        }
    }

    function lockedCards() {

        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        recountCards();
    }

    function unflipCards() {
        boardFreeze = true;
        setTimeout(() => {
            cardOne.classList.remove("flip");
            cardTwo.classList.remove("flip");

            recountCards();
        }, 900);
    }

    /* function allows to recount the next pair cardOne and cardTwo*/

    function recountCards() {
        [boardFreeze, flipped] = [false, false];
        [cardOne, cardTwo] = [null, null];
    }


    function showMoves(moves) {
        document.getElementById("moves").innerHTML = moves;
    }


    /* Timer */

    function startCountdown() {


        interval = setInterval(() => {
            timer--;
            document.getElementById("timer").innerHTML = timer;
            if (timer < 1) {
                gameOver();
            }
        }, 1000);

    }

    /* modal window lost */

    function gameOver() {
        clearInterval(interval);
        lost.style.display = "block";
    }

    function exitLost() {
        lost.style.display = "none";
        rest();
    }


    /* modal window won */

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

    /* code taken from  https://www.youtube.com/watch?v=1G6MwIy-7Yc&list=PLngoRLGHq3kCpoT0urRHDPsNVTM7aYsiv&index=8 and adapted wothout IIFE */

    function shuffle() {
        cards.forEach(cards => {
            let randomPosition = Math.floor(Math.random() * 16);
            cards.style.order = randomPosition;
        });

    }

    function rest() {
        clearInterval(interval);
        setTimeout(() => {
            [cardOne, cardTwo] = [null, null];
            [boardFreeze, flipped, startGame] = [false, false, false];
            totalMatched = 0;
            moves = 0;
            timer = 60;
            resultTime = 0;
            resultMoves;
            document.getElementById("timer").innerHTML = 60;
            document.getElementById("moves").innerHTML = 0;
            cards.forEach(cardReturn => cardReturn.classList.remove('flip'));
            shuffle();
            cards.forEach(card => card.addEventListener('click', flipCard));
            showMoves(moves);
        }, 500);

    }
});