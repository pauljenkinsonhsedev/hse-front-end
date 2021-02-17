import Cookies from 'js-cookie';
import { customEventListener } from '../utils/add-custom-event-listener';
import { cookieMessageHTML } from './cookie-banner-html.js';

function setFields (){
    const settingsForm = document.getElementById('cookies-settings');
    const preferences = Cookies.get('cookies_policy');
    const decodedPreferences = window.atob(preferences);
    let choices = JSON.parse(decodedPreferences);

    const fields = settingsForm.querySelectorAll('.input-switch');
    [...fields].forEach((elem)=> {
        const fieldName = elem.name;
        // remember user choices
        if (choices[fieldName] === true) {
            elem.setAttribute('checked', 'checked');
        }
    });
}
function setCookies (preferences) {
    const stringPreferences = JSON.stringify(preferences);
    const encodedPreferences = window.btoa(stringPreferences);
    Cookies.set('cookies_policy', encodedPreferences, {path: '/', domain: 'localhost', secure: false , expires: 365});
    setFields();
}

function setCookiePreferences (data) {
    const preferences = Cookies.get('cookies_policy');
    const decodedPreferences = window.atob(preferences);
    let json = JSON.parse(decodedPreferences);

    const keys = Object.keys(data);
    keys.forEach((key)=> {
        // convert checkbox values to boolean
        if (data[key] === 'off') {
            json[key] = false;
        }
        if (data[key] === 'on') {
            json[key] = true;
        }
    });

    const stringPreferences = JSON.stringify(json);
    const encodedPreferences = window.btoa(stringPreferences);

    Cookies.set('cookies_policy', encodedPreferences, {path: '/', domain: 'localhost', secure: false , expires: 365});
}

export function cookiePreferences () {
    const body = document.getElementsByTagName('body')[0];
    const header = document.getElementById('headerContainer');
    const settingsForm = document.getElementById('cookies-settings');
    const cookiesSet = Cookies.get('cookies_policy');
    const messageContainer = document.createElement('section');
    let message;

    /*
    ------------------------------------
        set banner or field values
    ------------------------------------
    */


    if (!cookiesSet) {
        // set cookie banner when cookies are not set
        message = cookieMessageHTML();
        messageContainer.innerHTML = message;
        body.insertBefore(messageContainer, header);
    } else {
        // set fields when cookies are set
        setFields();
    }

    /*
    ------------------
        set events
    ------------------
    */

    // settings form submit
    const submitForm = () => {
        const outputData = {};
        const formData = new FormData(settingsForm)
        for (var pair of formData.entries()) {
            let key = pair[0];
            let val = pair[1];
            outputData[key] = val;
        }
        setCookiePreferences(outputData);
    }
    settingsForm.addEventListener('submit', function(event){
        event.preventDefault();
        submitForm();
    });

    const choices = document.querySelectorAll('.input-switch');
    choices.forEach(elem => {
        elem.addEventListener('change', function(event){
            event.preventDefault();
            submitForm();
        });
    });

    // close banner
    customEventListener('#cookieNotifyClose', 'click', (event) => {
        event.preventDefault();
        // destroy banner
        messageContainer.remove();
    });

    // accept all
    customEventListener('#acceptAllCookies', 'click' , (event) => {
        event.preventDefault();
        // set cookies
        setCookies({'essential': true, 'cookie-usage-analytics': true, 'cookie-test': true});
        // set message
        messageContainer.innerHTML = cookieMessageHTML('accepted');
    });

    // reject all
    customEventListener('#rejectAllCookies', 'click' , (event) => {
        event.preventDefault();
        // set cookies
        setCookies({'essential': false, 'cookie-usage-analytics': false,  'cookie-test': false});
        // set message
        messageContainer.innerHTML = cookieMessageHTML('rejected');
    });

    // form action select all cookies
    customEventListener('#setAllCookies', 'click' , (event) => {
        event.preventDefault();
        setCookies({'essential': true, 'cookie-usage-analytics': true, 'cookie-test': true});
    });
}

// fn loadGTM
    // Inject GTM if prefs allow





// // Load GTM



// var body = document.querySelector('body'),
// cookieBannerLocation = document.querySelector('header');

// cookieBanner = document.createElement('section');

// cookieBanner.setAttribute('id', 'cookieContainer');

// cookieBanner.innerHTML = '<div id="cookieNotify"><span class="v5-span-heading1">Cookies on HSE website</span><p>We use necessary cookies to make our website work. We also use cookies to collect information about how you use HSE.gov.uk so we can improve our services. You can visit our <a href="https://www.hse.gov.uk/privacy-cookies.htm">cookie privacy page</a> for more information.</p><button class="btn btn-green" id="acceptAllCookies">Hide message</button></div>',

// body.insertBefore(cookieBanner, cookieBannerLocation);




// // Cookie var and values

// var cookiePreferences = 'cookies_preferences_set';

// // Sets essential cookies

// // Creates cookie for policy details and preferences cookie set to true





// // Hide cookie banner if cookie is set

// var cookieSet = Cookies.get('cookies_preferences_set');

// if (cookieSet == 'true') {
// 	$('#cookieContainer').hide();
// }


// Cookie preferences (hse.gov.uk/cookies.htm)


	// // Creates cookie for policy details and preferences cookie set to true





	// $(document).ready(function () {


	// if ( cookiePrefCheck === 'true' || cookiePrefCheck === 'false') {
	//  $('#cookieContainer').addClass('hide-notification');
	// }


    // });


//     var cookieVal = Cookies.get('cookies_policy');

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

// Cookie prefers [hse.gov.uk/cookies.htm]

// Submit form function
// $( "#cookies-settings" ).submit(function( event ) {
//     event.preventDefault(); // Prevents normal form behaviour

//     var dataArray = $("#cookies-settings").serializeArray(), // Creates array of objects

//     dataObj = {};
//     $(dataArray).each(function(i, field){
//         const fieldValue = field.value;
//         let value;
//         if (fieldValue === 'on') { // make values boolean
//             value = true;
//         } else if (fieldValue === 'off') {
//             value = false;
//         } else {
//             value = fieldValue;
//         }
//         dataObj[field.name] = value;
//     });

//     var analytics = dataObj['cookie-usage-analytics'];

//     var preferences = {
//         'essential':true,
//         'usage': analytics,
//         'campaigns':false,
//         'settings':false
//     };

//     console.log('preferences',preferences);
//     var stringPreferences = JSON.stringify(preferences);
//     var encodedPreferences = window.btoa(stringPreferences);

//     Cookies.set(cookiePolicy, encodedPreferences, {path: '/', domain: '.localhost', secure: false , expires: 365})
// });

// // On click handling
// $(document).ready(function () {
//     // If user accepts all cookies (Cookie banner) while on cookie preferences page

//     // Checks cookie preferences and sets radio buttons
//     // Analytics
//     if (usageSet == true ) {
//         document.getElementById('cookie-usage-analytics').checked = 'checked';
//     }
// });