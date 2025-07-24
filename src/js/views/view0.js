import { createQuizView } from '../helpers.js';

const { html, logic } = createQuizView('Jakiego koloru jest niebo?', [
  { text: 'Zielone', correct: false },
  { text: 'Niebieskie', correct: true },
  { text: 'Czerwone', correct: false }
]);

export const view = html;
export const logicFunc = logic;
