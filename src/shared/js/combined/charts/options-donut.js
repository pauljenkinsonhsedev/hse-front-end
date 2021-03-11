import { ChartOptions } from './dependencies';
import { seriesData } from './series-data.js';
import { dataLabel } from './data-label.js';
import { displayPrefix } from './data-prefix.js';
import { displaySuffix } from './data-suffix.js';
import { mediaQuery } from '../utils/media-query.js';

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
        const mediaquery = mediaQuery();

        if (mediaquery === 'small') {
            this.alignTo = 'plotEdges';
            this.pieSize = '160px';
            this.fontSize = '0.9rem';
        } else {
            this.alignTo = false;
            this.pieSize = '220px';
            this.fontSize = '0.9rem';
        }

        let chart = {
            type: 'pie',
            style: {
                color: '#000',
                fontFamily: this.fontFamily,
                fontSize: '0.9rem',
                fontWeight: 'bold'
            }
        };

        let pieOptions = {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                connectorColor: 'silver'
            }
        }

        let title = {
            text: this.title,
            align: 'center',
            verticalAlign: 'middle',
            floating: false,
            y: 0,
            x: 0,
            widthAdjust: -550,
            style: {
                color: '#000',
                fontFamily: this.fontFamily,
                fontSize: this.fontSize,
                fontWeight: 'bold'
            }
        };
        let plotOptions = {
            pie: {
                slicedOffset: 0,
                size: this.pieSize,
                allowPointSelect: true,
                cursor: 'pointer',
                innerSize: '65%',
                dataLabels: {
                    enabled: true,
                    alignTo: this.alignTo,
                    formatter: getDataLabel,
                    connectorColor: '#ccc',
                    style: {
                        width: '150px',
                        fontFamily: this.fontFamily,
                        fontSize: '0.75rem',
                        fontWeight: 'bold'
                    }
                },
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
