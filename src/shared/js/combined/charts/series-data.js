export function seriesData(data) {
    /*
        function @seriesData

        Description: sets default series data to be used in HighCharts options

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
    const thead = data.querySelector('.table__head');
    const tbody = data.querySelector('.table__body');

    function getData() {
        let unitLength = tbody.rows[0].querySelectorAll('.unit').length,
            rowLength = tbody.rows.length,
            headingsArray = new Array,
            seriesData = new Array;

        if (unitLength < 0) {
            return null;
        }

        for (let u = 0; u < unitLength; u++) {
            const unitArray = new Array;
            const errorArray = new Array;
            const heading = thead.rows[0].querySelectorAll('.heading');
            headingsArray.push(heading[u].innerText);

            for (let i = 0; i < rowLength; i++) {
                const text = tbody.rows[i].querySelectorAll('.unit');

                for (let j = 0; j < unitLength; j++) {
                    let value = parseFloat(text[j].innerText);
                    if (j === u) {
                        unitArray.push(value);
                    }
                }

                for (let k = 0; k < unitLength; k++) {
                    const low = tbody.rows[i].querySelectorAll('.error-low');
                    const high = tbody.rows[i].querySelectorAll('.error-high');


                    if (low.length > 0 && k === u) {
                        const errorLowText = parseFloat(low[k].innerText);
                        const errorHighText = parseFloat(high[k].innerText);
                        errorArray.push([errorLowText, errorHighText]);
                    }
                }
            }

            const unitdata = {
                name: headingsArray[u],
                yAxis: 0,
                data: unitArray
            };

            const errorBar = {
                name: `${headingsArray[u]} interval`,
                type: 'errorbar',
                yAxis: 0,
                data: errorArray,
                showInLegend: false,
                tooltip: {
                    pointFormat: `(Interval range: <strong>{point.low}-{point.high}</strong><br />`
                }
            };

            if (errorArray.length > 0) {
                seriesData.push(unitdata, errorBar);
            } else {
                seriesData.push(unitdata);
            }
        }
        return seriesData;
    }

    const seriesDataOutput = getData();
    return seriesDataOutput;
}