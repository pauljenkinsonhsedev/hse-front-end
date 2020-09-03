import { ChartOptions } from './dependencies';
import { seriesDataSingular } from './series-data-singular.js';

/*
    Class @ChartOptionsChartOptionsDonut

    Description:
    - extends ChartOptions charts/options.js
    - sets options for donut chart
*/

export class ChartOptionsDonut extends ChartOptions {
    constructor(container, collection){
        super(container, collection);
        this.defaults;
        this.init();
    }

    init() {
        let chart = {
            type: 'pie'
        };

        let pieOptions = {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: this.dataLabelsSuffix,
                connectorColor: 'silver'
            }
        }

        const getSeriesData = seriesDataSingular(this.dataTable);
        let series = getSeriesData;

        const titleText = this.title.replace(/ /g, '<br />');

        let title = {
            text: titleText,
            align: 'center',
            verticalAlign: 'middle',
            floating: true,
            y: 25,
            x: 0,
            style: {
                color: '#000',
                fontFamily: this.fontFamily,
                fontSize: '16px',
                fontWeight: 'bold'
            }
        };

        let plotOptions = {
            pie: {
                slicedOffset: 0,
                size: '100%',
                dataLabels: {
                    enabled: false
                },
                allowPointSelect: true,
                cursor: 'pointer',
                innerSize: '50%',
                dataLabels: {
                    enabled: true,
                    format: this.dataLabelsSuffix,
                    connectorColor: 'silver'
                }
            },
            series: {
                states:{
                    hover:{
                        halo: {
                            size: 1
                        }
                    }
                }
            }
        };

        const defaults = this.defaults;
        this.collection = {...defaults, chart, series, title, pieOptions, plotOptions};
        return this.collection;
    }
}
