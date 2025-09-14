// src/js/views/view31.js
import kubaImg from '../../assets/taskfire/kuba.png';
import emberImg from '../../assets/taskfire/fire.gif';

const EMBERS = 12;
const STATES = ['is-red', 'is-orange', 'is-yellow', 'is-green', 'is-blue'];

export const view = `
<div class="task-31 h-100">
  <div class="view31 grid-2col h-100">
    <div class="view31-left">
      <div class="boy-wrap">
        <img class="boy-img" src="${kubaImg}" alt="Kuba" />

        <!-- DUŻY PŁOMIEŃ ZA POSTACIĄ -->
        <div class="firepit">
          <div class="fire is-red">
            <div class="flame"></div>
          </div>
        </div>

        <!-- PIERŚCIEŃ Z 12 MAŁYMI OGNIKAMI (CSS układa po okręgu) -->
        <div class="embers">
          ${Array.from({ length: EMBERS })
            .map(() => `<img class="ember" src="${emberImg}" alt="Ognik" />`)
            .join('')}
        </div>
      </div>
    </div>

    <div class="view31-right text-center">
      <p class="lead">Przyciskaj przycisk,<br/>aby ostudzić termometr</p>
      <button class="cool-btn" aria-label="Ostudź"></button>
    </div>
  </div>
</div>
`;

export const logicFunc = (onSuccess) => {
  const scope    = document.querySelector('.task-31');
  const fire     = scope.querySelector('.fire');
  const coolBtn  = scope.querySelector('.cool-btn');
  const embers   = Array.from(scope.querySelectorAll('.ember'));

  coolBtn.classList.add('pulse');

  let removed  = 0;
  let stateIdx = 0;
  let started  = false;

  function setState(i) {
    STATES.forEach(c => fire.classList.remove(c));
    fire.classList.add(STATES[i]);
  }

  coolBtn.addEventListener('click', () => {
    // stop gdy wszystko zgasło i kolor = niebieski
    if (removed >= embers.length && stateIdx >= STATES.length - 1) return;

    // gaś 1 ognik (po kolei)
    if (removed < embers.length) {
      embers[removed].classList.add('gone');
      removed++;
    }

    // co 3 ogniki zmień kolor (max do niebieskiego)
    if (removed % 3 === 0 && stateIdx < STATES.length - 1) {
      stateIdx++;
      setState(stateIdx);
    }

    if (!started) {
      started = true;
      coolBtn.classList.remove('pulse');
      if (typeof onSuccess === 'function') onSuccess(); // globalny "DALEJ"
    }

    if (removed >= embers.length && stateIdx >= STATES.length - 1) {
      coolBtn.disabled = true;
      coolBtn.classList.add('done');
    }
  });
};
