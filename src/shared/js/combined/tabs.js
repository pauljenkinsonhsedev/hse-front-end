import { mediaQuery } from './utils/media-query.js';

export function tabs(container) {
  const mediaquery = mediaQuery();
  const tabTitles = container.querySelectorAll('.hse-tabs__tab');
  const listItems = container.querySelectorAll('.hse-tabs__list-item');
  const tabPanels = container.querySelectorAll('.hse-tabs__panel');

  if (!tabTitles.length) return;

  // --- Setup ARIA roles and relationships ---
  container.querySelector('.hse-tabs__list').setAttribute('role', 'tablist');

  tabTitles.forEach((tab, index) => {
    const panelId = tab.getAttribute('href').replace('#', '');
    const tabId = tab.getAttribute('id') || `tab-${index + 1}`;
    tab.setAttribute('id', tabId);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panelId);
    tab.setAttribute('tabindex', '-1');
    tab.setAttribute('aria-selected', 'false');

    const panel = tabPanels[index];
    if (panel) {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tabId);
    }
  });

  // --- Helper: activate tab ---
  function activateTab(index, setFocus = true, updateHash = true) {
    listItems.forEach(li => li.classList.remove('hse-tabs__list-item--selected'));
    tabPanels.forEach(panel => panel.classList.add('hse-tabs__panel--hidden'));
    tabTitles.forEach(tab => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });

    listItems[index].classList.add('hse-tabs__list-item--selected');
    tabPanels[index].classList.remove('hse-tabs__panel--hidden');
    tabTitles[index].setAttribute('aria-selected', 'true');
    tabTitles[index].setAttribute('tabindex', '0');

    if (setFocus) tabTitles[index].focus();

    // Update URL hash for deep linking
    if (updateHash) {
      const panelId = tabTitles[index].getAttribute('href');
      history.replaceState(null, '', panelId);
    }
  }

  // --- Click activation ---
  tabTitles.forEach((tab, i) => {
    tab.addEventListener('click', e => {
      if (mediaquery !== 'small') e.preventDefault();
      activateTab(i, true);
    });

    // --- Keyboard navigation ---
    tab.addEventListener('keydown', e => {
      const key = e.key;
      let newIndex;

      switch (key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          newIndex = (i - 1 + tabTitles.length) % tabTitles.length;
          activateTab(newIndex, true);
          e.preventDefault();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          newIndex = (i + 1) % tabTitles.length;
          activateTab(newIndex, true);
          e.preventDefault();
          break;
        case 'Home':
          activateTab(0, true);
          e.preventDefault();
          break;
        case 'End':
          activateTab(tabTitles.length - 1, true);
          e.preventDefault();
          break;
      }
    });
  });

  // --- On load: activate tab from hash if present ---
  const currentHash = window.location.hash?.substring(1);
  const matchIndex = Array.from(tabPanels).findIndex(panel => panel.id === currentHash);

  if (matchIndex !== -1) {
    activateTab(matchIndex, false, false);
  } else {
    activateTab(0, false, false);
  }
}
