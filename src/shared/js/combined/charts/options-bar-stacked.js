import { ChartOptions } from './dependencies';

/*
    Class @ChartOptionsBarStacked

    Description:
    - extends ChartOptions charts/options.js
    - sets options for stacked bar chart
*/

export class ChartOptionsBarStacked extends ChartOptions {
    constructor(container){
        super(container);
        this.collection;

        const chart = {
            type: 'bar'
        };

        const legend = {
            reversed: true
        };

        const yAxis = {
            min: 0,
            stackLabels: {
                enabled: true,
            }
        }

        const plotOptions = {
            column: {
            stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                borderWidth: 0,
                stacking: 'normal'
            }
        };

        const tooltip = {
            shared: true
        }

        const collection = this.collection;
        this.collection = {...collection, chart, yAxis, legend, plotOptions, tooltip};
        return this.collection;
    }
}
