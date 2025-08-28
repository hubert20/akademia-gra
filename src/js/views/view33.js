// src/js/views/view33.js - Zadanie 9 - Poczuj grunt pod stopami
import comicPanel from '../../assets/komiks/komiks-screen-19.jpg';

export const view = `
  <div class="comic-panel text-center d-flex flex-column justify-content-center h-100">
    <h2 class="text-center">Zadanie 9 - Poczuj grunt pod stopami</h2>
  </div>
`;

export const logicFunc = (onSuccess) => {
  // aktywujemy od razu przycisk „Dalej”
  onSuccess();
};
