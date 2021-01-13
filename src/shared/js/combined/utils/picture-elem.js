import load from './asset-loader';


export function loadPicturefillFn() {
    let path = String;

    path = window.location.protocol + '//' + window.location.host;
    if (window.location.href.match(/(?:\b|_)(?:livelive)(?:\b|_)/i)) {
        path = window.location.protocol + '//' + window.location.host + '/website/livelive/secureroot';
    }
    if (window.location.href.match(/(?:\b|_)(?:testbed)(?:\b|_)/i)) {
        path = window.location.protocol + '//' + window.location.host + '/testbed/';
    }

    return Promise.all([
        load.js(path + '/assets/v5-js/vendor/picturefill/picturefill.min.js'),
    ])
    .catch((err) => {
        console.error(`Error initiating picturefill: ${err}`);
    });
}