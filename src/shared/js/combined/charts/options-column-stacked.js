import { ChartOptions } from './dependencies';
import { dataTooltip } from './tooltip.js';

/*
    Class @ChartOptionsBarStacked

    Description:
    - extends ChartOptions charts/options.js
    - sets options for stacked bar chart
*/

export class ChartOptionsColumnStacked extends ChartOptions {
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
            type: 'column',
            style: {
                fontFamily: this.fontFamily,
                fontSize: '0.8rem',
                fontWeight: 'regular'
            }
        };

        const plotOptions = {
            series: {
                borderWidth: 0,
                events: {
                    legendItemClick: function() {
                        return false;
                    }
                }
            },
            column: {
                stacking: 'normal',
            }
        };

        const tooltip = {
            shared: true,
            // formatter: getTooltip
        }

        const collection = this.collection;
        this.collection = {...collection, chart, plotOptions, tooltip};

        return this.collection;
    }
}
