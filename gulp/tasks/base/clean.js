const del = require('del');
import * as config from '../../config.json';

function cleanhseScripts () {
    return del([config.secureroot.scripts.output]);
};

function cleanStylesSecure() {
    return del([config.secureroot.styles.output]);
};

function cleanImagesSecure() {
    return del([config.secureroot.images.output]);
};

function cleanScriptsWorkspace() {
    return del([config.workspace.scripts.output]);
};

function cleanStylesWorkspace() {
    return del([config.workspace.styles.output]);
};

function cleanImagesWorkspace() {
    return del([config.workspace.images.output]);
};

function cleanMarkup() {
    return del([config.workspace.scripts.output]);
};

