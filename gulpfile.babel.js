'use strict';

/* --------------------------------------------------------------------------------
    Gulp babel
    For reference, main build tasks are located ./gulp/tasks/base/build.js

/* -------------------------------------------------------------------------------- */

const { task, series } = require('gulp');
import { hseBuild, workspaceBuild, commonTasks, prodTasks } from './gulp/tasks/base/build';
import { watchTask } from './gulp/tasks/base/watch';
import requireDir from 'require-dir';

// index all gulp tasks
requireDir('./gulp/tasks', { recurse: true });

// const watcher = watch(config.all, series(['workspaceStyles']));

// const time = format.asString('hh:mm:ss', new Date());
// const timestamp = "[".white + time.grey + "]".white;

// watcher.on('change', function(path) {
//     console.log(`${timestamp} File ${path.yellow} was changed`);
// });

// watcher.on('add', function(path) {
//     console.log(`${timestamp} File ${path.green} was added`);
// });

// watcher.on('unlink', function(path) {
//     console.log(`${timestamp} File ${path.red} was removed`);
// });

// watchTask(config.all);
// Default task
task('default', series(hseBuild, commonTasks));

// Development task
task('development', series(workspaceBuild, commonTasks));

// Production task
task('production', series(hseBuild, workspaceBuild, prodTasks));
