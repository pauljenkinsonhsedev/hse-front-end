import { seriesDataRanges } from './series-data-ranges.js';
import { ChartOptions } from './dependencies';

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
            valueSuffix: '°C'
        };

        let series = [{
            name: 'Temperature',
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
            name: 'Range',
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

        let xAxis = {
            type: 'datetime',
            accessibility: {
                rangeDescription: 'Range: Jul 1st 2009 to Jul 31st 2009.'
            }
        }

        let yAxis = {
            title: {
                text: null
            }
        }

        this.collection = {title, subtitle, xAxis, yAxis, tooltip, series, exporting, credits};
        return this.collection;
    }
}

export default ChartOptionsArearange;
