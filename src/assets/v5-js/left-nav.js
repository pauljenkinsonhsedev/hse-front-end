(function(document) {

'use strict';

// Vars
var navSec = document.querySelector('#navSecondary'),
  content = document.querySelector('#contentContainer'),
  page = document.querySelector('#pageContainer');

  // If page has left navigation

  if ($(navSec).length ) {

  if (window.matchMedia('(max-width: 979px)').matches) {
page.insertBefore(navSec, content.nextSibling);

} else {
  page.insertBefore(navSec, content);
}


window.addEventListener('resize', function () {
	if (window.matchMedia('(max-width: 979px)').matches) {
page.insertBefore(navSec, content.nextSibling);

} else {
  page.insertBefore(navSec, content);
}
}, false);

}

})(document, window);