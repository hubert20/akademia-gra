// view11.js – wybierz jedną z trzech kart i odkryj konsekwencje wyboru

import rozmowaFront from '../../assets/task9/opcja.png';
import rozmowaBack from '../../assets/task9/Rozmowa z potworem.png';
import ucieczkaFront from '../../assets/task9/opcja.png';
import ucieczkaBack from '../../assets/task9/Ucieczka z miejsca zdarzenia .png';
import pomocFront from '../../assets/task9/opcja.png';
import pomocBack from '../../assets/task9/Pojscie po pomoc doroslych.png';

export const view = `
  <div class="task11-container">
    <div class="task11-header">
      <h2>Uratuj Alex!</h2>
      <p>Alex została zaatakowana przez potwora. Rzucanie patykami tylko go rozwścieczyło. To nie pomogło.<br>Co innego mogłyby zrobić inne dzieci, żeby uratować Alex?</p>
    </div>

    <h3>Wybierz spośród pokazanych 3 opcji:</h3>
    <div class="cards">
      <div class="card" data-id="rozmowa">
        <img class="card-front" src="${rozmowaFront}" alt="Rozmowa z potworem">
        <img class="card-back d-none" src="${rozmowaBack}" alt="Opis - rozmowa">
      </div>
      <div class="card" data-id="ucieczka">
        <img class="card-front" src="${ucieczkaFront}" alt="Ucieczka z miejsca zdarzenia">
        <img class="card-back d-none" src="${ucieczkaBack}" alt="Opis - ucieczka">
      </div>
      <div class="card" data-id="pomoc">
        <img class="card-front" src="${pomocFront}" alt="Pójście po pomoc dorosłych">
        <img class="card-back d-none" src="${pomocBack}" alt="Opis - pomoc dorosłych">
      </div>
    </div>
  </div>
`;

export const logicFunc = (onSuccess) => {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Zablokuj wybory po kliknięciu jednej karty
      cards.forEach(c => c.classList.add('disabled'));

      const front = card.querySelector('.card-front');
      const back = card.querySelector('.card-back');

      front.classList.add('d-none');
      back.classList.remove('d-none');

      onSuccess();
    });
  });
};
