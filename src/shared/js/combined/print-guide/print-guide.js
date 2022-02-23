import { collate } from './collate.js';

export function printGuide() {
  const CTAPrintGuide = document.querySelector('.print-guide');
  const CTADownloadGuide = document.querySelector('.download-guide');

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
