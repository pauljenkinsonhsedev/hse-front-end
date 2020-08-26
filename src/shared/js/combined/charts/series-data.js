export function seriesData(data) {
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
    const seriesData = [].reduce.call(tbody.rows, function (seriesData, row) {
        const cells = row.cells;
        const category = [...cells].filter(element => element.classList.contains('category'));
        const unit = [...cells].filter(element => element.classList.contains('unit'));
        const cellData = unit.map((e, i) => {
            const name = category[i].innerHTML;
            const data = parseFloat(unit[i].innerHTML);

            // console.log(`name ${name}`);
            // console.log(`data ${data}`);
            const array = new Array;
            array.push({'name': name, 'data': data});

            console.log(`array ${JSON.stringify(array)}`);

            return array;
        });

        seriesData.push([].reduce.call(cellData, function(res, cell) {
            return cell;
        }, []));
        return seriesData;
    }, []);

    let seriesArray = new Array;
    seriesArray.push(seriesData);

    return seriesArray;
}