// main-menu.js

export function mainMenu() {
  const header = document.querySelector('.hse-header__top-container');
  const menu = document.querySelector('.js-menu');
  const search = document.querySelector('.js-search');

  // Menu Button
  const menuButton = createButton({
    className: 'global-menu-button',
    id: 'menu-button',
    ariaLabel: 'Menu button',
    innerHTML: '<span aria-hidden="true">Menu</span>',
    ariaExpanded: false,
    ariaControls: 'menu'
  });

  // Search Button
  const searchButton = createButton({
    className: 'search-button',
    id: 'search-button',
    ariaLabel: 'Search button',
    innerHTML: `<div class="search-container">
  <!-- Search icon -->
  <svg class="search-icon" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <title>search</title>
    <circle cx="12.0161" cy="11.0161" r="8.51613" stroke="currentColor" stroke-width="3"></circle>
    <line x1="17.8668" y1="17.3587" x2="26.4475" y2="25.9393" stroke="currentColor" stroke-width="3"></line>
  </svg>

  <!-- X mark -->
  <span class="x-mark">&times;</span>

  <!-- Underline (optional) -->
  <span class="underline"></span>

  <!-- Google Search button -->
  <div class="gsc-search-button gsc-search-button-v2 gsc"></div>
</div>
`,
    ariaExpanded: false,
    ariaControls: 'search'
  });

  // Append buttons to the header
  header.appendChild(menuButton);
  header.appendChild(searchButton);

  // Toggle Menu Function
  function toggleMenu() {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    menu.classList.toggle('active', !isExpanded);
    menu.setAttribute('aria-hidden', isExpanded);
    menuButton.classList.toggle('main-menu-expanded', !isExpanded);

    // Close search when opening the menu
    if (!isExpanded) {
      closeSearch();
    }
  }

  // Toggle Search Function
  function toggleSearch() {
    const isSearchExpanded = searchButton.getAttribute('aria-expanded') === 'true';
    searchButton.setAttribute('aria-expanded', !isSearchExpanded);
    search.classList.toggle('active', !isSearchExpanded);
    search.setAttribute('aria-hidden', isSearchExpanded);
    searchButton.classList.toggle('main-search-expanded', !isSearchExpanded);

    // Close menu when opening the search
    if (!isSearchExpanded) {
      closeMenu();
    }
  }

  // Helper Functions
  function closeSearch() {
    search.classList.remove('active');
    search.setAttribute('aria-hidden', 'true');
    searchButton.setAttribute('aria-expanded', 'false');
    searchButton.classList.remove('main-search-expanded');
  }

  function closeMenu() {
    menu.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.classList.remove('main-menu-expanded');
    menu.setAttribute('aria-hidden', 'true');
  }

  // Add event listeners for toggling menu and search
  menuButton.addEventListener('click', toggleMenu);
  searchButton.addEventListener('click', toggleSearch);

  // Handle keyboard interactions (Enter and Tab)
  menuButton.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      toggleMenu();
    }

    // Handle Tab to move focus to the first list-item only after expansion
    if (event.key === 'Tab' && !event.shiftKey && menuButton.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      const firstListItem = document.querySelector('#main-menu ul li:first-child a');
      firstListItem && firstListItem.focus();
    }
  });

  searchButton.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      toggleSearch();
    }
  });

  // Focus Management
  const firstListItem = document.querySelector('#main-menu ul li:first-child a');
  const thirdUl = document.querySelectorAll('#main-menu ul')[3]; // Index 3 for the fourth ul
  const lastListItem = thirdUl.querySelector('li:last-child a');
  const findOutMoreButton = document.querySelector('a.button[aria-label=""]');

  // Handle focus with Tab
  lastListItem.addEventListener('keydown', function (event) {
    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault();
      searchButton.focus();
      toggleMenu(); // Close menu on tabbing to search
    }
  });

  // Shift+Tab to move back to menu button from first list-item
  firstListItem.addEventListener('keydown', function (event) {
    if (event.key === 'Tab' && event.shiftKey) {
      event.preventDefault();
      menuButton.focus();
    }
  });


// Wait for Google CSE input and attach SVG magnifying glass
// -------------------------------
// Google CSE SVG Integration
// -------------------------------

function attachSearchSVG() {
  const input = document.querySelector('.gsc-input');
  const form = document.querySelector('form.gsc-search-box');

  if (!input || !form) return false;

  // Prevent duplicate binding
  if (input.dataset.svgBound === "true") return true;
  input.dataset.svgBound = "true";

  // Wrap input
  // const wrapper = document.createElement('div');
  // wrapper.className = 'search-wrapper';
  // input.parentNode.insertBefore(wrapper, input);
  // wrapper.appendChild(input);

  // Create SVG
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "search-icon");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.style.cursor = "pointer";

  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", "11");
  circle.setAttribute("cy", "11");
  circle.setAttribute("r", "8");
  circle.setAttribute("stroke", "currentColor");
  circle.setAttribute("stroke-width", "2");
  circle.setAttribute("fill", "none");

  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", "16");
  line.setAttribute("y1", "16");
  line.setAttribute("x2", "22");
  line.setAttribute("y2", "22");
  line.setAttribute("stroke", "currentColor");
  line.setAttribute("stroke-width", "2");

  svg.appendChild(circle);
  svg.appendChild(line);
  wrapper.appendChild(svg);

  // Run Google search properly
function runSearch() {
  if (!input.value.trim()) return;

  const googleButton = document.querySelector('.gsc-search-button');
  if (googleButton) {
    googleButton.click();
  }
}


  // Click on SVG
  svg.addEventListener('click', (e) => {
    e.preventDefault();
    runSearch();
  });

  // Override Enter key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runSearch();
    }
  });

  return true;
}

function appendMenuSearchSVG() {
  const menuInput = document.querySelector('.js-search input.gsc-input'); // your menu search input
  if (!menuInput) return;

  // Prevent duplicate
  if (document.querySelector('.menu-search-svg')) return;

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "menu-search-svg");
  svg.setAttribute("viewBox", "0 0 27 27");
  svg.setAttribute("aria-hidden", "true");
  svg.style.cursor = "pointer";

  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", "12.0161");
  circle.setAttribute("cy", "11.0161");
  circle.setAttribute("r", "8.51613");
  circle.setAttribute("stroke", "currentColor");
  circle.setAttribute("stroke-width", "3");
  circle.setAttribute("fill", "none");

  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", "17.8668");
  line.setAttribute("y1", "17.3587");
  line.setAttribute("x2", "26.4475");
  line.setAttribute("y2", "25.9393");
  line.setAttribute("stroke", "currentColor");
  line.setAttribute("stroke-width", "3");

  svg.appendChild(circle);
  svg.appendChild(line);

  // Wrap input in relative container to position SVG
  const wrapper = document.createElement('div');
  wrapper.className = 'menu-search-wrapper';
  menuInput.parentNode.insertBefore(wrapper, menuInput);
  wrapper.appendChild(menuInput);
  wrapper.appendChild(svg);

  // Click triggers Google search
  svg.addEventListener('click', () => {
    if (!menuInput.value.trim()) return;
    const googleButton = document.querySelector('.gsc-search-button');
    if (googleButton) googleButton.click();
  });
}


// Wait for Google to inject search box
const observer = new MutationObserver(() => {
  if (attachSearchSVG()) observer.disconnect();
});

observer.observe(document.body, { childList: true, subtree: true });



}

// Helper function to create buttons
function createButton({ className, id, ariaLabel, innerHTML, ariaExpanded, ariaControls }) {
  const button = document.createElement('button');
  button.classList.add(className);
  button.setAttribute('id', id);
  button.setAttribute('aria-label', ariaLabel);
  button.setAttribute('aria-expanded', ariaExpanded);
  button.setAttribute('aria-controls', ariaControls);
  button.innerHTML = innerHTML;
  return button;
}
