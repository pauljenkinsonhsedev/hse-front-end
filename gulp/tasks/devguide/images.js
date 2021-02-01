'use strict';

import { src, dest, task} from 'gulp';

import imagemin from 'gulp-imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import * as config from '../../config.json';

function devguideImages() {
  return src(config.devguide.images.all)
    .pipe(imagemin([
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminJpegtran(),
        imageminPngquant(),
        imageminJpegRecompress(),
    ]))
    .pipe(dest(config.devguide.images.output));
}

task('devguideImages', devguideImages);
