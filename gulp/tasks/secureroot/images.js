'use strict';

import { src, dest, series, task} from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import * as config from '../../config.json';

function imagesMain() {
  return src(config.secureroot.images.main.all)
    .pipe(imagemin([
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminJpegtran(),
        imageminPngquant(),
        imageminJpegRecompress(),
    ]))
    .pipe(dest(config.secureroot.images.main.output));
};

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
    .pipe(dest(config.secureroot.images.v4.output));
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
    .pipe(dest(config.secureroot.images.v5.output));
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
    .pipe(dest(config.secureroot.images.v4homepage.output));
};

const toReturn = series(imagesMain, imagesV4, imagesV5, imagesV4Homepage);
task('hseImages', toReturn)
