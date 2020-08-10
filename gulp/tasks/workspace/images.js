'use strict';

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import * as config from '../../config.json';

gulp.task('imagesWorkspace', (imagesDone) => {
  gulp.src(config.workspace.images.main.all)
    .pipe(imagemin([
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminJpegtran(),
        imageminPngquant(),
        imageminJpegRecompress(),
    ]))
    .pipe(gulp.dest(config.workspace.images.output));
    imagesDone();
});
