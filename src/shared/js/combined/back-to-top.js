export function backToTop() {

    var backToTop = document.querySelector('.hse-back-to-top__container');
    var backToTopHook = document.querySelector('.hse-back-to-top');
    var contents = document.querySelector('.hse-contents-list');

    // visually hides back-to-top link if there is not contents list
    if(!contents) {
    backToTopHook.classList.add("visually-hidden");
    }

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

    // get element’s position within the viewport

    const position = backToTopHook.getBoundingClientRect();

    // hide if back-to-top link in view or above viewport

    if(position.top <= window.innerHeight) {
    backToTop.classList.add("hse-back-to-top--hide");
    backToTop.classList.remove("hse-back-to-top--fixed");
    } else {
    // do nothing
    }    
   
});

}



