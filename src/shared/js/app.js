import CsvConvert from './combined/csv-convertor/csv-convertor';
import ChartsDefault from './combined/charts/charts';
import { mainMenu } from './combined/main-menu';
import { loadPicturefillFn } from './combined/utils/picture-elem.js';
import { fileTypeFunction } from './combined/file-type.js';
import { getInternetExplorerVersion } from './combined/utils/internet-explorer-detection.js';

// Window load
window.addEventListener('DOMContentLoaded',() => {

  // picturefill.min.js
  const pictureElem = document.getElementsByTagName('picture')[0];
  if (pictureElem && getInternetExplorerVersion() <= 11) {
    loadPicturefillFn();
  }

  // small device menu
  const menu = document.querySelector('.js-menu');
  if (menu) {
    mainMenu();
  }

  const htmlDoc = document.getElementsByTagName('html')[0];
  htmlDoc.classList.add('js-enabled');

  // CSV Convertor
  // const csvForm = document.getElementById('csvconvertor');
  // if (document.body.contains(csvForm)) {
  //   const convert = new CsvConvert(csvForm);
  //   convert.init(csvForm);
  // }

  // HighCharts JS
  const chartSelector = document.querySelector('.chart');
  if (document.body.contains(chartSelector)) {
    new ChartsDefault();
  }

  // Append file types to anchors
  const anchorSelector = document.querySelector('#pageContainer a');
  if (document.body.contains(anchorSelector)) {
    fileTypeFunction();
  }
}); // end window load
