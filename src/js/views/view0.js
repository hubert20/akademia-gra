import chmurkaGood from '../../assets/chmurka-good.jpg';
import chmurkaOk from '../../assets/chmurka-ok.jpg';
import chmurkaBad from '../../assets/chmurka-bad.jpg';
import chmurkaDepends from '../../assets/chmurka-depends.jpg';
export const view = `
  <div class="emotion-task text-center">
    <h2>Jak się czujesz w swojej klasie?</h2>
    <p class="text-muted mb-5">Wybierz klikając w chmurkę lub przycisk</p>
    <div class="emotions-wrapper d-flex justify-content-center flex-wrap gap-5">
      <div class="emotion-option" data-type="good">
        <img src="${chmurkaGood}" alt="Spokojnie" class="emotion-cloud mb-4" />
        <button class="btn btn-emotion btn-emotion--good">DOBRZE</button>
      </div>
      <div class="emotion-option" data-type="ok">
        <img src="${chmurkaOk}" alt="Tak sobie" class="emotion-cloud mb-4" />
        <button class="btn btn-emotion btn-emotion--ok">TAK SOBIE</button>
      </div>
      <div class="emotion-option" data-type="bad">
        <img src="${chmurkaBad}" alt="Źle" class="emotion-cloud mb-4" />
        <button class="btn btn-emotion btn-emotion--bad">ŹLE</button>
      </div>
      <div class="emotion-option" data-type="depends">
        <img src="${chmurkaDepends}" alt="Zależy od dnia" class="emotion-cloud mb-4" />
        <button class="btn btn-emotion btn-emotion--depends">ZALEŻY OD DNIA</button>
      </div>
    </div>

    <div id="emotion-desc" class="emotion-desc mt-4 d-none"></div>
  </div>
`;

export const logicFunc = (onSuccess) => {
  const descriptions = {
    good: {
      text: `Super, że tak się czujesz! Może chcesz podzielić się, co sprawiło, że masz dziś dobry dzień? Dobrze jest zauważać, co nam służy - wtedy łatwiej to powtarzać!`,
      class: 'label--good'
    },
    ok: {
      text: `To zupełnie w porządku mieć taki dzień. Może coś małego poprawi Ci humor? Czasem pomaga rozmowa z kimś bliskim albo zrobienie czegoś, co lubisz.`,
      class: 'label--ok'
    },
    bad: {
      text: `Przykro mi, że tak się czujesz. Każdy ma czasem trudniejsze chwile. Pamiętaj, że możesz porozmawiać z kimś, komu ufasz - to naprawdę pomaga. A może chcesz spróbować czegoś, co zwykle Cię uspokaja lub rozwesela?`,
      class: 'label--bad'
    },
    depends: {
      text: `To bardzo trafne - każdy dzień może być inny. Warto zauważać, co sprawia, że czujesz się lepiej, a co Cię zasmuca. Dzięki temu łatwiej zadbać o siebie. Może chcesz opowiedzieć, co dziś wpłynęło na Twój nastrój?`,
      class: 'label--depends'
    }
  };

  const options = document.querySelectorAll('.emotion-option');

  options.forEach(option => {
    const type = option.dataset.type;
    const cloud = option.querySelector('img');
    const button = option.querySelector('button');

    const selectOption = () => {
      // Reset wszystkich
      options.forEach(opt => {
        opt.querySelector('img').classList.remove('active');
        opt.style.opacity = '0.4';
      });

      // Aktywna chmurka
      cloud.classList.add('active');
      option.style.opacity = '1';

      // Pokazujemy opis
      const descBox = document.getElementById('emotion-desc');
      descBox.className = 'emotion-desc mt-4'; // reset klas
      descBox.classList.add(descriptions[type].class);
      descBox.innerHTML = `<p>${descriptions[type].text}</p>`;
      descBox.classList.remove('d-none');

      onSuccess(); // aktywacja przycisku „Dalej”
    };

    cloud.addEventListener('click', selectOption);
    button.addEventListener('click', selectOption);
  });
};

