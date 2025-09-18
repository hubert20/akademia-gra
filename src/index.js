import './styles.scss';
import 'bootstrap';
import { views, logics } from './js/views';
import './cookie';

const sideMenu = document.getElementById('sideMenu');
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const taskContainer = document.getElementById('task-container');

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const startNav = document.getElementById('startBtnWrapper');
const nextNav = document.getElementById('nextBtnWrapper');
const prevNav = document.getElementById('prevBtnWrapper');

let currentView = -1; // -1 to intro
let isTaskCompleted = false;

import introImage from './assets/start/start-bg.png';

// MENU toggle
menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

menuClose.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  menuToggle.classList.remove('active');
});

// NAWIGACJA
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

// KONTROLA PRZYCISKÓW
function updateNavigationButtons() {
  startNav.style.display = currentView === -1 ? 'inline-block' : 'none';
  prevNav.style.display = currentView > 0 ? 'inline-block' : 'none';
  nextNav.style.display = currentView >= 0 ? 'inline-block' : 'none';

  // blokuj „dalej” jeśli nie zakończono zadania
  nextBtn.disabled = !isTaskCompleted;
  nextBtn.classList.toggle('disabled', !isTaskCompleted);
}

// RENDER WIDOKU
function renderView(index) {
  if (index === -1) {
    taskContainer.innerHTML = `
      <div class="intro-screen text-center d-flex flex-column justify-content-center h-100">
    <div class="row z-1">
        <div class="intro-screen--enter col-8 offset-5">
            <h2 class="text-start">Przygodnik</h2>
            <h4 class="text-start standard-title-3">Komiks, który pozwala uwierzyć w siebie</h4>
            <p class="text-start fst-italic">Masz w sobie więcej, niż myślisz. <br> Z duszkiem na ramieniu i odwagą w
                kieszeni, <br>czytaj, graj i odkrywaj, jak fajnie jest być sobą.</p>
        </div>
    </div>
    <img src="${introImage}" alt="Intro" class="align-self-center intro-screen--image"
        style="max-width: 100%; height: auto;position: absolute;" />
    </div>
    `;

    updateNavigationButtons();

    const startGameBtn = document.getElementById('startGame');
    if (startGameBtn) {
      startGameBtn.addEventListener('click', () => {
        currentView = 0;
        renderView(currentView);
      });
    }

    return;
  }

  // ładowanie zadania
  taskContainer.innerHTML = views[index];
  isTaskCompleted = false;
  updateNavigationButtons();

  if (typeof logics[index] === 'function') {
    logics[index](() => {
      isTaskCompleted = true;
      updateNavigationButtons();
    });
  }
}

// START
renderView(currentView);
