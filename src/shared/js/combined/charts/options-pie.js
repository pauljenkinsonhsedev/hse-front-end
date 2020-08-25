import { ChartOptions } from './dependencies';

/*
    @ChartOptionsPie
    extends ChartOptions charts/options.js

    sets options for pie chart
*/

export class ChartOptionsPie extends ChartOptions {
    constructor(container, collection){
        super(container, collection);
        this.defaults;
        this.init();
    }

    init() {
        let pieOptions = {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: this.dataLabelsSuffix,
                connectorColor: 'silver'
            }
        }
        let plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: this.dataLabelsSuffix,
                    connectorColor: 'silver'
                }
            }
        };
        const defaults = this.defaults;
        this.collection = {...defaults, pieOptions, plotOptions};
        return this.collection;
    }
}
