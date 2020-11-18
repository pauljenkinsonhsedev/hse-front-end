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
        this.decimals = container.dataset.decimalPoint;
        this.xAxisText = container.dataset.xaxisText;

        let units = container.querySelectorAll('.unit');
        let total = 0;
        for (let i = 0; i < units.length; i++) {
            total += Number(units[i].innerText)
        }

        const getCategories = chartCategories(container);
        const getDataLabel = dataLabel(this.units, this.decimals, total);

        const dataLabelsPrefix = displayPrefix(this.units);
        const dataLabelsSuffix = displaySuffix(this.units);

        let plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    formatter: getDataLabel
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
                valuePrefix: dataLabelsPrefix,
                valueSuffix: dataLabelsSuffix
            }
        };

        const collection = this.collection;
        this.collection = {...collection, plotOptions, xAxis, accessibility};

        return this.collection;
    }
}
