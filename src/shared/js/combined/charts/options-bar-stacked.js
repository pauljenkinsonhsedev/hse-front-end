import { ChartOptions } from './dependencies';

/*
    Class @ChartOptionsBarStacked

    Description:
    - extends ChartOptions charts/options.js
    - sets options for stacked bar chart
*/

export class ChartOptionsBarStacked extends ChartOptions {
    constructor(container){
        super(container);
        this.collection;

        const chart = {
            type: 'bar'
        };

        const legend = {
            reversed: true
        };

        const plotOptions = {
            series: {
                stacking: 'normal'
            }
        };

        const collection = this.collection;
        this.collection = {...collection, chart, legend, plotOptions};
        return this.collection;
    }
}
