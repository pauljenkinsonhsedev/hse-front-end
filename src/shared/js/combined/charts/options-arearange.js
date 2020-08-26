import { seriesDataRanges } from './series-data-ranges.js';
import { ChartOptions } from './dependencies';

/*
    Class @ChartOptionsArearange

    Description:
    - extends ChartOptions charts/options.js
    - sets options for 'area range' chart

*/
export class ChartOptionsArearange extends ChartOptions {
    constructor(container, collection){
        super(container, collection);
        this.defaults;
        this.init();
    }

    init() {
        const seriesRangeData = seriesDataRanges(this.dataTable);
        const averagesData = seriesRangeData.averagesData();
        const rangesData = seriesRangeData.rangesData();

        let title = this.defaults.title;
        title.text = this.title;

        let subtitle = this.defaults.subtitle;
        subtitle.text = this.subtitle;

        let exporting = this.defaults.exporting;
        let credits = this.defaults.credit;

        let tooltip = {
            crosshairs: true,
            shared: true,
            valueSuffix: this.dataLabelsSuffix
        };

        let series = [{
            name: `${this.xAxisText} average`,
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
            name: 'Range low to high',
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
            type: 'datetime',
            title: {
                text: `${dateFirst} to ${dateLast}.`,
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
