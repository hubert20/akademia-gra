// view14.js — Zadanie 3: Sprawdź swoją temperaturę złości
import thermoImg from '../../assets/task3/thermometer.png';
import thermoSlider from '../../assets/task3/suwak.png';

export const view = `
<div class="task-thermo h-100 d-flex flex-column justify-content-center">
  <div class="thermo-wrap h-100">
    <!-- LEWA -->
    <div class="thermo-left p-4">
      <h2 class="text-start">TERMOMETR ZŁOŚCI</h2>
      <p class="blue-instruct text-start mb-5">
        Wyobraź sobie, że koleżanka wylała na Twój plecak sok pomidorowy.
        Jak bardzo by Cię to zezłościło?
      </p>

      <div class="thermo-area">
        <!-- obraz tła termometru -->
        <img class="thermo-image" src="${thermoImg}" alt="Termometr złości" />

        <!-- pionowy tor do obliczeń pozycji -->
        <div class="thermo-track" aria-hidden="true">
          <div class="track-zone track-blue"></div>
          <div class="track-zone track-yellow"></div>
          <div class="track-zone track-orange"></div>
          <div class="track-zone track-red"></div>
        </div>

        <!-- uchwyt/suwak (obrazek) -->
        <div class="thermo-handle" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0">
          <img src="${thermoSlider}" alt="Suwak termometru złości" />
        </div>

        <!-- dymek z tekstem przy suwaku -->
        <div class="thermo-bubble d-none">
          <div class="bubble-inner"></div>
        </div>

        <!-- KRÓTKA INSTRUKCJA NA BIAŁYM TLE (obok termometru) -->
        <div class="thermo-note text-start p-4">
          <p>
            Przesuń suwak na <strong class="wildwords-font">TERMOMETRZE ZŁOŚCI</strong>, aby pokazać,
            jak silna byłaby Twoja złość w tej sytuacji.
          </p>
          <p class="mb-0">
            Masz do wyboru różne poziomy — od
            <span class="instr-blue">lekkiej złości</span> po
            <span class="instr-red">wielką wściekłość</span>.
          </p>
        </div>
      </div>
    </div>

    <!-- PRAWA (bez zmian) -->
    <div class="thermo-right left-double-space">
      <div class="speech">
        <h4>WPROWADZENIE</h4>
        <p>
          Każdy z nas czasem czuje złość. Czasem małą - jak iskierka,
          a czasem ogromną - jak wulkan. Złość to ważna emocja,
          która pokazuje, że coś nam się nie podoba albo że jest dla nas trudne.
        </p>
      </div>
    </div>
  </div>
</div>
`;

export const logicFunc = (onSuccess) => {
  const track = document.querySelector('.thermo-track');
  const handle = document.querySelector('.thermo-handle');
  const bubble = document.querySelector('.thermo-bubble');
  const bubbleInner = bubble.querySelector('.bubble-inner');

  // Wysokości segmentów (px) – jak na makiecie
  const H_RED = 86, H_ORANGE = 86, H_YELLOW = 86, H_BLUE = 75;
  const TRACK_H = H_RED + H_ORANGE + H_YELLOW + H_BLUE; // 333

  const bounds = () => track.getBoundingClientRect();
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  let unlocked = false;

  const zoneFromY = (yFromTop) => {
    if (yFromTop < H_RED) return 'red';
    if (yFromTop < H_RED + H_ORANGE) return 'orange';
    if (yFromTop < H_RED + H_ORANGE + H_YELLOW) return 'yellow';
    return 'blue';
  };

  // Pomiar wysokości uchwytu (obrazka), by pozycjonować środkiem
  let HANDLE_H = 20;
  const measureHandle = () => {
    const r = handle.getBoundingClientRect();
    HANDLE_H = r.height || 20;
  };
  measureHandle();
  window.addEventListener('load', measureHandle);
  window.addEventListener('resize', measureHandle);

  const getCurrentY = () => {
    const top = parseFloat(handle.style.top || '0');
    return top + (HANDLE_H / 2);
  };

  const setHandleAt = (clientY) => {
    const b = bounds();
    const y = clamp(clientY - b.top, 0, TRACK_H);               // 0..333
    handle.style.top = `${y - (HANDLE_H / 2)}px`;                // środek obrazka

    const z = zoneFromY(y);
    bubble.className = `thermo-bubble zone-${z}`;
    const txt = {
      blue:   'Ta sytuacja trochę mnie zdenerwowała, ale i tak jest w porządku. To nie było miłe, ale jestem w stanie poradzić sobie z tą sytuacją. Czuję lekkie napięcie, ale jeśli wezmę kilka głębokich oddechów – powinno być lepiej.',
      yellow: 'Zaczynam się naprawdę złościć. Mam ochotę powiedzieć to głośno. To nie jest przyjemne uczucie. Jestem w stanie je zauważyć i skontrolować – robiąc dla siebie coś miłego, słuchając spokojnej muzyki czy idąc na spacer.',
      orange: 'Jestem bardzo zły/zła! Chce mi się krzyczeć, płakać. Czuję, że zaraz wybuchnę. Nie wiem, jak to powstrzymać – jeśli zaraz tego nie zrobię, to może skończyć się nieprzyjemnie. Potrzebuję pomocy kogoś dorosłego.',
      red:    'Złość przejęła nade mną kontrolę. Robię rzeczy, których już nie kontroluję. Krzyczę, płaczę, rzucam przedmiotami – a wcale nie chcę tego robić. To złość kieruje moim zachowaniem. Ktoś musi mi pomóc, by zadbać o bezpieczeństwo – moje i innych.',
    }[z];

    bubbleInner.textContent = txt;
    bubble.style.top = `${y - 28}px`;
    bubble.classList.remove('d-none');

    if (!unlocked) { unlocked = true; onSuccess(); }
  };

  // Drag z offsetem (brak "spadu")
  let dragging = false;
  let grabOffset = 0;
  let dragMode = 'track';

  const startOnHandle = (e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const b = bounds();
    dragMode = 'handle';
    dragging = true;
    grabOffset = clientY - (b.top + getCurrentY()); // chwyt z przesunięciem
    e.preventDefault();
  };

  const startOnTrack = (e) => {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragMode = 'track';
    dragging = true;
    setHandleAt(clientY); // kliknięcie w tor = przeskok
  };

  const move = (e) => {
    if (!dragging) return;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const targetY = (dragMode === 'handle') ? (clientY - grabOffset) : clientY;
    setHandleAt(targetY);
  };

  const end = () => { dragging = false; };

  // Zdarzenia
  handle.addEventListener('mousedown', startOnHandle);
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', end);

  handle.addEventListener('touchstart', startOnHandle, { passive: false });
  document.addEventListener('touchmove', move, { passive: false });
  document.addEventListener('touchend', end);

  track.addEventListener('mousedown', startOnTrack);
  track.addEventListener('touchstart', startOnTrack, { passive: true });

  // Pozycja startowa: suwak na -60px, bąbel ukryty
  handle.style.top = `-${30}px`;
  bubble.classList.add('d-none');
};
