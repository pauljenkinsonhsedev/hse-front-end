import { chartCategories } from './chart-categories';
import { seriesDataRanges } from './series-data-ranges.js';
import { ChartOptions } from './dependencies';
import { displaySuffix } from './data-suffix.js';
import { displayPrefix } from './data-prefix.js';
import { dataTooltip } from './tooltip.js';
import { plotBand } from './plot-band';

/*
    Class @ChartOptionsArearange

    Description:
    - extends ChartOptions charts/options.js
    - sets options for 'area range' chart

*/
export class ChartOptionsArearange extends ChartOptions {
    constructor(container){
        super(container);

        let units = container.querySelectorAll('.unit');
        let total = 0;
        for (let i = 0; i < units.length; i++) {
            total += Number(units[i].innerText)
        }

        let areaRangeTitle = container.dataset.areaRangeTitle;
        if (areaRangeTitle === 'undefined' || areaRangeTitle === undefined) {
            areaRangeTitle = 'Confidence interval';
        }
        const getTooltip = dataTooltip(this.type, this.units, this.decimals, total, areaRangeTitle);
        const getPlotBand = plotBand(this.container, this.brandGrayscale);
        const categoryData = chartCategories(this.container);
        const seriesRangeData = seriesDataRanges(this.dataTable);
        const averagesData = seriesRangeData.averagesData();
        const rangesData = seriesRangeData.rangesData();
        const dataLabelsSuffix = displaySuffix(this.units);
        const dataLabelsPrefix = displayPrefix(this.units);
        const firstLast = container.dataset.xaxisFirstlast;
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
            valuePrefix: `${dataLabelsPrefix}`,
            valueSuffix: `${dataLabelsSuffix}`,
            useHTML: true,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
            padding: 1,
            style: {
                fontSize: '12px',
                opacity: 1
            },
            formatter: getTooltip
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
            name: areaRangeTitle,
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
        const dateFirst = moment(dateRange.first[0]).format('YYYY');
        const dateLast = moment(dateRange.last[0]).format('YYYY');

        const xAxis = {
            showLastlabel: true,
            categories: categoryData,
            plotBands: getPlotBand,
            maxPadding: 0,
            endOnTick: true,
            crosshair: {
                width: 1,
                color: this.brandGrayscale[0]
            },
            labels: {
                align: 'right',
                overflow: 'justify',
                formatter: function () {
                    if (firstLast === 'true') {
                        if(this.isFirst || this.isLast) {
                            return this.value
                        } else {
                            return ''
                        }
                    } else {
                        return this.value
                    }
                }
            },
            accessibility: {
                rangeDescription: `Range: ${dateFirst} to ${dateLast}.`
            },
            title: {
                text: this.xAxisText,
                align: 'high'
            }
        };

        let yAxis = {
            labels: {
                format: '{value:,.0f}'
            },
            title: {
                text: null
            },
            max: null,
            min: 0
        }

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
