export function tableSortable(container){
    const tableHeaders = container.querySelectorAll('thead th');

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

    // Check if the value is a date
    function validateDate(date) {
        try {
            if (date.length > 6) {
                new Date(date).toISOString()
                return true;
            }
        } catch (e) {
            return false;
        }
    }

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

                let date1;
                let date2;

                if (validateDate(cellText) === true) {
                    // date1 = Date.parse(cellText);
                    date1 = new Date(cellText).toISOString();
                    date2 = new Date(cellNextText).toISOString();
                    console.log('new date 1', date1);
                    console.log('new date 2', date2);

                    cellText = date1;
                    cellNextText = date2;
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
