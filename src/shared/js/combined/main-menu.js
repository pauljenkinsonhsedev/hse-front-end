import { mediaQuery } from './utils/media-query.js';

export function mainMenu(){
  const mediaquery = mediaQuery();
  const header = document.querySelector('.hse-header__top-container');
  const menu = document.querySelector('.js-menu');
  const search = document.querySelector('.js-search');
  const menuLocation = document.querySelector('.hse-header__search');
  const searchLinkLocation = document.querySelector('#main-menu ul');
  const searchListItemLocation = document.querySelector('#main-menu ul').lastChild;
  const menuButton = document.createElement('button');
  const menuListItem = document.createElement('li');

  // Button properties
  menuButton.classList.add('menu-button');
  menuButton.setAttribute('href', '#main-menu');
  menuButton.setAttribute('id', 'menu-button');
  menuButton.setAttribute('aria-label', 'Menu button');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-controls', 'menu');

  menuButton.innerHTML = '<span aria-hidden="true">Menu</span>';

  // Search list item
  // menuListItem.classList.add('search');
  // menuListItem.classList.add('hse-navigation__navigation-link--menu');
  // menuListItem.innerHTML = '<a class="hse-navigation__navigation-link--menu" href="https://www.hse.gov.uk/search/search-results.htm">Search</a>';

  // Menu properties
  if (mediaquery === 'large') {
    menu.setAttribute('aria-hidden', 'true');
  } else {
    menu.setAttribute('aria-hidden', 'false');
  }
  menu.setAttribute('aria-labelledby', 'main-menu');

  // Add button to page
  header.insertBefore(menuButton, menuLocation);

  // Handle button click event
  menuButton.addEventListener('click', function () {

    searchLinkLocation.insertBefore(menuListItem, searchListItemLocation.nextSibling);

    // If active...
    if (menu.classList.contains('active')) {
      // Hide
      search.classList.remove('active');
      menu.classList.remove('active');
      // document.querySelector('#globalSearch').classList.remove('desktop-hide');
      menu.setAttribute('aria-hidden', 'true');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.classList.add('main-menu');
      menuButton.classList.remove('main-menu-expanded');
      menuButton.setAttribute('aria-label', 'Main menu');

    } else {
      // Show
      search.classList.remove('active');
      menu.classList.add('active');
      // document.querySelector('#globalSearch').classList.add('desktop-hide');
      menu.setAttribute('aria-hidden', 'false');
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.classList.add('main-menu-expanded');
      menuButton.setAttribute('aria-label', 'Close menu');

      // Set focus on first link
      // menu.children[0].children[0].children[0].focus();
    }
  }, false);

};
