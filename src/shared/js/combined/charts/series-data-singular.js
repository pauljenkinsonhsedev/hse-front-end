export function seriesDataSingular(data) {
    const thead = data.querySelector('.table__head');
    const title = thead.rows[0].cells[1].textContent;
    const tbody = data.querySelector('.table__body');
    /*
        function @seriesDataSingular

        Description: sets default series data for HighCharts options where singular data sets are used

        usage:

        const getSeriesData = seriesDataSingular(tableObject);
        let series = getSeriesData; // can then be pushed into options array

        Outputs something like...

        series: [{
            "name": "Number of fruit",
            "data": [
                {"name": "Apples", "y" :7},
                {"name": "Pears", "y" :4},
                {"name": "Banana", "y" :3},
                {"name": "Plums", "y" :10},
                {"name": "Oranges", "y" :12}
            ]
        }]
    */

    // build data set
    const seriesData = [].reduce.call(tbody.rows, function (seriesData, row) {
        const cells = row.cells;
        const categories = [...cells].filter(element => element.classList.contains('category'));
        const units = [...cells].filter(element => element.classList.contains('unit'));

        const collection = categories.map((e, i) => {
            const category = categories[i].textContent;
            const unit = parseFloat(units[i].textContent);
            const obj = { name: category, y: unit };
            return obj;
        });

        seriesData.push([].reduce.call(collection, function(res, cell) {
            const array = [];
            array.push({data: cell});
            return cell;
        }, []));

        return seriesData;
    }, []);

    let seriesArray = new Array;
    seriesArray.push({name: title, data: seriesData});
    return seriesArray;
}