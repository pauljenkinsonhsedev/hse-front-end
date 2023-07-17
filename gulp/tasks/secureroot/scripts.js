"use strict";

const { src, dest, task } = require("gulp");
import * as config from "../../config.json";
import concat from "gulp-concat";
import rename from "gulp-rename";
import { isDefault, isStaging, isDev, isProd } from "../base/mode.js";

let output;

if (isProd) {
  output = config.secureroot.scripts.output;
}

if (isDefault) {
  output = config.secureroot.scripts.output;
}

if (isStaging) {
  output = config.secureroot.scripts.output;
}

if (isDev) {
  output = config.designsystem.scripts.output;
}
console.log("output", output);
function hseScripts() {
  return src(config.secureroot.scripts.all)
    .pipe(concat(config.secureroot.scripts.entry))
    .pipe(rename("v6-footer.min.js"))
    .pipe(dest(output));
}

task("hseScripts", hseScripts);
