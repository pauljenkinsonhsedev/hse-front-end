import { ChartOptions } from './dependencies';
import { displaySuffix } from './data-suffix.js';
import { displayPrefix } from './data-prefix.js';
import { dataLabel } from './data-label.js';
import { dataValue } from './data-value.js';
/*
    Class @ChartOptionsDefault

    Description:
    - extends ChartOptions charts/options.js
*/


export class ChartOptionsDefault extends ChartOptions {
    constructor(container){
        super(container);

        let units = container.querySelectorAll('.unit');
        let total = 0;
        for (let i = 0; i < units.length; i++) {
            total += Number(units[i].innerText)
        }

        this.dataTable = container.querySelector('.tabledata');
        this.units = container.dataset.chartUnits;
        this.dataLabelsSuffix = displaySuffix(this.units);
        this.dataLabelsPrefix = displayPrefix(this.units);
        this.decimals = container.dataset.decimalPoint;
        const getDataLabel = dataLabel(this.units, this.decimals);
        const getValue = dataValue(this.units, this.decimals, total);

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
                    formatter: getValue,
                    style: {
                        fontFamily: this.fontFamily,
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                    }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: getDataLabel
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
