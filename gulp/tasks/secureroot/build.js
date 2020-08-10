const { task, parallel, series, watch } = require('gulp');

function hseBuild(done) {
    return parallel(
        // 'hseScripts',
        // 'hse-styles',
        // 'hse-html',
        // 'imagesMain',
        // 'imagesV4',
        // 'imagesV5',
        // 'imagesV4Homepage',
        // 'shared-scripts',
        'hseCopyMisc',
        // 'size-report'
    )
    // done();
}
task('hseBuild', hseBuild)