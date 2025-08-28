// src/js/views/view25.js - Zadanie 8 - Poczuj oddech mocy
import comicPanel from '../../assets/komiks/komiks-screen-19.jpg';

export const view = `
  <div class="comic-panel text-center d-flex flex-column justify-content-center h-100">
    <h2 class="text-center">Zadanie 8 - Poczuj oddech mocy</h2>
  </div>
`;

export const logicFunc = (onSuccess) => {
  // aktywujemy od razu przycisk „Dalej”
  onSuccess();
};
