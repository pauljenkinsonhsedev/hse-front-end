
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

    load.jsHead('./assets/v5-js/gtm-anti-flicker.js');
    load.jsHead('./assets/v5-js/gtm.js');
    load.css('./assets/v5-css/vendor/gtm.css');

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

// var cookieVal = Cookies.get('cookies_policy');

// const decodedCookieVal = window.atob(cookieVal);

// const obj = JSON.parse(decodedCookieVal);

// // Assigns variables to cookies values
// var usageSet = (obj.usage);
// // var campaignsSet = (obj.campaigns);
// // var settingsSet = (obj.settings);
// // console.log('settingsSet',settingsSet);

// // When DOM is ready, create function for dynamically loading GTM scripts

// function gtmFunction() {
//     // Function adds script

//     // Get the first script element on the page
//     var ref = document.getElementsByTagName( 'head' )[0];

//     // Create a new script element
//     var gtm = document.createElement( 'script' );

//     // Set attributes
//     gtm.setAttribute("id", "gtm");

//     // Set the script element `src`
//     gtm.src = 'https://www.hse.gov.uk/assets/v5-js/gtm.js';

//     // Inject the script into the DOM

//     // ref.insertBefore( gtmAsync, ref.childNodes[0] );
//     ref.insertBefore( gtm, ref.childNodes[0] );

//     $('head').prepend('<style id="gtm-async-hide">.async-hide { opacity: 0 !important} </style>');
//     $('body').prepend('<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJPWMNL" height="0" width="0" style="display:none;visibility:hidden" aria-hidden="true"></iframe></noscript>');
// }

// $( document ).ready(function() {


//     $('#acceptAllCookies').click(function() {
//         // Call function on accept all cookies button (Cookie preferences banner)
//         gtmFunction();
//     });

// // Checks to see if analytics preference is set to true

//     if (usageSet == true )  {
//         // Call function on accept all cookies button (Cookie preferences banner)
//         gtmFunction();
//     }  else { // If analytics preference is set to false - delete all GTM cookies
//         Cookies.remove('_ga');
//         Cookies.remove('_gid');
//         Cookies.remove('_gali');
//         Cookies.remove('_dc_gtm_UA-324220-1');
//         Cookies.remove('_gat_UA-324220-1');
//         Cookies.remove('_ga_1Y6RD6YT11');
//         Cookies.remove('nmstat'); // Site Improve cookie - invoked by Google Analytics
//     }

// });