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


