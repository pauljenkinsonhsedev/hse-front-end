import Cookies from 'js-cookie';
import {
  cookiePreferences,
  loadGoogleTagManager,
  loadSiteimprove,
} from './combined/cookies/cookie-preferences.js';

// Export for global access by other scripts
window.Cookies = Cookies;

/*
  press.hse.gov.uk (WordPress) variant.

  Same cookie logic and banner as the main [www.hse.gov.uk](https://www.hse.gov.uk) build. The only
  difference is what loads when analytics cookies are accepted:

    1. loadAnalytics - the press theme header loads GTM (GTM-PJPWMNL) and
                       Siteimprove (6798) together, gated on optInGoogleTracking,
                       for returning visitors. On accept this loads both in
                       place instead of reloading the page, so the original
                       referrer is kept.

  Deployed to the press theme as wp-content/themes/press/js/cookies-6.8.0.js
*/
const pressConfig = {
  loadAnalytics() {
    loadGoogleTagManager("GTM-PJPWMNL");
    loadSiteimprove("6798");
  },
};

window.addEventListener("DOMContentLoaded", () => {
  window.Cookies.cookiePreferences = () => cookiePreferences(pressConfig);

  cookiePreferences(pressConfig);
});
