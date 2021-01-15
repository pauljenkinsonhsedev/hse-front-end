import load from '../utils/asset-loader';
import envPath from '../utils/asset-env-path';

export function tableSortable(elem){
    const tableHeaders = elem.querySelectorAll('thead th');

    console.log('envPath', envPath);
    loadAssetsFn();

    // Sorting event
    for (let i = 0; i < tableHeaders.length; i++) {
        tableHeaders[i].addEventListener('click', function () {
            sortTable(i);
        });
    };

    // Table header event
    body.addEventListener('click', event => {
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
        const table = elem.querySelector('tbody');

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

//                 function regexDate(v) {
//    //basically build your regex here
// //    var exp = new RegExp("^de-->([^<]+).+?en[^>]+>([^<]+)$"); return exp.test(v);
//                     const  exp = new RegExp('^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g'); return exp.test(v);
//                 }
                // const regexDate = /^[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}$/g;

                // if (cellText.match(regexDate)) {
                //     console.log('has a match', cellNextText);
                //     // cellText = cellText.replace(/\\/g, '');
                //     // cellNextText = cellText.replace('/', '');
                //     cellText = moment(cellText).format('DDMMYYYY').toString();
                // }
                console.log(cellText);

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

// Get moment.js for cells that contain dates
function loadAssetsFn() {
    return Promise.all([
        load.js(envPath + '/assets/v5-js/vendor/moment/moment.js')
    ])
    .catch((err) => {
        console.error(`Error initiating charts: ${err}`);
    });
}

function convertDate (cellText) {
    cellText = moment(cellText).format('DDMMYYYY').toString();
}