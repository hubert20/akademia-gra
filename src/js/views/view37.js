// src/js/views/view37.js - Zadanie 10 - Zgadnij, co czuli bohaterowie?
import comicPanel from '../../assets/komiks/komiks-screen-19.jpg';

export const view = `
  <div class="comic-panel text-center d-flex flex-column justify-content-center h-100">
    <h2 class="text-center">Zadanie 10 - Zgadnij, co czuli bohaterowie?</h2>
  </div>
`;

export const logicFunc = (onSuccess) => {
  // aktywujemy od razu przycisk „Dalej”
  onSuccess();
};
