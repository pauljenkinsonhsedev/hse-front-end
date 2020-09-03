import { ChartOptions } from './dependencies';
import { seriesDataSingular } from './series-data-singular.js';

/*
    Class @ChartOptionsPie

    Description:
    - extends ChartOptions charts/options.js
    - sets options for pie chart
*/

export class ChartOptionsPie extends ChartOptions {
    constructor(container, collection){
        super(container, collection);
        this.defaults;
        this.init();
    }

    init() {
        const getSeriesData = seriesDataSingular(this.dataTable);
        let series = getSeriesData;

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
        this.collection = {...defaults, series, pieOptions, plotOptions};
        return this.collection;
    }
}
