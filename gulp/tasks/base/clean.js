const del = require("del");
import * as config from "../../config.json";

function cleanScriptsSecure() {
  return del([config.secureroot.scripts.output]);
}

function cleanStylesSecure() {
  return del([config.secureroot.styles.output]);
}

function cleanImagesSecure() {
  return del([config.secureroot.images.output]);
}

function cleanScriptsdesignsystem() {
  return del([config.designsystem.scripts.output]);
}

function cleanStylesdesignsystem() {
  return del([config.designsystem.styles.output]);
}

function cleanImagesdesignsystem() {
  return del([config.designsystem.images.output]);
}

function cleanMarkup() {
  return del([config.designsystem.scripts.output]);
}
