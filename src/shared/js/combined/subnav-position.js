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
            console.log('not small');
        } else {
            page.insertBefore(subNav, content.nextSibling);
            console.log('is small');
        }
        console.log('mq', mediaquery);
    }
    posSwitch();
    // watch for window resize
    resizer(posSwitch);
};