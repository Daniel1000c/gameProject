//Create save game function
function saveGame(game) {
    //Create constand called game data
    const gameData = JSON.stringify(game);

    //Create local storage
    localStorage.setItem("game", gameData);

    //Create alert message that game has been saved
    alert("Game Saved!!");
}

//Create load game function
function loadGame() {

    //Create constant called savedGame
    const savedGame = localStorage.getItem("game");

    if (savedGame) {

        //Create constant called game
        const game = JSON.parse(savedGame);

        //Create intialize game function
        initializeGame(game);

        //Create alert message that game has been loaded
        alert("Game Loaded!!");
    } else {

        //Create error message that no game has been saved
        alert("No game has been saved.");
    }
}