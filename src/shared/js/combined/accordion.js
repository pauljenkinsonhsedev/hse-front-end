import load from './utils/asset-loader';
import pathEnv from './utils/asset-env-path';

// load a11y_accordions plugin for accordions

export function accordion() {
    const accordion = document.querySelector('[data-aria-accordion]');
    if (!accordion) {
        return;
    }

    return Promise.all([
      load.js(pathEnv + '/assets/v5-js/vendor/a11y_accordions/index.js'),
    ]).catch((err) => {
      console.error(`Error initiating accordion: ${err}`);
    });
}
