let dino = document.getElementById("dino");
let cactus = document.getElementById("cactus");
let scoreText = document.getElementById("score");

let isJumping = false;
let score = 0;

// Jump function
document.addEventListener("keydown", function(event) {
  if (event.code === "Space" && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let up = 0;

  let intervalUp = setInterval(() => {
    if (up >= 100) {
      clearInterval(intervalUp);
      let intervalDown = setInterval(() => {
        if (up <= 0) {
          clearInterval(intervalDown);
          isJumping = false;
        }
        dino.style.bottom = up + "px";
        up -= 5;
      }, 20);
    }
    dino.style.bottom = up + "px";
    up += 5;
  }, 20);
}

// Move cactus
function moveCactus() {
  let cactusLeft = 500;

  let timer = setInterval(() => {
    if (cactusLeft < -20) {
      cactusLeft = 500;
      score++;
      scoreText.innerText = "Score: " + score;
    }

    // Collision check
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    if (cactusLeft < 70 && cactusLeft > 30 && dinoBottom < 40) {
      alert("Game Over! Final Score: " + score);
      score = 0;
      scoreText.innerText = "Score: 0";
      cactusLeft = 500;
    }

    cactus.style.left = cactusLeft + "px";
    cactusLeft -= 5;
  }, 20);
}

moveCactus();
    
