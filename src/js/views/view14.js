// view14.js — Zadanie 3: Sprawdź swoją temperaturę złości

// jeśli chcesz użyć obrazka termometru z assets:
import thermoImg from '../../assets/task3/thermometer.png'; // podmień ścieżkę jeśli inna
import buddyImg from '../../assets/task8/ognik.png';          // ten sam ognik co wcześniej

const ZONES = [
  {
    id: 'blue',
    label: 'Niebieski',
    colorClass: 'zone-blue',
    text: 'Ta sytuacja trochę mnie zdenerwowała, ale i tak jest w porządku. To nie było miłe, ale jestem w stanie poradzić sobie z tą sytuacją. Czuję lekkie napięcie, ale jeśli wezmę kilka głębokich oddechów – powinno być lepiej.',
  },
  {
    id: 'yellow',
    label: 'Żółty',
    colorClass: 'zone-yellow',
    text: 'Zaczynam się naprawdę złościć. Mam ochotę powiedzieć to głośno. To nie jest przyjemne uczucie. Jestem w stanie je zauważyć i skontrolować – robiąc dla siebie coś miłego, słuchając spokojnej muzyki czy idąc na spacer.',
  },
  {
    id: 'orange',
    label: 'Pomarańczowy',
    colorClass: 'zone-orange',
    text: 'Jestem bardzo zły/zła! Chce mi się krzyczeć, płakać. Czuję, że zaraz wybuchnę. Nie wiem, jak to powstrzymać – jeśli zaraz tego nie zrobię, to może skończyć się nieprzyjemnie. Potrzebuję pomocy kogoś dorosłego.',
  },
  {
    id: 'red',
    label: 'Czerwony',
    colorClass: 'zone-red',
    text: 'Złość przejęła nade mną kontrolę. Robię rzeczy, których już nie kontroluję. Krzyczę, płaczę, rzucam przedmiotami – a wcale nie chcę tego robić. To złość kieruje moim zachowaniem. Ktoś musi mi pomóc, by zadbać o bezpieczeństwo – moje i innych.',
  },
];

export const view = `
<div class="task-thermo h-100 d-flex flex-column justify-content-center">
  <div class="thermo-wrap">
    <!-- LEWA -->
    <div class="thermo-left">
      <p class="mb-1"><em>Wyobraź sobie, że koleżanka wylała Ci na plecak sok pomidorowy.</em><br>
      <strong>Jak bardzo by Cię to zezłościło?</strong></p>
      <p class="text-muted">Przesuń suwak na Termometrze złości, aby pokazać, jak silna byłaby Twoja złość w tej sytuacji.</p>

      <div class="thermo-area">
        <!-- obraz tła termometru -->
        <img class="thermo-image" src="${thermoImg}" alt="Termometr złości" />
        <!-- pionowy tor do obliczeń pozycji (niewidoczny, ale klikalny) -->
        <div class="thermo-track" aria-hidden="true">
          <div class="track-zone track-blue"></div>
          <div class="track-zone track-yellow"></div>
          <div class="track-zone track-orange"></div>
          <div class="track-zone track-red"></div>
        </div>

        <!-- uchwyt/suwak (trójkąt) -->
        <div class="thermo-handle" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"></div>

        <!-- dymek z tekstem przy suwaku -->
        <div class="thermo-bubble d-none">
          <div class="bubble-inner"></div>
        </div>
      </div>
    </div>

    <!-- DIVIDER -->
    <div class="thermo-divider" aria-hidden="true"></div>

    <!-- PRAWA (zawsze widoczna) -->
    <div class="thermo-right">
      <div class="speech">
        <strong>Wprowadzenie:</strong><br>
        „Czuć złość to coś normalnego. Każdy może poczuć ją inaczej.
        Ważne, co z tą złością zrobimy i jak ją wyrazimy – żeby nie skrzywdzić siebie ani innych”.
      </div>
      <img class="buddy" src="${buddyImg}" alt="Postać" />
    </div>
  </div>
</div>
`;

export const logicFunc = (onSuccess) => {
  const track = document.querySelector('.thermo-track');
  const handle = document.querySelector('.thermo-handle');
  const bubble = document.querySelector('.thermo-bubble');
  const bubbleInner = bubble.querySelector('.bubble-inner');

  // Wysokości segmentów (px) – dokładnie jak na makiecie
  const H_RED = 86;
  const H_ORANGE = 86;
  const H_YELLOW = 86;
  const H_BLUE = 75;
  const TRACK_H = H_RED + H_ORANGE + H_YELLOW + H_BLUE; // 333

  const bounds = () => track.getBoundingClientRect();
  let unlocked = false;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  // Zwraca strefę na podstawie Y liczonego od góry toru (px)
  const zoneFromY = (yFromTop) => {
    if (yFromTop < H_RED) return 'red';
    if (yFromTop < H_RED + H_ORANGE) return 'orange';
    if (yFromTop < H_RED + H_ORANGE + H_YELLOW) return 'yellow';
    return 'blue';
  };

  const setHandleAt = (clientY) => {
    const b = bounds();
    // Y w obrębie toru [0..TRACK_H]
    const y = clamp(clientY - b.top, 0, TRACK_H);

    // Uchwyt (ma ~20px wysokości – pozycjonujemy środkiem)
    handle.style.top = `${y - 10}px`;

    // Strefa
    const z = zoneFromY(y);
    bubble.classList.remove('zone-blue', 'zone-yellow', 'zone-orange', 'zone-red');
    bubble.classList.add(`zone-${z}`);

    // Tekst strefy
    const zoneObj = {
      blue:   'Ta sytuacja trochę mnie zdenerwowała, ale i tak jest w porządku. To nie było miłe, ale jestem w stanie poradzić sobie z tą sytuacją. Czuję lekkie napięcie, ale jeśli wezmę kilka głębokich oddechów – powinno być lepiej.',
      yellow: 'Zaczynam się naprawdę złościć. Mam ochotę powiedzieć to głośno. To nie jest przyjemne uczucie. Jestem w stanie je zauważyć i skontrolować – robiąc dla siebie coś miłego, słuchając spokojnej muzyki czy idąc na spacer.',
      orange: 'Jestem bardzo zły/zła! Chce mi się krzyczeć, płakać. Czuję, że zaraz wybuchnę. Nie wiem, jak to powstrzymać – jeśli zaraz tego nie zrobię, to może skończyć się nieprzyjemnie. Potrzebuję pomocy kogoś dorosłego.',
      red:    'Złość przejęła nade mną kontrolę. Robię rzeczy, których już nie kontroluję. Krzyczę, płaczę, rzucam przedmiotami – a wcale nie chcę tego robić. To złość kieruje moim zachowaniem. Ktoś musi mi pomóc, by zadbać o bezpieczeństwo – moje i innych.',
    }[z];

    bubbleInner.textContent = zoneObj;
    bubble.style.top = `${y - 28}px`;
    bubble.classList.remove('d-none');

    if (!unlocked) {
      unlocked = true;
      onSuccess(); // odblokuj "DALEJ" po pierwszym trafieniu w strefę
    }
  };

  // Drag: mouse/touch
  let dragging = false;

  const start = (e) => {
    dragging = true;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setHandleAt(clientY);
    e.preventDefault();
  };

  const move = (e) => {
    if (!dragging) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setHandleAt(clientY);
  };

  const end = () => { dragging = false; };

  // Zdarzenia
  handle.addEventListener('mousedown', start);
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', end);

  handle.addEventListener('touchstart', start, { passive: false });
  document.addEventListener('touchmove', move, { passive: false });
  document.addEventListener('touchend', end);

  // Klik na torze – przeskok w miejsce kliknięcia
  track.addEventListener('mousedown', (e) => setHandleAt(e.clientY));
  track.addEventListener('touchstart', (e) => setHandleAt(e.touches[0].clientY), { passive: true });

  // Start: strzałka NAD termometrem (powyżej czerwonego), bąbel ukryty
  const b0 = bounds();
  // handle.style.left = `${track.offsetLeft - 14}px`; // wyrównanie czubka trójkąta do rurki
  handle.style.top = `-${20}px`;                     // 🔺 nad górą toru
  bubble.classList.add('d-none');
};

