"use strict";

/* --------------------------------------------------------------------------------
    Gulp babel
    For reference, main build tasks are located ./gulp/tasks/base/build.js

/* -------------------------------------------------------------------------------- */

const { task, series } = require("gulp");
import {
  hseBuild,
  designsystemBuild,
  commonTasks,
  prodTasks,
} from "./gulp/tasks/base/build.js";
import requireDir from "require-dir";

// index all gulp tasks
requireDir("./gulp/tasks", { recurse: true });

// Default task
task("default", series(hseBuild, commonTasks));

// Development task
task("development", series(designsystemBuild, commonTasks));

// Production task
task("production", series(hseBuild, designsystemBuild, prodTasks));
