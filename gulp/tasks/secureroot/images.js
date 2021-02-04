'use strict';

import { src, dest, series, task} from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import * as config from '../../config.json';
import { isDefault, isStaging, isDev } from '../base/mode.js';

let v4output;
let v5output;
let v4Homepage;

if (isDefault) {
    v4output = config.secureroot.images.v4.output;
    v5output = config.secureroot.images.v5.output;
    v4Homepage = config.secureroot.images.v4homepage.output;
}

if (isStaging) {
    v4output = config.secureroot.images.v4.output;
    v5output = config.secureroot.images.v5.output;
    v4Homepage = config.secureroot.images.v4homepage.output;
}

if (isDev) {
    v4output = config.devguide.images.v4.output;
    v5output = config.devguide.images.v5.output;
    v4Homepage = config.devguide.images.v4homepage.output;
}

function imagesV4() {
  return src(config.secureroot.images.v4.all)
    .pipe(imagemin([
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminJpegtran(),
        imageminPngquant(),
        imageminJpegRecompress(),
    ]))
    .pipe(dest(v4output));
};

function imagesV5(){
  return src(config.secureroot.images.v5.all)
    .pipe(imagemin([
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminJpegtran(),
        imageminPngquant(),
        imageminJpegRecompress(),
    ]))
    .pipe(dest(v5output));
};

function imagesV4Homepage() {
  return src(config.secureroot.images.v4homepage.all)
    .pipe(imagemin([
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminJpegtran(),
        imageminPngquant(),
        imageminJpegRecompress(),
    ]))
    .pipe(dest(v4Homepage));
};

const toReturn = series(imagesV4, imagesV5, imagesV4Homepage);
task('hseImages', toReturn)
