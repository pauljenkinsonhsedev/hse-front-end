import Cookies from 'js-cookie';
import { customEventListener } from '../utils/add-custom-event-listener';

   const setCookiesSettings = { path: '/', domain: 'hse.gov.uk', secure: true, sameSite: 'strict', expires: 1};
// const setCookiesSettings = { path: '/', domain: 'beta.hse.gov.uk', secure: true, sameSite: 'strict', expires: 1};
// const setCookiesSettings = { path: '/', domain: 'localhost', secure: false, sameSite: 'strict', expires: 1};

// So we can access Cookies inline for Analytics in the HTML
window.Cookies = Cookies;

export function notificationBanner() {
    const globalSet = Cookies.get('global_banner');
    fetch('/assets/ajax/global-message.json')
    .then((response) => response.json())
    .then((data) => {
        const active = data.active;
        const message = data.message;

        if (active === 'true' && globalSet !== 'true') {

            const headerContainer = document.querySelector('#headerContainer'),
            globalBannerLocation = document.querySelector('#header'),
            globalNotification = document.createElement('div');
            globalNotification.setAttribute('id', 'global-notification-banner');
            globalNotification.classList.add('hse-notification-banner');
            globalNotification.classList.add('global');
            globalNotification.innerHTML = '<div class="hse-notification-banner__container hse-width-container"><div class="hse-notification-banner__text hse-u-reading-width">' + message + '</div>' + '<div class="hse-notification-banner__button"><button class="notification-hide hse-button hse-button--transparent">Hide&nbsp;message</button></a></div>';

            headerContainer.insertBefore(globalNotification, globalBannerLocation.nextSibling);

            customEventListener('.notification-hide', 'click', (event) => {
                event.preventDefault();
                Cookies.set('global_banner', 'true' , setCookiesSettings);
                globalNotification.parentNode.removeChild(globalNotification);
            });
        }
    });

    const notificationBannerCookie = Cookies.get('notification_banner');
    const notificationBanner = document.getElementById('global-notification-banner');

    if ( notificationBannerCookie === 'yes') {
        notificationBanner.classList.add('hide-notification');
    }
}
