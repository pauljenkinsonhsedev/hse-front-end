import { mediaQuery } from './utils/media-query.js';

export function mainSearch(){
  const mediaquery = mediaQuery();
  const menu = document.querySelector('.js-menu');
  const header = document.querySelector('.hse-header__top-container');
  const search = document.querySelector('.js-search');
  const searchLocation = document.querySelector('.hse-header__search');
  const searchLinkLocation = document.querySelector('#main-search ul');
  const searchListItemLocation = document.querySelector('#main-search ul').lastChild;
  const searchButton = document.createElement('button');
  const searchListItem = document.createElement('li');

  // Button properties
  searchButton.classList.add('search-button');
  searchButton.setAttribute('href', '#main-search');
  searchButton.setAttribute('id', 'search-button');
  searchButton.setAttribute('aria-label', 'Search button');
  searchButton.setAttribute('aria-expanded', 'false');
  searchButton.setAttribute('aria-controls', 'search');

  searchButton.innerHTML = '<div class="gsc-search-button gsc-search-button-v2 gsc"><svg width="13" height="13" viewBox="0 0 13 13"><title>search</title><path d="m4.8495 7.8226c0.82666 0 1.5262-0.29146 2.0985-0.87438 0.57232-0.58292 0.86378-1.2877 0.87438-2.1144 0.010599-0.82666-0.28086-1.5262-0.87438-2.0985-0.59352-0.57232-1.293-0.86378-2.0985-0.87438-0.8055-0.010599-1.5103 0.28086-2.1144 0.87438-0.60414 0.59352-0.8956 1.293-0.87438 2.0985 0.021197 0.8055 0.31266 1.5103 0.87438 2.1144 0.56172 0.60414 1.2665 0.8956 2.1144 0.87438zm4.4695 0.2115 3.681 3.6819-1.259 1.284-3.6817-3.7 0.0019784-0.69479-0.090043-0.098846c-0.87973 0.76087-1.92 1.1413-3.1207 1.1413-1.3553 0-2.5025-0.46363-3.4417-1.3909s-1.4088-2.0686-1.4088-3.4239c0-1.3553 0.4696-2.4966 1.4088-3.4239 0.9392-0.92727 2.0864-1.3969 3.4417-1.4088 1.3553-0.011889 2.4906 0.45771 3.406 1.4088 0.9154 0.95107 1.379 2.0924 1.3909 3.4239 0 1.2126-0.38043 2.2588-1.1413 3.1385l0.098834 0.090049z" fill="#9f2447"></path></svg><span class="x-mark"> x </span></div>';
  
  // Search list item
  searchListItem.classList.add('search');
  searchListItem.classList.add('hse-navigation__navigation-link--menu');
  // menuListItem.innerHTML = '<a class="hse-navigation__navigation-link--menu" href="https://www.hse.gov.uk/search/search-results.htm">Search</a>';

  // Search properties
  if (mediaquery === 'large') {
    search.setAttribute('aria-hidden', 'true');
  } else {
    search.setAttribute('aria-hidden', 'false');
  }
  search.setAttribute('aria-labelledby', 'main-search');

  // Add button to page
  header.insertBefore(searchButton, searchLocation);

  // Handle button click event
  searchButton.addEventListener('click', function () {

    searchLinkLocation.insertBefore(searchListItem, searchListItemLocation.nextSibling);

    // If active...
    if (search.classList.contains('active')) {
      // Hide
      search.classList.remove('active');
      menu.classList.remove('active');
      // document.querySelector('#globalSearch').classList.remove('desktop-hide');
      search.setAttribute('aria-hidden', 'true');
      searchButton.setAttribute('aria-expanded', 'false');
      searchButton.classList.add('main-search');
      searchButton.classList.remove('main-search-expanded');
      searchButton.setAttribute('aria-label', 'Main search');

    } else {
      // Show
      search.classList.add('active');
      menu.classList.remove('active');
      // document.querySelector('#globalSearch').classList.add('desktop-hide');
      search.setAttribute('aria-hidden', 'false');
      searchButton.setAttribute('aria-expanded', 'true');
      searchButton.classList.add('main-search-expanded');
      searchButton.setAttribute('aria-label', 'Close search');

      // Set focus on first link
      // menu.children[0].children[0].children[0].focus();
    }
  }, false);

};
