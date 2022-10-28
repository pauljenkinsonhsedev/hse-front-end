import merge from "merge-stream";
import { src, dest, task } from "gulp";
import * as config from "../../config.json";
import connect from "gulp-connect";

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
  "./node_modules/highcharts/highcharts-more.js.map",
];

function copyHighchartsjs() {
  return src(highchartsAssets).pipe(
    dest("./designsystem/assets/v5-js/vendor/highcharts")
  );
}

function copydesignsystemAssets() {
  const tidy = src(["./node_modules/tidy-html5/tidy.js"]).pipe(
    dest("./designsystem/assets/v5-js/vendor/tidy")
  );

  const ariaAccordion = src(["./node_modules/a11y_accordions/index.js"]).pipe(
    dest("./designsystem/assets/v5-js/vendor/a11y_accordions")
  );

  const papaparse = src(["./node_modules/papaparse/papaparse.min.js"]).pipe(
    dest("./designsystem/assets/v5-js/vendor/papaparse")
  );

  const moment = src(["./node_modules/moment/moment.js"]).pipe(
    dest("./designsystem/assets/v5-js/vendor/moment")
  );

  const html = src([config.designsystem.markup.all])
    .pipe(connect.reload())
    .pipe(dest(config.designsystem.markup.output));

  const imageAssets = src([config.designsystem.imageAssets.all])
    .pipe(connect.reload())
    .pipe(dest(config.designsystem.imageAssets.output));

  const js = src([config.designsystem.copyjs.all]).pipe(
    dest(config.designsystem.copyjs.output)
  );

  const misc = src([config.designsystem.copyAll.all]).pipe(
    dest(config.designsystem.copyAll.output)
  );

  return merge(
    html,
    imageAssets,
    tidy,
    moment,
    js,
    misc,
    ariaAccordion,
    papaparse
  );
}

task("designsystemHighChats", copyHighchartsjs);
task("designsystemCopyAssets", copydesignsystemAssets);
