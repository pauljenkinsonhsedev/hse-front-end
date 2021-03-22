import Cookies from 'js-cookie';
import { customEventListener } from '../utils/add-custom-event-listener';
import { cookieMessageHTML } from './cookie-banner-html.js';
import { dialogModalAjax } from '../dialogs.js';
import { smoothScroll } from '../utils/smooth-scroll';

// const setCookieSettings = { path: '/', domain: 'hse.gov.uk', secure: true, sameSite: 'strict', expires: 365 };
// const setCookieSettings = { path: '/', domain: 'beta.hse.gov.uk', secure: true, sameSite: 'strict', expires: 365 };
const setCookieSettings = { path: '/', domain: 'localhost', secure: false, sameSite: 'strict', expires: 365 };

// So we can access Cookies inline for Analytics in the HTML
window.Cookies = Cookies;

function setFields() {
    const preferences = Cookies.get('cookies_policy');
    const settingsForm = document.getElementById('cookies-settings');

    if (settingsForm && preferences) {
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
}

function setCookiePreferences(preferences) {
    const keys = Object.keys(preferences);
    keys.forEach((key)=> {
        // convert checkbox values to boolean
        if (preferences[key] === 'off') {
            preferences[key] = false;
        }
        if (preferences[key] === 'on') {
            preferences[key] = true;
        }
    });
    const stringPreferences = JSON.stringify(preferences);
    const encodedPreferences = window.btoa(stringPreferences);
    Cookies.set('cookies_policy', encodedPreferences, setCookieSettings);
    setFields();
}

function controlAnalytics() {
    // set unset GA
    const preferences = Cookies.get('cookies_policy');
    if (preferences) {
        const decodedPreferences = window.atob(preferences);
        const json = JSON.parse(decodedPreferences);
        const gaSettings = json['cookie-usage-analytics'];

        if (gaSettings === true) {
            Cookies.set('optInGoogleTracking', true, setCookieSettings);
        } else {
            Cookies.set('optInGoogleTracking', false, setCookieSettings);
            Cookies.remove('_ga', setCookieSettings);
            Cookies.remove('_gid', setCookieSettings);
            Cookies.remove('_gali', setCookieSettings);
            Cookies.remove('_dc_gtm_UA-324220-1', setCookieSettings);
            Cookies.remove('_gat_UA-324220-1', setCookieSettings);
            Cookies.remove('_ga_1Y6RD6YT11', setCookieSettings);
            Cookies.remove('nmstat', setCookieSettings); // Site Improve cookie - invoked by Google Analytics
        }
    }
}

function formFeedback() {
    const dialog = document.createElement('div');
    dialog.className = 'dialog dialog-generic';
    const content = `<div class="dialog__copy">
        <h2>Your cookie settings were saved</h2>
        <p>Some HSE digital services may set additional cookies and, if so, will have their own cookie policy and banner.</p>
        </div>
        <div class="dialog__actions">
        <button class="btn btn-cautionary close-action">Close</button>
    </div>`;
    dialog.innerHTML = content;

    const options = {
        size: 'small',
        transition: true,
        overlay: true
    };
    dialogModalAjax(dialog, options);
}

export function cookiePreferences() {
    Cookies.set('optInGoogleTracking', false, setCookieSettings);

    const body = document.getElementsByTagName('body')[0];
    const header = document.getElementById('headerContainer');
    const settingsForm = document.getElementById('cookies-settings');
    const cookiesSet = Cookies.get('cookies_policy');
    const cookieStatus = Cookies.get('cookies_status');
    const messageContainer = document.createElement('section');

    messageContainer.setAttribute('id', 'cookie-message');
    messageContainer.setAttribute('aria-label', 'Cookie message');

    let message;
    /*
    ------------------------------------
        set banner or field values
    ------------------------------------
    */
    const hideBanner = Cookies.get('hide_banner');

    if (!hideBanner || hideBanner === false) {
        message = cookieMessageHTML();
        messageContainer.innerHTML = message;
        body.insertBefore(messageContainer, header);
    }

    if (!cookiesSet) {
        // set cookie banner when cookies are not set


    } else {
        // set analytics
        controlAnalytics();
        // set fields when cookies are set
        setFields();
    }

    /*
    ------------------
        set events
    ------------------
    */

    // settings form submit
    if (settingsForm) {
        const submitForm = () => {
            const outputData = {};
            const formData = new FormData(settingsForm)
            for (var pair of formData.entries()) {
                let key = pair[0];
                let val = pair[1];
                outputData[key] = val;
            }
            setCookiePreferences(outputData);
            controlAnalytics();
            // reload to capture tracking on page this form lives
            const hideBanner = Cookies.get('hide_banner');

            console.log(outputData['cookie-usage-analytics']);

            if (hideBanner === undefined) {
                console.log('should scroll');
                smoothScroll('body', 1000);
                setTimeout(()=> {
                    window.location.reload();
                }, 1001);
            } else {
                setTimeout(()=> {
                    window.location.reload();
                }, 10);
            }
        };

        settingsForm.addEventListener('submit', function(event){
            event.preventDefault();
            setFields();
            submitForm();
            // formFeedback();
        });

        const choices = document.querySelectorAll('.input-switch');
        choices.forEach(elem => {
            elem.addEventListener('change', function(event){
                event.preventDefault();

                if (elem.id === 'cookie-usage-analytics') {
                    if (event.target.checked === true) {
                        Cookies.set('cookies_status', 'accepted', setCookieSettings);
                    } else {
                        Cookies.set('cookies_status', 'rejected', setCookieSettings);
                    }
                }

                submitForm();
            });
        });
    }

    // close banner
    customEventListener('#cookieNotifyClose', 'click', (event) => {
        event.preventDefault();
        // destroy banner
        Cookies.set('hide_banner', true, setCookieSettings);
        messageContainer.remove();
    });

    // accept all
    customEventListener('#acceptAllCookies', 'click' , (event) => {
        event.preventDefault();

        // set cookies
        setCookiePreferences({'cookie-essential': true, 'cookie-usage-analytics': true});
        controlAnalytics();
        // set message

        Cookies.set('cookies_status', 'accepted', setCookieSettings);
        messageContainer.innerHTML = cookieMessageHTML();

        // reload to capture tracking
        window.location.reload();
    });

    // reject all
    customEventListener('#rejectAllCookies', 'click' , (event) => {
        event.preventDefault();
        // set cookies
        setCookiePreferences({'cookie-essential': true, 'cookie-usage-analytics': false});
        controlAnalytics();

        // set message
        Cookies.set('cookies_status', 'rejected', setCookieSettings);
        messageContainer.innerHTML = cookieMessageHTML();

        // reload to capture tracking
        window.location.reload();

    });

    // form action select all cookies
    customEventListener('#setAllCookies', 'click' , (event) => {
        event.preventDefault();
        setCookiePreferences({'cookie-essential': true, 'cookie-usage-analytics': true});
        controlAnalytics();
        formFeedback();

        Cookies.set('cookies_status', 'accepted', setCookieSettings);
        messageContainer.innerHTML = cookieMessageHTML();

        // reload to capture tracking
        window.location.reload();
    });





    
}
