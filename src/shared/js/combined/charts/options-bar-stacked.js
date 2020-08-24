import { ChartOptions } from './dependencies';

export class ChartOptionsBarStacked extends ChartOptions {
    constructor(container, collection){
        super(container, collection);
        this.defaults;
        this.init();
    }

    init() {
        let chart = {
            type: 'bar'
        };
        let xAxis = {
            categories: categories
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

        const defaults = this.defaults;
        this.collection = {...defaults, chart, xAxis, yAxis, legend, plotOptions};
        return this.collection;
    }
}
