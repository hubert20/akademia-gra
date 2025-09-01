// src/js/views/view5.js - Zadanie 2 - Jak rozpoznać smutek? Przeciągaj elementy i dopasuj je tak, aby stworzyć postać, która wygląda na smutną.
import twarz from '../../assets/task2/twarz.png';
import oczySmutne from '../../assets/task2/oczy-smutne.png';
import oczyZle from '../../assets/task2/oczy-zle.png';
import oczyWesole from '../../assets/task2/oczy-wesole.png';
import ustaSmutne from '../../assets/task2/usta-smutne.png';
import ustaWesole from '../../assets/task2/usta-wesole.png';
import ustaZle from '../../assets/task2/usta-zle.png';
import brwiSmutne from '../../assets/task2/brwi-smutne.png';
import brwiZle from '../../assets/task2/brwi-zle.png';
import brwiWesole from '../../assets/task2/brwi-wesole.png';

export const view = `
<div class="task2">
  <div class="face-builder h-100">
    <div class="face-left p-4">
      <p class="standard-title-3 text-start">Przeciągaj elementy i dopasuj je tak, aby stworzyć postać,<br>która wygląda na <strong>smutną</strong>.</p>

    <div class="d-flex align-items-center justify-content-evenly">
      <div class="face-image-wrapper">
        <img src="${twarz}" alt="Twarz" class="face-base">
        <div class="drop-zone eyes-drop" data-zone="eyes"></div>
        <div class="drop-zone mouth-drop" data-zone="mouth"></div>
        <div class="drop-zone brows-drop" data-zone="brows"></div>
      </div>

    <div>
      <div class="drag-options">
        <div class="option-group" data-type="brows">
          <p class="mb-0">Wybierz brwi</p>
          <div class="option-images p-3">
          <img src="${brwiZle}" draggable="true" data-id="brwi-zle" />
          <img src="${brwiSmutne}" draggable="true" data-id="brwi-smutne" />
          <img src="${brwiWesole}" draggable="true" data-id="brwi-wesole" />
          </div>
        </div>
        <div class="option-group" data-type="eyes">
          <p class="mb-0">Wybierz oczy</p>
          <div class="option-images p-3">
           <img src="${oczyZle}" draggable="true" data-id="oczy-zle" />
           <img src="${oczySmutne}" draggable="true" data-id="oczy-smutne" data-sad="true"/>
           <img src="${oczyWesole}" draggable="true" data-id="oczy-wesole" />
          </div>
        </div>
        <div class="option-group" data-type="mouth">
          <p class="mb-0">Wybierz usta</p>
        <div class="option-images p-3">
          <img src="${ustaZle}" draggable="true" data-id="usta-zle" />
          <img src="${ustaSmutne}" draggable="true" data-id="usta-smutne" />
          <img src="${ustaWesole}" draggable="true" data-id="usta-wesole" />
        </div>
        </div>
      </div>
      <button class="btn btn-secondary mt-3" id="accept-btn" disabled>ZAAKCEPTUJ</button>
    </div>

    </div>
    </div>

    <div class="face-right">
      <p class="standard-title-3">Czy jesteś w stanie rozpoznać smutek?</p>
      <p id="text-desc">Każdy z nas inaczej okazuje emocje. Jedni pokazują smutek łzami, inni spuszczają wzrok albo przybierają poważną minę. A czasem ktoś się uśmiecha... nawet gdy jest mu smutno.</p>
    </div>
  </div>
</div>
`;

export const logicFunc = (onSuccess) => {
  const dropZones = document.querySelectorAll('.drop-zone');
  const acceptBtn = document.getElementById('accept-btn');
  const desc = document.getElementById('text-desc');

  const state = {
    eyes: null,
    mouth: null,
    brows: null,
  };

  document.querySelectorAll('.drag-options img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
      const group = img.closest('.option-group');
      const type = group ? group.dataset.type : '';
      e.dataTransfer.setData('src', img.src);
      e.dataTransfer.setData('zone', type);
      e.dataTransfer.setData('sad', img.dataset.sad || 'false');
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      const src = e.dataTransfer.getData('src');
      const zoneType = e.dataTransfer.getData('zone'); // z buttona
      const dropTargetType = zone.dataset.zone; // np. "eyes"
      const sad = e.dataTransfer.getData('sad') === 'true';

      // ❗ blokada: nie wrzucaj elementów w złą strefę
      if (zoneType !== dropTargetType) {
        zone.classList.add('shake-border');
        setTimeout(() => zone.classList.remove('shake-border'), 500);
        return;
      }

      const img = document.createElement('img');
      img.src = src;
      img.classList.add('dropped');
      zone.innerHTML = '';
      zone.appendChild(img);

      state[zone.dataset.zone] = src;

      if (Object.values(state).every(val => val)) {
        acceptBtn.disabled = false;
      }

      if (zone.dataset.zone === 'eyes' && sad) {
        desc.innerText = 'To, że ktoś nie płacze, nie znaczy, że nie jest mu trudno. Dlatego warto być dla siebie i innych wyrozumiałym.';
      }
    });
  });

  acceptBtn.addEventListener('click', () => {
    acceptBtn.classList.add('btn-success');
    onSuccess();
  });
};
