import { mediaQuery } from './utils/media-query.js';

export function mainMenu(){
  const mediaquery = mediaQuery();
  const header = document.querySelector('.headerTop');
  const menu = document.querySelector('.js-menu');
  const menuLocation = document.querySelector('#globalSearch');
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

  menuButton.innerHTML = '<span aria-hidden="true"></span>';

  // Search list item
  menuListItem.classList.add('search');
  menuListItem.innerHTML = '<a href="https://www.hse.gov.uk/search/search-results.htm">Search</a>';

  // Menu properties
  if (mediaquery === 'large') {
    menu.setAttribute('aria-hidden', 'false');
  } else {
    menu.setAttribute('aria-hidden', 'true');
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
      menu.classList.remove('active');
      document.querySelector('#globalSearch').classList.remove('desktop-hide');
      menu.setAttribute('aria-hidden', 'true');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.classList.add('main-menu');
      menuButton.classList.remove('main-menu-expanded');
      menuButton.setAttribute('aria-label', 'Main menu');

    } else {
      // Show
      menu.classList.add('active');
      document.querySelector('#globalSearch').classList.add('desktop-hide');
      menu.setAttribute('aria-hidden', 'false');
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.classList.add('main-menu-expanded');
      menuButton.setAttribute('aria-label', 'Close menu');

      // Set focus on first link
      // menu.children[0].children[0].children[0].focus();
    }
  }, false);

};
