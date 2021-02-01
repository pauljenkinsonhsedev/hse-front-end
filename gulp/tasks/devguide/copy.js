import merge from 'merge-stream';
import { src, dest, task } from 'gulp';

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

function copyHighchartsjs() {
  return src(highchartsAssets)
    .pipe(dest('./devguide/assets/v5-js/vendor/highcharts'))
};

function copydevguideAssets() {
  const tidy = src(['./node_modules/tidy-html5/tidy.js'])
  .pipe(dest('./devguide/assets/v5-js/vendor/tidy'));

  const moment = src(['./node_modules/moment/moment.js'])
  .pipe(dest('./devguide/assets/v5-js/vendor/moment'));

  const html = src(['./src/devguide/html/**/*'])
  .pipe(dest('./devguide'));

  return merge(html, tidy, moment);
};

task('devguideHighChats', copyHighchartsjs);
task('devguideCopyAssets', copydevguideAssets);