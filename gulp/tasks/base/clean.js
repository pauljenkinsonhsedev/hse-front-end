const del = require('del');
import * as config from '../../config.json';

function cleanScriptsSecure () {
    return del([config.secureroot.scripts.output]);
};

function cleanStylesSecure() {
    return del([config.secureroot.styles.output]);
};

function cleanImagesSecure() {
    return del([config.secureroot.images.output]);
};

function cleanScriptsdevguide() {
    return del([config.devguide.scripts.output]);
};

function cleanStylesdevguide() {
    return del([config.devguide.styles.output]);
};

function cleanImagesdevguide() {
    return del([config.devguide.images.output]);
};

function cleanMarkup() {
    return del([config.devguide.scripts.output]);
};

