import Cookies from 'js-cookie';
import { cookiePreferences } from './combined/cookies/cookie-preferences.js';

// Export for global access by other scripts
window.Cookies = Cookies;

/*
  training.hse.gov.uk (BookingLive) variant.

  Same cookie logic as the main www.hse.gov.uk build, with three differences
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
};

window.addEventListener("DOMContentLoaded", () => {
  window.Cookies.cookiePreferences = () => cookiePreferences(bookingliveConfig);

  cookiePreferences(bookingliveConfig);
});
