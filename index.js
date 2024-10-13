let canvas = document.getElementById("game"),
  ctx = canvas.getContext("2d"),
  ballRadius = 9,
  x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
  y = canvas.height - 40,
  dx = 2,
  dy = -2;

let paddleHeight = 12,
  paddleWidth = 72;

//paddle start position

let paddleX = (canvas.width - paddleWidth) / 2;

//bricks

let rowCount = 5,
  columnCout = 9,
  brickWidth = 54,
  brickHeight = 18,
  brickPadding = 12,
  topOffset = 40,
  leftOffset = 33,
  score = 0;

//bricks array
let bricks = [];
for (let c = 0; c < columnCout; c++) {
  bricks[c] = [];
  for (let r = 0; r < rowCount; r++) {
    //set position of bricks
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

//mouse moving eventListener and function

document.addEventListener("mousemove", mouseMoveHandler, false);

//move paddle with mouse

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
