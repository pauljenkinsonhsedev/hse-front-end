import load from './utils/asset-loader';

export function googleSearch() {

    return Promise.all([
      load.jsAsync(
        'https://cse.google.com/cse.js?cx=015848178315289032903:hqkynptgd1o'
      ),
    ])
    .then(() => {
        setTimeout(function() {
            const searchInput = document.querySelector('input.gsc-input');
            const searchLabel = document.createElement('label');

            searchLabel.innerHTML = 'Search hse.gov.uk';
            searchLabel.classList.add('hide');
            searchLabel.setAttribute('for', 'search');

            searchInput.insertAdjacentElement('beforebegin', searchLabel);
            searchInput.setAttribute('placeholder', 'Search hse.gov.uk');
        }, 10);
      })
      .catch((err) => {
        console.error(`Error creating custom google search: ${err}`);
      });
}
