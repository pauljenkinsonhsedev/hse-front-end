import CsvConvert from './combined/csv-convertor/csv-convertor';
import ChartsDefault from './combined/charts/charts';
import { mainMenu } from './combined/main-menu';
import { loadPicturefillFn } from './combined/utils/picture-elem.js';
import { fileTypeFunction } from './combined/file-type.js';
import { getInternetExplorerVersion } from './combined/utils/internet-explorer-detection.js';
import { tableSortable } from './combined/tables/table-sortable.js';
import { lightbox } from './combined/lightbox.js';
import { feedbackSurvey } from './combined/feedback-survey.js';
import { dialogModal } from './combined/dialogs.js';
import { tabs } from './combined/tabs.js';
import { backLinks } from './combined/back-link.js';
import { ariaLabels } from './combined/aria-labels.js';
import { googleSearch } from './combined/google-search.js';
import { footnoteLinks } from './combined/footnote-links.js';
import { footnoteAbbr } from './combined/footnote-abbr.js';

// Window load
window.addEventListener('DOMContentLoaded',() => {

  // picturefill.min.js
  const pictureElemSelector = document.getElementsByTagName('picture')[0];
  if (pictureElemSelector && getInternetExplorerVersion() <= 11) {
    loadPicturefillFn();
  }

  // aria labels
  ariaLabels();

  // footnotes (for printed pages)
  footnoteLinks();
  footnoteAbbr();

  const googleSearchContainer = document.getElementById('globalSearch');
  if (googleSearchContainer) {
    googleSearch();
  }

  // Back links
  const backLink = document.querySelector('#backTo');
  if (backLink) {
    backLinks();
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

  // Tabs
  const tabSelector = document.querySelector('.tabs');
  if (document.body.contains(tabSelector)) {
    tabs(tabSelector);
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

  lightbox();

  feedbackSurvey();
}); // end window load
