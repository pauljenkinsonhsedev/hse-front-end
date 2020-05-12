(function(document) {

  
  // Vars
    var header = document.querySelector('.js-header'),
    menu = document.querySelector('.js-menu'),
    menuLocation = document.querySelector('#globalSearch'),
    searchLocation = document.querySelector('.menuContainer'),
    menuButton = document.createElement('a');
    searchBox = document.createElement('div');

    var headerContainer = document.querySelector('#header');



  // Button properties
  menuButton.classList.add('menu-button');
  menuButton.setAttribute('href', '#main-menu');
  menuButton.setAttribute('id', 'menu-button');
  menuButton.setAttribute('aria-label', 'Menu');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-controls', 'menu');
  menuButton.innerHTML = '<span aria-hidden="true"></span>';

  // Search properties
  searchBox.setAttribute('id', 'mobile-search-container');
  searchBox.innerHTML = '<div id="globalSearchMobile"><gcse:searchbox-only></gcse:searchbox-only></div>';
  searchBox.setAttribute('class', 'mobile-gcs-search');

  
  // Menu properties
  menu.setAttribute('aria-hidden', 'true');
  menu.setAttribute('aria-labelledby', 'menu-button');
  
  // Add button to page
  header.append(menuButton, menuLocation);
  headerContainer.insertBefore(searchBox, searchLocation.nextSibling);



  // Handle button click event
  menuButton.addEventListener('click', function () {
    
    // If active...
    if (menu.classList.contains('active')) {
      // Hide
      menu.classList.remove('active');
      menu.setAttribute('aria-hidden', 'true');
      menuButton.setAttribute('aria-expanded', 'false');
    } else {
      // Show
      menu.classList.add('active');
      menu.setAttribute('aria-hidden', 'false');
      menuButton.setAttribute('aria-expanded', 'true');

      // Set focus on first link
      menu.children[0].children[0].children[0].focus();
    }
  }, false);
  
})(document);	
