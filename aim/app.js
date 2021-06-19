const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const levelList = document.querySelector('#level-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;
let missed = 0;
let colors = ['red', 'black', 'silver', 'purple', 'pink'];
let level;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
  }
});

levelList.addEventListener('click', (event) => {
  if (event.target.classList.contains('level-btn')) {
    level = event.target.getAttribute('level');
    screens[2].classList.add('up');
    startGame();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  randomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    gameOver();
  } else {
    current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function gameOver() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1> score: <span class = 'primary'>${score}</span> \n <h2> missed: <span class = 'secondary'>${missed}</span></h2></h1>`;
}

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    randomCircle();
  } else if (!event.target.classList.contains('circle')) {
    missed++;
  }
});

function randomCircle() {
  const circle = document.createElement('div');
  const size =
    level === 'easy'
      ? getRandomNumber(60, 120)
      : level === 'middle'
      ? getRandomNumber(50, 100)
      : level === 'hard'
      ? getRandomNumber(20, 50)
      : level === 'super-hard'
      ? getRandomNumber(10, 30)
      : getRandomNumber(20, 80);
  const { width, heigth } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, heigth - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  (circle.style.boxShadow = `0 0 5px`), `0 0 30 ${colors[getRandomColor()]}`;
  circle.style.background = colors[getRandomColor()];
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  return Math.round(Math.random() * colors.length);
}
