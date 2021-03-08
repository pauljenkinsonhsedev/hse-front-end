
import load from '../utils/asset-loader';
import Cookies from 'js-cookie';

function addGTM() {
    // no longer required. Now in the html
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
