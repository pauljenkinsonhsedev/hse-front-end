import { seriesDataRanges } from './series-data-ranges.js';
import { ChartOptions } from './dependencies';
import { displaySuffix } from './data-suffix.js';

/*
    Class @ChartOptionsArearange

    Description:
    - extends ChartOptions charts/options.js
    - sets options for 'area range' chart

*/
export class ChartOptionsArearange extends ChartOptions {
    constructor(container){
        super(container);

        const seriesRangeData = seriesDataRanges(this.dataTable);
        const averagesData = seriesRangeData.averagesData();
        const rangesData = seriesRangeData.rangesData();
        const dataLabelsSuffix = displaySuffix(this.units);
        const thead = this.dataTable.querySelector('.table__head');
        let rangeHeading = thead.rows[0].querySelectorAll('.heading')[1].textContent;


        let title = this.collection.title;
        title.text = this.title;

        let subtitle = this.collection.subtitle;
        subtitle.text = this.subtitle;

        let exporting = this.collection.exporting;
        let credits = this.collection.credit;

        let tooltip = {
            crosshairs: true,
            shared: true,
            valueSuffix: dataLabelsSuffix
        };

        let series = [{
            name: `${rangeHeading}`,
            data: averagesData[0],
            zIndex: 1,
            fillOpacity: 0.3,
            color: this.brandColours[0],
            marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: this.brandColours[0]
            }
        }, {
            name: 'Confidence interval',
            data: rangesData[0],
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: this.brandColours[0],
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
                enabled: false
            }
        }];

        const { 0: first, length, [length -1]: last } = rangesData[0]; //getting first and last el from array
        const dateRange = { first, last }
        const dateFirst = moment(dateRange.first[0]).format('DD MMM YYYY');
        const dateLast = moment(dateRange.last[0]).format('DD MMM YYYY');

        let xAxis = {
            labels: {
                overflow: 'justify',
            },
            type: 'datetime',
            title: {
                text: `${dateFirst} to ${dateLast}.`,
                align: 'high'
            },
            accessibility: {
                rangeDescription: `Range: ${dateFirst} to ${dateLast}.`
            }
        }

        let yAxis = {
            title: {
                text: null
            }
        };

        let plotOptions = {
            series: {
                showInLegend: true,
                events: {
                    legendItemClick: function() {
                        if (this.index === 1) {
                            return true;
                        }
                        return false;
                    }
                }
            }
        };

        this.collection = {title, subtitle, xAxis, yAxis, plotOptions, tooltip, series, exporting, credits};
        return this.collection;
    }
}
