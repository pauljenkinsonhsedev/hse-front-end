import Cookies from 'js-cookie';
import { cookiePreferences, loadGtag } from './combined/cookies/cookie-preferences.js';

// Export for global access by other scripts
window.Cookies = Cookies;

/*
  training.hse.gov.uk (BookingLive) variant.

  Same cookie logic as the main [www.hse.gov.uk](https://www.hse.gov.uk) build, with four differences
  needed for the training site's domain/markup:

    1. linkBase           - cookie-policy links point at the absolute
                            https://www.hse.gov.uk domain, because relative
                            links would resolve to training.hse.gov.uk, which
                            has no such page.
    2. wrapViewCookiesLink - "View cookies" is wrapped in a <p> for the
                            BookingLive layout.
    3. insertBanner        - the banner is inserted before .headerWrapper (the
                            BookingLive header, which carries the 4px maroon
                            border-top) so the line sits below the banner, with
                            <header>/[role="banner"] and body.prepend fallbacks.
                            The main site's #headerContainer does not exist here.
    4. loadAnalytics       - the training site has no GTM. GA4 is loaded directly
                            with gtag.js by an inline snippet in the BookingLive
                            head for returning visitors. On accept this loads the
                            same tag in place instead of reloading the page, so
                            the original referrer is kept.
*/
const bookingliveConfig = {
  linkBase: "https://www.hse.gov.uk",
  wrapViewCookiesLink: true,
  insertBanner(messageContainer) {
    const header =
      document.querySelector(".headerWrapper") ||
      document.querySelector("header") ||
      document.querySelector('[role="banner"]');

    if (header) {
      header.insertAdjacentElement("beforebegin", messageContainer);
    } else {
      document.body.prepend(messageContainer);
    }
  },
  loadAnalytics() {
    loadGtag("G-1Y6RD6YT11", { content_group: "training" });
  },
};

window.addEventListener("DOMContentLoaded", () => {
  window.Cookies.cookiePreferences = () => cookiePreferences(bookingliveConfig);

  cookiePreferences(bookingliveConfig);
});
