import Bowser from "bowser";
import { collate } from './collate.js';

export function printGuide() {

  const browser = Bowser.getParser(window.navigator.userAgent);
  const CTAPrintGuide = document.querySelector('.print-guide');
  const CTADownloadGuide = document.querySelector('.download-guide');

  console.log(`browser name: ${browser.getBrowserName()}`)
  if (browser.getBrowserName() === 'Chrome') {
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
