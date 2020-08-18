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
  "./node_modules/highcharts/highcharts-more.js.map"
];

function copyHighchartsjs() {
  return src(highchartsAssets)
    .pipe(dest('./workspace/assets/v5-js/vendor/highcharts'))
};

// gulp.task('copy-pages', function() {
//   return gulp
//     .src('./src/pages/**/*')
//     .pipe(gulp.dest("public/pages"))
// });

function copyWorkspaceAssets() {
  const tidy = src(['./node_modules/tidy-html5/tidy.js'])
  .pipe(dest('./workspace/assets/v5-js/vendor/tidy'));

  const moment = src(['./node_modules/moment/moment.js'])
  .pipe(dest('./workspace/assets/v5-js/vendor/moment'));

  const scripts = src(['./public/js/**/*'])
  .pipe(dest('./workspace/js'));

  const images = src(['./src/workspace/images/**/*'])
  .pipe(dest('./workspace/images'));

  const favicons = src(['./src/workspace/fav/**/*'])
  .pipe(dest('./workspace/fav'));

  return merge(scripts, tidy, moment, images, favicons);
};

task('workspaceHighChats', copyHighchartsjs);
task('workspaceCopyAssets', copyWorkspaceAssets);