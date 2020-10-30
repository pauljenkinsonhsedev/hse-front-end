import { seriesData } from './series-data.js';
import { chartCategories } from './chart-categories';
import { ChartOptions } from './dependencies';
import { missingData } from './missing-data.js';
import { plotBand } from './plot-band';
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
        let flag = false;
        const checkForNull = getSeriesData.reduce(function (result, item) {
            for (let a of item.data) {
                if (a.y === 0) {
                    flag = true;
                }
            }
            return flag;
        }, 0);

        let series = getSeriesData;
        const getPlotBand = plotBand(this.container, this.brandColours);

        if (checkForNull === true) {
            series = missingData(getSeriesData);
        }

        const xAxis = {
            categories: categoryData,
            plotBands: getPlotBand
        };

        const collection = this.collection;
        this.collection = {...collection, xAxis, series};
        return this.collection;
    }
}
