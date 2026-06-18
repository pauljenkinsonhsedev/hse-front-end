import Cookies from 'js-cookie'; 
import { cookiePreferences } from './combined/cookies/cookie-preferences.js';
import { globalBanner } from './combined/cookies/global-banner.js';

// Export for global access by other scripts
window.Cookies = Cookies;

window.addEventListener("DOMContentLoaded", () => {
  window.Cookies.cookiePreferences = cookiePreferences;
  window.Cookies.globalBanner = globalBanner;

  cookiePreferences();
  globalBanner();
});