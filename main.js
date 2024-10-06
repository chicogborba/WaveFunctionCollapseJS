// Inicializa um array vazio para armazenar os objetos que representam cada célula da grade
const objects = [];

// Define um array de imagens que serão usadas para as células
const images = [
  'images/blank.png',
  'images/up.png', 
  'images/down.png',
  'images/left.png',
  'images/right.png', 
];

// Define o tamanho da grade, que será uma grade quadrada (gridSize x gridSize)
const gridSize = 20;

// Loop para criar a grade de objetos
for(i = 0; i < gridSize; i++){
  for(j = 0; j < gridSize; j++){
    // Cria um objeto que representa uma célula na grade
    const object = {
      id: i * gridSize + j, // Identificador único da célula
      possible: [0, 1, 2, 3, 4], // Possibilidades de estado da célula (imagens)
      collapsed: false, // Indica se a célula foi colapsada (definida)
      imageSrc: undefined // Fonte da imagem da célula
    }
    // Adiciona o objeto à lista de objetos
    objects.push(object);
  }
}

// Função que popula a grade visual na tela
const populateGrid = () => {
  const grid = document.getElementById('grid'); // Obtém o elemento da grade no DOM
  objects.forEach((object, index) => {
    const div = document.createElement('div'); // Cria um elemento div para cada objeto
    div.className = 'cell'; // Adiciona a classe 'cell' para estilização
    div.id = object.id; // Define o id da div como o id do objeto
    div.innerHTML = object.possible.length // Exibe o número de possibilidades

    // Adiciona um evento de clique que colapsa a célula ao ser clicada
    div.addEventListener('click', () => firstColapse(object.id))
    grid.appendChild(div); // Adiciona a div à grade no DOM
  })
}

// Popula a grade na tela quando a página carrega
populateGrid();

// Função que inicia o colapso de uma célula
function firstColapse(id) {
  colapse(id) // Colapsa a célula selecionada
  colapseLoop(); // Inicia o loop de colapso
}

// Função que executa o loop de colapso para colapsar células adjacentes
function colapseLoop() {
  // Verifica se ainda existem células que não foram colapsadas
  if (!objects.some(object => !object.collapsed)) return;

  // Inicia a busca pela célula com o menor número de possibilidades
  let minPossibilities = Infinity; // Inicializa o mínimo de possibilidades
  let candidates = []; // Armazena as células candidatas para colapsar

  objects.forEach((object, index) => {
    // Se a célula não foi colapsada e tem menos possibilidades que o mínimo atual
    if (!object.collapsed && object.possible.length < minPossibilities) {
      minPossibilities = object.possible.length; // Atualiza o mínimo
      candidates = [index]; // Atualiza a lista de candidatos
    } else if (!object.collapsed && object.possible.length === minPossibilities) {
      candidates.push(index); // Adiciona à lista de candidatos se houver empate
    }
  });

  // Seleciona aleatoriamente uma célula entre os candidatos
  const randomIndex = candidates[Math.floor(Math.random() * candidates.length)];
  const randomPossibility = objects[randomIndex].possible[Math.floor(Math.random() * objects[randomIndex].possible.length)];

  colapse(objects[randomIndex].id); // Colapsa a célula escolhida

  // Chama colapseLoop novamente após um breve intervalo
  setTimeout(colapseLoop, 50);
}

// Função que colapsa uma célula específica
function colapse(id) {
  const object = objects.find(o => o.id === id); // Encontra o objeto correspondente
  object.collapsed = true; // Marca o objeto como colapsado
  const random = Math.floor(Math.random() * object.possible.length); // Seleciona uma possibilidade aleatória
  object.imageSrc = images[object.possible[random]]; // Define a imagem correspondente à possibilidade escolhida

  // Atualiza os vizinhos da célula colapsada (cima, baixo, esquerda, direita)
  const up = id - gridSize >= 0 ? objects.find(o => o.id === id - gridSize) : null;
  const down = id + gridSize < gridSize * gridSize ? objects.find(o => o.id === id + gridSize) : null;
  const left = id % gridSize !== 0 ? objects.find(o => o.id === id - 1) : null;
  const right = (id + 1) % gridSize !== 0 ? objects.find(o => o.id === id + 1) : null;

  // Atualiza as possibilidades dos vizinhos com base na célula colapsada
  if(up) {
    switch (object.possible[random]) {
      case 0:
      case 2:
        up.possible = up.possible.filter(p => p !== 2 && p !== 3 && p !== 4); // Remove possibilidades que não são compatíveis
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

  updateGrid(); // Atualiza a visualização da grade
}

// Função que atualiza a grade visual na tela
function updateGrid() {
  const grid = document.getElementById('grid'); // Obtém o elemento da grade no DOM
  objects.forEach((object, index) => {
    const div = document.getElementById(object.id); // Obtém a div correspondente à célula
    if(object.collapsed) {
      div.innerHTML = "<img class='cell' src='" + object.imageSrc + "' />"; // Exibe a imagem da célula colapsada
      const newDiv = div.cloneNode(true);
      div.parentNode.replaceChild(newDiv, div); // Substitui a div antiga pela nova
    }
    else {
      // Remove as classes antigas que indicam o número de possibilidades
      for(let i = 0; i <= 5; i++) {
        div.classList.remove('number-' + i);
      }
      // Adiciona a nova classe com base no número de possibilidades restantes
      div.classList.add('number-' + object.possible.length);
      div.innerHTML = object.possible.length; // Exibe o número de possibilidades restantes
      const newDiv = div.cloneNode(true);
      div.parentNode.replaceChild(newDiv, div); // Substitui a div antiga pela nova
    }
  })
}

// Função para reiniciar a grade, permitindo que o jogo comece novamente
function resetGrid() {
  // Limpa a grade e repopula novamente
  const grid = document.getElementById('grid');
  grid.innerHTML = ''; // Limpa o conteúdo da grade
  objects.forEach(object => {
    // Restaura cada objeto ao seu estado inicial
    object.possible = [0, 1, 2, 3, 4]; // Todas as possibilidades estão disponíveis novamente
    object.collapsed = false; // Marca como não colapsado
    object.imageSrc = undefined; // Remove a imagem
  });
  populateGrid(); // Repopula a grade
}
