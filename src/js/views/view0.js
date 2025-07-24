export const view0 = `
  <div class="quiz-question text-center">
    <p>Jakiego koloru jest niebo?</p>
    <button class="btn btn-outline-primary quiz-answer" data-correct="false">Zielone</button>
    <button class="btn btn-outline-primary quiz-answer" data-correct="true">Niebieskie</button>
    <button class="btn btn-outline-primary quiz-answer" data-correct="false">Czerwone</button>
  </div>
`;

export const logic0 = (onSuccess) => {
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
