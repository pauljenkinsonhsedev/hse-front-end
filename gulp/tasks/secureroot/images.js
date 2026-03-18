"use strict";

import { src, dest, series, task } from "gulp";
import * as config from "../../config.json";
import { isDefault, isStaging, isDev, isProd } from "../base/mode.js";

let v4output;
let v6output;
let v4Homepage;

if (isProd) {
  v4output = config.secureroot.images.v4.output;
  v6output = config.secureroot.images.v6.output;
  v4Homepage = config.secureroot.images.v4homepage.output;
}

if (isDefault) {
  v4output = config.secureroot.images.v4.output;
  v6output = config.secureroot.images.v6.output;
  v4Homepage = config.secureroot.images.v4homepage.output;
}

if (isStaging) {
  v4output = config.secureroot.images.v4.output;
  v6output = config.secureroot.images.v6.output;
  v4Homepage = config.secureroot.images.v4homepage.output;
}

if (isDev) {
  v4output = config.designsystem.images.v4.output;
  v6output = config.designsystem.images.v6.output;
  v4Homepage = config.designsystem.images.v4homepage.output;
}

const importModule = new Function("specifier", "return import(specifier)");

async function getImageminPlugins() {
  const [
    { default: imageminJpegtran },
    { default: imageminPngquant },
    { default: imageminJpegRecompress },
  ] = await Promise.all([
    importModule("imagemin-jpegtran"),
    importModule("imagemin-pngquant"),
    importModule("imagemin-jpeg-recompress"),
  ]);

  return [
    imageminJpegtran(),
    imageminPngquant(),
    imageminJpegRecompress(),
  ];
}

async function imagesV4() {
  const [{ default: imagemin }, plugins] = await Promise.all([
    importModule("gulp-imagemin"),
    getImageminPlugins(),
  ]);

  return src(config.secureroot.images.v4.all)
    .pipe(imagemin(plugins))
    .pipe(dest(v4output));
}

async function imagesv6() {
  const [{ default: imagemin }, plugins] = await Promise.all([
    importModule("gulp-imagemin"),
    getImageminPlugins(),
  ]);

  return src(config.secureroot.images.v6.all)
    .pipe(imagemin(plugins))
    .pipe(dest(v6output));
}

async function imagesV4Homepage() {
  const [{ default: imagemin }, plugins] = await Promise.all([
    importModule("gulp-imagemin"),
    getImageminPlugins(),
  ]);

  return src(config.secureroot.images.v4homepage.all)
    .pipe(imagemin(plugins))
    .pipe(dest(v4Homepage));
}

const toReturn = series(imagesV4, imagesv6, imagesV4Homepage);
task("hseImages", toReturn);