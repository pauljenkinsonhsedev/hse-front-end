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

// Define combined tasks for HSE
const hseBuild = series('hseStyles', 'hseScripts', 'sharedScripts', 'hseCopy', 'hseImages');

// Define combined workspace
const workspaceBuild = series('sharedScripts', 'workspaceStyles', 'workspaceImages', 'workspaceMarkup');

// Define common Tasks
const commonTasks = series(parallel('sizeReport', 'browser'), watch)

// Default task
task('default', series(hseBuild, commonTasks));

// Development task
task('development', series(workspaceBuild, commonTasks));
