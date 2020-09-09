"use strict";

import { src, dest, task} from 'gulp';
import nunjucks from "gulp-nunjucks-render";
import data from "gulp-data";
import fs from "fs";
import path from "path";
import connect from "gulp-connect";
import * as config from '../../config.json';

function workspaceMarkup() {
    return src(config.workspace.markup.pages)
    .pipe(
        data(function() {
            return JSON.parse(fs.readFileSync(`${config.workspace.markup.data}.json`));
        })
    )
    .pipe(
        data(function(file) {
            return JSON.parse(fs.readFileSync(`${config.workspace.markup.dataModel}/${path.basename(file.path)}.json`));
        }))
    .pipe(
        nunjucks({
            data: {
                css_path: 'styles/',
                js_path: 'assets/v5-js/',
                vendor_path: 'assets/v5-js/vendor/',
                data_path: 'data/'
            },
            path: config.workspace.markup.templates
        })
    )
    .pipe(connect.reload())
    .pipe(dest(config.workspace.markup.output));
}
task('workspaceMarkup', workspaceMarkup);