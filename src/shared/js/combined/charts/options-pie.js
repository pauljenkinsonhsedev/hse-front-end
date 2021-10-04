import { ChartOptions } from './dependencies';
import { chartCategories } from './chart-categories';
import { dataLabel } from './data-label.js';
import { displayPrefix } from './data-prefix.js';
import { displaySuffix } from './data-suffix.js';
import { mediaQuery } from '../utils/media-query.js';

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
        // this.xAxisText = container.dataset.xaxisText;

        let units = container.querySelectorAll('.unit');
        let total = 0;
        for (let i = 0; i < units.length; i++) {
            total += Number(units[i].innerText)
        }

        const mediaquery = mediaQuery();
        if (mediaquery === 'small') {
            this.pieSize = '150px';
            this.alignTo = 'plotEdges';
        } else {
            this.pieSize = '220px';
            this.alignTo = false;
        }

        const getCategories = chartCategories(container);
        const getDataLabel = dataLabel(this.units, this.decimals, total);

        const dataLabelsPrefix = displayPrefix(this.units);
        const dataLabelsSuffix = displaySuffix(this.units);

        let plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size: this.pieSize,
                dataLabels: {
                    enabled: true,
                    alignTo: this.alignTo,
                    connectorColor: '#ccc',
                    formatter: getDataLabel,
                    style: {
                        fontFamily: this.fontFamily,
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                    }
                }
            }
        };

        let accessibility = {
            point: {
                valuePrefix: dataLabelsPrefix,
                valueSuffix: dataLabelsSuffix
            }
        };

        const collection = this.collection;
        this.collection = {...collection, plotOptions, ...accessibility};

        return this.collection;
    }
}
