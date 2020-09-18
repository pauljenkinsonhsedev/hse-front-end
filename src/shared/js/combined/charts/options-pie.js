import { ChartOptions } from './dependencies';
import { seriesData } from './series-data.js';
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
        this.defaults;

        const dataLabelsSuffix = displaySuffix(this.units);
        const getSeriesData = seriesData(this.dataTable);

        let series = getSeriesData;

        let chart = {
            type: 'pie'
        }

        let plotOptions = {
            series: {
                showInLegend: false
            },
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        };

        let accessibility = {
            point: {
                valueSuffix: '%'
            }
        };

        let tooltip = {
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        };

        const defaults = this.defaults;
        this.collection = {series, plotOptions, accessibility, tooltip};

        // console.log(`collection ${JSON.stringify(this.collection, null, 2)}`);
    }

    init() {
        // const getSeriesData = seriesDataSingular(this.dataTable);
        // let series = getSeriesData;

        // let pieOptions = {
        //     allowPointSelect: true,
        //     cursor: 'pointer',
        //     dataLabels: {
        //         enabled: true,
        //         format: this.dataLabelsSuffix,
        //         connectorColor: 'silver'
        //     }
        // }
        // let plotOptions = {
        //     pie: {
        //         allowPointSelect: true,
        //         cursor: 'pointer',
        //         dataLabels: {
        //             enabled: true,
        //             format: this.dataLabelsSuffix,
        //             connectorColor: 'silver'
        //         }
        //     }
        // };
        // const defaults = this.defaults;
        // this.collection = {...defaults, series, pieOptions, plotOptions};
        // return this.collection;
    }
}
