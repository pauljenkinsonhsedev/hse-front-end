export function backToTop() {

    var backToTop = document.querySelector('.hse-back-to-top__container');
    var backToTopHook = document.querySelector('.hse-back-to-top');

    // get aside content
    let aside = document.querySelector('#contentAside');

    // move above aside content

    if(aside) {
    aside.before(backToTopHook);
    backToTop.classList.add("hse-back-to-top--above-aside");
    }

    // listen for scroll

    window.addEventListener('scroll', function() {
    let scroll = window.scrollY;
    if (scroll > 1000) {
    backToTop.classList.add("hse-back-to-top--fixed");
    backToTop.classList.remove("hse-back-to-top--hide");
    } else {
    backToTop.classList.remove("hse-back-to-top--fixed");
    }

    // check if back-to-top link in view

    const position = backToTopHook.getBoundingClientRect();

    if(position.top >= 0 && position.bottom <= window.innerHeight) {
    backToTop.classList.add("hse-back-to-top--hide");
    backToTop.classList.remove("hse-back-to-top--fixed");
    } else {
    // do nothing
    }    
    
});

}




