//Create gameboard variable
const gameboard = document.querySelector("#gameBoard");

//Create game context
const gameCtx = gameboard.getContext("2d");

//Create score text variable
const scoreText = document.querySelector("#score");

//Create reset button variable
const resetButton = document.querySelector("#reset");

//Create saved game variable
//const savedGame = document.querySelector("#savedGame");

//Create load button variable
const loadButton = document.querySelector("#load");

//Create save button variable
const saveButton = document.querySelector("#save");

//Create pause button variable
const pauseButton = document.querySelector("#pause");

//Create resume button variable
const resumeButton = document.querySelector("#resume");

//Create game width
const gameWidth = gameboard.width;

//Create game height
const gameHeight = gameboard.height;

//Create snake game background
const boardBg = "black";

//Create snake color 
const snakeColor = "lightgreen";

//Create snake border color
const borderColor = "lightblue";

//Create food color
const foodColor = "red";

//Create unitsize 
const unitSize = 25;

//Crate is game over variable
let isGameOver = false;

//Create isrunning variable
let isRunning = false;

//Create velocity variable
let velocityX = unitSize;

//Create velocity variable
let velocityY = 0;

//Create food x and y position
let foodx;
let foody;

//Create score variable
let gameScore = 0;

//Create snake array
let snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
];

//Create player name variable
let playerName = "";

//Create key down event listener for player to move snake
window.addEventListener("keydown", changeDirection);

//Create reset button event listener
resetButton.addEventListener("click", resetGame);

//Create pause button event listener
loadButton.addEventListener("click", loadGame);

//Create reset button event listener
saveButton.addEventListener("click", saveGame);

//Create pause button event listener
pauseButton.addEventListener("click", pauseGame);

//Create pause button event listener
resumeButton.addEventListener("click", resumeGame);

//Call prompt for player name
promptName();

//Call game start function
gameStart();

//Create prompt for player name
function promptName () {
    playerName = prompt("Please enter your name");

    //Create if statement if player name is null
    if(!playerName) {
        console.log(playerName = "Anonymous"); 
    }
}

//Create game start function
function gameStart() {
    //Set isrunning to true
    isRunning = true;

    //Add score counter (replaced line with one that fixes button issue)
    //scoreText.textContent = scoreText;
	scoreText.textContent = gameScore;

    //Call createFood function
    createFood();

    //Create draw food function
    drawFood();
    

    //Call next tick function
    nextTick();
}

//Create next tick function
function nextTick() {
    //Check if game is running
    if(isRunning) {
        setTimeout(() => {
            //Call clear board function
            clearBoard();

            //Call draw food function
            drawFood();

            //Call move snake function
            moveSnake();

            //Call draw snake function
            drawSnake();

            //Call check game over function
            checkGameOver();

            //Call next tick function
            nextTick();
        }, 75);
    } else if (isGameOver) {
        //Display game over message function
        displayGameOver();
    }
}

//Create clear board function
function clearBoard() {
    gameCtx.fillStyle = boardBg;

    gameCtx.fillRect(0, 0, gameWidth, gameHeight);
}

//Create "create food" function
function createFood() {
    function randomFood(min, max) {
        const randomNumber = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randomNumber;
    }

    foodx = randomFood(0, gameWidth - unitSize);
    foody = randomFood(0, gameHeight - unitSize);
}

//Create drawFood function
function drawFood() {
    gameCtx.fillStyle = foodColor;

    gameCtx.fillRect(foodx, foody, unitSize, unitSize);
}

//Create move snake function
function moveSnake() {
    const snakeHead = {x: snake[0].x + velocityX, y: snake[0].y + velocityY};

    snake.unshift(snakeHead);

    //Check if snake has eaten food (changed score to gameScore)
    if(snake[0].x == foodx && snake[0].y == foody) {
        gameScore += 1;
        scoreText.textContent = gameScore;
        createFood();
    } else {
        snake.pop();
    }
}

//Create draw snake function
function drawSnake() {
    gameCtx.fillStyle = snakeColor;
    gameCtx.strokeStyle = borderColor;

    //Create foreach loop
    snake.forEach(snakePart => {
        gameCtx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        gameCtx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

//Create change direction function
function changeDirection(e) {
    //Create keypressed const
    const keyPress = e.keyCode;

    //Create left key
    const LEFT = 37;

    //Create up key
    const UP = 38;

    //Create right key
    const RIGHT = 39;

    //Create down key
    const DOWN = 40;

    //Create goup, go down, go left, go right
    const goUp = (velocityY == -unitSize);

    const goDown = (velocityY == unitSize);

    const goRight = (velocityX == unitSize);

    const goLeft = (velocityX == -unitSize);

    //Create switch statement for key presses
    switch(true) {
        case (keyPress == LEFT && !goRight):
            velocityX = -unitSize;
            velocityY = 0;
            break;

        case (keyPress == UP && !goDown):
            velocityX = 0;
            velocityY = -unitSize;
            break;
        
        case (keyPress == RIGHT && !goLeft):
            velocityX = unitSize;
            velocityY = 0;
            break;
        
        case (keyPress == DOWN && !goUp):
            velocityX = 0;
            velocityY = unitSize;
            break;
    }
}

//Create checkgameover to see if user lost game
function checkGameOver() {
    //Create switch statement
    switch(true) {
        case (snake[0].x < 0):
            isRunning = false;
            isGameOver = true;
            break;

        case (snake[0].x >= gameWidth):
            isRunning = false;
            isGameOver = true;
            break;

        case (snake[0].y < 0):
            isRunning = false;
            isGameOver = true;
            break;

        case (snake[0].y >= gameHeight):
            isRunning = false;
            isGameOver = true;
            break;
    }

    //Create for loop
    for(let i = 1; i < snake.length; i+=1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            isRunning = false;
            isGameOver = true;
        }
    }
}

//Create function to display game over message
function displayGameOver() {
    gameCtx.font = "50px var(--primary-font-family)";
    gameCtx.fillStyle = "white";
    gameCtx.fillText("Game Over!", gameWidth / 2.2, gameHeight / 2);
    isRunning = false;

    //Save player name, score, and timestamp
    const gameOverData = {
        name: playerName || "Anonymous",
        score: gameScore,
        dateTime: new Date().toLocaleString()
    }

    //Save game data to local storage
    const savedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    savedScores.push(gameOverData);

    //Save game data to local storage
    localStorage.setItem("leaderboard", JSON.stringify(savedScores));

    //Console data
    console.log(gameOverData);
}

//Create function to reset game
function resetGame() {
    //Set score to 0
    gameScore = 0;

    //Set velocity to 0
    velocityX = unitSize;

    velocityY = 0;

    //Reset snake array
    snake = [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];

    //Call game start function
    gameStart();
}


//Create function to load game
function loadGame() {
	const savedGame = JSON.parse(localStorage.getItem("snakeGame"));
	if (savedGame) {
		gameScore = savedGame.gameScore;
		velocityX = savedGame.velocityX;
		velocityY = savedGame.velocityY;
		snake = savedGame.snake;
		foodx = savedGame.foodx;
		foody = savedGame.foody;
		
		alert("Loading last saved game..");
		resumeGame();
		
	} else { 
		alert("No record found. Restarting game.");
		resetGame();
	}
}

//Create function to save game
function saveGame() {
	const gameData = {
		gameScore,
		velocityX,
		velocityY,
		snake,
		foodx,
		foody
	};
	localStorage.setItem("snakeGame", JSON.stringify(gameData));
	alert("Game Saved");
	
}


//Create function to pause game
function pauseGame() {
	isRunning = false;
    isGameOver = false;
	alert("Game Paused");
}


//Create function to resume game
function resumeGame() {
	if (!isRunning && !isGameOver) {
		isRunning = true;
		nextTick();
	}
}