"use strict";

import { src, dest, task } from "gulp";
import zip from "gulp-zip";
import notify from "gulp-notify";
import { execSync } from "child_process";
import * as config from "../../config.json";
import * as proj from "../../../package.json";

// Check if terminal-notifier exists
let notificationsEnabled = true;
try {
  execSync("which terminal-notifier", { stdio: "ignore" });
} catch {
  console.warn("terminal-notifier not found. Notifications disabled.");
  notificationsEnabled = false;
}

// Safe notification function
function notifyZip(zipName) {
  const msg = `${proj.name} - ${zipName} zipped successfully`;
  console.log(msg);

  if (!notificationsEnabled) return;

  // Fire notification asynchronously, outside the stream
  notify({ message: msg, onLast: true, sound: false }, (err) => {
    if (err) console.error("Notification error:", err);
  });
}

// Zip tasks
function zipSecureroot(done) {
  const zipName = "secureroot.zip";
  src([`${config.secureroot.copy.output}/**/*`])
    .pipe(zip(zipName))
    .pipe(dest("./"))
    .on("end", () => notifyZip(zipName));
  done();
}

function zipdesignsystem(done) {
  const zipName = "designsystem.zip";
  src([`${config.designsystem.output}/**/*`])
    .pipe(zip(zipName))
    .pipe(dest("./"))
    .on("end", () => notifyZip(zipName));
  done();
}

// Register Gulp tasks
task("zipSecureroot", zipSecureroot);
task("zipdesignsystem", zipdesignsystem);
