'use strict';

const { src, dest, task, series } = require('gulp');
import * as config from '../../config.json';

const papaparseAssets = ['./node_modules/papaparse/papaparse.min.js'];

const picturefillAssets = ['./node_modules/picturefill/dist/picturefill.min.js'];

const bowserAssets = ['./node_modules/bowser/es5.js'];

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
  "./node_modules/highcharts/highcharts-more.src.js",
  "./node_modules/highcharts/highcharts-more.js.map"
];

function bowser() {
  return src(bowserAssets)
    .pipe(dest(`${config.secureroot.assetPath}/v6-js/vendor/bowser`))
}

function picturefill() {
  return src(picturefillAssets)
    .pipe(dest(`${config.secureroot.assetPath}/v6-js/vendor/picturefill`))
}
function highCharts() {
  return src(highchartsAssets)
    .pipe(dest(`${config.secureroot.assetPath}/v6-js/vendor/highcharts`))
}

function papaparse() {
  return src(papaparseAssets)
    .pipe(dest(`${config.secureroot.assetPath}/v6-js/vendor/papaparse`))
}

function moment() {
  return src(['./node_modules/moment/moment.js'])
  .pipe(dest(`${config.secureroot.assetPath}/v6-js/vendor/moment`));
}

function ariaAccordion() {
  return src(['./node_modules/a11y_accordions/index.js']).pipe(
    dest(`${config.secureroot.assetPath}/v6-js/vendor/a11y_accordions`)
  );
}

function html() {
  return src(config.secureroot.html.all)
  .pipe(dest(config.secureroot.html.output));
}

function vendorCSS() {
  return src(config.secureroot.styles.vendor)
  .pipe(dest(config.secureroot.styles.vendorOutput));
}

function vendorJS() {
  return src([config.shared.js.vendor])
  .pipe(dest(config.shared.js.vendorOutput));
}

function misc() {
  return src(config.secureroot.copy.all)
  .pipe(dest(config.secureroot.copy.output));
}

function templates() {
  return src(config.secureroot.copy.templates.entrypoint)
  .pipe(dest(config.secureroot.copy.templates.output));
}

const toReturn = series(misc, html, vendorCSS, vendorJS, templates, moment, highCharts, picturefill, ariaAccordion, papaparse, bowser);
task('hseCopy', toReturn)