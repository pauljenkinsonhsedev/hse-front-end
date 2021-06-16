import { seriesData } from './series-data.js';
import { chartCategories } from './chart-categories';
import { ChartOptions } from './dependencies';
import { missingData } from './missing-data.js';
import { plotBand } from './plot-band';
import {red} from 'ansi-colors';
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
                align: 'high',
                style: {
                    fontFamily: this.fontFamily,
                    fontSize: '0.7rem',
                    fontWeight: 'regular',
                }
            },
            labels: {
                overflow: 'justify',
                style: {
                    fontFamily: this.fontFamily,
                    fontSize: '0.7rem',
                    fontWeight: 'regular',
                }
            },
        };

        const yAxis = {
            labels: {
                style: {
                    fontFamily: this.fontFamily,
                    fontSize: '0.9rem',
                    fontWeight: 'regular'
                }
            },
            title: {
                text: this.yAxisText,
                style: {
                    fontWeight: 'bold'
                }
            },
            labels: {
                format: '{value:,.0f}',
                style: {
                    fontFamily: this.fontFamily,
                    fontSize: '0.7rem',
                    fontWeight: 'regular',
                }
            },
            max: null,
            min: 0,
            gridLineWidth: this.gridLineWidth,
            minorGridLineWidth: this.gridLineWidth
        }

        const collection = this.collection;
        this.collection = {...collection, xAxis, yAxis, series};
        return this.collection;
    }
}
