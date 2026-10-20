import { ChartOptions } from './options.js';
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
            this.fontSize = '1rem';
        } else {
            this.alignTo = false;
            this.pieSize = '220px';
            this.fontSize = '1rem';
        }

        // The title uses the base chart title, above the donut like every
        // other chart. It used to sit in the donut's hole (verticalAlign
        // 'middle'), where any title longer than a few words spilled out
        // over the ring itself.

        // Merge with the base chart options rather than replacing them:
        // they carry renderTo, marginTop (room for the title above the
        // donut) and the load event that re-applies layout on resize.
        let chart = {
            ...this.collection.chart,
            type: 'pie',
            style: {
                color: '#000',
                fontFamily: this.fontFamily,
                fontSize: '1rem',
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
        };

        let xAxis = {
            labels: {
                enabled: false
            },
        };

        let plotOptions = {
            pie: {
                slicedOffset: 0,
                size: this.pieSize,
                allowPointSelect: true,
                cursor: 'pointer',
                innerSize: '65%',
                states: {
                    select: {
                        borderColor: '#ffdd00', // $hse-focus-color
                        borderWidth: 3
                    }
                },
                dataLabels: {
                    enabled: true,
                    alignTo: this.alignTo,
                    formatter: getDataLabel,
                    connectorColor: '#ccc',
                    style: {
                        width: '150px',
                        fontFamily: this.fontFamily,
                        fontSize: '1rem',
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
        this.collection = {...collection, chart, xAxis, pieOptions, plotOptions};

        return this.collection;
    }
}
