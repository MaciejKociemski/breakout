let canvas = document.getElementById("game"),
  ctx = canvas.getContext("2d"),
  ballRadius = 10,
  x,
  y,
  dx = 2,
  dy = -2;

let paddleHeight = 12,
  paddleWidth = 72;
let gameOver = false;
let youWin = false;
let gameStarted = false;

let paddleX;
let rowCount = 5,
  columnCount = 9,
  brickWidth = 54,
  brickHeight = 18,
  brickPadding = 12,
  topOffset = 40,
  leftOffset = 33,
  score = 0;

let bricks = [];
initializeBricks();

let restartBtn = document.getElementById("restartBtn");
let startBtn = document.getElementById("startBtn");


resizeCanvas();

function resizeCanvas() {
  canvas.width = Math.min(window.innerWidth * 0.9, 650); 
  canvas.height = Math.min(window.innerHeight * 0.6, 450); 
  paddleWidth = canvas.width * 0.1; 
  paddleX = (canvas.width - paddleWidth) / 2; 
  resetGame();
}

function initializeBricks() {
  bricks = [];
  for (let c = 0; c < columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < rowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
}

function resetGame() {
  score = 0;
  gameOver = false;
  youWin = false;
  dx = 2;
  dy = -2;
  paddleX = (canvas.width - paddleWidth) / 2;
  x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3); 
  y = canvas.height - 40;
  initializeBricks();
  restartBtn.style.display = "none"; 
}


restartBtn.addEventListener("click", function () {
  gameStarted = true;
  resetGame();
});

startBtn.addEventListener("click", function () {
  gameStarted = true;
  startBtn.style.display = "none";
  resetGame();
});


document.addEventListener("mousemove", mouseMoveHandler, false);


canvas.addEventListener("touchmove", touchMoveHandler, false);

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}


function touchMoveHandler(e) {
  let relativeX = e.touches[0].clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#eee";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#f0f0f0";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < columnCount; c++) {
    for (let r = 0; r < rowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = c * (brickWidth + brickPadding) + leftOffset;
        let brickY = r * (brickHeight + brickPadding) + topOffset;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#ddd";
          ctx.shadowColor = "rgba (0,0,0,0.3)";
          ctx.shadowBlur = 5;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function trackScore() {
  ctx.font = "bold 16px sans-serif";
  ctx.fillStyle = "#eee";
  ctx.fillText("Score: " + score, 8, 24);
}

function hitDetection() {
  for (let c = 0; c < columnCount; c++) {
    for (let r = 0; r < rowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score = score + 10;

          if (score === rowCount * columnCount) {
            youWin = true;
            restartBtn.style.display = "block"; 
          }
        }
      }
    }
  }
}

function drawGameOver() {
  ctx.font = "bold 26px sans-serif";
  ctx.fillStyle = "yellow";
  ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
}

function drawYouWin() {
  ctx.font = "bold 36px sans-serif";
  ctx.fillStyle = "green";
  ctx.fillText("You Win!", canvas.width / 2 - 100, canvas.height / 2);
}

function init() {
  if (!gameStarted) return;

  if (gameOver) {
    drawGameOver();
    restartBtn.style.display = "block";
    return;
  }

  if (youWin) {
    drawYouWin();
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  trackScore();
  drawBricks();
  drawBall();
  drawPaddle();
  hitDetection();

//   if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
//     dx = -dx;
//   }

//   if (y + dy < ballRadius) {
//     dy = -dy;
//   } else if (y + dy > canvas.height - ballRadius) {
//     if (x > paddleX && x < paddleX + paddleWidth) {
//       dy = -dy;
//     } else {
//       gameOver = false;
//     }
//   }

//   x += dx;
    //   y += dy;
    

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx; 
    }

    if (y + dy < ballRadius) {
      dy = -dy; 
    } else if (y + dy > canvas.height - ballRadius) {
      dy = -dy; 
    }
    x += dx;
    y += dy;

}

setInterval(init, 10);
