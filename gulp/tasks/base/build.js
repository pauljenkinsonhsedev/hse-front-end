/*
    Build tasks for ./gulpfile.babel.js
*/

import { parallel, series } from 'gulp';
import requireDir from 'require-dir';

// index all gulp tasks
requireDir('../', { recurse: true });

// Define combined tasks for HSE
export const hseBuild = parallel('hseStyles', 'hseScripts', 'sharedScripts', 'hseCopy', 'hseImages');

// Define combined devguide
export const devguideBuild = parallel('hseStyles', 'hseImages', 'hseScripts', 'hseCopy', 'sharedScripts', 'devguideCopyAssets', 'devguideHighChats');

// Define production Tasks
export const prodTasks = series(parallel('zipdevguide', 'zipSecureroot', 'sizeReport'));

// Define common Tasks
export const commonTasks = series(parallel('watchTask', 'sizeReport', 'browser'));
