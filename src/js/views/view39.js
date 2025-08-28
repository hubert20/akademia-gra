// src/js/views/view39.js - Zadanie 11 - Kompas mocnych stron
import comicPanel from '../../assets/komiks/komiks-screen-19.jpg';

export const view = `
  <div class="comic-panel text-center d-flex flex-column justify-content-center h-100">
    <h2 class="text-center">Zadanie 11?? - Kompas mocnych stron</h2>
  </div>
`;

export const logicFunc = (onSuccess) => {
  // aktywujemy od razu przycisk „Dalej”
  onSuccess();
};
