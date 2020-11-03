import { ChartOptions } from './dependencies';
import { chartCategories } from './chart-categories';
import { dataLabel } from './data-label.js';
import { displayPrefix } from './data-prefix.js';
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

        const getCategories = chartCategories(container);
        const getDataLabel = dataLabel(this.units);
        const dataLabelsPrefix = displayPrefix(this.units);
        const dataLabelsSuffix = displaySuffix(this.units);
        
        let plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: getDataLabel
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
            },
            labels: {
                format: '{value:,.1f}'
            }
        }];

        let accessibility = {
            point: {
                valueSuffix: dataLabelsSuffix
            }
        };

        let tooltip = {
            pointFormat: `${dataLabelsPrefix}<b>{point.y:,.0f}</b>${dataLabelsSuffix}`
        };

        const collection = this.collection;
        this.collection = {...collection, plotOptions, xAxis, accessibility, tooltip};

        return this.collection;
    }
}
