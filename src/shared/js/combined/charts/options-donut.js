import { ChartOptions } from './dependencies';
import { seriesData } from './series-data.js';
import { dataLabel } from './data-label.js';
import { displayPrefix } from './data-prefix.js';
import { displaySuffix } from './data-suffix.js';

/*
    Class @ChartOptionsChartOptionsDonut

    Description:
    - extends ChartOptions charts/options.js
    - sets options for donut chart
*/

export class ChartOptionsDonut extends ChartOptions {
    constructor(container){
        super(container);

        let units = container.querySelectorAll('.unit');
        let total = 0;
        for (let i = 0; i < units.length; i++) {
            total += Number(units[i].innerText)
        }

        this.units = container.dataset.chartUnits;
        this.decimals = container.dataset.decimalPoint;
        const getDataLabel = dataLabel(this.units, this.decimals, total);
        const dataLabelsPrefix = displayPrefix(this.units);
        const dataLabelsSuffix = displaySuffix(this.units);


        // const width = container.offsetWidth;

        // console.log(getDataLabel);

        let chart = {
            type: 'pie',
        };

        let pieOptions = {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                // format: this.dataLabelsSuffix,
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
            widthAdjust: -500,
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
                innerSize: '60%',
                dataLabels: {
                    enabled: true,
                    formatter: getDataLabel,
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
