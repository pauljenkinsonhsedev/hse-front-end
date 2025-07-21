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
    .pipe(pxtorem())
    .pipe(mode.production(postcss([cssnano()]))) // Only minify in production
    .pipe(rename("6.4.0.min.css"))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(connect.reload())
    .pipe(dest(output));
}

task("hseStyles", hseStyles);

// Design system styles

function designSystemStyles() {
  // Compile SCSS to CSS
  const compiledSass = src(config.secureroot.styles.entryDesignSystem)
    .pipe(mode.development(sourcemaps.init()))
    .pipe(
      sass({
        includePaths: ["node_modules/susy/sass"],
        outputStyle: "expanded", // not compressed yet
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer({ grid: true }))
    .pipe(pxtorem());

  // Read Prism raw CSS
  const prismCSS = src([
    'node_modules/prismjs/themes/prism.css',
    'node_modules/prismjs/themes/prism-okaidia.css'
  ]);

  // Merge & concatenate all CSS
  return mergeStream(compiledSass, prismCSS)
    .pipe(concat('6.4.0.min.css'))           // Merge into one file
    .pipe(mode.production(postcss([cssnano()]))) // Only minify in production
    .pipe(mode.development(sourcemaps.write()))
    .pipe(connect.reload())
    .pipe(dest(outputDesignSystemStyles));   // Write final file
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
    .pipe(pxtorem())
    .pipe(mode.production(postcss([cssnano()]))) // Only minify in production
    .pipe(rename("press-6.4.0.min.css"))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(connect.reload())
    .pipe(dest(outputPressStyles));
}

task("pressStyles", pressStyles);
