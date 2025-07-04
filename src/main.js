// Lista de imágenes locales dentro de public/images/
import confetti from 'canvas-confetti';

const imageSources = [
  '/images/foto1.gif',
  '/images/foto2.gif',
  '/images/foto3.gif',
  '/images/foto4.gif',
  '/images/foto5.gif',
  '/images/foto6.gif',
  '/images/foto7.gif',
  '/images/foto8.gif',
  '/images/foto9.gif'
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
      document.body.classList.remove('has-background');

      const app = document.getElementById('app');
      app.innerHTML = `
        <div class="reveal-fullscreen">
          <img src="/images/its-a-boy.png" alt="It's a boy!" />
        </div>
      `;

      // Lanzar confetti
      launchConfetti();
    }, 600);
  }
}

function launchConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // Confetti desde ambos lados
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: 0.1, y: 0.6 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: 0.9, y: 0.6 } }));
  }, 250);
}

// Crear las tarjetas
imageSources.forEach(src => {
  const card = createCard(src);
  board.appendChild(card);
});
