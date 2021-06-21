const board = document.querySelector('#board');

const colors = [
  'purple',
  'plum',
  'white',
  'green',
  'orangered',
  'gold',
  'yellow',
];

const SQUARES_NUMBER = 196;

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement('div');
  square.classList.add('square');

  square.addEventListener('mouseover', () => setColor(square));
  square.addEventListener('mouseleave', () => removeColor(square));

  board.append(square);
}

function setColor(element) {
  const color = getRandomColor();

  element.style.backgroundColor = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  //   element.style.background = 'white';
}

function removeColor(element) {
  element.style.background = 'black';
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);

  return colors[index];
}
