export function dsSiteNavigation ()  {

const navLinkEls = document.querySelectorAll('.hse-ds-navigation__link');

navLinkEls.forEach(navLinkEl => {
    
    // Get full href of link
    const link = navLinkEl.href;

    // Get paths of page URL
    const firstPath = window.location.pathname.split('/')[1]; 
    const secondPath = window.location.pathname.split('/')[2]; 
    const thirdPath = window.location.pathname.split('/')[3]; 

    // Active links

    // Check if first path of URL is hseonline/website

    if (firstPath === 'website') {
      if (link.includes(thirdPath) === true && thirdPath !== 'index.htm' && thirdPath !== '') {
      navLinkEl.classList.add('hse-ds-navigation__link--active');  
      }
    } 
    // if first path of URL is not hseonline/website
    else {
      if (link.includes(firstPath) === true && firstPath !== 'index.htm') {
      navLinkEl.classList.add('hse-ds-navigation__link--active');  
      }
    }
    
    });
   
}

