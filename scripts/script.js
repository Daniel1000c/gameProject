//---------Step One: Create canvas
const canvas = document.getElementById("gameCanvas");

//Create game context
const gameContext = canvas.getContext("2d");

//Create game grid size
const gameGrid = 20;

//Create tile count
const tileCount = canvas.width / gameGrid;

//Create snake position variable
let snake = [{x: 10, y: 10}];

//Create food position variable
let food = {x: 10, y: 10};

//Create directionx and directiony variable
let directionx = 0, directiony = 0;

//Create score variable
let score = 0;

//Create game interval 
let gameInterval;

//---------Step Two: Create draw game function
function drawGame() {
    snakeMove();
    
    //Create if statement for game over
    if (checkGameOver()) {

        //Call clear game interval function
        clearInterval(gameInterval);

        //Call save player score function
        savedScore();

        //Return function
        return;
    } else {
        //Call clear canvas function
        clearCanvas();

        //Call draw snake function
        drawSnake();

        //Call draw food function
        drawFood();
    }
}

//---------Step Three: create snake move function
function snakeMove() {
    //Create new head position
    const head = {x: snake[0].x + directionx, y: snake[0].y + directiony};
    snake.unshift(head);

    //Create if statement 
    if (head.x === food.x && head.y === food.y) {
        //Add one to score
        score++;

        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        }
    } else {
        snake.pop();
    }
}

//---------Step Four: Create check game over function
function checkGameOver() {
    const head = snake[0];

    //Create if statement
    if (head.x < 0 || head.y < 0 || head.x >= tileCount || head.y >= tileCount) return true

    //Create for loop
    for (let i = 1; i < snake.length; i++) {

        if(snake[i].x === head.x && snake[i].y === head.y) return true
    }

    return false
}

//---------Step Five: Create clear canvas function
function clearCanvas() {
    gameContext.fillStyle = "black";
    gameContext.fillRect(0, 0, canvas.width, canvas.height);
}

//---------Step Six: Create draw snake function
function drawSnake() {
    //Draw snake color as lime
    gameContext.fillStyle = "lime";

    //Create for loop
    for(let part of snake) {
        gameContext.fillRect(part.x * gameGrid, part.y * gameGrid, gameGrid, gameGrid);
    }
}

//---------Step Seven: Create draw food function
function drawFood() {
    gameContext.fillStyle = "red";
    gameContext.fillRect(food.x * gameGrid, food.y * gameGrid, gameGrid, gameGrid);
}


//---------Step Eight: Create key event listener
document.addEventListener("keydown", e => {
    //Create switch statement for keys
    switch (e.key) {
        case "ArrowUp":
            if (directiony === 0) {
                directionx = 0;
                directiony = -1;
            }
            break;
        case "ArrowDown":
            if (directiony === 0) {
                directionx = 0;
                directiony = 1;
            }
            break;
        case "ArrowLeft":
            if (directionx === 0) {
                directionx = -1;
                directiony = 0;
            }
            break;
        case "ArrowRight":
            if (directionx === 0) {
                directionx = 1;
                directiony = 0;
            }
            break
    }
});

//---------Step Nine: Create save game function
function saveGame() {
    const player = document.getElementById("playerName").value || "Player";

    //Create const called game data
    const gameData = {
        player,
        score,
        snake,
        directionx,
        directiony,
        timestamp: new Date().toLocaleString()
    };

    //Create local storage
    localStorage.setItem("gameData", JSON.stringify(gameData));

    //Create alert
    alert("Game Saved");
}

//---------Step Ten: Create resume game function
function resumeGame() {
    //Create a const called saved game 
    const savedGame = localStorage.getItem("gameData");

    //Create if statement to check if game was saved
    if (savedGame) {

        //Create const called game data
        const gameData = JSON.parse(savedGame);

        snake = gameData.snake;
        directionx = gameData.directionx;
        directiony = gameData.directiony;
        score = gameData.score;
        clearInterval(gameInterval);
        gameInterval = setInterval(drawGame, 100);

        //Create alert that game was loaded
        alert('Game Loaded');
    } else {

        //Create alert that game was not loaded
        alert('No Game Saved');
    }
}

//---------Step Eleven: Create Save player score function
function savedScore() {
    const player = document.getElementById("playerName").value || "Player";
    const playertime = new Date().toLocaleString();
    const scoreData = {
        player,
        score,
        playertime
    };
    let leaderboard = localStorage.getItem("leaderboard") || "[]";
    leaderboard = JSON.parse(leaderboard);
    leaderboard.push(scoreData);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

gameInterval = setInterval(drawGame, 100);