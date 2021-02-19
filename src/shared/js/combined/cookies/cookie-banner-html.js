
export function cookieMessageHTML(status) {
    // take user to top of page if cookie banner set
    // location.href = "#cookieContainer";

    const cookieMessageStart = `
                <div class="cookies-message">
                    <p class="cookies-message__heading">Can we use cookies in our services?</p>
                    <div class="cookies-message__copy">
                        <p>We’d like to use analytics cookies to collect information about how you use our services. We use this information to improve our service.</p>
                        <p>You can <a href="privacy-cookies.htm">read more about our cookies</a> before you decide.</p>
                    </div>

                    <div class="cookies-message__actions">
                        <a class="btn btn-green" id="acceptAllCookies" href="#">Yes, I’m OK with analytics cookies</a>
                        <a class="btn btn-green" id="rejectAllCookies" href="#">No, do not use analytics cookies</a>
                    </div>
                </div>
            `;
    const cookieMessageAccept = `
                <div class="cookies-message__copy cookies-message-accepted">
                    <p>You've accepted analytics cookies. You can change your <a href="cookies.htm">cookie settings</a> at any time.</p>
                    <button id="cookieNotifyClose" class="btn btn-red">Hide</button>
                </div>
            `;

    const cookieMessageReject = `
                <div class="cookies-message__copy cookies-message-rejected">
                    <p>You've rejected analytics cookies. You can change your <a href="cookies.htm">cookie settings</a> at any time.</p>
                    <button id="cookieNotifyClose" class="btn btn-red">Hide</button>
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