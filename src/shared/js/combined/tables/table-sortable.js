import load from '../utils/asset-loader';
import pathEnv from '../utils/asset-env-path';

function loadmomentFn() {
    return Promise.all([
        load.js(pathEnv + '/assets/v5-js/vendor/moment/moment.js'),
    ])
    .catch((err) => {
        console.error(`Error initiating charts: ${err}`);
    });
}

// Check if the value is a date
function validateDate(date) {
    try {
        if (date.length > 6) {
            new Date(date).toISOString();
            return true;
        }
    } catch (e) {
        return false;
    }
}

function convertDate(date) {
    const x = new Date(date).toISOString();
    return moment(x).format('YYYY/DD/MM').toString();
}

export function tableSortable(container){
    const tableHeaders = container.querySelectorAll('thead th');

    // Load moment.js for date conversions
    loadmomentFn();

    // Sorting event
    for (let i = 0; i < tableHeaders.length; i++) {
        tableHeaders[i].addEventListener('click', function () {
            sortTable(i);
        });
    };

    // Table header event
    container.addEventListener('click', event => {
        tableHeaders.forEach(function callback(item) {
            if (event.target !== item) {
                item.classList.remove('sorted-asc');
                item.classList.remove('sorted-desc');
                return
            } else {
                if (!item.classList || item.classList.contains('sorted-desc')) {
                    item.classList.remove('sorted-desc');
                    !item.classList.contains('sorted-asc') ? item.classList.add('sorted-asc'): item.classList.remove('sorted-asc');
                } else {
                    item.classList.remove('sorted-asc');
                    !item.classList.contains('sorted-desc') ? item.classList.add('sorted-desc'): item.classList.remove('sorted-desc');
                }
            }
        });
    });

    function sortTable(n) {
        const table = container.querySelector('tbody');

        let i, cell, cellNext, count = 0;
        let switching = true;

        let direction = 'ascending';

        while (switching) {
            switching = false;
            let rows = table.rows;

            for (i = 0; i < (rows.length - 1); i++) {
                var Switch = false;

                cell = rows[i].getElementsByTagName('td')[n];
                cellNext = rows[i + 1].getElementsByTagName('td')[n];

                let cellText = cell.innerHTML.toLowerCase();
                let cellNextText = cellNext.innerHTML.toLowerCase();

                if (validateDate(cellText) === true) {
                    cellText = convertDate(cellText);
                    cellNextText = convertDate(cellNextText);
                }

                if (direction == 'ascending') {
                    if (cellText > cellNextText) {
                        Switch = true;
                        break;
                    }
                } else if (direction == 'descending') {
                    if (cellText < cellNextText) {
                        Switch = true;
                        break;
                    }
                }
            }

            if (Switch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;

                count++;
            } else {
                if (count == 0 && direction == 'ascending') {
                    direction = 'descending';
                    switching = true;
                }
            }
        }
    }
}
