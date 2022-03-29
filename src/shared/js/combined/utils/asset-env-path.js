// export function envPath() {
const envPath = (function() {

    let path = String;

    path = window.location.protocol + '//' + window.location.host;
    if (window.location.href.match(/(?:\b|_)(?:livelive)(?:\b|_)/i)) {
        path = window.location.protocol + '//' + window.location.host + '/website/livelive/secureroot';
    }
    if (window.location.href.match(/(?:\b|_)(?:testbed)(?:\b|_)/i)) {
        path = window.location.protocol + '//' + window.location.host + '/testbed/';
    }
    if (window.location.href.match(/(?:\b|_)(?:devguide)(?:\b|_)/i)) {
        path = window.location.protocol + '//' + window.location.host + '/devguide/';
    }

    return path;
})();

export default envPath;