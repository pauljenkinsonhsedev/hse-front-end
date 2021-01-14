export function tableSortable(elem){
    const tableHeaders = elem.querySelectorAll('thead th');

    // Sorting event
    for (let i = 0; i < tableHeaders.length; i++) {
        tableHeaders[i].addEventListener('click', function (e) {
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

        let i, x, y, count = 0;
        let switching = true;

        let direction = 'ascending';

        while (switching) {
            switching = false;
            let rows = table.rows;

            for (i = 0; i < (rows.length - 1); i++) {
                var Switch = false;

                x = rows[i].getElementsByTagName('td')[n];
                y = rows[i + 1].getElementsByTagName('td')[n];

                if (direction == 'ascending') {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        Switch = true;
                        break;
                    }
                } else if (direction == 'descending') {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
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
