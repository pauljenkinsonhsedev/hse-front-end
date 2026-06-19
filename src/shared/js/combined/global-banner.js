import Cookies from "js-cookie";
import { customEventListener } from "./utils/add-custom-event-listener";

const setCookiesSettings = {
  path: "/",
  domain: "hse.gov.uk",
  secure: true,
  sameSite: "strict",
  expires: 1,
};

export function globalBanner() {
  const globalSet = Cookies.get("global_banner");
  fetch("/assets/ajax/global-message.json")
    .then((response) => response.json())
    .then((data) => {
      const active = data.active;
      const message = data.message;

      if (active === "true" && globalSet !== "true") {
        const headerContainer = document.querySelector("#headerContainer"),
          globalBannerLocation = document.querySelector("#header"),
          globalNotification = document.createElement("div");
        globalNotification.setAttribute("id", "global-notification-banner");
        globalNotification.classList.add("hse-global-banner");
        globalNotification.classList.add("global");
        globalNotification.innerHTML =
          '<div class="hse-global-banner__container hse-width-container"><div class="hse-global-banner__text hse-u-reading-width">' +
          message +
          "</div>" +
          '<div class="hse-global-banner__button"><button class="global-banner-hide hse-button hse-button--small hse-button--transparent">Hide&nbsp;message</button></div>';

        headerContainer.insertBefore(
          globalNotification,
          globalBannerLocation.nextSibling,
        );

        customEventListener(".global-banner-hide", "click", (event) => {
          event.preventDefault();
          Cookies.set("global_banner", "true", setCookiesSettings);
          globalNotification.parentNode.removeChild(globalNotification);
        });
      }
    });
}
