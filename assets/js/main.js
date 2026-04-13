const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bgMusic = document.getElementById("bgMusic");
const hitSound = document.getElementById("hitSound");

// 🔊 CONTROL SONIDO
let soundEnabled = false;

function startSound() {
  if (!soundEnabled) {
    bgMusic.volume = 0.3;
    bgMusic.play().then(() => {
      soundEnabled = true;
    }).catch(() => {});
  }
}

function toggleSound() {
  soundEnabled = !soundEnabled;

  if (soundEnabled) bgMusic.play();
  else bgMusic.pause();
}

// 📱 RESPONSIVE
function resizeCanvas() {
  canvas.width = Math.min(window.innerWidth * 0.9, 400);
  canvas.height = canvas.width * 1.5;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// 🚗 LANE
const lanes = 6;
let laneWidth = canvas.width / lanes;

let gameState = "start";
let paused = false;

let currentLane = 2;

function getLaneX(lane) {
  return lane * laneWidth + (laneWidth / 2) - ((laneWidth - 10) / 2);
}

let targetX = getLaneX(currentLane);

// 🚗 PLAYER
const player = {
  y: canvas.height - 100,
  width: laneWidth - 10,
  height: 80,
  x: targetX,
  speedY: 0
};

const playerImg = new Image();
playerImg.src = "assets/img/player.png";

// 🚗 ENEMIGOS
const enemyImgs = [new Image(), new Image(), new Image(), new Image(), new Image()];
enemyImgs[0].src = "assets/img/enemy1.png";
enemyImgs[1].src = "assets/img/enemy2.png";
enemyImgs[2].src = "assets/img/enemy3.png";
enemyImgs[3].src = "assets/img/enemy4.png";
enemyImgs[4].src = "assets/img/enemy5.png";

const roadImg = new Image();
roadImg.src = "assets/img/road.jpg";

let enemies = [];

let score = 0;
let level = 1;
let highScore = localStorage.getItem("highScore") || 0;

let roadY = 0;

// SPEED
function getEnemySpeed(type) {
  const base = 3 + (level * 0.8);
  if (type === 3) return base * 1.5;
  if (type === 4) return base * 0.7;
  return base;
}

// SPAWN
function createEnemy() {
  enemies.push({
    lane: Math.floor(Math.random() * lanes),
    y: -100,
    width: laneWidth - 10,
    height: 80,
    speed: getEnemySpeed(Math.floor(Math.random() * 5)),
    type: Math.floor(Math.random() * 5)
  });
}

// 🎮 CONTROLES PC
window.addEventListener("keydown", (e) => {

  startSound();

  if (e.key.toLowerCase() === "p") {
    paused = !paused;
    if (paused) bgMusic.pause();
    else if (soundEnabled) bgMusic.play();
    return;
  }

  if (paused) return;

  if (gameState === "start") gameState = "playing";

  if (gameState === "gameover") {
    resetGame();
    gameState = "playing";
  }

  if (e.key === "ArrowLeft" && currentLane > 0) currentLane--;
  if (e.key === "ArrowRight" && currentLane < lanes - 1) currentLane++;

  if (e.key === "ArrowUp") player.speedY = -5;
  if (e.key === "ArrowDown") player.speedY = 5;

  targetX = getLaneX(currentLane);
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") player.speedY = 0;
});

// 📱 TOUCH
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startSound();

  if (gameState === "start") gameState = "playing";

  const rect = canvas.getBoundingClientRect();
  const x = e.touches[0].clientX - rect.left;

  if (x < canvas.width / 2 && currentLane > 0) currentLane--;
  else if (x > canvas.width / 2 && currentLane < lanes - 1) currentLane++;

  targetX = getLaneX(currentLane);
});

// 📱 BOTONES
function moveLeft() {
  startSound();
  if (currentLane > 0) currentLane--;
  targetX = getLaneX(currentLane);
}

function moveRight() {
  startSound();
  if (currentLane < lanes - 1) currentLane++;
  targetX = getLaneX(currentLane);
}

// 🖱️ CLICK ENEMIGOS
canvas.addEventListener("click", (e) => {
  if (gameState !== "playing" || paused) return;

  startSound();

  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  enemies.forEach((enemy, i) => {
    const x = getLaneX(enemy.lane);

    if (mx > x && mx < x + enemy.width && my > enemy.y && my < enemy.y + enemy.height) {
      enemies.splice(i, 1);
      score++;

      if (soundEnabled) {
        hitSound.currentTime = 0;
        hitSound.play();
      }
    }
  });
});

// UPDATE
function update() {
  player.x += (targetX - player.x) * 0.2;
  player.y += player.speedY;

  if (player.y < 0) player.y = 0;
  if (player.y + player.height > canvas.height)
    player.y = canvas.height - player.height;

  roadY += 4 + level;
  if (roadY > canvas.height) roadY = 0;

  enemies.forEach((enemy, i) => {
    enemy.y += enemy.speed;

    if (enemy.y > canvas.height) {
      enemies.splice(i, 1);
      score++;
      level = Math.floor(score / 50) + 1;
    }
  });
}

// DRAW
function drawBackground() {
  if (roadImg.complete) {
    ctx.drawImage(roadImg, 0, roadY, canvas.width, canvas.height);
    ctx.drawImage(roadImg, 0, roadY - canvas.height, canvas.width, canvas.height);
  }
}

function drawPlayer() {
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

function drawEnemies() {
  enemies.forEach(enemy => {
    const x = getLaneX(enemy.lane);
    ctx.drawImage(enemyImgs[enemy.type], x, enemy.y, enemy.width, enemy.height);
  });
}

// COLLISION
function detectCollision() {
  enemies.forEach(enemy => {
    const x = getLaneX(enemy.lane);

    if (
      player.x < x + enemy.width &&
      player.x + player.width > x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      gameState = "gameover";

      if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
      }
    }
  });
}

// HUD
function drawHUD() {
  document.getElementById("score").textContent = score;
  document.getElementById("level").textContent = level;
  document.getElementById("highScore").textContent = highScore;
}

// RESET
function resetGame() {
  enemies = [];
  score = 0;
  level = 1;
  currentLane = 2;
  targetX = getLaneX(currentLane);
  player.y = canvas.height - 100;
}

// LOOP
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();

  if (gameState === "start") {
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("RACE CAR", 130, 180);
    ctx.fillText("Toca o presiona tecla", 70, 300);
  }

  if (gameState === "playing") {
    if (!paused) {
      update();
      detectCollision();
    }

    drawPlayer();
    drawEnemies();
    drawHUD();

    if (paused) {
      ctx.fillStyle = "yellow";
      ctx.fillText("PAUSA", 150, 300);
    }
  }

  if (gameState === "gameover") {
    drawPlayer();
    drawEnemies();

    ctx.fillStyle = "red";
    ctx.font = "28px Arial";
    ctx.fillText("GAME OVER", 100, 300);
  }

  requestAnimationFrame(gameLoop);
}

// ⏸️ PAUSA
function togglePause() {
  paused = !paused;

  if (paused) {
    if (soundEnabled) bgMusic.pause();
  } else {
    if (soundEnabled) bgMusic.play();
  }
}

// 🔄 REINICIAR
function restartGame() {
  resetGame();
  gameState = "playing";

  if (soundEnabled) {
    bgMusic.currentTime = 0;
    bgMusic.play();
  }
}

canvas.addEventListener("touchstart", (e) => {

  ctx.fillStyle = "red";
  ctx.font = "28px Arial";
  ctx.fillText("GAME OVER", 100, 260);

  ctx.font = "16px Arial";
  ctx.fillText("Toca o presiona para reiniciar", 60, 300);

});

// SPAWN
setInterval(() => {
  if (gameState === "playing" && !paused) {
    createEnemy();
  }
}, 1000);

// START
window.onload = gameLoop;