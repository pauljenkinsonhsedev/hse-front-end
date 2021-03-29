
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
                        <a class="btn btn-primary" id="acceptAllCookies" href="#">Accept analytics cookies</a>
                        <a class="btn btn-primary" id="rejectAllCookies" href="#">Reject analytics cookie</a>

                        <p class="cookies-message__link"><a href="/cookies.htm">View cookies</a></p>
                    </div>
                </div>
            `;
    const cookieMessageAccept = `
                <div class="cookies-message__copy cookies-message-accepted">
                    <p>You've accepted analytics cookies. You can change your <a href="/cookies.htm">cookie settings</a> at any time.</p>
                    <button id="cookieNotifyClose" class="btn btn-cautionary">Hide</button>
                </div>
            `;

    const cookieMessageReject = `
                <div class="cookies-message__copy cookies-message-rejected">
                    <p>You've rejected analytics cookies. You can change your <a href="/cookies.htm">cookie settings</a> at any time.</p>
                    <button id="cookieNotifyClose" class="btn btn-cautionary">Hide</button>
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
    <div id="cookieContainer" class="cf">
        <div id="cookieNotify" class="cf">${cookieMessage}</div>
    </div>
    `;
    return cookieBanner;
}