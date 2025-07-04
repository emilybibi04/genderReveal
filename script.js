// Imágenes de prueba desde picsum.photos
const imageSources = [
  'https://picsum.photos/id/1011/300/300',
  'https://picsum.photos/id/1012/300/300',
  'https://picsum.photos/id/1013/300/300',
  'https://picsum.photos/id/1015/300/300',
  'https://picsum.photos/id/1016/300/300',
  'https://picsum.photos/id/1018/300/300',
  'https://picsum.photos/id/1020/300/300',
  'https://picsum.photos/id/1024/300/300',
  'https://picsum.photos/id/1025/300/300'
];

const board = document.getElementById('board');
const revealMessage = document.getElementById('revealMessage');

// Crear una tarjeta
function createCard(imgSrc) {
  const card = document.createElement('div');
  card.className = 'card';

  const inner = document.createElement('div');
  inner.className = 'inner';

  const front = document.createElement('div');
  front.className = 'front';
  front.textContent = '?';

  const back = document.createElement('div');
  back.className = 'back';
  const img = document.createElement('img');
  img.src = imgSrc;
  back.appendChild(img);

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.addEventListener('click', () => {
    if (!card.classList.contains('revealed')) {
      card.classList.add('revealed');
      checkReveal();
    }
  });

  return card;
}

// Verificar si todas las tarjetas están reveladas
function checkReveal() {
  const cards = document.querySelectorAll('.card');
  const allRevealed = Array.from(cards).every(card =>
    card.classList.contains('revealed')
  );

  if (allRevealed) {
    setTimeout(() => {
      revealMessage.classList.remove('hidden');
    }, 500);
  }
}

// Crear las 9 tarjetas
imageSources.forEach(src => {
  const card = createCard(src);
  board.appendChild(card);
});