import { mediaQuery } from './utils/media-query.js';
import resizer from './utils/resizer.js';

export function subNavPosition() {
    const subNav = document.querySelector('#navSecondary');

    if (!subNav) {
      return;
    }

    const content = document.querySelector('#contentContainer');
    const page = document.querySelector('#pageContainer');

    function posSwitch(){
        const mediaquery = mediaQuery();
        if (mediaquery !== 'small') {
            page.insertBefore(subNav, content);
        } else {
           // page.insertBefore(subNav, content.nextSibling);
        }
    }
    posSwitch();
    // watch for window resize
    resizer(posSwitch);
};