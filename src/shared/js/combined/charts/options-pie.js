import { ChartOptions } from './dependencies';
import { chartCategories } from './chart-categories';
import { displaySuffix } from './data-suffix.js';
import { dataLabel } from './data-label.js';

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
        const getDataLabel = dataLabel(this.units);

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
            pointFormat: getDataLabel,
            // valueSuffix: ` ${dataLabelsSuffix}`
        };

        const collection = this.collection;
        this.collection = {...collection, plotOptions, xAxis, accessibility, tooltip};

        return this.collection;
    }
}
