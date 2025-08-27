// src/js/views/view16.js - Zadanie 4 - Które zdania są asertywne? – quiz o asertywności

import characterNeutral from '../../assets/task6/character-neutral.png';
import characterHappy from '../../assets/task6/character-happy.png';
import characterNeutralBubble from '../../assets/task6/character-neutral-bubble.png';

import iconExit from '../../assets/task6/icon-exit.png';
import iconInfo from '../../assets/task6/ikonka-info.png';
import iconFlaga from '../../assets/task6/ikonka-flaga.png';

import dymekAlert from '../../assets/task6/dymek-alert.png';
import dymekMain from '../../assets/task6/dymek-main.png';


export const view = `
<div class="fact-info d-flex gap-4 p-3 mt-4" style="background: #E3F5FA;border-radius: 1rem;">
<div class="fact-info__left" style="position: relative;top: -20px;">
  <img src="${iconInfo}" alt="Postać"  class="" style="" />
  <p class="mb-0" style="color: #006FCC;font-weight: bold;font-size: 20px;">Ciekawostka</p>
</div>
<div class="p-3 text-start" style="font-size: 20px;color: #006FCC;line-height: 1.2;">
   Asertywność to umiejętność mówienia tego, co naprawdę myślimy i czujemy - z szacunkiem do siebie i innych. 
 Nie chodzi o bycie miłym za wszelką cenę - ale o to, by stawiać granice i dbać o siebie.
</div>
</div>
  <div class="assertive-task">
    <div class="row gx-5 gy-4 align-items-start">
      <div class="col-md-3 text-center">
        <img src="${characterNeutral}" alt="Postać" id="character" class="character-img" style="max-height: 260px;" />
      </div>
      <div class="col-md-9">
        <div class="question-box p-4">
          <div class="question-header mb-3 d-flex align-items-center justify-content-center gap-2">
            <img src="${iconFlaga}" alt="Ikona flagi" style="height: 28px;" />
            <h4 class="m-0">Które zdania są asertywne?</h4>
          </div>
         <div class="px-5 pb-5">
          <div class="options-wrapper row g-1 justify-content-center">
           <div class="col-5 pe-3 pb-3">
             <button class="option-btn" data-id="1">„Nie muszę mieć ochoty robić tego co robią inni.”</button>
            </div>
            <div class="col-5 pb-3">
             <button class="option-btn" data-id="2">„Zawsze muszę zgodzić się z tym co sądzi mój najlepszy przyjaciel.”</button>
            </div>
            <div class="col-5 pe-3">
             <button class="option-btn" data-id="3">„Mogę nie zgodzić się z opinią moich bliskich.”</button>
            </div>
            <div class="col-5">
             <button class="option-btn" data-id="4">„Moje zdanie jest mniej ważne od zdania innych.”</button>
            </div>
          </div>
         </div>
         <div class="row">
          <div class="col-lg-9">
           <div id="feedback" class="alert alert-danger d-none">
            <p class="m-0" id="feedbackText"></p>
          </div>
         </div>
         </div>
        </div>
      </div>
    </div>
  </div>
`;

export const logicFunc = (onSuccess) => {
  const correctAnswers = ['1', '3'];
  const feedbackMessages = {
    '2': 'Jeśli Twój najlepszy przyjaciel jest Twoim prawdziwym przyjacielem, zgodność waszych opinii nie będzie miała znaczenia ani wpływu na waszą przyjaźń. Nie bój się mieć własnego zdania! Jest ono równie wartościowe co innych! Spróbuj jeszcze raz!',
    '4': 'Twoje zdanie jest zawsze równie ważne co zdanie innych! Spróbuj jeszcze raz!',
  };

  const selected = new Set();
  const buttons = document.querySelectorAll('.option-btn');
  const feedback = document.getElementById('feedback');
  const feedbackText = document.getElementById('feedbackText');
  const character = document.getElementById('character');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;

      if (selected.has(id)) {
        selected.delete(id);
        btn.classList.remove('btn-success', 'btn-danger');
        character.src = characterNeutral;
        feedback.classList.add('d-none');
        return;
      }

      selected.add(id);
      btn.classList.remove('btn-success', 'btn-danger');

      if (correctAnswers.includes(id)) {
        btn.classList.add('btn-success');
        character.src = characterHappy;
        feedback.classList.add('d-none');
      } else {
        btn.classList.add('btn-danger');
        character.src = characterNeutralBubble;
        feedbackText.innerText = feedbackMessages[id] || '';
        feedback.classList.remove('d-none');
      }

      const correctSelected = correctAnswers.every(ans => selected.has(ans));
      if (correctSelected) {
        onSuccess();
        character.src = characterHappy;
        feedback.classList.add('d-none');
      }
    });
  });
};
