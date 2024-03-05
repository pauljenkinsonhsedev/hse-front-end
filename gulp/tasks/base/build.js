/*
    Build tasks for ./gulpfile.babel.js
*/

import { parallel, series } from "gulp";
import requireDir from "require-dir";

// index all gulp tasks
requireDir("../", { recurse: true });

// Define combined tasks for HSE
export const hseBuild = parallel(
  "hseStyles",
  "sharedScripts",
  "hseCopy",
  "hseImages"
);

// Define combined designsystem
export const designsystemBuild = parallel(
  "designStyles",
  "hseImages",
  "hseCopy",
  "sharedScripts",
  "designsystemCopyAssets",
  "designsystemHighChats"
);

// Define production Tasks
export const prodTasks = series(
  parallel("zipdesignsystem", "zipSecureroot", "sizeReport")
);

// Define common Tasks
export const commonTasks = series(
  parallel("watchTask", "sizeReport", "browser")
);
