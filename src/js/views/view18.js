// view18.js – Zadanie 5 połączone zadanie: animacja + kapsuła odwagi - Stwórz kapsułę odwagi

import kapsulaImage from '../../assets/task7/kapsula.png';
import pluszakImage from '../../assets/task7/pluszak-lub-koc.png';
import headphonesImage from '../../assets/task7/sluchawki-z-muzyka.png';
import personImage from '../../assets/task7/czlowiek-lub-zwierzak.png';
import bookImage from '../../assets/task7/ksiazka.png';
import otherImage from '../../assets/task7/inny-sposob.png';

export const view = `
  <div class="view7-container text-center">
    <div id="intro-text" class="intro-text mb-4"></div>
    <button id="start-capsule" class="btn btn-primary mt-4">Przejdź dalej</button>

    <div id="capsule-task" class="d-none position-relative">

    <p class="capsule-task-text-1 mb-0">Co pomaga Ci poczuć się lepiej, gdy coś Cię stresuje?</p>
    <p class="capsule-task-text-2 mb-0">Przeciągnij do swojej kapsuły wybrane elementy, które mogą dawać Ci wsparcie: </p>

      <div id="drop-zone">
        <div id="capsule-container"></div>
      </div>

      <div class="draggable-item item-teddy" draggable="true" data-id="teddy">
        <img src="${pluszakImage}" alt="Pluszak lub koc">
        <p>Pluszak lub koc</p>
      </div>
      <div class="draggable-item item-headphones" draggable="true" data-id="headphones">
        <img src="${headphonesImage}" alt="Słuchawki z muzyką">
        <p>Słuchawki z muzyką</p>
      </div>
      <div class="draggable-item item-person" draggable="true" data-id="person">
        <img src="${personImage}" alt="Człowiek lub zwierzak">
        <p>Człowiek lub zwierzak</p>
      </div>
      <div class="draggable-item item-book" draggable="true" data-id="book">
        <img src="${bookImage}" alt="Książka">
        <p>Książka</p>
      </div>
      <div class="draggable-item item-other" draggable="true" data-id="other">
        <img src="${otherImage}" alt="Inny sposób">
        <p>Wpisz tutaj</p>
        <input type="text" placeholder="Wpisz tutaj" />
        <p>Inny sposób</p>
      </div>
    </div>
  </div>
`;

export const logicFunc = (onSuccess) => {
  const startBtn = document.getElementById('start-capsule');

  // Fade-in animacja tekstu linia po linii
  const lines = [
    "Wyobraź sobie, że stoisz w miejscu, w którym czujesz się bezpiecznie.",
    "Może to być Twój pokój, ławka w parku albo magiczna bańka.",
    "W tej przestrzeni nikt Cię nie ocenia.",
    "Masz tam wszystko, czego potrzebujesz, by dać sobie radę..."
  ];

  const introContainer = document.getElementById('intro-text');
  lines.forEach((line, i) => {
    const p = document.createElement('p');
    p.textContent = line;
    p.style.opacity = 0;
    p.style.transition = 'opacity 1s ease';
    p.style.transitionDelay = `${i * 1.2}s`;
    introContainer.appendChild(p);
    setTimeout(() => {
      p.style.opacity = 1;
    }, 100);
  });

  setTimeout(() => {
    introContainer.classList.add('show');
  }, 100);

  // 👇 Przycisk pojawi się po ostatniej animacji
  const totalAnimationTime = lines.length * 1.2 * 1000 + 500; // +500ms bufor
  startBtn.style.display = 'none';
  setTimeout(() => {
    startBtn.style.display = 'inline-block';
  }, totalAnimationTime);


  startBtn.addEventListener('click', () => {
    document.getElementById('intro-text').classList.add('d-none');
    document.getElementById('capsule-task').classList.remove('d-none');
    startBtn.style.display = 'none';
  });

  // Drag and drop logika
  const dropZone = document.getElementById('capsule-container');
  const draggableItems = document.querySelectorAll('.draggable-item');
  let droppedItems = new Set();

  draggableItems.forEach(item => {
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', item.dataset.id);
    });
  });

  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
  });

  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (!droppedItems.has(id)) {
      const item = document.querySelector(`[data-id="${id}"]`);
      item.setAttribute('draggable', 'false');
      item.style.position = 'static';
      item.style.cursor = 'default';
      item.classList.remove('draggable-item');
      item.classList.add('item-dropped');
      dropZone.appendChild(item);
      droppedItems.add(id);
    }

    if (droppedItems.size >= 1) {
      onSuccess();
    }
  });
};

