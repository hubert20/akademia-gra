// src/js/views/view6.js

import characterNeutral from '../../assets/task6/character-neutral.png';
import characterHappy from '../../assets/task6/character-happy.png';
import characterNeutralBubble from '../../assets/task6/character-neutral-bubble.png'; // opcjonalnie inna grafika z dymkiem

export const view = `
  <div class="assertiveness-quiz container mt-4">
    <div class="info-box bg-light p-3 mb-4 rounded">
      <strong>Ciekawostka</strong><br />
      Asertywność to umiejętność mówienia tego, co naprawdę myślimy i czujemy - z szacunkiem do siebie i innych. Nie chodzi o bycie miłym za wszelką cenę – ale o to, by stawiać granice i dbać o siebie.
    </div>

    <div class="question-section mb-3">
      <h4>📘 Które zdania są asertywne?</h4>
    </div>

    <div class="answers mb-4 d-flex flex-column gap-2">
      <button class="btn btn-outline-primary answer" data-correct="true">Nie muszę mieć ochoty robić tego co robią inni.</button>
      <button class="btn btn-outline-primary answer" data-correct="false" data-feedback="Jeśli Twój najlepszy przyjaciel jest Twoim prawdziwym przyjacielem...">Zawsze muszę zgodzić się z tym co sądzi mój najlepszy przyjaciel.</button>
      <button class="btn btn-outline-primary answer" data-correct="true">Mogę nie zgodzić się z opinią moich bliskich.</button>
      <button class="btn btn-outline-primary answer" data-correct="false" data-feedback="Twoje zdanie jest zawsze równie ważne co zdanie innych!">Moje zdanie jest mniej ważne od zdania innych.</button>
      <button class="btn btn-outline-primary answer" data-correct="true">Zawsze mogę powiedzieć nie.</button>
      <button class="btn btn-outline-primary answer" data-correct="false" data-feedback="Osoby wokół Ciebie powinny lubić i akceptować Cię...">Warto ulegać innym, po to żeby mnie lubili.</button>
    </div>

    <div class="character-box d-flex align-items-center gap-3 mb-4">
      <img src="${characterNeutral}" id="character-image" alt="Postać" class="character-img" width="150" />
      <p id="feedback-text" class="text-danger fw-bold m-0"></p>
    </div>

    <button id="next-button" class="btn btn-success" style="display: none;">DALEJ</button>
  </div>
`;

export const logicFunc = (onSuccess) => {
  const answers = document.querySelectorAll('.answer');
  const feedback = document.getElementById('feedback-text');
  const nextBtn = document.getElementById('next-button');
  const characterImage = document.getElementById('character-image');

  let selected = new Set();

  const correctAnswers = [...answers].filter(btn => btn.dataset.correct === 'true').map(btn => btn.textContent);

  answers.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent;
      const isCorrect = btn.dataset.correct === 'true';

      if (selected.has(text)) return;

      selected.add(text);

      btn.classList.remove('btn-outline-primary');
      btn.classList.add(isCorrect ? 'btn-success' : 'btn-danger');

      if (!isCorrect) {
        const reason = btn.dataset.feedback || 'Spróbuj jeszcze raz!';
        feedback.textContent = reason;
        characterImage.src = characterNeutralBubble; // lub characterNeutral jeśli nie masz z dymkiem
      } else {
        feedback.textContent = '';
      }

      // sprawdź, czy zaznaczone są wszystkie poprawne i żadna zła
      const selectedTexts = [...selected];
      const hasWrong = selectedTexts.some(text =>
        !correctAnswers.includes(text)
      );
      const allCorrect = correctAnswers.every(c => selected.has(c));

      if (!hasWrong && allCorrect) {
        feedback.textContent = 'Brawo! To są asertywne zdania.';
        characterImage.src = characterHappy;
        nextBtn.style.display = 'inline-block';
      }
    });
  });

  nextBtn.addEventListener('click', () => {
    onSuccess();
  });
};
