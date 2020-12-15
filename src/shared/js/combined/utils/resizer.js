/*

Resizer

Description:
Simple resizer function that listens to when a screen is resized and performs a function passed to it. For example a phone is rotated from portrait to landscape.

Usage:

    import resizer from '../utils/resizer.js';

    const myFunction = () => {
        const myDiv = document.querySelector('.myDiv');
        const breakpointSmall = 375;

        if (myDiv.clientWidth <= breakpointSmall) {
            alert('this is a small screen!');
        }
    }

    resizer(myFunction);
*/

const debounce = (func, wait, immediate) => {
    var timeout;
    return () => {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const resizer = (fn) => {
    window.addEventListener('resize', debounce(() => fn(), 200, false), false);
};

export default resizer;