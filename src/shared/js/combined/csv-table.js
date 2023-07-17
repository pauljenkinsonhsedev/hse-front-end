import load from './utils/asset-loader';
import pathEnv from './utils/asset-env-path';
import { tableSortable } from './tables/table-sortable.js';

function loadPapaparseFn() {
    return Promise.all([
        load.js(pathEnv + '/assets/v6-js/vendor/papaparse/papaparse.min.js'),
    ])
    .catch((err) => {
        console.error(`Error initiating CSV tables: ${err}`);
    });
}

export function CSVTable() {
    const tableContainer = document.querySelectorAll('.csv-table');

    if (!tableContainer.length > 0) {
        return;
    }

    // load dependencies
    loadPapaparseFn().then(() => {
        tableContainer.forEach((item) => {
            const file = `./csv/${item.dataset.csv}`;
            const classes = item.dataset.classes;
            const captionText = item.dataset.caption;
            const json = Papa.parse(file, {
                download: true,
                complete: function(results) {
                    const table = buildTable(results.data, classes, captionText);
                    item.appendChild(table);

                    if (classes && classes.includes('sortable')) {
                        tableSortable(item);
                    }
                }
            });
        });
    });
}

function buildTable(csvData, classes, captionText) {
    const table = document.createElement('table');
    const caption = document.createElement('caption');
    const tableBody = document.createElement('tbody');
    const tableHead = document.createElement('thead');

    table.classList.add('table');
    if (classes) {
        table.classList.add(classes);
    }
    tableBody.classList.add('table__body');
    tableHead.classList.add('table__head');

    if (captionText) {
        caption.textContent = captionText;
        table.appendChild(caption);
    }

    csvData.forEach(function(rowData, i) {
      let rowCount = i;
      let cell;
      const row = document.createElement('tr');
      row.classList.add('table__row');
      rowData.forEach(function(cellData) {
        if (rowCount === 0) {
          cell = document.createElement('th');
          cell.scope = 'col'
          cell.classList.add('heading');
        } else {
          cell = document.createElement('td');
        }
        // Create cell classnames
        cell.classList.add('table__cell');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
      if (rowCount === 0) {
        tableHead.appendChild(row);
      } else {
        tableBody.appendChild(row);
      }
    });
    table.appendChild(tableHead);
    table.appendChild(tableBody);

    return table;
}