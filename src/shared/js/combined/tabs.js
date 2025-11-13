import { mediaQuery } from './utils/media-query.js';

export function tabs(container) {
  const mediaquery = mediaQuery();
  const tabTitles = container.querySelectorAll('.hse-tabs__tab');
  const listItems = container.querySelectorAll('.hse-tabs__list-item');
  const tabPanels = container.querySelectorAll('.hse-tabs__panel');

  if (!tabTitles.length) return;

  const tabList = container.querySelector('.hse-tabs__list');
  tabList.setAttribute('role', 'tablist');

  tabTitles.forEach((tab, index) => {
    const href = tab.getAttribute('href');
    const panelId = href.replace('#', '');
    const tabId = tab.getAttribute('id') || `tab-${index + 1}`;

    tab.setAttribute('id', tabId);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panelId);
    tab.setAttribute('tabindex', '-1');
    tab.setAttribute('aria-selected', 'false');

    const panel = container.querySelector(`#${panelId}`);
    if (panel) {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tabId);
    }
  });

  // --- Activate tab helper ---
  function activateTab(index, setFocus = true) {
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

    //  No URL hash update 
  }

  // --- Click activation ---
  tabTitles.forEach((tab, i) => {
    tab.addEventListener('click', e => {
      if (mediaquery !== 'small') e.preventDefault();
      activateTab(i, true);
    });

    // --- Keyboard navigation (Left/Right/Home/End) ---
    tab.addEventListener('keydown', e => {
      const key = e.key;
      let newIndex;

      switch (key) {
        case 'ArrowLeft':
          newIndex = (i - 1 + tabTitles.length) % tabTitles.length;
          activateTab(newIndex, true);
          e.preventDefault();
          break;
        case 'ArrowRight':
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

  // --- Activate from hash on load (deep link support) ---
  const currentHash = window.location.hash?.substring(1);
  const matchIndex = Array.from(tabPanels).findIndex(panel => panel.id === currentHash);

  if (matchIndex !== -1) {
    activateTab(matchIndex, false);
    // Optionally scroll the tab into view if the hash is lower on the page
    tabTitles[matchIndex].scrollIntoView({ block: 'nearest' });
  } else {
    activateTab(0, false);
  }
}
