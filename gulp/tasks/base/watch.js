
import { series, task, watch } from 'gulp';
import * as config from '../../config.json';
import format from 'date-format';
import colors from 'colors';
import { hseBuild, devguideBuild } from './build.js'
import { isDefault, isDev, isStaging } from './mode.js';

import requireDir from 'require-dir';

// index all gulp tasks
requireDir('../', { recurse: true });

function watchTask(){
    let rebuild;
    if (isDefault || isStaging) {
        rebuild = hseBuild;
    }

    if (isDev) {
        rebuild = devguideBuild;
    }

    const time = format.asString('hh:mm:ss', new Date());
    const timestamp = "[".white + time.grey + "]".white;
    const watcher = watch(
        config.all
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

    const scripts = watch(
        config.shared.js.all,
        series('sharedScripts')
    );

    const styles = watch(
        config.devguide.styles.all,
        series('devguideStyles')
    );
    const images = watch(
        config.devguide.images.all,
        series('devguideImages')
    );

    const markup = watch(
        config.devguide.markup.all,
        series('devguideMarkup')
    );

    const hseStyles = watch(
        config.secureroot.styles.all,
        series('hseStyles')
    );

    const hseScripts = watch(
        config.secureroot.scripts.all,
        series('hseScripts')
    );

    const hseHTML = watch(
        config.secureroot.html.all,
        series('hseCopy')
    );

    // const hseImages = watch(
    //     [config.secureroot.v4.all, config.secureroot.v4homepage.all, config.secureroot.v5.all],
    //     series('hseImages', )
    // );
}

task('watchTask', series(watchTask));
