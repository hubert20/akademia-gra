// src/js/views/view6.js

import characterNeutral from '../../assets/task6/character-neutral.png';
import characterHappy from '../../assets/task6/character-happy.png';
import characterNeutralBubble from '../../assets/task6/character-neutral-bubble.png'; // opcjonalnie inna grafika z dymkiem

export const view = `
  <div class="multi-quiz-task text-center">
    <div class="info-box mb-4">
      <strong>Ciekawostka:</strong> 
      Asertywność to umiejętność mówienia tego, co naprawdę myślimy i czujemy – z szacunkiem do siebie i innych. 
      Nie chodzi o bycie miłym za wszelką cenę – ale o to, by stawiać granice i dbać o siebie.
    </div>

    <h4 class="mb-4"><i class="bi bi-flag"></i> Które zdania są asertywne?</h4>

    <div id="quiz-options" class="d-flex flex-column gap-3 align-items-center">
      <button class="quiz-option btn btn-outline-primary" data-correct="true">
        Nie muszę mieć ochoty robić tego co robią inni.
      </button>
      <button class="quiz-option btn btn-outline-primary" data-correct="false" data-feedback="Jeśli Twój najlepszy przyjaciel jest Twoim prawdziwym przyjacielem, zgodność waszych opinii nie będzie miała znaczenia ani wpływu na waszą przyjaźń. Nie bój się mieć własnego zdania! Jest ono równie wartościowe co innych! Spróbuj jeszcze raz!">
        Zawsze muszę zgodzić się z tym co sądzi mój najlepszy przyjaciel.
      </button>
      <button class="quiz-option btn btn-outline-primary" data-correct="true">
        Mogę nie zgodzić się z opinią moich bliskich.
      </button>
      <button class="quiz-option btn btn-outline-primary" data-correct="false" data-feedback="Twoje zdanie jest zawsze równie ważne co zdanie innych! Spróbuj jeszcze raz!">
        Moje zdanie jest mniej ważne od zdania innych.
      </button>
      <button class="quiz-option btn btn-outline-primary" data-correct="true">
        Zawsze mogę powiedzieć nie.
      </button>
      <button class="quiz-option btn btn-outline-primary" data-correct="false" data-feedback="Osoby wokół Ciebie powinny lubić i akceptować Cię, niezależnie czy się z nimi zgadzasz czy nie. Twoje potrzeby są bardzo ważne - nie bój się ich wyrażać, nawet jeśli są różne od potrzeb innych osób. Spróbuj jeszcze raz!">
        Warto ulegać innym, po to żeby mnie lubili.
      </button>
    </div>

    <div id="feedback" class="mt-4 text-danger fw-bold"></div>

    <div class="character mt-4">
      <img id="character-img" src="https://via.placeholder.com/150x150?text=Postać" alt="Postać" />
    </div>
  </div>
`;

export const logicFunc = (onSuccess) => {
  const options = document.querySelectorAll('.quiz-option');
  const feedbackBox = document.getElementById('feedback');
  const character = document.getElementById('character-img');

  const correctAnswers = [...options].filter(opt => opt.dataset.correct === 'true');

  const checkAnswers = () => {
    const selectedCorrect = [...options].filter(opt => 
      opt.classList.contains('selected') && opt.dataset.correct === 'true'
    );
    const selectedIncorrect = [...options].filter(opt => 
      opt.classList.contains('selected') && opt.dataset.correct === 'false'
    );

    if (selectedCorrect.length === correctAnswers.length && selectedIncorrect.length === 0) {
      // Wszystkie poprawne i żadnych błędnych
      showSuccess();
      onSuccess(); // ✅ aktywacja przycisku DALEJ
    } else {
      showError(selectedIncorrect);
    }
  };

  const showSuccess = () => {
    feedbackBox.textContent = 'Brawo! Rozpoznałeś asertywne wypowiedzi.';
    feedbackBox.classList.remove('text-danger');
    feedbackBox.classList.add('text-success');
    character.src = 'https://via.placeholder.com/150x150?text=😊'; // ← zamień na grafikę postaci pozytywnej
  };

  const showError = (wrongOptions) => {
    const firstWrong = wrongOptions[0];
    const message = firstWrong?.dataset.feedback || 'Spróbuj jeszcze raz!';
    feedbackBox.textContent = message;
    feedbackBox.classList.remove('text-success');
    feedbackBox.classList.add('text-danger');
    character.src = 'https://via.placeholder.com/150x150?text=😐'; // ← zamień na grafikę neutralną
  };

  options.forEach(option => {
    option.addEventListener('click', () => {
      option.classList.toggle('selected');
      option.classList.toggle('btn-outline-primary');
      option.classList.toggle('btn-success');
      checkAnswers();
    });
  });
};
