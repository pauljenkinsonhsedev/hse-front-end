import Bowser from "bowser";
import load from '../utils/asset-loader';
import pathEnv from '../utils/asset-env-path';
import { collate } from './collate.js';

function loadmomentFn() {
  return Promise.all([
      load.js(pathEnv + '/assets/v5-js/vendor/moment/moment.js'),
  ])
  .catch((err) => {
      console.error(`Error initiating charts: ${err}`);
  });
}

export function printGuide() {

  const browser = Bowser.getParser(window.navigator.userAgent);
  const CTAPrintGuide = document.querySelector('.print-guide');
  const CTADownloadGuide = document.querySelector('.download-guide');

  if (!CTAPrintGuide || !CTADownloadGuide) {
    return;
  } else {
    loadmomentFn()
  }

  if (browser.getBrowserName() === 'Microsoft Edge') {
    CTAPrintGuide.classList.add('visually-hidden')
    CTAPrintGuide.disabled = true;
  }

  // events
  if (CTAPrintGuide) {
    const json = CTAPrintGuide.dataset.printGuide;
    CTAPrintGuide.addEventListener('click', (e) => {
      e.preventDefault();
      collate(json, 'print');
    });
  }

  if (CTADownloadGuide) {
    const json = CTADownloadGuide.dataset.printGuide;
    CTADownloadGuide.addEventListener('click', (e) => {
      e.preventDefault();
      collate(json, 'download');
    });
  }
}
