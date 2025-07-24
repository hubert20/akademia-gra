import './styles.scss';
import 'bootstrap';
import { views, logics } from './js/views';

const sideMenu = document.getElementById('sideMenu');
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const taskContainer = document.getElementById('task-container');

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const nextNav = document.getElementById('nextBtnWrapper');
const prevNav = prevBtn.parentElement;
const startNav = document.getElementById('startBtnWrapper');

let currentView = -1; // intro
let isTaskCompleted = false;

// toggle menu
menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

menuClose.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  menuToggle.classList.remove('active');
});

// nawigacja
nextBtn.addEventListener('click', () => {
  if (currentView < views.length - 1 && isTaskCompleted) {
    currentView++;
    renderView(currentView);
  }
});

prevBtn.addEventListener('click', () => {
  if (currentView > 0) {
    currentView--;
    renderView(currentView);
  }
});

// kontrola przycisków
function updateNavigationButtons() {
  if (currentView === -1) {
    startNav.style.display = 'inline-block';
    prevNav.style.display = 'none';
    nextNav.style.display = 'none';
  } else {
    startNav.style.display = 'none';
    prevNav.style.display = currentView > 0 ? 'inline-block' : 'none';
    nextNav.style.display = 'inline-block';

    nextBtn.disabled = !isTaskCompleted;
    nextBtn.classList.toggle('disabled', !isTaskCompleted);
  }
}

// render widoku
function renderView(index) {
  if (index === -1) {
    taskContainer.innerHTML = `
      <div class="intro-screen text-center">
        <h2>Witamy w grze edukacyjnej!</h2>
        <p>Rozwiązuj zadania, ucz się i baw się dobrze 🎯</p>
        <img src="./assets/przygodnik.jpg" alt="Intro" style="max-width: 100%; height: auto; margin-bottom: 2rem;" />
      </div>
    `;

    updateNavigationButtons();

    // podłącz przycisk start (jest w HTML w nawigacji)
    document.getElementById('startGame').addEventListener('click', () => {
      currentView = 0;
      renderView(currentView);
    });

    return;
  }

  // renderuj zadanie
  taskContainer.innerHTML = views[index];
  isTaskCompleted = false;
  updateNavigationButtons();

  // jeśli widok ma logikę – uruchom ją i przekaż funkcję "onSuccess"
  if (typeof logics[index] === 'function') {
    logics[index](() => {
      isTaskCompleted = true;
      updateNavigationButtons();
    });
  }
}

// odpal intro na start
renderView(currentView);
