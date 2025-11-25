
export function cookieMessageHTML() {
    const status = Cookies.get('cookies_status');

    const cookieMessageStart = `
                <div class="cookies-message">
                    <p class="cookies-message__heading">Cookies on www.hse.gov.uk</p>
                    <div class="cookies-message__copy">
                        <p>We use some essential cookies to make this service work.</p>
                        <p>We’d also like to use analytics cookies so we can understand how you use the service and make improvements.</p>
                    </div>

                    <div class="cookies-message__actions">
                        <button class="hse-button" id="acceptAllCookies" href="#">Accept analytics cookies</button>
                        <button class="hse-button" id="rejectAllCookies" href="#">Reject analytics cookie</button>

                        <p class="cookies-message__link"><a href="/help/cookies.htm">View cookies</a></p>
                    </div>
                </div>
            `;
    const cookieMessageAccept = `
                <div class="cookies-message__copy cookies-message-accepted">
                    <p>You've accepted analytics cookies. You can change your <a href="/help/cookies.htm">cookie settings</a> at any time.</p>
                    <button id="cookieNotifyClose" class="hse-button">Hide</button>
                </div>
            `;

    const cookieMessageReject = `
                <div class="cookies-message__copy cookies-message-rejected">
                    <p>You've rejected analytics cookies. You can change your <a href="/help/cookies.htm">cookie settings</a> at any time.</p>
                    <button id="cookieNotifyClose" class="hse-button">Hide</button>
                </div>
            `;


    let cookieMessage;
    switch (status) {
        case 'accepted':
            cookieMessage = cookieMessageAccept;
            break;
        case 'rejected':
            cookieMessage = cookieMessageReject;
            break;
        default:
            cookieMessage = cookieMessageStart
            break;
    }

    const cookieBanner = `
    <div class="hse-cookie-banner cf" role="region" aria-label="Cookie banner">
        <div class="hse-width-container cf">${cookieMessage}</div>
    </div>
    `;
    return cookieBanner;
}