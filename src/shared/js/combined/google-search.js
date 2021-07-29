import load from './utils/asset-loader';

export function googleSearch() {

    let script = 'https://cse.google.com/cse.js?cx=015848178315289032903:hqkynptgd1o';

    let promises = [];
    promises.push(load.jsAsync(script));

    Promise.all(promises)
    .then(() => {
        setTimeout(function () {
          const searchInput = document.querySelector('input.gsc-input');
          const searchTable = document.querySelector('table.gsc-search-box');
          const searchTable2 = document.querySelector('table.gsc-input');
          const searchTable3 = document.querySelector('table.gssb_c');

          if (searchInput) {
            const searchLabel = document.createElement('label');

            searchLabel.innerHTML = 'Search hse.gov.uk';
            searchLabel.classList.add('hide');
            searchLabel.setAttribute('for', 'gsc-i-id1');

            searchInput.insertAdjacentElement('beforebegin', searchLabel);
            searchInput.setAttribute('placeholder', 'Search hse.gov.uk');

            searchTable.removeAttribute('cellpadding');
            searchTable.removeAttribute('cellspacing');
            searchTable2.removeAttribute('cellpadding');
            searchTable2.removeAttribute('cellspacing');
            searchTable3.removeAttribute('cellpadding');
            searchTable3.removeAttribute('cellspacing');
          }
        }, 10);
    })
    .catch((err) => {
        console.error(err);
    });
}
