import { ChartOptions } from './dependencies';
import { seriesData } from './series-data.js';
import { chartCategories } from './chart-categories';
import { displaySuffix } from './data-suffix.js';

/*
    Class @ChartOptionsPie

    Description:
    - extends ChartOptions charts/options.js
    - sets options for pie chart
*/

export class ChartOptionsPie extends ChartOptions {
    constructor(container){
        super(container);
        this.dataTable = container.querySelector('.tabledata');
        this.units = container.dataset.chartUnits;
        this.xAxisText = container.dataset.xaxisText;

        const dataLabelsSuffix = displaySuffix(this.units);
        const getCategories = chartCategories(container);
        const getSeriesData = seriesData(this.dataTable);

        let series = getSeriesData;

        let plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: dataLabelsSuffix
                }
            }
        };

        let xAxis = [{
            categories: getCategories,
            title: {
                text: this.xAxisText
            },
            accessibility: {
                description: this.description
            }
        }];

        let accessibility = {
            point: {
                valueSuffix: '%'
            }
        };

        let tooltip = {
            pointFormat: dataLabelsSuffix
        };

        const collection = this.collection;
        this.collection = {...collection, plotOptions, xAxis, accessibility, tooltip};

        return this.collection;
    }
}
