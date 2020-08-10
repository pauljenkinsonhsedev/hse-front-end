// 'use strict';

// import gulp from 'gulp';
// import * as config from '../../config.json';

// gulp.task('hseScripts', (scriptsDone) => {
//   gulp.src(config.secureroot.scripts.all)
//     .pipe(concat(config.secureroot.scripts.entry))
//     .pipe(rename('v5-footer.min.js'))
//     .pipe(gulp.dest(config.secureroot.scripts.output));
//     scriptsDone();
// });

'use strict';

const { src, dest, series, task } = require('gulp');
import * as config from '../../config.json';
import concat from 'gulp-concat';
import rename from 'gulp-rename';

function hseScripts() {
    return src(config.secureroot.scripts.all)
    .pipe(concat(config.secureroot.scripts.entry))
    .pipe(rename('v5-footer.min.js'))
    .pipe(dest(config.secureroot.scripts.output));
}

task('hseScripts', hseScripts)