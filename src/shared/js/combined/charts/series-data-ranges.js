export function seriesDataRanges(data) {
    const tbody = data.querySelector('.table__body');

    // build data sets
    const averages = [].reduce.call(tbody.rows, function (averages, row) {
        const cells = row.cells;
        const rangeAxis = [...cells].filter(element => element.classList.contains('series-range-axis'));
        const rangeAverage = [...cells].filter(element => element.classList.contains('series-range-average'));

        const averageData = rangeAxis.map((e, i) => {
            const getDate = rangeAxis[i].textContent;
            const average = Number(parseFloat(rangeAverage[i].textContent).toFixed(2).toLocaleString('en', {minimumFractionDigits: 0}));

            const array = new Array;
            array.push(average);

            return array;
        });

        averages.push([].reduce.call(averageData, function(res, cell) {
            return cell;
        }, []));
        return averages;
    }, []);

    const ranges = [].reduce.call(tbody.rows, function (ranges, row) {
        const cells = row.cells;
        const rangeAxis = [...cells].filter(element => element.classList.contains('series-range-axis'));
        const rangeLow = [...cells].filter(element => element.classList.contains('series-range-low'));
        const rangeHigh = [...cells].filter(element => element.classList.contains('series-range-high'));

        const rangeData = rangeAxis.map((e, i) => {
            const getDate = rangeAxis[i].textContent;
            const range1 = Number(parseFloat(rangeLow[i].textContent).toFixed(2).toLocaleString('en', {minimumFractionDigits: 0}));
            const range2 = Number(parseFloat(rangeHigh[i].textContent).toFixed(2).toLocaleString('en', {minimumFractionDigits: 0}));
            const array = new Array;
            array.push(getDate, range1, range2);
            return array;
        });


        ranges.push([].reduce.call(rangeData, function(res, cell) {
            return cell;
        }, []));
        return ranges;
    }, []);

    const rangesHigh = [].reduce.call(tbody.rows, function (ranges, row) {
        const cells = row.cells;
        const rangeAxis = [...cells].filter(element => element.classList.contains('series-range-axis'));
        const rangeHigh = [...cells].filter(element => element.classList.contains('series-range-high'));

        const rangeHighData = rangeAxis.map((e, i) => {
            const getDate = rangeAxis[i].textContent;
            const range = Number(parseFloat(rangeHigh[i].textContent).toFixed(2).toLocaleString('en', {minimumFractionDigits: 0}));
            const array = new Array;
            array.push(getDate, range);
            return array;
        });

        ranges.push([].reduce.call(rangeHighData, function(res, cell) {
            return cell;
        }, []));
        return ranges;
    }, []);

    let averagesDataArray = new Array;
    let rangesDataArray = new Array;
    averagesDataArray.push(averages);
    rangesDataArray.push(ranges);

    const fn = {
        averagesData(){
            return averagesDataArray;
        },
        rangesData(){
            return rangesDataArray;
        }
    }

    return fn;
}