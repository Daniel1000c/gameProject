//Create game state
let gameState = {
    score: 0,
    moves: 0,
    tableau: [],
    foundation: [],
    drawPile: [],
    playerName: "Player 1",
}

//Create save game function
function saveGame() {
    localStorage.setItem("solitaire", JSON.stringify(gameState));

    //Create alert message
    alert("Game saved!");
}

//Create resume game function
function resumeGame() {
    const saveState = localStorage.getItem("solitaire");

    if (saveState) {
        gameState = JSON.parse(saveState);
        tableau = gameState.tableau;

        //Reload card images
        for( let column of tableau) {
            for(let card of column) {
                card.img = new Image();
                card.img.src = `images/${card.suit}/${card.value}.png`;
            }
        }
    } else {
        //Create alert message
        alert("No game saved.");
    }
}

//Create event listener for save button
document.getElementById("save").addEventListener("click", saveGame);

//Create event listener for resume button
document.getElementById("resume").addEventListener("click", resumeGame);


//Create card data 
const suits = ["clubs", "diamonds", "hearts", "spades"];

const values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];

//Create deck array
let deck = [];

//Create "createDeck" function
function createGameDeck() {
    //Call deck array
    deck = [];

    //Create for loop
    for(let suit of suits) {
        for(let value of values) {
            //Create card object
            deck.push({
                suit: suit,
                value: value,
                img: new Image(),
                flipped: false
            });
        }
    }
}

//Create "deckShuffle" function
function deckShuffle() {
    for(let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
} 

//Create load card imgs function
function loadCards(){
    for(let card of deck) {
        card.img.src = `images/${card.suit}/${card.value}.png`;
    }
}


//Set up card game
//Create canvas element
const canvas = document.getElementById("gameCanvas");

//Create canvas context
const ctx = canvas.getContext("2d");

//Create draw card function
function drawCard(card, x, y) {

    //Create if statement if card is faced up
    if(card.flipped) {
        ctx.drawImage(card.img, x, y, 100, 150);
    } else {
        ctx.fillStyle = "#444";
        ctx.fillRect(x, y, 80, 120);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(x, y, 80, 120);
    }
}


//Create tableau setup function

//Create tableau array
let tableau = [];

//Create "createTableau" function
function createTableau() {
    //Set index of deck to 0
    let index = 0;

    //Create for loop
    for(let col = 0; col < 7; col++) {
        //Create column array
        let column = [];

        //Create for loop
        for(let row = 0; row <= col; row++) {
            //Create card object
            let card = deck[index++];

            //Add card to column array
            card.flipped = (row === col);
            column.push(card);
        }

        //Add column array to tableau array
        tableau.push(column);
    }
    gameState.tableau = tableau; 
}

//Create draw tableau function
function drawTableau() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Create for loop
    for(let col = 0; col < tableau.length; col++) {
        let column = tableau[col];

        //Create for loop
        for(let row = 0; row < column.length; row++) {
            let card = column[row];

            //Call draw card function
            drawCard(card, 40 + col * 120, 40 + row * 180);
        }
    }
}

//Create start new game function
function startGame() {
    //Call previous functions
    createGameDeck();
    deckShuffle();
    loadCards();
    createTableau();
    drawTableau();

    //Redraw canvas after images are loaded
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTableau();
    }, 500);
}

//Call start game function
window.onload = function() {
    startGame();
}