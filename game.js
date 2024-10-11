const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10, paddleHeight = 100;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 2;
let leftPaddleSpeed = 0, rightPaddleSpeed = 0;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function movePaddles() {
    leftPaddleY += leftPaddleSpeed;
    rightPaddleY += rightPaddleSpeed;

    // Boundary check
    if (leftPaddleY < 0) leftPaddleY = 0;
    if (leftPaddleY > canvas.height - paddleHeight) leftPaddleY = canvas.height - paddleHeight;
    if (rightPaddleY < 0) rightPaddleY = 0;
    if (rightPaddleY > canvas.height - paddleHeight) rightPaddleY = canvas.height - paddleHeight;
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball bounces off top and bottom
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball hits paddles
    if (ballX < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Reset ball if it goes out
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(0, leftPaddleY, paddleWidth, paddleHeight, "white");
    drawRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight, "white");
    drawBall(ballX, ballY, 10, "white");

    movePaddles();
    moveBall();
}

setInterval(draw, 1000 / 60); // 60 FPS

// Paddle controls
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            rightPaddleSpeed = -5;
            break;
        case "ArrowDown":
            rightPaddleSpeed = 5;
            break;
        case "w":
            leftPaddleSpeed = -5;
            break;
        case "s":
            leftPaddleSpeed = 5;
            break;
    }
});

document.addEventListener("keyup", (e) => {
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        rightPaddleSpeed = 0;
    }
    if (["w", "s"].includes(e.key)) {
        leftPaddleSpeed = 0;
    }
});

// Touch controls
document.getElementById("upLeft").addEventListener("click", () => leftPaddleSpeed = -5);
document.getElementById("downLeft").addEventListener("click", () => leftPaddleSpeed = 5);
document.getElementById("upRight").addEventListener("click", () => rightPaddleSpeed = -5);
document.getElementById("downRight").addEventListener("click", () => rightPaddleSpeed = 5);

