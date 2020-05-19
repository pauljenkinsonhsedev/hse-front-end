(function(document) {

  // Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/prepend()/prepend().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

  
  // Vars
  var header = document.querySelector('.js-header'),
  headerContainer = document.querySelector('#header');
  menu = document.querySelector('.js-menu'),
  menuLocation = document.querySelector('#globalSearch'),
  searchLocation = document.querySelector('.menuContainer nav ul'),
  menuButton = document.createElement('button'),
  menuListItem = document.createElement('li'),

  headerTop = document.querySelector('.headerTop'),


  // Button properties
  menuButton.classList.add('menu-button');
  menuButton.setAttribute('href', '#main-menu');
  menuButton.setAttribute('id', 'menu-button');
  menuButton.setAttribute('aria-label', 'Main menu');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-controls', 'menu');
  menuButton.innerHTML = '<span aria-hidden="true"></span>';

  // Search list item
  menuListItem.classList.add('search');
  menuListItem.innerHTML = '<a href="/search/index.htm">Search</a>';

  // Menu properties
  menu.setAttribute('aria-hidden', 'true');
  menu.setAttribute('aria-labelledby', 'menu-button');
  
  // Add button to page
  header.append(menuButton, menuLocation);
  //headerContainer.insertBefore(searchBox, searchLocation.nextSibling);

  // Handle button click event
  menuButton.addEventListener('click', function () {

    searchLocation.append(menuListItem);

    
    // If active...
    if (menu.classList.contains('active')) {
      // Hide
      menu.classList.remove('active');
      $('#globalSearch').removeClass('desktop-hide');
      menu.setAttribute('aria-hidden', 'true');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.classList.add('main-menu');
      menuButton.classList.remove('main-menu-expanded');

    } else {
      // Show
      menu.classList.add('active');
      $('#globalSearch').addClass('desktop-hide');
      menu.setAttribute('aria-hidden', 'false');
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.removeAttribute('aria-label', 'Main menu');
      menuButton.classList.add('main-menu-expanded');
      menuButton.setAttribute('aria-label', 'Close menu');
      
      // Set focus on first link
      menu.children[0].children[0].children[0].focus();
    }
  }, false);
  
})(document);	
