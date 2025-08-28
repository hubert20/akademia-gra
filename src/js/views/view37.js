// view37.js - Zadanie 10 - Zgadnij, co czuli bohaterowie?

import plecakImg from '../../assets/task10/plecak.png';
import kubaImg from '../../assets/task10/kuba.png';
import baskaImg from '../../assets/task10/baska.png';
import alexImg from '../../assets/task10/alex.png';
import kubaHead from '../../assets/task10/kuba-head.png';
import baskaHead from '../../assets/task10/baska-head.png';
import alexHead from '../../assets/task10/alex-head.png';

const characters = [
  { id: 'kuba', label: 'Kuba', img: kubaImg, head: kubaHead },
  { id: 'baska', label: 'Baśka', img: baskaImg, head: baskaHead },
  { id: 'alex', label: 'Alex', img: alexImg, head: alexHead },
];

const emotions = [
  'strach', 'lęk', 'radość', 'ekscytacja', 'współczucie', 'złość', 'spokój', 'zadowolenie',
  'wdzięczność', 'rozczarowanie', 'ciekawość', 'zaskoczenie', 'obrzydzenie', 'gniew', 'podziw', 'zachwyt', 'smutek', 'żal'
];

export const view = `
<div class="task-10">
  <div class="view37-container text-center">
    <h2 class="mb-4">Zgadnij, co czuli bohaterowie?</h2>
    <p>Wybierz jedną z postaci:</p>
    <div class="characters d-flex justify-content-center gap-4 mb-4">
      ${characters.map(char => `
        <img src="${char.img}" data-id="${char.id}" class="character" alt="${char.label}" style="cursor:pointer; max-width:120px">
      `).join('')}
    </div>

    <div id="backpack-section" class="d-none">
      <div id="drop-zone" class="drop-zone">
        <img id="backpack-img" src="${plecakImg}" alt="Plecak" />
        <div class="backpack-character d-flex align-items-center justify-content-center">
          <img id="selected-head" src="" alt="Główka" />
          <span id="selected-name"></span>
        </div>
      </div>

      <div class="emotion-pool mt-4">
        ${emotions.map(emotion => `
          <div class="emotion" draggable="true">${emotion}</div>
        `).join('')}
      </div>
    </div>
  </div>
  </div>
`;

export const logicFunc = (onSuccess) => {
  const characterEls = document.querySelectorAll('.character');
  const charactersDiv = document.querySelector('.characters');
  const section = document.getElementById('backpack-section');
  const dropZone = document.getElementById('drop-zone');
  const headImg = document.getElementById('selected-head');
  const nameSpan = document.getElementById('selected-name');

  characterEls.forEach(el => {
    el.addEventListener('click', () => {
      const selectedId = el.dataset.id;
      const char = characters.find(c => c.id === selectedId);
      headImg.src = char.head;
      nameSpan.textContent = `Plecak ${char.label}`;
      charactersDiv.style.display = 'none';
      section.classList.remove('d-none');
    });
  });

  const emotions = document.querySelectorAll('.emotion');
  const dropped = new Set();

  emotions.forEach(el => {
    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', el.textContent);
    });
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const emotion = e.dataTransfer.getData('text/plain');
    if (!dropped.has(emotion)) {
      const el = document.createElement('div');
      el.textContent = emotion;
      el.className = 'emotion dropped';
      dropZone.appendChild(el);
      dropped.add(emotion);
    }
    if (dropped.size === 1) {
      onSuccess();
    }
  });
};
