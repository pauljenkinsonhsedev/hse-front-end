import { ChartOptions } from './dependencies';
import { displaySuffix } from './data-suffix.js';

/*
    Class @ChartOptionsDefault

    Description:
    - extends ChartOptions charts/options.js
*/


export class ChartOptionsDefault extends ChartOptions {
    constructor(container){
        super(container);
        this.dataTable = container.querySelector('.tabledata');

        this.units = container.dataset.chartUnits;
        this.dataLabelsSuffix = displaySuffix(this.units);
       /*
            Plot events boolean
            - diables click events if only one set of data
        */
        for (let row of this.dataTable.rows) {
            const cells = row.querySelectorAll('td');
            if (cells.length > 2) {
                this.plotEvents = true;
            }
        }

        const plotOptions = {
            bar: {
                dataLabels: {
                    enabled: true,
                    format: `{point.y:,.0f}${this.dataLabelsSuffix}`
                }
            },
            series: {
                showInLegend: true,
                events: {
                    legendItemClick: () => {
                        return false;
                    }
                }
            },
            column: {
                maxPointWidth: this.colWidth
            }
        };

        const collection = this.collection;
        this.collection = {...collection, plotOptions};
        return this.collection;
    }
}
