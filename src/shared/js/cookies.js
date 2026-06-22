import Cookies from 'js-cookie';
import { cookiePreferences } from './combined/cookies/cookie-preferences.js';

// Export for global access by other scripts
window.Cookies = Cookies;

window.addEventListener("DOMContentLoaded", () => {
  window.Cookies.cookiePreferences = cookiePreferences;

  cookiePreferences();
});