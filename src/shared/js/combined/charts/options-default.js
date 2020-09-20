import { ChartOptions } from './dependencies';

/*
    Class @ChartOptionsDefault

    Description:
    - extends ChartOptions charts/options.js
*/


export class ChartOptionsDefault extends ChartOptions {
    constructor(container){
        super(container);
        this.dataTable = container.querySelector('.tabledata');
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
            series: {
                showInLegend: true,
                events: {
                    legendItemClick: () => {
                        return this.plotEvents;
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
