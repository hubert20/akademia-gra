import './styles.scss';
import 'bootstrap';

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('sideMenu').classList.add('active');
});

document.getElementById('menuClose').addEventListener('click', () => {
  document.getElementById('sideMenu').classList.remove('active');
});
