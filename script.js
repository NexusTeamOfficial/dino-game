let game = document.getElementById("game");
let dino = document.getElementById("dino");
let scoreText = document.getElementById("score");

let isJumping = false;
let gravity = 0.9;
let position = 0;
let score = 0;
let speed = 5;

// Jump control
document.addEventListener("keydown", function(event) {
  if ((event.code === "Space" || event.code === "ArrowUp") && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let count = 0;
  let upTimer = setInterval(() => {
    if (count === 15) {
      clearInterval(upTimer);
      // down
      let downTimer = setInterval(() => {
        if (count === 0) {
          clearInterval(downTimer);
          isJumping = false;
        }
        position -= 5;
        count--;
        position = position * gravity;
        dino.style.bottom = position + "px";
      }, 20);
    }
    position += 30;
    count++;
    position = position * gravity;
    dino.style.bottom = position + "px";
  }, 20);
}

// Create cactus
function createCactus() {
  let cactus = document.createElement("div");
  let cactusPos = 1000;
  cactus.classList.add("cactus");
  game.appendChild(cactus);
  cactus.style.left = cactusPos + "px";

  let timer = setInterval(() => {
    if (cactusPos < -20) {
      clearInterval(timer);
      game.removeChild(cactus);
      score++;
      scoreText.innerText = score;

      // Night mode toggle
      if (score % 500 === 0) {
        game.classList.toggle("night");
        scoreText.classList.toggle("night");
      }

      // Random bird spawn
      if (Math.random() > 0.7) {
        createBird();
      }
    }
    // collision
    if (cactusPos > 50 && cactusPos < 90 && position < 40) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }

    cactusPos -= speed;
    cactus.style.left = cactusPos + "px";
  }, 20);

  setTimeout(createCactus, Math.random() * 3000 + 1500);
}

// Create bird
function createBird() {
  let bird = document.createElement("div");
  let birdPos = 1000;
  let birdHeight = Math.random() * 80 + 60;
  bird.classList.add("bird");
  game.appendChild(bird);
  bird.style.left = birdPos + "px";
  bird.style.bottom = birdHeight + "px";

  let timer = setInterval(() => {
    if (birdPos < -40) {
      clearInterval(timer);
      game.removeChild(bird);
    }

    // collision
    if (birdPos > 50 && birdPos < 90 && position < birdHeight + 20 && position + 40 > birdHeight) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }

    birdPos -= speed + 2;
    bird.style.left = birdPos + "px";
  }, 20);
}

createCactus();
    
