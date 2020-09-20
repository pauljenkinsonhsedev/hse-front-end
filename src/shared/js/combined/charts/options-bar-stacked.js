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

        let chart = {
            type: 'bar'
        };
        let xAxis = {
            categories: this.categories
        };
        let yAxis = {
            min: 0,
            title: {
                text: this.title
            }
        };
        let legend = {
            reversed: true
        };
        let plotOptions = {
            series: {
                stacking: 'normal'
            }
        };

        const collection = this.collection;
        this.collection = {...collection, chart, xAxis, yAxis, legend, plotOptions};
        return this.collection;
    }
}
