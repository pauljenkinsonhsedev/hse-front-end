'use strict';

import { src, task, series } from 'gulp';
import * as config from '../../config.json';
import os from 'os';
import connect from 'gulp-connect';
import open from 'gulp-open';

const mode = require('gulp-mode')({
  modes: ['production', 'development', 'staging', 'default'],
  default: 'default',
  verbose: false
});

const isDefault = mode.default();
const isDev = mode.development();
const isStaging = mode.staging();

let root;

if (isDefault || isStaging) {
    root = 'secureroot';
}

if (isDev) {
    root = 'workspace';
}

switch(mode) {
    case 'development':
        console.log(`mode: development`);
    break;
    case 'staging':
        console.log(`mode: staging`);
    break;
    case 'production':
        console.log(`mode: production`);
    break;
}

// Check to see which platform the user requires for their browser
const browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));


function openBrowser() {
    return src(`${root}/${config.server.file}`)
    .pipe(open({
        app: browser,
        uri: `${config.server.uri}:${config.server.port}`
    }));
}
function server() {
    connect.server({
        root: root,
        livereload: true
    });
}

const toReturn = series(server, openBrowser);

task('browser', toReturn)