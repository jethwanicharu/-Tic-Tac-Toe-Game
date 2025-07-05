const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const turnIndicator = document.querySelector("#turn-indicator");
const xScoreSpan = document.getElementById("x-score");
const oScoreSpan = document.getElementById("o-score");

let turn = "X";
let gameGrid = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
let xScore = 0;
let oScore = 0;

// Optional: Add sounds if added to HTML
const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");

// Winning combinations
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function updateTurnText() {
  turnIndicator.innerText = `Turn: ${turn}`;
}

function swapTurn() {
  turn = turn === "X" ? "O" : "X";
  updateTurnText();
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameGrid[a] &&
      gameGrid[a] === gameGrid[b] &&
      gameGrid[b] === gameGrid[c]
    ) {
      showWinner(gameGrid[a], a, b, c);
      return true;
    }
  }

  if (!gameGrid.includes("")) {
    showDraw();
    return true;
  }

  return false;
}

function showWinner(winner, i1, i2, i3) {
  msg.innerText = `Winner: ${winner}`;
  msgContainer.classList.remove("hide");
  boxes[i1].classList.add("winning");
  boxes[i2].classList.add("winning");
  boxes[i3].classList.add("winning");
  updateScore(winner);
  isGameActive = false;

  if (winSound) winSound.play();
}

function showDraw() {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  isGameActive = false;
}

function updateScore(winner) {
  if (winner === "X") {
    xScore++;
    xScoreSpan.innerText = xScore;
  } else if (winner === "O") {
    oScore++;
    oScoreSpan.innerText = oScore;
  }
}

function handleClick(index) {
  if (gameGrid[index] !== "" || !isGameActive) return;

  gameGrid[index] = turn;
  boxes[index].innerText = turn;
  if (clickSound) clickSound.play();

  if (!checkWinner()) {
    swapTurn();
  }
}

function init() {
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  isGameActive = true;
  updateTurnText();
  boxes.forEach((box, index) => {
    box.innerText = "";
    box.classList.remove("winning");
    box.addEventListener("click", () => handleClick(index));
  });
  msgContainer.classList.add("hide");
}

// Event Listeners
resetBtn.addEventListener("click", init);
newGameBtn.addEventListener("click", init);

// Start Game
init();
// Show trophy + party popper 🎉
function showWinner(winner, i1, i2, i3) {
  msg.innerText = `🎉 Winner: ${winner}`;
  msgContainer.classList.remove("hide");

  const trophyImage = document.getElementById("winner-image");
  trophyImage.classList.remove("hide");

  boxes[i1].classList.add("winning");
  boxes[i2].classList.add("winning");
  boxes[i3].classList.add("winning");
  
  updateScore(winner);
  isGameActive = false;

  if (winSound) winSound.play();

  launchConfetti(); // 🎉 launch confetti
}
function launchConfetti() {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    }));

    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    }));
  }, 250);
}

