import CsvConvert from './combined/csv-convertor/csv-convertor';
import ChartsDefault from './combined/charts/charts';
import { mainMenu } from './combined/main-menu';
import { loadPicturefillFn } from './combined/utils/picture-elem.js';
import { fileTypeFunction } from './combined/file-type.js';
import { getInternetExplorerVersion } from './combined/utils/internet-explorer-detection.js';
import { tableSortable } from './combined/tables/table-sortable.js';
import { dialogModal } from './combined/dialogs.js';

// Window load
window.addEventListener('DOMContentLoaded',() => {

  // picturefill.min.js
  const pictureElemSelector = document.getElementsByTagName('picture')[0];
  if (pictureElemSelector && getInternetExplorerVersion() <= 11) {
    loadPicturefillFn();
  }

  // Aria
  const cookieContainer = document.querySelector('#cookieContainer');
  const breadcrumb = document.querySelector('#breadCrumb');
  if (breadcrumb) {
    const lastItem = breadcrumb.querySelector('li:last-of-type');
    lastItem.setAttribute('aria-current','page');
  }
  if (cookieContainer) {
    cookieContainer.setAttribute('aria-label','Cookie banner');
  }

  // small device menu
  const menu = document.querySelector('.js-menu');
  if (menu) {
    mainMenu();
  }

  // JS Enabled flag
  const htmlDoc = document.getElementsByTagName('html')[0];
  htmlDoc.classList.add('js-enabled');

  // Tables
  const tableSortableSelector = document.querySelector('.sortable');
  if (document.body.contains(tableSortableSelector)) {
    tableSortable(tableSortableSelector);
  }

  // Dialogs
  const dialog = document.querySelector('.dialog');
  if (document.body.contains(dialog)) {
    dialogModal(dialog);
  }

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
