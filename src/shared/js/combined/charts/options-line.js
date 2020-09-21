import { seriesData } from './series-data.js';
import { chartCategories } from './chart-categories';
import { ChartOptions } from './dependencies';

/*
    Class @ChartOptionsLine

    Description:
    - extends ChartOptions charts/options.js
    - sets options for line chart
*/

export class ChartOptionsLine extends ChartOptions {
    constructor(container){
        super(container);

        const categoryData = chartCategories(this.container);
        const getSeriesData = seriesData(this.dataTable);
        const series = getSeriesData;

        const xAxis = {
            categories: categoryData,
        };

        const collection = this.collection;
        this.collection = {...collection, xAxis, series};
        return this.collection;
    }
}
