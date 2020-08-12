'use strict';

import { src, dest, task} from 'gulp';

import imagemin from 'gulp-imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import * as config from '../../config.json';

function workspaceImages() {
  return src(config.workspace.images.all)
    .pipe(imagemin([
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminJpegtran(),
        imageminPngquant(),
        imageminJpegRecompress(),
    ]))
    .pipe(dest(config.workspace.images.output));
}

task('workspaceImages', workspaceImages);
