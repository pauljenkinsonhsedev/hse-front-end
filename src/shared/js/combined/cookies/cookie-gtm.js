
import load from '../utils/asset-loader';
import Cookies from 'js-cookie';

function addGTM() {
    const gtmID = 'GTM-PJPWMNL';

    const body = document.getElementsByTagName('body')[0];
    const noscript = document.createElement('noscript');
    const frame = document.createElement('frame');
    frame.src = `https://www.googletagmanager.com/ns.html?id=${gtmID}`;
    frame.style.display = 'none';
    frame.style.visibility = 'hidden';
    frame.style.width = '0px';
    frame.style.height = '0px';
    frame.ariaHidden = true;
    noscript.appendChild(frame);

    body.insertBefore(noscript, body.childNodes[0]);

    load.css('./assets/v5-css/vendor/gtm.css');
    load.jsHead('./assets/v5-js/gtm-anti-flicker.js');
    load.jsHead('./assets/v5-js/gtm.js');

}

function removeGTM() {
    Cookies.remove('_ga');
    Cookies.remove('_gid');
    Cookies.remove('_gali');
    Cookies.remove('_dc_gtm_UA-324220-1');
    Cookies.remove('_gat_UA-324220-1');
    Cookies.remove('_ga_1Y6RD6YT11');
    Cookies.remove('nmstat'); // Site Improve cookie - invoked by Google Analytics
}

export function cookiesGTM(status) {
    if (status === true) {
        addGTM();
    } else {
        removeGTM();
    }
}
