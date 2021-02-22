import Cookies from 'js-cookie';
import { customEventListener } from '../utils/add-custom-event-listener';
import { cookieMessageHTML } from './cookie-banner-html.js';
import { cookiesGTM } from './cookie-gtm.js';

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
    Cookies.set('cookies_policy', encodedPreferences, {path: '/', domain: 'beta.hse.gov.uk', secure: true , expires: 365});
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
            Cookies.set('optInGoogleTracking', true);
            cookiesGTM(true);
        } else {
            Cookies.set('optInGoogleTracking', false);
            cookiesGTM(false);
        }
    }
}

export function cookiePreferences() {
    Cookies.set('optInGoogleTracking', false);

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
        }
        settingsForm.addEventListener('submit', function(event){
            event.preventDefault();
            setFields();
            submitForm();
        });

        const choices = document.querySelectorAll('.input-switch');
        choices.forEach(elem => {
            elem.addEventListener('change', function(event){
                event.preventDefault();
                submitForm();
            });
        });
    }

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
        setCookiePreferences({'cookie-essential': true, 'cookie-usage-analytics': true});
        controlAnalytics();

        // set message
        messageContainer.innerHTML = cookieMessageHTML('accepted');
    });

    // reject all
    customEventListener('#rejectAllCookies', 'click' , (event) => {
        event.preventDefault();
        // set cookies
        setCookiePreferences({'cookie-essential': true, 'cookie-usage-analytics': false});
        controlAnalytics();
        setFields();

        // set message
        messageContainer.innerHTML = cookieMessageHTML('rejected');
    });

    // form action select all cookies
    customEventListener('#setAllCookies', 'click' , (event) => {
        event.preventDefault();
        setFields();
        setCookiePreferences({'cookie-essential': true, 'cookie-usage-analytics': true});
    });
}
