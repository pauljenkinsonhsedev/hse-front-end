import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import * as config from '../../config.json';


const mode = require('gulp-mode')({
  modes: ['production', 'development', 'staging', 'default'],
  default: 'development',
  verbose: false
});

const isDev = mode.development();
const isDefault = mode.default();
const isStaging = mode.staging();
const isProd = mode.production();
let dest;

if (isDefault) {
    dest = config.shared.js.outputWorkspace
} else {
    dest = config.shared.js.outputSecureroot
}

gulp.task('shared-scripts', (sharedScriptsDone) => {
    gulp.src(config.shared.js.entrypoint)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest(dest));
    sharedScriptsDone();
});
