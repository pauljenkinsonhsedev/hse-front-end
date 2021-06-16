import { seriesData } from './series-data.js';
import { chartCategories } from './chart-categories';
import { ChartOptions } from './dependencies';
import { dataTooltip } from './tooltip.js';
import { plotBand } from './plot-band';
import {red} from 'ansi-colors';
/*
    Class @ChartOptionsLine

    Description:
    - extends ChartOptions charts/options.js
    - sets options for line chart
*/

export class ChartOptionsDual extends ChartOptions {
    constructor(container){
        super(container);

        const type = this.type;
        const arr = type.split('-');

        const table = this.container.querySelectorAll('.tabledata');

        const table1 = table[0];
        const xAxisTitle1 = table1.dataset.yaxisText;
        const valueSuffix1 = table1.dataset.valueSuffix;

        const table2 = table[1];
        const xAxisTitle2 = table2.dataset.yaxisText;
        const valueSuffix2 = table2.dataset.valueSuffix;

        const getSeriesData1 = seriesData(table1);
        const getSeriesData2 = seriesData(table2);

        [...getSeriesData1].forEach((item)=>{
            item.type = arr[0];
            item.tooltip = {
                valueSuffix: ` ${valueSuffix1}`
            };
        });
        [...getSeriesData2].forEach((item)=>{
            item.type = arr[2];
            item.tooltip = {
                valueSuffix: ` ${valueSuffix2}`
            };
        });

        let series = [...getSeriesData1, ...getSeriesData2];

        const tooltip = {
            shared: true
        };

        const categoryData = chartCategories(table1);
        const getPlotBand = plotBand(this.container, this.brandGrayscale);
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

        const yAxis = [{
            title: {
                text: xAxisTitle1,
                style: {
                    fontFamily: this.fontFamily,
                    fontSize: '0.7rem',
                    fontWeight: 'regular',
                }
            },
            labels: {
                format: '{value} °C',
                style: {
                    fontFamily: this.fontFamily,
                    fontSize: '0.7rem',
                    fontWeight: 'regular',
                }
            },
        }, {
            title: {
                text: xAxisTitle2,
                style: {
                    fontFamily: this.fontFamily,
                    fontSize: '0.7rem',
                    fontWeight: 'regular',
                }
            },
            labels: {
                format: '{value} mm',
                style: {
                    fontFamily: this.fontFamily,
                    fontSize: '0.7rem',
                    fontWeight: 'regular',
                }
            },
            opposite: true
        }];

        const collection = this.collection;
        this.collection = {...collection, xAxis, yAxis, tooltip, series};
        return this.collection;
    }
}
