'use strict';

const { src, task } = require('gulp');
import * as config from '../../config.json';
import report from 'gulp-sizereport';
import path from 'path';

function sizeReport() {
    return src(path.join('./secureroot/**/*.+(css|js)'))
    .pipe(report({ gzip: true }));
}
task('sizeReport', sizeReport)