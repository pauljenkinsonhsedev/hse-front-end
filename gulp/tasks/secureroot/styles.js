"use strict";
import mergeStream from "merge-stream";
import concat from "gulp-concat";
import postcss from "gulp-postcss";
import cssnano from "cssnano";
import { src, dest, task } from "gulp";
import * as config from "../../config.json";

import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);

import connect from "gulp-connect";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import pxtorem from "postcss-pxtorem";
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
  output = config.secureroot.styles.output;
}

let outputDesignSystemStyles = config.secureroot.styles.outputDesignSystem;
let outputPressStyles = config.secureroot.styles.outputPress;

sass.compiler = require("sass");

function hseStyles() {
  return src(config.secureroot.styles.entry)
    .pipe(mode.development(sourcemaps.init()))
    .pipe(
      sass({
        includePaths: ["node_modules/susy/sass"],
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer({ grid: true }))
    .pipe(sourcemaps.write())
    .pipe(postcss([pxtorem()]))
    .pipe(mode.production(postcss([cssnano()])))
    .pipe(rename("6.6.0.min.css"))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(connect.reload())
    .pipe(dest(output));
}

task("hseStyles", hseStyles);

// Design system styles

function designSystemStyles() {
  const compiledSass = src(config.secureroot.styles.entryDesignSystem)
    .pipe(mode.development(sourcemaps.init()))
    .pipe(
      sass({
        includePaths: ["node_modules/susy/sass"],
        outputStyle: "expanded",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer({ grid: true }))
    .pipe(postcss([pxtorem()]));

  const prismCSS = src([
    "node_modules/prismjs/themes/prism.css",
    "node_modules/prismjs/themes/prism-okaidia.css",
  ]);

  return mergeStream(compiledSass, prismCSS)
    .pipe(concat("6.6.0.min.css"))
    .pipe(mode.production(postcss([cssnano()])))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(connect.reload())
    .pipe(dest(outputDesignSystemStyles));
}

task("designSystemStyles", designSystemStyles);

// Press styles for WP https://press.hse.gov.uk/

function pressStyles() {
  return src(config.secureroot.styles.entryPress)
    .pipe(mode.development(sourcemaps.init()))
    .pipe(
      sass({
        includePaths: ["node_modules/susy/sass"],
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer({ grid: true }))
    .pipe(sourcemaps.write())
    .pipe(postcss([pxtorem()]))
    .pipe(mode.production(postcss([cssnano()])))
    .pipe(rename("press-6.6.0.min.css"))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(connect.reload())
    .pipe(dest(outputPressStyles));
}

task("pressStyles", pressStyles);