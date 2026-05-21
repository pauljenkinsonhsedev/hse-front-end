export function sideNavDesign ()  {

    const navLinkEls = document.querySelectorAll('.hse-design-side-navigation__item a');

    navLinkEls.forEach(navLinkEl => {

        const link = navLinkEl.getAttribute("href");
        const urlStringPath = window.location.pathname.substring(
            window.location.pathname.lastIndexOf("/") + 1
          );

        if (link === urlStringPath) {
            navLinkEl.parentNode.classList.add('hse-design-side-navigation__item--active');
        }

    });


}

