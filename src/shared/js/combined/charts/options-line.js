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
        const getPlotBand = plotBand(this.container, this.brandGrayscale);

        if (checkForNull === true) {
            series = missingData(getSeriesData);
        }

        const xAxis = {
            showLastlabel: true,
            categories: categoryData,
            plotBands: getPlotBand,
            title: {
                text: this.xAxisText,
                align: 'high'
            }
        };

        const yAxis = {
            title: {
                text: this.yAxisText,
                style: {
                    fontWeight: 'bold',
                }
            },
            max: null,
            min: 0
        }

        const collection = this.collection;
        this.collection = {...collection, xAxis, yAxis, series};
        return this.collection;
    }
}
