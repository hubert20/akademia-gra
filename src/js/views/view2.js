export const view = `
  <div class="dragdrop-task text-center">
    <p class="mb-4">Przeciągnij każde słowo do odpowiedniej kategorii:</p>

    <div class="d-flex justify-content-center gap-5 flex-wrap">
      <div class="drop-zone border p-3" data-category="owoce">
        <h5>Owoce</h5>
      </div>
      <div class="drop-zone border p-3" data-category="warzywa">
        <h5>Warzywa</h5>
      </div>
    </div>

    <div class="draggables mt-4 d-flex justify-content-center gap-3 flex-wrap">
      <div class="draggable btn btn-outline-secondary" draggable="true" data-category="owoce">Jabłko</div>
      <div class="draggable btn btn-outline-secondary" draggable="true" data-category="warzywa">Marchewka</div>
      <div class="draggable btn btn-outline-secondary" draggable="true" data-category="owoce">Gruszka</div>
      <div class="draggable btn btn-outline-secondary" draggable="true" data-category="warzywa">Brokuł</div>
    </div>
  </div>
`;

export const logicFunc = (onSuccess) => {
  const draggables = document.querySelectorAll('.draggable');
  const dropZones = document.querySelectorAll('.drop-zone');

  const total = draggables.length;
  let correct = 0;

  draggables.forEach(item => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/category', item.dataset.category);
      e.dataTransfer.setData('text/id', item.textContent);
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('bg-light');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('bg-light');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('bg-light');

      const expected = zone.dataset.category;
      const category = e.dataTransfer.getData('text/category');
      const text = e.dataTransfer.getData('text/id');

      // znajdź element źródłowy
      const item = [...draggables].find(el => el.textContent === text);
      if (!item || item.classList.contains('dropped')) return;

      if (category === expected) {
        correct++;
        item.classList.add('dropped');
        item.classList.remove('btn-outline-secondary');
        item.classList.add('btn-success');
        item.setAttribute('draggable', 'false');
        zone.appendChild(item);
      } else {
        item.classList.add('btn-danger');
        setTimeout(() => item.classList.remove('btn-danger'), 1000);
      }

      if (correct === total) {
        onSuccess();
      }
    });
  });
};

