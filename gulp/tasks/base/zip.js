"use strict";

import { src, dest, task } from 'gulp';
import zip from "gulp-zip";
import notify from "gulp-notify";
import * as config from '../../config.json';
import * as proj from'../../../package.json';

function zipSecureroot() {
    return src([config.secureroot.output])
    .pipe(zip('secureroot.zip'))
    .pipe(dest('./'))
    .pipe(notify({message: `${proj.name} production zipped`, onLast: true}))
}

function zipdevguide() {
    return src([config.devguide.output])
    .pipe(zip('devguide.zip'))
    .pipe(dest('./'))
    .pipe(notify({message: `${proj.name} production zipped`, onLast: true}))
}

task('zipSecureroot', zipSecureroot);
task('zipdevguide', zipdevguide);
