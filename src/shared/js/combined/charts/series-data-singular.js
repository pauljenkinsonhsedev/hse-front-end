export function seriesDataSingular(data) {
    const tbody = data.querySelector('.table__body');
    /*
        function @seriesData

        Description: sets default series data for HighCharts options

        usage:

        const getSeriesData = seriesData(tableObject);
        let series = getSeriesData[0]; // can then be pushed into options array

        Outputs something like...

        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    */

    // build data set
    function getCol(col) {
        let n = tbody.rows.length;
        let i, units = [], tr, td, values;

        if (col < 0) {
            return null;
        }

        for (i = 0; i < n; i++) {
            tr = tbody.rows[i];
            if (tr.cells.length > col) {
                td = tr.cells[col];
                const data = td.innerText;
                let name = String;
                let number = Number;
                if (Number(data)) {
                    number = parseInt(data);
                }
                if (!Number(data)) {
                    name = data;
                }
                values = {name: data, y: parseInt(data)}
            }
            units.push(values);
        }
        return units;
    }


    let seriesArray = new Array;
    const unitLength = tbody.rows[0].cells.length;
    for (let i = 0; i < unitLength; i++) {
        const data = getCol(i);
        console.log(data)
    }

    // console.log(JSON.stringify(seriesArray));
    return seriesArray;
}