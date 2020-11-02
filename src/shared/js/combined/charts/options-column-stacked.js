import { ChartOptions } from './dependencies';

/*
    Class @ChartOptionsBarStacked

    Description:
    - extends ChartOptions charts/options.js
    - sets options for stacked bar chart
*/

export class ChartOptionsColumnStacked extends ChartOptions {
    constructor(container){
        super(container);
        this.collection;

        const chart = {
            type: 'column'
        };

        const plotOptions = {
            series: {
                borderWidth: 0
            },
            column: {
                stacking: 'normal',
            }
        };

        const tooltip = {
            shared: true
        }

        const collection = this.collection;
        this.collection = {...collection, chart, plotOptions, tooltip};

        return this.collection;
    }
}
