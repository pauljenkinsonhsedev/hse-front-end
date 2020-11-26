
/*
    series: [{
       data: [1, 2, 3, 4, 5, 6, 7, null, 9],
       connectNulls: false,
       zIndex: 2
     }, {
       data: [null, null, null, null, null, null, 7, 8, 9],
       connectNulls: false,
       color: 'red',
       marker: {
         enabled: false
       },
       dashStyle: 'dash',
       zIndex: 1,
       showInLegend: false,
       enableMouseTracking: false
     }]
*/

export function missingDataRanges(data) {
    const withData = [];
    const withoutData = [];
    const PrevNextLow = [];
    const PrevNextHigh = [];

    // collect all data
    for (let i = 0; i < data.length; i++) {
        const date = data[i][0];
        const low = data[i][1];
        const high = data[i][2];

        if (low === 0 || high === 0) {
            withData.push([date, null, null]);
        } else {
            withData.push([date, low, high]);
        }
    };

    let emptyLengthLow = 0;
    let emptyLengthHigh = 0;
    withData.map(function(a, i) {
        // set low
        let prevLow;
        let prevHigh;
        if (withData[i - 1] != undefined) {
            prevLow = withData[i - 1][1];
            nextHigh = withData[i - 1][2];
        } else {
            prevLow = null;
        }

        // set high
        let nextLow;
        let nextHigh;
        if (withData[i + 1] != undefined) {
            nextLow = withData[i + 1][1];
            nextHigh = withData[i + 1][2];
        } else {
            nextLow = null;
        }

        // set current
        const currentLow = withData[i][1];
        const currentHigh = withData[i][2];

        // set lengths
        emptyLengthLow += (currentLow === null);
        emptyLengthHigh += (currentHigh === null);

        if (currentLow === null) {
            if (prevLow != null) {
                PrevNextLow.push(i);
                PrevNextLow.push(prevLow);
            }
            if (nextLow != null) {
                PrevNextLow.push(nextLow);
                PrevNextLow.push(emptyLengthLow);

                emptyLengthLow = 0;
            }
        }

        if (currentHigh === null) {
            if (prevHigh != null) {
                PrevNextHigh.push(i);
                PrevNextHigh.push(prevHigh);
            }
            if (nextHigh != null) {
                PrevNextHigh.push(nextHigh);
                PrevNextHigh.push(emptyLengthHigh);

                emptyLengthHigh = 0;
            }
        }
    }, []);

    function* chunks(arr, n) {
        for (let i = 0; i < arr.length; i += n) {
            const num = parseInt(i + n);
            yield arr.slice(i, num);
        }
    };

    // create ranges
    const range = (min, max, numberOfSteps) => {
        const _numberOfSteps = numberOfSteps - 1
        const scaleBy = (max - min) / _numberOfSteps

        const arr = []
        for (let i = 0; i <= _numberOfSteps; i += 1) {
            arr.push(parseFloat(min + scaleBy * i))
        }
        return arr;
    }

    // create missing data
    function missingData() {
        const prevNextDataLow = [...chunks(PrevNextLow, 4)];
        const prevNextDataHigh = [...chunks(PrevNextHigh, 4)];
        const missingDataLowArr = [];
        const missingDataHighArr = [];

        for (let i = 0; i < prevNextDataLow.length; i++) {
            let posLow = prevNextDataLow[i][0];
            let prevLow = prevNextDataLow[i][1];
            let nextLow = prevNextDataLow[i][2];
            let betweenLow = prevNextDataLow[i][3] + 2;

            const rangeLow = range(prevLow, nextLow, betweenLow);
            const toReturn = {
                "pos": posLow-1,
                "data": rangeLow
            };

            missingDataLowArr.push(toReturn);
        }

        const subtractLow = Object.keys(missingDataLowArr).reduce((a, b) => missingDataLowArr[b].data.length + a, 0);
        const remainderLow = withData.length - subtractLow;

        for (let i = 0; i < prevNextDataHigh.length; i++) {

            let posHigh = prevNextDataHigh[i][0];
            let prevHigh = prevNextDataHigh[i][1];
            let nextHigh = prevNextDataHigh[i][2];
            let betweenHigh = prevNextDataHigh[i][3] + 2;

            const rangeHigh = range(prevHigh, nextHigh, betweenHigh);
            const toReturn = {
                "pos": posHigh-1,
                "data": rangeHigh
            };

            missingDataHighArr.push(toReturn);
        }

        const subtractHigh = Object.keys(missingDataHighArr).reduce((a, b) => missingDataHighArr[b].data.length + a, 0);
        const remainderHigh = withData.length - subtractHigh;

        for (let i = 0; i < remainderLow; i++) {
            withoutData.push(null);
        }

        for (let item of missingDataLowArr) {
            const pos = item.pos;
            const values = item.data;
            values.reverse();

            for (let val of values) {
                withoutData.splice(pos, 0, val);
            }
        }

        return withoutData;
    }
    const missing = missingData();

    console.log('missing', missing);

    // set series data
    const seriesDataWithMissing = [{
        name: 'heading',
        data: withData,
        connectNulls: false,
        zIndex: 2,
        fillOpacity: 0.3,
        color: '#b2182b',
        marker: {
            fillColor: 'white',
            lineWidth: 2,
            symbol: 'circle',
            lineColor: '#b2182b'
        }
    },{
        name: 'Missing data',
        data: missing,
        connectNulls: false,
        color: '#d6604d',
        marker: {
            'enabled': false
        },
        dashStyle: 'ShortDash',
        zIndex: 1,
        showInLegend: true,
        enableMouseTracking: false,
    }];

    return seriesDataWithMissing;

        // console.log('withData', withData);
        // console.log('withoutData', withoutData);

}
