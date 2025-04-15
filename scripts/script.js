//Create gameboard variable
const gameboard = document.querySelector("#gameBoard");

//Create game context
const gameCtx = gameboard.getContext("2d");

//Create score text variable
const scoreText = document.querySelector("#score");

//Create reset button variable
const resetButton = document.querySelector("#reset");

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

//Create key down event listener for player to move snake
window.addEventListener("keydown", changeDirection);

//Create reset button event listener
resetButton.addEventListener("click", resetGame);

//Create pause button event listener
pauseButton.addEventListener("click", pauseGame);

//Call game start function
gameStart();

//Create game start function
function gameStart() {
    //Set isrunning to true
    isRunning = true;

    //Add score counter
    scoreText.textContent = scoreText;

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
    } else {
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

    //Check if snake has eaten food
    if(snake[0].x == foodx && snake[0].y == foody) {
        score += 1;
        scoreText.textContent = score;
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
            break;

        case (snake[0].x >= gameWidth):
            isRunning = false;
            break;

        case (snake[0].y < 0):
            isRunning = false;
            break;

        case (snake[0].y >= gameHeight):
            isRunning = false;
            break;
    }

    //Create for loop
    for(let i = 1; i < snake.length; i+=1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            isRunning = false;
        }
    }
}

//Create function to display game over message
function displayGameOver() {
    gameCtx.font = "50px var(--primary-font-family)";
    gameCtx.fillStyle = "white";
    gameCtx.fillText("Game Over!", gameWidth / 2.2, gameHeight / 2);
    isRunning = false;
}

//Create function to reset game
function resetGame() {
    //Set score to 0
    score = 0;

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

