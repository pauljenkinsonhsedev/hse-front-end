'use strict';

import {src, dest, task} from 'gulp';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import * as config from '../../config.json';

function styles() {
  return src(config.secureroot.styles.entry)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(rename('v5.min.css'))
    .pipe(dest(config.secureroot.styles.output));
}

task('hseStyles', styles);