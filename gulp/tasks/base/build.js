/*
    Build tasks for ./gulpfile.babel.js
*/

import { parallel, series } from 'gulp';
import requireDir from 'require-dir';

// index all gulp tasks
requireDir('../', { recurse: true });

// Define combined tasks for HSE
export const hseBuild = parallel('hseStyles', 'hseScripts', 'sharedScripts', 'hseCopy', 'hseImages');

// Define combined workspace
export const workspaceBuild = parallel('sharedScripts', 'workspaceStyles', 'workspaceImages', 'workspaceMarkup', 'workspaceCopyAssets', 'workspaceHighChats');

// Define production Tasks
export const prodTasks = series(parallel('zipWorkspace', 'zipSecureroot', 'sizeReport'));

// Define common Tasks
export const commonTasks = series(parallel('watchTask', 'sizeReport', 'browser'));
