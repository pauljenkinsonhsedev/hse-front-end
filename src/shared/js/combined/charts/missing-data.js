//     series: [{
//       data: [4, 5, 1, null, 3, 4, 2, null, 5, 6],
//       connectNulls: false,
//       zIndex: 2
//     }, {
//       /* differently formatted series for "null" values in first series
//       prevent from showing up in legend and prevent series from showing in tooltip on mouse over */
//       data: [null, null, 1, 2, 3, null, 2, 3.5, 5, null],
//       connectNulls: false,
//       color: 'red',
//       marker: {
//         enabled: false
//       },
//       dashStyle: 'dash',
//       zIndex: 1,
//       showInLegend: false,
//       enableMouseTracking: false
//     }]


export function missingData(data) {
    const units = data[0].data;
    const length = data[0].data.length;

    for (let i = 0; i < length; i++) {
        const unit = units[i].y;

        if (unit === 0) {
            const previous = units[i - 1].y;
            const next = units[i + 1].y;
            unit = null;
            console.log(previous);
            console.log(next);
            console.log(units[i]);
        }
    }
}