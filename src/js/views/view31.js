// src/js/views/view31.js
import kubaImg from '../../assets/taskfire/kuba.png';

export const view = `
<div class="task-31 h-100">
  <div class="view31 grid-2col h-100">
    <div class="view31-left">
      <div class="boy-wrap">
        <img class="boy-img" src="${kubaImg}" alt="Kuba" />
        <div class="firepit">
          <div class="fire is-red">
            <div class="flame"></div>
            ${'<div class="spark"></div>'.repeat(12)}
          </div>
        </div>
      </div>
    </div>

    <div class="view31-right text-center">
      <p class="lead">Przyciskaj przycisk,<br/>aby ostudzić termometr</p>
      <button class="cool-btn"></button>
      <!-- brak lokalnego "DALEJ" -->
    </div>
  </div>
</div>
`;

export const logicFunc = (onSuccess) => {
  const fire = document.querySelector('.fire');
  const coolBtn = document.querySelector('.cool-btn');

  // pulsuj, dopóki gracz nie kliknie pierwszy raz
  coolBtn.classList.add('pulse');

  const states = ['is-red', 'is-orange', 'is-yellow', 'is-green', 'is-blue'];
  let idx = 0;
  let done = false;

  function setState(i) {
    states.forEach(cls => fire.classList.remove(cls));
    fire.classList.add(states[i]);
  }

  coolBtn.addEventListener('click', () => {
    idx = (idx + 1) % states.length;
    setState(idx);

    if (!done) {
      done = true;
      coolBtn.classList.remove('pulse'); // zatrzymaj pulsowanie
      // odblokuj globalny "DALEJ" (Twoja nawigacja reaguje na onSuccess)
      if (typeof onSuccess === 'function') onSuccess();
    }
  });
};
