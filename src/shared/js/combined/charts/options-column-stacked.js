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
            column: {
                stacking: 'normal',
            }
        };

        const collection = this.collection;
        this.collection = {...collection, chart, plotOptions};

        return this.collection;
    }
}
