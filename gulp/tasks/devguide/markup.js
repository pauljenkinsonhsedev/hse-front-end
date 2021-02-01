"use strict";

import { src, dest, task} from 'gulp';
import nunjucks from "gulp-nunjucks-render";
import data from "gulp-data";
import fs from "fs";
import path from "path";
import connect from "gulp-connect";
import * as config from '../../config.json';

function devguideMarkup() {
    return src(config.devguide.markup.pages)
    .pipe(
        data(function() {
            return JSON.parse(fs.readFileSync(`${config.devguide.markup.data}.json`));
        })
    )
    .pipe(
        data(function(file) {
            return JSON.parse(fs.readFileSync(`${config.devguide.markup.dataModel}/${path.basename(file.path)}.json`));
        }))
    .pipe(
        nunjucks({
            data: {
                css_path: 'styles/',
                js_path: 'assets/v5-js/',
                vendor_path: 'assets/v5-js/vendor/',
                data_path: 'data/'
            },
            path: config.devguide.markup.templates
        })
    )
    .pipe(connect.reload())
    .pipe(dest(config.devguide.markup.output));
}
task('devguideMarkup', devguideMarkup);