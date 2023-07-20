"use strict";

import { src, dest, task } from "gulp";
import * as config from "../../config.json";
import sass from "gulp-dart-sass";
import connect from "gulp-connect";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import pxtorem from "gulp-pxtorem";
import rename from "gulp-rename";
import { isDefault, isStaging, isDev, isProd } from "../base/mode.js";
const mode = require("gulp-mode")();

let output;

if (isProd) {
  output = config.secureroot.styles.output;
}

if (isDefault) {
  output = config.secureroot.styles.output;
}

if (isStaging) {
  output = config.secureroot.styles.output;
}

if (isDev) {
  output = config.designsystem.styles.output;
}

sass.compiler = require("sass");

function hseStyles() {
  return src(config.secureroot.styles.entry)
    .pipe(mode.development(sourcemaps.init()))
    .pipe(
      sass({
        includePaths: "node_modules",
        includePaths: ["node_modules/susy/sass"],
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer({ grid: true }))
    .pipe(sourcemaps.write())
    .pipe(pxtorem())
    .pipe(rename("v6.min.css"))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(connect.reload())
    .pipe(dest(output));
}

task("hseStyles", hseStyles);
