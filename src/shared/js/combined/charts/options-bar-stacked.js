import { ChartOptions } from './dependencies';
import { dataTooltip } from './tooltip.js';

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
        let units = container.querySelectorAll('.unit');
        let total = 0;
        for (let i = 0; i < units.length; i++) {
            total += Number(units[i].innerText)
        }
        const getTooltip = dataTooltip(this.type, this.units, this.decimals, total);

        const chart = {
            type: 'bar',
            style: {
                fontFamily: this.fontFamily,
                fontSize: '0.8rem',
                fontWeight: 'regular'
            }
        };

        const legend = {
            reversed: true
        };

        const yAxis = {
            min: 0,
            labels: {
                style: {
                    fontFamily: this.fontFamily,
                    fontSize: '0.9rem',
                    fontWeight: 'regular',
                }
            },
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
                stacking: 'normal',
                events: {
                    legendItemClick: function() {
                        return false;
                    }
                }
            }
        };

        const tooltip = {
            shared: true,
            backgroundColor: 'rgba(255, 255, 255, 1)',
        }

        const collection = this.collection;
        this.collection = {...collection, chart, yAxis, legend, plotOptions, tooltip};
        return this.collection;
    }
}
