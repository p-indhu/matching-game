/*
 * Create a list that holds all of your cards
 */

let cards = ['gift','car','anchor','bolt','cube','leaf','bicycle','bomb',
            'gift','car','anchor','bolt','cube','leaf','bicycle','bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Display cards on page
function displayCards() {
    cards = shuffle(cards);
    const deck = document.querySelector(".deck");
    deck.innerHTML = '';
    let cardHtml = '';
    for(const card of cards) {
      cardHtml = `${cardHtml}
      <li class="card">
          <i class="fa fa-${card}"></i>
      </li>`
    }
    deck.innerHTML = cardHtml;
}

displayCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function turnCard(card) {
    card.classList.add("show" ,"open");
}

let openCards = new Array();
let lastCard = '';
function addtoOpenCards(card) {
    const classes = card.querySelector("i").classList;
    openCards.push(classes[1]);
}

function removefromOpenCards(card) {
    const classes = card.querySelector("i").classList;
    openCards.pop(classes[1]);
    lastCard = '';
}

function cardMatched(card) {
    let openCard;
    card.classList.add("match");
    card.classList.remove("show");
    openCard = document.querySelector(".show")
    openCard.classList.remove("show");
    openCard.classList.add("match");
    console.log(card.classList);
    lastCard = '';
}

function cardNotMatched(card) {
    setTimeout(function() {
        card.classList.remove("open", "show");
        console.log(card.classList);
        openCard = document.querySelector(".show")
        openCard.classList.remove("open", "show");
        console.log(openCard.classList);
    },500);
    removefromOpenCards(card);
    openCards.pop(lastCard);
    console.log(openCards);
}

function displayMovesandStars() {
    let moves = document.querySelector(".moves");
    moves.textContent = parseInt(moves.textContent) + 1;
    if(parseInt(moves.textContent) >= 18) {
        const star3 = document.querySelector(".star3");
        star3.classList.remove("fas");
        star3.classList.add("far");
    }
    if(parseInt(moves.textContent) >= 25) {
      console.log(">20");
      const star2 = document.querySelector(".star2");
      star2.classList.remove("fas");
      star2.classList.add("far");
    }
    if(parseInt(moves.textContent) >= 30) {
      console.log(">25");
      const star1 = document.querySelector(".star1");
      star1.classList.remove("fas");
      star1.classList.add("far");
    }

}

function finalData() {
    const moves = document.querySelector(".moves");
    let stars = '';
    document.getElementById("finalMoves").innerHTML = moves.textContent;
    if(parseInt(moves.textContent) >= 30) {
        stars = "0";
    }
    else if(parseInt(moves.textContent) >= 25) {
        stars = "1";
    }
    else if(parseInt(moves.textContent) >= 18) {
        stars = "2";
    }
    else {
        stars = "3"
    }

    document.getElementById("finalStars").innerHTML = stars;
}

function on() {
    finalData();
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

function play(evt) {
    const card = evt.target;
    if(card.nodeName == "LI") {
        turnCard(card);
        addtoOpenCards(card);
        let openCard;
        if(lastCard !== '') {
            if(lastCard === card.querySelector("i").classList[1]) {
                  cardMatched(card);
            }
            else {
                  cardNotMatched(card)
            }
        }
        else {
            lastCard = card.querySelector("i").classList[1]
        }
        console.log(lastCard);
        displayMovesandStars();
    }
    if(openCards.length == 16) {
          on();
    }
}

function refresh(evt) {
    displayCards();
    openCards = [];
    lastCard = '';
    document.querySelector(".moves").textContent = "0";
    console.log(document.querySelector(".star1").classList);
    document.querySelector(".star1").classList.remove("far");
    document.querySelector(".star1").classList.add("fas");
    console.log(document.querySelector(".star1").classList);
    console.log(document.querySelector(".star2").classList);
    document.querySelector(".star2").classList.remove("far");
    document.querySelector(".star2").classList.add("fas");
    console.log(document.querySelector(".star2").classList);
    console.log(document.querySelector(".star3").classList);
    document.querySelector(".star3").classList.remove("far");
    document.querySelector(".star3").classList.add("fas");
    console.log(document.querySelector(".star3").classList);
}

document.querySelector(".deck").addEventListener('click', play);
document.querySelector("#nextGame").addEventListener('click', refresh);
document.querySelector(".restart").addEventListener('click', refresh);
