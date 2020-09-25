import {Z_BUF_ERROR} from 'zlib';

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
    const removeItem = new Array;

    const range = (min, max, numberOfSteps) => {
        const _numberOfSteps = numberOfSteps - 1
        const scaleBy = (max - min) / _numberOfSteps

        const arr = []
        for (let i = 0; i <= _numberOfSteps; i += 1) {
            arr.push(min + scaleBy * i)
        }
        return arr
    }

    for (var items in data) {
        const withData = new Array;
        const withoutData = new Array;
        const zero = new Array;
        const units = data[items].data;
        const length = data[items].data.length;


        function groupBy(collection, property) {
            var i = 0, val, index,
                values = [], result = [];
            for (; i < collection.length; i++) {
                val = collection[i][property];
                index = values.indexOf(val);
                if (index > -1)
                    result[index].push(collection[i]);
                else {
                    values.push(val);
                    result.push([collection[i]]);
                }
            }
            return result;
        }

        var obj = groupBy(units, "y");
        console.log(obj);

        // find index of value 0
        for (var key in units) {
            let previousKey;
            let nextKey;
            let previousValue;
            let nextValue;
            const index = parseInt(key);
            const value = units[key].y;
            const next = parseInt(key)+1;

            if (value === 0) {
                withData.push(null);
            } else {
                withData.push(value);
            }
                // console.log(`index ${key}`);

            if (value === 0) {
                // set previous and next


                if(key > 0) {
                    previousKey = index-1;
                    previousValue = units[previousKey].y;
                } else {
                    previousValue = null;
                }
                if(key <= length) {
                    nextKey = index+1;
                    nextValue = units[nextKey].y;
                } else {
                    nextValue = null;
                }
                const rangeValues = range(previousValue, nextValue, removeItem.length);
                console.log(`zero ${JSON.stringify(zero)}`);
                // console.log(`previousValue ${JSON.stringify(previousValue)}`);
                // console.log(`nextValue ${JSON.stringify(nextValue)}`);
                // console.log(`rangeValues ${JSON.stringify(rangeValues)}`);

                // set items to remove
                removeItem.push(previousKey, nextKey);



                withoutData.push(previousValue, nextValue);

            } else {
                withoutData.push(null);
            }
        }

        // remove items
        for (let i of removeItem) {
            withoutData.splice(i, 1);
        }

        // console.log(`withoutData: ${JSON.stringify(withoutData, null, 2)}`)
        const seriesDataWithMissing =
            [{
                data: withData,
                connectNulls: false,
                zIndex: 2
            },{
                data: withoutData,
                connectNulls: false,
                color: '#CCC',
                marker: {
                    'enabled': false
                },
                dashStyle: 'dash',
                zIndex: 1,
                showInLegend: false,
                enableMouseTracking: false
            }];

        return seriesDataWithMissing;
    }
    }
