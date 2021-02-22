import Cookies from 'js-cookie';
import { customEventListener } from '../utils/add-custom-event-listener';

// So we can access Cookies inline for Analytics in the HTML
window.Cookies = Cookies;

export function notificationBanner() {
    const globalSet = Cookies.get('global_banner');
    fetch('/ajax/global-message.json')
    .then((response) => response.json())
    .then((data) => {
        const active = data.active;
        const message = data.message;

        if (active === 'true' && globalSet !== 'true') {

            const headerContainer = document.querySelector('#headerContainer'),
            globalBannerLocation = document.querySelector('#header'),
            globalNotification = document.createElement('div');
            globalNotification.setAttribute('id', 'global-notification-banner');
            globalNotification.classList.add('notification-banner');
            globalNotification.classList.add('global');
            globalNotification.innerHTML = '<div class="notification-container fixed-container">' + message + '<button class="notification-hide btn btn-small btn-important">Hide&nbsp;message</a></button>';

            headerContainer.insertBefore(globalNotification, globalBannerLocation.nextSibling);

            customEventListener('.notification-hide', 'click', (event) => {
                event.preventDefault();
                Cookies.set('global_banner', 'true' , { path: '/', expires: 1});
                globalNotification.remove();
            });
        }
    });

    const notificationBannerCookie = Cookies.get('notification_banner');
    const notificationBanner = document.getElementById('global-notification-banner');

    if ( notificationBannerCookie === 'yes') {
        notificationBanner.classList.add('hide-notification');
    }
}
