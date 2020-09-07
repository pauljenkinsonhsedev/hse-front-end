import { src, dest, task} from 'gulp';
import webpack from 'webpack';
import connect from 'gulp-connect';
import webpackStream from 'webpack-stream';
import webpackConfigDev from './webpack.config.dev.js';
import webpackConfigProd from './webpack.config.prod.js';
import * as config from '../../config.json';
import { isStaging, isDefault, isProd, isDev } from '../base/mode.js';

function sharedScripts() {

    let webpackConfig;
    if (isDev || isStaging || isDefault) {
        webpackConfig = webpackConfigDev;
    }

    if (isProd) {
        webpackConfig = webpackConfigProd;
    }

    return src(config.shared.js.entrypoint)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(connect.reload())
    .pipe(dest(config.shared.js.outputWorkspace))
    .pipe(dest(config.shared.js.outputSecureroot));
}

task('sharedScripts', sharedScripts);