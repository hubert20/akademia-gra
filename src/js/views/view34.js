// view34.js — Zadanie 8: Poczuj grunt pod stopami
import buddyImg from '../../assets/task8/ognik.png';

const steps = [
  { id: 'see', label: '5 rzeczy, które widzisz:' },
  { id: 'touch', label: '4 rzeczy, które możesz dotknąć:' },
  { id: 'hear', label: '3 rzeczy, które słyszysz:' },
  { id: 'smell', label: '2 rzeczy, które czujesz (np. zapach):' },
  { id: 'taste', label: '1 rzecz, którą możesz posmakować:' },
];

export const view = `
<div class="task-9 h-100 d-flex">
  <!-- Intro karta -->
  <div class="grounding-intro card">
  <div class="d-flex h-100 align-items-center">
   <div class="row justify-content-center">
    <div class="col-lg-8">
    <div class="grounding-intro-green p-5">
      <h3 class="mb-3 text-start">Ziemia pod stopami</h3>
      <p class="mb-0 text-start">
        Zatrzymaj się na chwilę. Weź głęboki oddech i skup się na swoim ciele.
        Poczuj, że jesteś „tu i teraz”. Ziemia pod Twoimi stopami naprawdę Cię trzyma.
        Teraz wykonaj ćwiczenie uziemienia - skorzystaj ze swoich 5 zmysłów.
      </p>
      <button id="start-grounding" class="btn btn-primary mt-4">Zobacz i wykonaj ćwiczenie</button>
    </div>
    </div>
   </div>
   </div>
  </div>

  <!-- Główna część ćwiczenia -->
<div class="grounding-wrap d-none">
  <div class="grounding-left">
    <h3 class="mb-2 text-start">Wpisz w odpowiednie pola/dymki swoje obserwacje</h3>
    <h4 class="text-muted mb-3 text-start">Wykonaj ćwiczenie uziemienia - skorzystaj ze swoich 5 zmysłów.</h4>
    <p class="mb-4 text-start">Każda liczba/ikona ma swoje pole do wpisania <br>- wypełnij je własnymi odczuciami.
      <strong>Nie ma złych odpowiedzi!</strong>
    </p>

<div class="bubbles row justify-content-center">
      ${steps.map((s, i) => `
        <div class="bubble-row col-12 col-lg-6 ${i > 0 ? 'd-none' : ''}" data-step="${i}">
          <label class="bubble">
            <span class="bubble-title">${s.label}</span>
            <textarea class="form-control bubble-input" id="bubble-${s.id}" rows="2" placeholder="..."></textarea>
          </label>
          ${i < steps.length - 1 ? `<span class="bubble-arrow bubble-arrow-${i + 1}" aria-hidden="true"></span>` : ''}
        </div>
        ${i === 2 ? `<div class="w-100 d-none d-lg-block"></div>` : ''}
      `).join('')}
    </div>
  </div> 

    <div class="grounding-divider" aria-hidden="true"></div>
    <div class="grounding-right">
      <div class="speech">
        Każda liczba/ikona ma swoje pole do wpisania - wypełnij je własnymi odczuciami.<br>
        <strong>Nie ma złych odpowiedzi!</strong>
      </div>
      <img class="buddy" src="${buddyImg}" alt="Postać" />
    </div>
  </div>
</div>
`;

export const logicFunc = (onSuccess) => {
  const intro = document.querySelector('.grounding-intro');
  const startBtn = document.getElementById('start-grounding');
  const wrap = document.querySelector('.grounding-wrap');

  startBtn.addEventListener('click', () => {
    intro.classList.add('fade-out');
    setTimeout(() => {
      intro.classList.add('d-none');
      wrap.classList.remove('d-none');
      wrap.classList.add('fade-in');
      setTimeout(() => wrap.classList.remove('fade-in'), 300);
    }, 300);
  });

  // wymagane liczby wpisów dla kolejnych dymków
  const required = [5, 4, 3, 2, 1];

  const countWords = (val) => {
    // rozdziel po spacjach, przecinkach, średnikach, nowej linii
    return val
      .split(/[,\s;]+/g)
      .map(s => s.trim())
      .filter(Boolean).length;
  };

  const rows = Array.from(document.querySelectorAll('.bubble-row'));

  rows.forEach((row, idx) => {
    const input = row.querySelector('.bubble-input');
    const need = required[idx];
    const next = rows[idx + 1];
    const arrow = row.querySelector('.bubble-arrow');

    const update = () => {
      const count = countWords(input.value);
      const ok = count >= need;

      // podświetlenie "spełnione"
      row.classList.toggle('ready', ok);

      if (ok) {
        if (arrow) arrow.classList.add('visible');
        if (next && next.classList.contains('d-none')) {
          next.classList.remove('d-none');
          next.classList.add('fade-in');
          setTimeout(() => next.classList.remove('fade-in'), 300);
        }
        if (idx === rows.length - 1) {
          onSuccess();
        }
      } else {
        // jeśli użytkownik usunął część wpisów – schowaj kolejne
        for (let j = idx + 1; j < rows.length; j++) {
          rows[j].classList.add('d-none');
          rows[j].querySelector('.bubble-input').value = '';
          const prevArrow = rows[j - 1].querySelector('.bubble-arrow');
          if (prevArrow) prevArrow.classList.remove('visible');
          rows[j].classList.remove('ready');
        }
      }
    };

    input.addEventListener('input', update);
  });
};

