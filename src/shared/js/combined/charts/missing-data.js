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

export function missingData(data) {
    // collect all data
    for (var items in data) {
        const withData = [];
        const withoutData = [];
        const PrevNext = [];
        const units = data[items].data;
        const heading = data[items].name;

        // find index of value 0
        for (var key in units) {
            const value = units[key].y;

            if (value === 0) {
                withData.push(null);
            } else {
                withData.push(value);
            }
        }

        // set the previous and next values
        let emptyLength = 0;
        withData.map(function(a, i) {
            const prev = withData[i - 1];
            const next = withData[i + 1];
            const current = withData[i];
            emptyLength += (current === null);

            if (current === null) {
                if (prev != null) {
                    PrevNext.push(i);
                    PrevNext.push(prev);
                }
                if (next != null) {
                    PrevNext.push(next);
                    PrevNext.push(emptyLength);
                    emptyLength = 0;
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
                arr.push(parseInt(min + scaleBy * i))
            }
            return arr;
        }

        // create missing data
        function missingData() {
            const prevNextData = [...chunks(PrevNext, 4)];
            const missingDataArr = [];
            for (let i = 0; i < prevNextData.length; i++) {
                let pos = prevNextData[i][0];
                let prev = prevNextData[i][1];
                let next = prevNextData[i][2];
                let between = prevNextData[i][3] + 2;
                const ranges = range(prev, next, between);
                const toReturn = {
                    "pos": pos-1,
                    "data": ranges
                };
                missingDataArr.push(toReturn);
            }

            const subtract = Object.keys(missingDataArr).reduce((a, b) => missingDataArr[b].data.length + a, 0);
            const remainder = withData.length - subtract;

            for (let i = 0; i < remainder; i++) {
                withoutData.push(null);
            }

            for (let item of missingDataArr) {
                const pos = item.pos;
                const values = item.data;
                values.reverse();

                for (let val of values) {
                    // ('val', val);
                    withoutData.splice(pos, 0, val);
                }
            }

            return withoutData;
        }
        const missing = missingData();

        // set series data
        const seriesDataWithMissing = [{
            name: heading,
            data: withData,
            connectNulls: false,
            zIndex: 2
        },{
            name: 'Missing data',
            data: missing,
            connectNulls: false,
            color: '#999999',
            marker: {
                'enabled': false
            },
            dashStyle: 'ShortDash',
            zIndex: 1,
            showInLegend: true,
            enableMouseTracking: false
        }];

        return seriesDataWithMissing;
    }
}
