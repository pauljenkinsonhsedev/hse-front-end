'use strict';

const { task, parallel, series, watch } = require('gulp');
import requireDir from 'require-dir';
import format from 'date-format';
import colors from 'colors';
import * as config from './gulp/config.json';

requireDir('./gulp/tasks', { recurse: true });

const watcher = watch(config.secureroot.all);

const time = format.asString('hh:mm:ss', new Date());
const timestamp = "[".white + time.grey + "]".white;

watcher.on('change', function(path) {
    console.log(`${timestamp} File ${path.yellow} was changed`);
});

watcher.on('add', function(path) {
    console.log(`${timestamp} File ${path.green} was added`);
});

watcher.on('unlink', function(path) {
    console.log(`${timestamp} File ${path.red} was removed`);
});

// Define Combined Tasks for HSE
const hseBuild = series('hseStyles', 'hseScripts', 'hseCopy', 'hseImages');
const defaultExtra = series(parallel('sizeReport', 'browser'), watch)

// Default Task
task('default', series(hseBuild, defaultExtra));
