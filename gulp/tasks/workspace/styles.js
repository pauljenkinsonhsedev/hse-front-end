"use strict";

import {src, dest, task} from 'gulp';
import * as config from '../../config.json';
import sass from "gulp-sass";
import connect from "gulp-connect";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import pxtorem from "gulp-pxtorem";

sass.compiler = require('node-sass');

function workspaceStyles() {
  return src(config.workspace.styles.input)
    .pipe(sourcemaps.init())
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
    .pipe(connect.reload())
    .pipe(dest(config.workspace.styles.output));
}

task('workspaceStyles', workspaceStyles);
