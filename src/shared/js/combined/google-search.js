import load from './utils/asset-loader';

export function googleSearch() {

    let script = 'https://cse.google.com/cse.js?cx=015848178315289032903:hqkynptgd1o';

    let promises = [];
    promises.push(load.jsAsync(script));

    Promise.all(promises)
    .then(() => {
        setTimeout(function () {
        const searchInput = document.querySelector('input.gsc-input');

        if (searchInput) {
          const searchLabel = document.createElement('label');

          searchLabel.innerHTML = 'Search hse.gov.uk';
          searchLabel.classList.add('hide');
          searchLabel.setAttribute('for', 'gsc-i-id1');

          searchInput.insertAdjacentElement('beforebegin', searchLabel);
          searchInput.setAttribute('placeholder', 'Search hse.gov.uk');
        }
        }, 0);
    })
    .catch((err) => {
        console.error(err);
    });
    }
