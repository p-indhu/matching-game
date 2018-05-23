/*
 * list that holds all of the cards
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

// Create HTML and Display cards on page
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

// flip and display card
function turnCard(card) {
    card.classList.add("show" ,"open");
}

let openCards = new Array();
let lastCard = '';
// Maintain a list of open cards
function addtoOpenCards(card) {
    const classes = card.querySelector("i").classList;
    openCards.push(classes[1]);
}

// When unmatched cards are closed, remove them from list of "openCards"
function removefromOpenCards(card) {
    const classes = card.querySelector("i").classList;
    openCards.pop(classes[1]);
    lastCard = '';
}

// When cards match, fix it in open/matched state
function cardMatched(card) {
    let openCard;
    card.classList.add("match");
    card.classList.remove("show");
    openCard = document.querySelector(".show")
    openCard.classList.remove("show");
    openCard.classList.add("match");
    lastCard = '';
}

// When cards are not matched, close the current and the previous card that is shown
function cardNotMatched(card) {
    setTimeout(function() {
        card.classList.remove("open", "show");
        openCard = document.querySelector(".show")
        openCard.classList.remove("open", "show");
    },500);
    removefromOpenCards(card);
    openCards.pop(lastCard);
}

// Display the number of moves played and the star accordingly
function displayMovesandStars() {
    let moves = document.querySelector(".moves");
    moves.textContent = parseInt(moves.textContent) + 1;
    if(parseInt(moves.textContent) >= 18) {
        const star3 = document.querySelector(".star3");
        star3.classList.remove("fas");
        star3.classList.add("far");
    }
    if(parseInt(moves.textContent) >= 26) {
      const star2 = document.querySelector(".star2");
      star2.classList.remove("fas");
      star2.classList.add("far");
    }
    if(parseInt(moves.textContent) >= 30) {
      const star1 = document.querySelector(".star1");
      star1.classList.remove("fas");
      star1.classList.add("far");
    }

}

// Content for the final win-screen
function finalData() {
    const finalTime = document.querySelector(".time");
    document.querySelector("#finalTime").textContent = finalTime.textContent;
    const moves = document.querySelector(".moves");
    let stars = '';
    document.getElementById("finalMoves").innerHTML = moves.textContent;
    if(parseInt(moves.textContent) >= 30) {
        stars = "0";
    }
    else if(parseInt(moves.textContent) >= 26) {
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

// Display the winning message
function winScreen() {
    finalData();
    document.getElementById("winScreen").style.display = "block";
}

// Close the winning message
function closeWinScreen() {
    document.getElementById("winScreen").style.display = "none";
}

// Restart the game
function refresh(evt) {
    displayCards();
    openCards = [];
    lastCard = '';
    first = "true";
    stoptimer = true;
    document.querySelector(".moves").textContent = "0";
    document.querySelector(".time").textContent = "0";
    document.querySelector(".star1").classList.remove("far");
    document.querySelector(".star1").classList.add("fas");
    document.querySelector(".star2").classList.remove("far");
    document.querySelector(".star2").classList.add("fas");
    document.querySelector(".star3").classList.remove("far");
    document.querySelector(".star3").classList.add("fas");
}

// Display time since start of the game
function startTimer() {
    const timer = document.querySelector(".time");
    let counter = 0;
    stoptimer = false;
    const interval = setInterval(function() {
      if(stoptimer === true) {
        clearInterval(interval);
      }
      else {
      counter++;
      timer.textContent = counter;
      }
      }, 1000);
}

// Core Logic - When a card is clicked
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol
 *  - add the card to a *list* of "open" card
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol
 *    + increment the move counter and display it on the page
 *    + if all cards have matched, display a message with the final score
 */
let stoptimer;
let first = "true";
function play(evt) {
    const card = evt.target;
    if(card.nodeName == "LI") {
        if(!(card.classList.contains("show") || card.classList.contains("match"))) {
            if(first === "true") {
              startTimer();
              first = "false";
            }
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
            displayMovesandStars();
            if(openCards.length == 16) {
                  stoptimer = true;
                  winScreen();
            }
          }
    }
}

// Event listeners for card clicks and game restart
document.querySelector(".deck").addEventListener('click', play);
document.querySelector("#nextGame").addEventListener('click', refresh);
document.querySelector(".restart").addEventListener('click', refresh);
document.querySelector("#winScreen").addEventListener('click', closeWinScreen);
