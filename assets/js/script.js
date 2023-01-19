const cards = document.querySelectorAll(".memory-card");
const trigger = document.getElementById("trigger");
const rules = document.getElementById("rules");
const  closeRules = document.getElementById("close-rules");

function flipCard() {
    this.classList.add("flip")
}

cards.forEach(card => card.addEventListener('click', flipCard));


function showRules() {
    rules.style.display = "block";
}

trigger.addEventListener("click", showRules);

function exitRules () {
    rules.style.display = "none";
}

closeRules.addEventListener("click", exitRules);