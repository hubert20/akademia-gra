// src/js/views/view3.js
import comicPanel from '../../assets/comic/comic-4.jpg'; // ścieżka do Twojej planszy

export const view = `
  <div class="comic-panel text-center">
    <img src="${comicPanel}" alt="Komiks" class="img-fluid" style="max-width: 100%; height: auto;border-radius: 1rem;">
  </div>
`;

export const logicFunc = (onSuccess) => {
  // aktywujemy od razu przycisk „Dalej”
  onSuccess();
};
