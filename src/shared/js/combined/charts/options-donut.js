import { ChartOptions } from './dependencies';
import { seriesData } from './series-data.js';
import { dataLabel } from './data-label.js';

/*
    Class @ChartOptionsChartOptionsDonut

    Description:
    - extends ChartOptions charts/options.js
    - sets options for donut chart
*/

export class ChartOptionsDonut extends ChartOptions {
    constructor(container){
        super(container);

        this.units = container.dataset.chartUnits;
        const getDataLabel = dataLabel(this.units);

        // const width = container.offsetWidth;

        // console.log(getDataLabel);

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

        let title = {
            text: this.title,
            align: 'center',
            verticalAlign: 'middle',
            floating: true,
            y: 10,
            x: 0,
            widthAdjust: -200,
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
                size: '300px',
                allowPointSelect: true,
                cursor: 'pointer',
                innerSize: '50%',
                dataLabels: {
                    enabled: true,
                    format: getDataLabel,
                    connectorColor: 'silver',
                    style: {
                        width: '150px'
                    }
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

        const collection = this.collection;
        this.collection = {...collection, chart, title, pieOptions, plotOptions};
        return this.collection;
    }
}
