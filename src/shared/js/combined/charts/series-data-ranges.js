import { missingDataArearange } from './missing-data-arearange.js';

export function seriesDataRanges(data) {
    const tbody = data.querySelector('.table__body');

    const missingArray = new Array;

    // build data sets
    const averages = [].reduce.call(tbody.rows, function (averages, row) {
        const cells = row.cells;
        const rangeAxis = [...cells].filter(element => element.classList.contains('series-range-axis'));
        const rangeAverage = [...cells].filter(element => element.classList.contains('series-range-average'));

        const averageData = rangeAxis.map((e, i) => {
            const getDate = rangeAxis[i].textContent;
            const average = Number(parseFloat(rangeAverage[i].textContent).toFixed(2).toLocaleString('en', {minimumFractionDigits: 0}));

            const array = new Array;
            array.push(getDate, average);

            missingArray.push(average)


            return array;
        });

        averages.push([].reduce.call(averageData, function(res, cell) {
            return cell;
        }, []));
        return averages;
    }, []);
    const test = missingDataArearange(missingArray);

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

    let averagesDataArray = new Array;
    let rangesDataArray = new Array;
    averagesDataArray.push(averages);
    rangesDataArray.push(ranges);

    // const missingAverages = missingDataAverages(averagesDataArray);
    // const missingRanges = missingDataRanges(rangesDataArray);


    // console.log('missingAverages', JSON.stringify(missingAverages, null, 2));
    // console.log('missingRanges', JSON.stringify(missingRanges, null, 2));
    // console.log('------------------------------------------------');
    // console.log('averagesDataArray', JSON.stringify(averagesDataArray, null, 2));
    // console.log('averagesDataArray', JSON.stringify(rangesDataArray, null, 2));

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