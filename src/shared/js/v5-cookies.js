import { cookiePreferences } from './combined/cookies/cookie-preferences.js';
import { notificationBanner } from  './combined/cookies/notification-banner.js';
// Window load
window.addEventListener('DOMContentLoaded',() => {
 // initiate cookies
  cookiePreferences();
  notificationBanner();
}); // end window load