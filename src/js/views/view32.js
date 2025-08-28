// src/js/views/view32.js
import comicPanel from '../../assets/komiks/komiks-screen-26.jpg';

export const view = `
  <div class="comic-panel text-center">
    <img src="${comicPanel}" alt="Komiks" class="img-fluid" style="max-width: 100%; height: auto;border-radius: 1rem;">
  </div>
`;

export const logicFunc = (onSuccess) => {
  // aktywujemy od razu przycisk „Dalej”
  onSuccess();
};
