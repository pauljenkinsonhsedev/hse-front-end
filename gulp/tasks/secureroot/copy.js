'use strict';

const { src, dest, task, series } = require('gulp');
import * as config from '../../config.json';


const highchartsAssets = [
  "./node_modules/highcharts/highcharts.js",
  "./node_modules/highcharts/highcharts.src.js",
  "./node_modules/highcharts/highcharts.js.map",
  "./node_modules/highcharts/modules/data.js",
  "./node_modules/highcharts/modules/data.src.js",
  "./node_modules/highcharts/modules/data.js.map",
  "./node_modules/highcharts/modules/exporting.js",
  "./node_modules/highcharts/modules/exporting.src.js",
  "./node_modules/highcharts/modules/exporting.js.map",
  "./node_modules/highcharts/modules/export-data.js",
  "./node_modules/highcharts/modules/export-data.src.js",
  "./node_modules/highcharts/modules/export-data.js.map",
  "./node_modules/highcharts/modules/accessibility.js",
  "./node_modules/highcharts/modules/accessibility.src.js",
  "./node_modules/highcharts/modules/accessibility.js.map",
  "./node_modules/highcharts/highcharts-more.js",
  "./node_modules/highcharts/highcharts-more.js.map"
];

function highCharts() {
  return src(highchartsAssets)
    .pipe(dest('./secureroot/assets/v5-js/vendor/highcharts'))
}

function html() {
  return src(config.secureroot.html.all)
  .pipe(dest(config.secureroot.html.output));
}

function misc() {
  return src(config.secureroot.copy.all)
  .pipe(dest(config.secureroot.copy.output));
}

const toReturn = series(misc, html, highCharts);
task('hseCopy', toReturn)