
const objects = []

const images = [
  'images/blank.png',
  'images/up.png', 
  'images/down.png',
  'images/left.png',
  'images/rigth.png',
]

const gridSize = 50;

for(i = 0; i < gridSize; i++){
  for(j = 0; j < gridSize; j++){
    const object = {
      id: i * gridSize + j,
      possible: [0, 1, 2, 3, 4],
      colapsed: false,
      imageSrc: undefined
    }
    objects.push(object);
  }
}


const pupulateGrid = () => {
  const grid = document.getElementById('grid');
  objects.forEach((object, index) => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.id = object.id;
    div.innerHTML = object.possible.length
    // on click
    div.addEventListener('click', () => firstColapse(object.id))
    grid.appendChild(div);
  })
}

pupulateGrid();

function firstColapse(id) {
  colapse(id)
  colapseLoop();
}


function colapseLoop() {
  // Se todos os objetos estiverem colapsados, retorne
  if (!objects.some(object => !object.colapsed)) return;

  // começar colapsando o elemento com o menor número de possibilidades
  let minPossibilities = Infinity;
  let candidates = [];

  objects.forEach((object, index) => {
    if (!object.colapsed && object.possible.length < minPossibilities) {
      minPossibilities = object.possible.length;
      candidates = [index];
    } else if (!object.colapsed && object.possible.length === minPossibilities) {
      candidates.push(index);
    }
  });

  // caso haja empate, escolher aleatoriamente
  const randomIndex = candidates[Math.floor(Math.random() * candidates.length)];
  const randomPossibility = objects[randomIndex].possible[Math.floor(Math.random() * objects[randomIndex].possible.length)];

  colapse(objects[randomIndex].id);

  // Chamar colapseLoop novamente após meio segundo
  setTimeout(colapseLoop, 1);
}

function colapse(id) {
  const object = objects.find(o => o.id === id);
  object.colapsed = true;
  const random = Math.floor(Math.random() * object.possible.length);
  object.imageSrc = images[object.possible[random]];
  // update neighbors up, down, left, right
  const up = objects.find(o => o.id === id - gridSize);
  const down = objects.find(o => o.id === id + gridSize);
  const left = objects.find(o => o.id === id - 1);
  const right = objects.find(o => o.id === id + 1);
  if(up) {
    switch (object.possible[random]) {
      case 0:
      case 2:
        up.possible = up.possible.filter(p => p !== 2 && p !== 3 && p !== 4);
        break;
      case 1:
      case 3:
      case 4:
        up.possible = up.possible.filter(p => p !== 0 && p !== 1);
        break;
    }
  }
  if(down) {
    switch (object.possible[random]) {
      case 0:
      case 1:
        down.possible = down.possible.filter(p => p !== 3 && p !== 4 && p !== 1);
        break;
      case 2:
      case 3:
      case 4:
        down.possible = down.possible.filter(p => p !== 0 && p !== 2);
        break;
    }
  }
  if(left) {
    switch (object.possible[random]) {
      case 0:
      case 4:
        left.possible = left.possible.filter(p => p !== 1 && p !== 2 && p !== 4);
        break;
      case 1:
      case 2:
      case 3:
        left.possible = left.possible.filter(p => p !== 0 && p !== 3);
        break;
    }
  }
  if(right) {
    switch (object.possible[random]) {
      case 0:
      case 3:
        right.possible = right.possible.filter(p => p !== 1 && p !== 2 && p !== 3);
        break;
      case 1:
      case 2:
      case 4:
        right.possible = right.possible.filter(p => p !== 0 && p !== 4);
        break;
    }
  }

  updateGrid();
}


function updateGrid() {
  const grid = document.getElementById('grid');
  objects.forEach((object, index) => {
    const div = document.getElementById(object.id);
    if(object.colapsed) {
      div.innerHTML = "<img class='cell' src='" + object.imageSrc + "' />";
      const newDiv = div.cloneNode(true);
      div.parentNode.replaceChild(newDiv, div);
    }
    else {
      // Remove as classes antigas
      for(let i = 0; i <= 5; i++) {
        div.classList.remove('number-' + i);
      }
      // Adiciona a nova classe
      div.classList.add('number-' + object.possible.length);
      div.innerHTML = object.possible.length
      const newDiv = div.cloneNode(true);
      div.parentNode.replaceChild(newDiv, div);
    }
  })
}