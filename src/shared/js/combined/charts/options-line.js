import { seriesData } from './series-data.js';
import { plotBand } from './plot-band';
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
        const colours = this.brandColours;
        const categoryData = chartCategories(this.container);
        const getSeriesData = seriesData(this.dataTable);
        const getPlotBand = plotBand(this.container, colours);

        const series = getSeriesData;

        const chart = {
            marginTop: 90
        }
        const xAxis = {
            categories: categoryData,
            plotBands: getPlotBand
        };

        const collection = this.collection;
        this.collection = {...collection, chart, xAxis, series};
        return this.collection;
    }
}
