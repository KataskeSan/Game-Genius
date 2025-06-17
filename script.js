const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');
const startBtn = document.getElementById('start-btn');
const levelDisplay = document.getElementById('level');

const colors = ['green', 'red', 'yellow', 'blue'];
let sequence = [];
let playerSequence = [];
let level = 0;
let canClick = false;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function lightUp(color) {
  return new Promise(resolve => {
    const el = document.getElementById(color);
    el.style.filter = 'brightness(1.7)';
    playSound(color);
    setTimeout(() => {
      el.style.filter = 'brightness(1)';
      setTimeout(resolve, 250);
    }, 600);
  });
}

function playSound(color) {
  const sounds = {
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
  };
  sounds[color].play();
}

async function playSequence() {
  canClick = false;
  for (let color of sequence) {
    await lightUp(color);
  }
  canClick = true;
}

function nextLevel() {
  level++;
  levelDisplay.textContent = 'Nível: ' + level;
  const nextColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(nextColor);
  playerSequence = [];
  playSequence();
}

function resetGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  levelDisplay.textContent = 'Nível: 0';
  canClick = false;
}

function handleClick(color) {
  if (!canClick) return;

  playerSequence.push(color);
  playSound(color);
  lightUp(color);

  const currentStep = playerSequence.length - 1;
  if (playerSequence[currentStep] !== sequence[currentStep]) {
    alert('Game Over! Você perdeu no nível ' + level + '. Tente novamente!');
    resetGame();
    return;
  }

  if (playerSequence.length === sequence.length) {
    canClick = false;
    setTimeout(nextLevel, 1000);
  }
}

green.addEventListener('click', () => handleClick('green'));
red.addEventListener('click', () => handleClick('red'));
yellow.addEventListener('click', () => handleClick('yellow'));
blue.addEventListener('click', () => handleClick('blue'));

startBtn.addEventListener('click', () => {
  resetGame();
  nextLevel();
});