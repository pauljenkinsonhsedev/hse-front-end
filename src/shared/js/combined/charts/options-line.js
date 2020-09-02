import { seriesData } from './series-data.js';
import { ChartOptions } from './dependencies';

/*
    Class @ChartOptionsLine

    Description:
    - extends ChartOptions charts/options.js
    - sets options for line chart
*/

export class ChartOptionsLine extends ChartOptions {
    constructor(container, collection){
        super(container, collection);
        this.defaults;
        this.init();
    }

    init() {
        const getSeriesData = seriesData(this.dataTable);
        let series = getSeriesData;

        let plotOptions = {
                series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 0
            }
        };

        let xAxis = {
            categories: this.categories
        };

        const defaults = this.defaults;
        this.collection = {...defaults, xAxis, plotOptions, series};
        return this.collection;
    }
}
