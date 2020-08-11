"use strict";

import {src, dest, task} from 'gulp';
import * as config from '../../config.json';
import sass from "gulp-sass";
import connect from "gulp-connect";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import pxtorem from "gulp-pxtorem";
import rename from 'gulp-rename';
const mode = require('gulp-mode')();

sass.compiler = require('node-sass');

function hseStyles() {
  return src(config.secureroot.styles.entry)
    .pipe(mode.development(sourcemaps.init()))
    .pipe(
      sass({
        includePaths: 'node_modules',
        includePaths: ['node_modules/susy/sass'],
        outputStyle: 'compressed'
      }).on('error', sass.logError)
    )
    .pipe(autoprefixer({ grid: true }))
    .pipe(sourcemaps.write())
    .pipe(pxtorem())
    .pipe(rename('v5.min.css'))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(connect.reload())
    .pipe(dest(config.secureroot.styles.output));
}

task('hseStyles', hseStyles);
