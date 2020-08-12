'use strict';

import { src, task, series } from 'gulp';
import * as config from '../../config.json';
import os from 'os';
import connect from 'gulp-connect';
import open from 'gulp-open';
import { isDefault, isProd, isDev } from './mode.js';

// serve from
let root;
if (isDefault) {
    root = 'secureroot';
}

if (isDev) {
    root = 'workspace';
}

// Check to see which platform the user requires for their browser
const browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));

function server() {
    connect.server({
        root: root,
        livereload: true,
    });
}

function openBrowser() {
    return src(`${root}/${config.server.file}`)
    .pipe(open({
        app: browser,
        uri: `${config.server.uri}:${config.server.port}`
    }));
}

// const toReturn = series(server, openBrowser);
const toReturn = series(openBrowser, server);

task('browser', toReturn)