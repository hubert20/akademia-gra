//src/js/views/view11.js - Zadanie: Twoja decyzja ma znaczenie – czy uratujesz Alex?

import frontImage from '../../assets/task9/opcja.png';
import rozmowaImage from '../../assets/task9/rozmowa-z-potworem.png';
import ucieczkaImage from '../../assets/task9/ucieczka-z-miejsca-zdarzenia.png';
import pomocImage from '../../assets/task9/pojscie-po-pomoc-doroslych.png';
import postacOgnik from '../../assets/task6/character-neutral.png';

export const view = `
  <div class="task11 row">

  <div class="task11-left col-3">
    <div class="task11-header text-start p-4">
      <h2>Uratuj Alex!</h2>
      <p>
        Alex została zaatakowana przez potwora. Rzucanie patykami tylko go rozwścieczyło. To nie pomogło.<br>
        Co innego mogłyby zrobić inne dzieci, żeby uratować Alex?
      </p>
      <div class="d-flex pt-5 justify-content-center">
       <img src="${postacOgnik}" alt="Rozmowa z potworem" />
      </div>
    </div>
  </div>

<div class="task11-right col-9">
  <h3 class="text-center mt-5">Wybierz spośród pokazanych 3 opcji:</h3>
    <div class="cards">
      <div class="card card-left" data-id="rozmowa">
        <div class="card-inner">
          <div class="card-front">
            <img src="${frontImage}" alt="Rozmowa z potworem" />
          </div>
          <div class="card-back">
            <img src="${rozmowaImage}" alt="Rozmowa z potworem - back" />
          </div>
        </div>
        <p>Rozmowa <br>z potworem</p>
      </div>

      <div class="card card-center" data-id="ucieczka">
        <div class="card-inner">
          <div class="card-front">
            <img src="${frontImage}" alt="Ucieczka z miejsca zdarzenia" />
          </div>
          <div class="card-back">
            <img src="${ucieczkaImage}" alt="Ucieczka - back" />
          </div>
        </div>
       <p>Ucieczka z miejsca zdarzenia</p>
      </div>

      <div class="card card-right" data-id="pomoc">
        <div class="card-inner">
          <div class="card-front">
            <img src="${frontImage}" alt="Pójście po pomoc dorosłych" />
          </div>
          <div class="card-back">
            <img src="${pomocImage}" alt="Pomoc dorosłych - back" />
          </div>
        </div>
         <p>Pójście po pomoc dorosłych</p>
       </div>
     </div>
     <div class="row">
     <div class="col-10">
      <div class="comment-box" id="commentBox">Jakie konsekwencje może mieć każda z opcji?</div>
     </div>
     </div>
    </div>
  </div>
`;

export const logicFunc = (onSuccess) => {
  const cards = document.querySelectorAll('.card');
  const commentBox = document.getElementById('commentBox');

  const comments = {
    rozmowa: `<strong>To bardzo odważny krok.</strong> Rozmowa może pomóc rozwiązać problem. 
    Być może potwór wcale nie chciał nikogo skrzywdzić? Pamiętaj jednak, że w sytuacji zagrożenia 
    nie wiemy jakie druga strona ma zamiary wobec nas. W takiej sytuacji warto mieć przy sobie 
    drugą osobę, najlepiej dorosłą, która pomoże nam stawić czoła potworowi, zapewniając przy tym bezpieczeństwo.`,

    ucieczka: `<strong>Czasami ucieczka to najlepszy sposób na ratunek.</strong> Gdy jesteś z dala od potwora 
    - możesz czuć się bezpiecznie. Jednak uciekając od niego, w Twojej głowie - lęk może wciąż tam być i 
    bardzo Ci przeszkadzać. Uciekając rozwiążesz problem na chwilę, ale czy dzięki temu przestaniesz 
    obawiać się potwora? Zastanów się, czy uciekając czujesz się już całkowicie bezpiecznie.`,

    pomoc: `<strong>To bardzo bezpieczne rozwiązanie!</strong> Z pomocą osoby dorosłej na pewno łatwiej będzie 
    stawić czoła wszystkim obawom. Razem możecie dobrze przemyśleć, jak poradzić sobie z potworem. 
    Zawsze warto poprosić o pomoc – to również oznaka naszej siły i odwagi.`
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (document.querySelector('.card.flipped')) return; // tylko jedna karta

      card.classList.add('flipped');
      cards.forEach(c => c.classList.add('disabled'));

      const id = card.dataset.id;
      commentBox.innerHTML = `<div class="comment">${comments[id]}</div>`;

      if (onSuccess) onSuccess();
    });
  });
};
