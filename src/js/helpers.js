export function createQuizView(question, answers) {
  const html = `
    <div class="quiz-question text-center">
      <p>${question}</p>
      ${answers.map((a, i) => `
        <button class="btn btn-outline-primary quiz-answer" data-correct="${a.correct}">
          ${a.text}
        </button>
      `).join('')}
    </div>
  `;

  const logic = (onSuccess) => {
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

  return { html, logic };
}