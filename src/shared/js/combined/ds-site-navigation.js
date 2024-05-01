export function dsSiteNavigation ()  {

const navLinkEls = document.querySelectorAll('.hse-ds-navigation__link');

navLinkEls.forEach(navLinkEl => {
    
    // Get full href of link
    const link = navLinkEl.href;

    // Get first path of page URL
    const firstPath = window.location.pathname.split('/')[1]; 

    // Check if link contains first path of page URL
    if (link.includes(firstPath) === true && firstPath != 'index.htm') {
    navLinkEl.classList.add('hse-ds-navigation__link--active');  
    }

});
   
}

