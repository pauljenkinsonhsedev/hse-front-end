import { src, dest, task} from 'gulp';
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
let workspaceDest;

if (isDev) {
    workspaceDest = config.shared.js.outputWorkspace
}

if(isDefault){
    workspaceDest = config.shared.js.outputSecureroot
}

function sharedScripts() {
    return src(config.shared.js.entrypoint)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(dest(workspaceDest));
}

task('sharedScripts', sharedScripts);