'use strict';

const { src, task } = require('gulp');
import report from 'gulp-sizereport';
import path from 'path';
import { isDefault, isDev } from './mode.js';

let root;
if (isDefault) {
    root = 'secureroot';
}

if (isDev) {
    root = 'workspace';
}

function sizeReport() {
    return src(path.join(`./${root}/**/*.+(css|js)`))
    .pipe(report({ gzip: true }));
}
task('sizeReport', sizeReport)