import './styles.scss';
import 'bootstrap';

const sideMenu = document.getElementById('sideMenu');
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');

menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('active');
  menuToggle.classList.toggle('active'); // <- to dodaje animację do "X"
});

menuClose.addEventListener('click', () => {
  sideMenu.classList.remove('active');
  menuToggle.classList.remove('active'); // <- wraca do hamburgera
});
