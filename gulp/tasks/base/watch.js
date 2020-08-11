
import { task, watch } from 'gulp';
import * as config from '../../config.json';
import format from 'date-format';
import colors from 'colors';
import { hseBuild, workspaceBuild } from './build'
import { isDefault, isDev } from './mode.js';

function watchTask(){
    let rebuild;
    if (isDefault) {
        rebuild = hseBuild;
    }

    if (isDev) {
        rebuild = workspaceBuild;
    }
    const time = format.asString('hh:mm:ss', new Date());
    const timestamp = "[".white + time.grey + "]".white;
    const watcher = watch(
        config.all,
        rebuild
    );

    watcher.on('change', function(path) {
        console.log(`${timestamp} File ${path.yellow} was changed`);
    });

    watcher.on('add', function(path) {
        console.log(`${timestamp} File ${path.green} was added`);
    });

    watcher.on('unlink', function(path) {
        console.log(`${timestamp} File ${path.red} was removed`);
    });
}

task('watchTask', watchTask);