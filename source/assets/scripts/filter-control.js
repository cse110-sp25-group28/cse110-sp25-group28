/**
 * @fileoverview
 * Adds dropdown menu that allow users to filter
 * <workout-card> elements by muscle group & exercise.
 *
 * ────────────────────────────────────────────────────────────────
 * How it Works
 * 1.  `initFiltering()` receives workout JSON array
 * 2.  Populates <select> elements with categories and an “All” option
 * 3.  Whenever dropdown changes, `applyFilters()` checks every
 *     <workout-card>, comparing attributes against chosen filters
 *     Cards that don’t match are simply   display:none-d.
 * 4.  User's latest choices are persisted to localStorage so
 *     reloads preserve state

/**
 * Bootstraps the filtering UI
 *
 * @param {Array<Object>} workouts
 * Array of workout card objects fetched in `index.js`
 *
 * @returns {void}
 */
export function initFiltering(workouts) {
    // ─── 1. Check for edge cases  ───────────────────────────
    if (!Array.isArray(workouts) || workouts.length === 0) {
        console.warn('[filterControls] No workouts available; toolbar skipped.');
        return;
    }

    // ─── 2. Gather <select> option values  ──────────────────────────

    /* 1. Build list of every muscle name we find in the workouts array */
    const rawMuscleNames = [];
    for (let workout of workouts) {
        rawMuscleNames.push(workout.muscle);
    }

    /* 2. Pass list through helper to deduplicate & sort */
    const muscles = uniqueStrings(rawMuscleNames);

    // ─── 3. Toolbar  ────────────────────────────
    const toolbar = buildToolbar(muscles);
    const controlsToolbar = document.querySelector('.controls-toolbar');
    controlsToolbar.insertBefore(toolbar, controlsToolbar.firstChild);

    // ─── 4. Restore saved filter state and apply  ─────────────────
    restoreSelections(toolbar);
    applyFilters();

    // ─── 5. Respond to user changes  ─────────────────────────────────
    toolbar.addEventListener('change', applyFilters);
}

/**
 * Deduplicates + sorts string array alphabetically (case-insensitive)
 * @param {string[]} arr
 * @returns {string[]}
 */
function uniqueStrings(arr) {
    // 1. Lower case + trim
  const cleaned = [];
  for (const word of arr) {
    if (typeof word === 'string') {
      cleaned.push(word.trim().toLowerCase());
    }
  }

  // 2. Deduplicate 
  const seen = {};
  const result = [];
  for (const w of cleaned) {
    if (!seen[w]) {
      seen[w] = true;
      result.push(w);
    }
  }

  // 3. Sort alphabetically
  return result.sort();
}

/**
 * Returns <label> containing one configured <select>
 * @param {'muscle'|'category'} type
 * @param {string[]} values
 * @param {string} label
 * @returns {HTMLLabelElement}
 */
function makeSelect(type, values, labelText) {
  const wrapper = document.createElement('label');
  wrapper.className = 'custom-dropdown-wrapper filter-control';

  const label = document.createElement('span');
  label.style.color = 'white';
  label.textContent = labelText;
  label.className = 'filter-label';
  wrapper.appendChild(label);

  const dropdown = document.createElement('div');
  dropdown.className = `custom-dropdown ${type}-dropdown`;
  dropdown.id = `filter-${type}`;
  dropdown.dataset.selected = 'all'; 
  dropdown.tabIndex = 0;

  const selected = document.createElement('div');
  selected.className = 'custom-dropdown-selected';
  selected.textContent = 'All Muscle Groups';
  dropdown.appendChild(selected);

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'custom-dropdown-options';

  optionsContainer.addEventListener('wheel', (e) => {
  const isScrollingDown = e.deltaY > 0;
  const atBottom = optionsContainer.scrollTop + optionsContainer.clientHeight >= optionsContainer.scrollHeight;
  const atTop = optionsContainer.scrollTop === 0;

  if ((isScrollingDown && atBottom) || (!isScrollingDown && atTop)) {
    e.preventDefault();
    }
  }, { passive: false });

  const allOption = document.createElement('div');
  allOption.className = 'custom-dropdown-option';
  allOption.dataset.value = 'all';
  allOption.textContent = `All Muscle Groups`;
  optionsContainer.appendChild(allOption);

  values.forEach(val => {
    const opt = document.createElement('div');
    opt.className = 'custom-dropdown-option';
    opt.dataset.value = val;
    opt.textContent = capitalize(val);
    optionsContainer.appendChild(opt);
  });

  dropdown.appendChild(optionsContainer);
  wrapper.appendChild(dropdown);

  selected.addEventListener('click', () => {
    optionsContainer.classList.toggle('open');
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', (event) => {
  const isClickInside = dropdown.contains(event.target);
  if (!isClickInside) {
    optionsContainer.classList.remove('open');
    dropdown.classList.remove('open');
    }
  });

  optionsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('custom-dropdown-option')) {
      selected.textContent = e.target.textContent;
      dropdown.dataset.selected = e.target.dataset.value;
      optionsContainer.classList.remove('open');
      dropdown.classList.remove('open');

      const changeEvent = new Event('change', { bubbles: true });
      dropdown.dispatchEvent(changeEvent);
    }
  });

  return wrapper;
}


/**
 * Creates <section> containing dropdown
 * @param {string[]} muscles
 * @param {string[]} categories
 * @returns {HTMLElement}
 */
function buildToolbar(muscles) {
    const toolbar = document.createElement('section');
    toolbar.id = 'filter-toolbar';
    Object.assign(toolbar.style, {
        display: 'flex',
        gap: '1rem',
        margin: '1rem 0',
        flexWrap: 'wrap',
        color: 'black'
    });
    
    toolbar.append(
        makeSelect('muscle', muscles,'Filter Category: '),
    );
    return toolbar;
}

/**
 * Hide/display each <workout-card>
 * Reads current dropdown values each time
 * @returns {void}
 */
function applyFilters() {
    const muscleSel = document.querySelector('#filter-muscle')?.dataset.selected || 'all';
    
    /** @type {NodeListOf<HTMLElement>} */
    const cards = document.querySelectorAll('workout-card');

    cards.forEach(card => {
        const matchesMuscle =
            muscleSel === 'all' || card.dataset.muscle === muscleSel;

        if (matchesMuscle) {
            // Keep card visible
            card.style.display = '';
        } else {
            // Hide card
            card.style.display = 'none';
        }

    });

    // Remain for reloads
    localStorage.setItem('filters', JSON.stringify({
        muscle: muscleSel
    }));
}

/** Restores saved dropdown selections */
function restoreSelections(toolbar) {
    try {
        const saved = JSON.parse(localStorage.getItem('filters') || '{}');
        if (saved.muscle){
            toolbar.querySelector('#filter-muscle').value = saved.muscle

        }     
    } catch (err) {
        console.warn('[filterControls] Corrupt filter data ignored!', err);
    }
}

/** Capitalize first letter */
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
