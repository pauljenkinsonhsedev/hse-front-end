'use strict';

import { task, series } from 'gulp';
import * as config from '../../config.json';
import connect from 'gulp-connect';
import open from 'open';
import { isDefault, isStaging, isDev } from './mode.js';

const inCodespaces = process.env.CODESPACES === 'true';

let root;
if (isDev) {
    root = config.server.locationDevelopment;
} else if (isStaging || isDefault) {
    root = config.server.locationStaging;
}

function server(done) {
    connect.server({
        root: root,
        livereload: true
    });
    done();
}

function openBrowser(done) {
    if (inCodespaces) {
        console.log('Running in Codespaces: browser auto-open disabled. Open manually via forwarded port.');
        done();
        return;
    }

    console.log('Opening browser at http://localhost:8080');
    open('http://localhost:8080');
    done();
}

task('browser', series(server, openBrowser));