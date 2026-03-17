'use strict';

import { task, series } from 'gulp';
import * as config from '../../config.json';
import connect from 'gulp-connect';
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

async function openBrowser() {
    if (inCodespaces) {
        console.log('Running in Codespaces: browser auto-open disabled. Open manually via forwarded port.');
        return;
    }

    console.log('Opening browser at http://localhost:8080');

    const importOpen = new Function('specifier', 'return import(specifier)');
    const { default: open } = await importOpen('open');
    await open('http://localhost:8080');
}

task('browser', series(server, openBrowser));