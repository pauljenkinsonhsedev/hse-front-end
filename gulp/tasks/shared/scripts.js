import { src, dest, task} from 'gulp';
import webpack from 'webpack';
import connect from 'gulp-connect';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import * as config from '../../config.json';
import { isDefault, isProd, isDev } from '../base/mode.js';

// let outputPath;
// if (isDev) {
//     outputPath = config.shared.js.outputWorkspace
// }

// if(isDefault || isProd){
//     outputPath = config.shared.js.outputSecureroot
// }

function sharedScripts() {
    return src(config.shared.js.entrypoint)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(connect.reload())
    .pipe(dest(config.shared.js.outputWorkspace))
    .pipe(dest(config.shared.js.outputSecureroot));
}

task('sharedScripts', sharedScripts);