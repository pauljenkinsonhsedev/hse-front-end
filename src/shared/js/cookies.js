import Cookies from 'js-cookie'; 
import { cookiePreferences } from './combined/cookies/cookie-preferences.js';
import { notificationBanner } from './combined/cookies/notification-banner.js';

// Export for global access by other scripts
window.Cookies = Cookies;

window.addEventListener("DOMContentLoaded", () => {
  window.Cookies.cookiePreferences = cookiePreferences;
  window.Cookies.notificationBanner = notificationBanner;

  cookiePreferences();
  notificationBanner();
});