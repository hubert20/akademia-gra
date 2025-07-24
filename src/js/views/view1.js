export const view1 = `
  <div class="quiz-question text-center">
    <p>Ile to jest 3 + 4?</p>
    <button class="btn btn-outline-primary quiz-answer" data-correct="false">5</button>
    <button class="btn btn-outline-primary quiz-answer" data-correct="true">7</button>
    <button class="btn btn-outline-primary quiz-answer" data-correct="false">9</button>
  </div>
`;

export const logic1 = (onSuccess) => {
  document.querySelectorAll('.quiz-answer').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.correct === 'true') {
        btn.classList.add('btn-success');
        onSuccess();
      } else {
        btn.classList.add('btn-danger');
      }
    });
  });
};
