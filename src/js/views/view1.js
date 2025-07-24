import { createQuizView } from '../helpers.js';

const { html, logic } = createQuizView('Ile to jest 2 + 2?', [
  { text: '3', correct: false },
  { text: '4', correct: true },
  { text: '5', correct: false }
]);

export const view = html;
export const logicFunc = logic;
