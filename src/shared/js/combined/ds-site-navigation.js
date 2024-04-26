export function dsSiteNavigation ()  {

    const navLinkEls = document.querySelectorAll('.hse-ds-navigation__link');

    console.log(navLinkEls);

    navLinkEls.forEach(navLinkEl => {
        
        const link = navLinkEl.getAttribute("href");
        const urlStringPath = window.location.pathname.substring(
            window.location.pathname.lastIndexOf("/") + 1
          );

        if (link === urlStringPath) {
            navLinkEl.classList.add('hse-ds-navigation__link--active');  
        }

    });
   

}

