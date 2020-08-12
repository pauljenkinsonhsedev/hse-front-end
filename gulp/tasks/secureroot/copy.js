'use strict';

const { src, dest, task, series } = require('gulp');
import * as config from '../../config.json';

function html() {
  return src(config.secureroot.html.all)
  .pipe(dest(config.secureroot.html.output));
}

function misc() {
  return src(config.secureroot.copy.all)
  .pipe(dest(config.secureroot.copy.output));
}

const toReturn = series(misc, html);
task('hseCopy', toReturn)