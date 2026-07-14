export function cookieMessageHTML(config = {}) {
  // config lets a build variant (e.g. bookinglive/training) override where the
  // cookie-policy links point and how the "View cookies" link is wrapped.
  // Defaults reproduce the stock www.hse.gov.uk behaviour exactly.
  const { linkBase = "", wrapViewCookiesLink = false } = config;

  const status = Cookies.get("cookies_status");

  const cookiesHelpHref = `${linkBase}/help/cookies.htm`;

  const viewCookiesLink = wrapViewCookiesLink
    ? `<p class="cookies-message__link"><a href="${cookiesHelpHref}">View cookies</a></p>`
    : `<a class="cookies-message__link" href="${cookiesHelpHref}">View cookies</a>`;

  const cookieMessageStart = `
                <div class="cookies-message">
                    <p class="cookies-message__heading hse-heading-m">Cookies on www.hse.gov.uk</p>
                    <div class="cookies-message__copy">
                        <p class="hse-body-m">We use some essential cookies to make this service work.</p>
                        <p class="hse-body-m">We’d also like to use analytics cookies so we can understand how you use the service and make improvements.</p>
                    </div>

                    <div class="cookies-message__actions">
                        <button class="hse-button hse-button--small" id="acceptAllCookies" href="#">Accept analytics cookies</button>
                        <button class="hse-button hse-button--small" id="rejectAllCookies" href="#">Reject analytics cookie</button>

                        ${viewCookiesLink}
                    </div>
                </div>
            `;
  const cookieMessageAccept = `
                <div class="cookies-message__copy cookies-message-accepted">
                    <p>You've accepted analytics cookies. You can change your <a href="${cookiesHelpHref}">cookie settings</a> at any time.</p>
                    <button id="cookieNotifyClose" class="hse-button hse-button--small">Hide</button>
                </div>
            `;

  const cookieMessageReject = `
                <div class="cookies-message__copy cookies-message-rejected">
                    <p>You've rejected analytics cookies. You can change your <a href="${cookiesHelpHref}">cookie settings</a> at any time.</p>
                    <button id="cookieNotifyClose" class="hse-button hse-button--small">Hide</button>
                </div>
            `;

  let cookieMessage;
  switch (status) {
    case "accepted":
      cookieMessage = cookieMessageAccept;
      break;
    case "rejected":
      cookieMessage = cookieMessageReject;
      break;
    default:
      cookieMessage = cookieMessageStart;
      break;
  }

  const cookieBanner = `
    <div class="hse-cookie-banner cf" role="region" aria-label="Cookie banner">
        <div class="hse-width-container cf">${cookieMessage}</div>
    </div>
    `;
  return cookieBanner;
}
