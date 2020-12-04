import { chartCategories } from './chart-categories';
import { seriesDataRanges } from './series-data-ranges.js';
import { missingDataAverage } from './missing-data-average.js';
import { ChartOptions } from './dependencies';
import { displaySuffix } from './data-suffix.js';
import { displayPrefix } from './data-prefix.js';
import { plotBand } from './plot-band';
import { abbreviateNumber } from '../utils/number-abbreiviation.js';

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

        const missingAverage = missingDataAverage(averagesData[0]);

        function noTooltip(dataArray) {
            return dataArray.map(function (item, index) {
                let tooltip = true;
                if (item[0] === 0) {
                    tooltip = false;
                } else {
                    tooltip = true;
                }
                return {index: index, tooltip: tooltip};
            });
        };
        const tooltipCheck = noTooltip(averagesData[0]);

        let title = this.collection.title;
        title.text = this.title;

        let subtitle = this.collection.subtitle;
        subtitle.text = this.subtitle;

        let exporting = this.collection.exporting;
        let credits = this.collection.credit;

        let series = [];
        const seriesAverage = {
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
        };
        const seriesRange = {
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
            },
            enableMouseTracking: false
        };

        let flag = false;

        const checkForNull = averagesData[0].reduce(function (result, item) {
            if (item[0] === 0) {
                flag = true;
            }
            return flag;
        }, 0);

        if (checkForNull === true) {
            series.push(missingAverage[0]);
            series.push(missingAverage[1]);
        } else {
            series.push(seriesAverage);
        }

        missingAverage[0].name = `${rangeHeading}`;
        series.push(seriesRange);

        const { 0: first, length, [length -1]: last } = rangesData[0]; //getting first and last el from array
        const dateRange = { first, last }

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
                rangeDescription: `Range: ${dateRange.first[0]} to ${dateRange.last[0]}.`
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
            min: 0,
            gridLineWidth: this.gridLineWidth,
            minorGridLineWidth: this.gridLineWidth,
        }

        let tooltip = {
            crosshairs: true,
            shared: false,
            valuePrefix: `${dataLabelsPrefix}`,
            valueSuffix: `${dataLabelsSuffix}`,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            style: {
                fontSize: '12px',
                opacity: 1
            },
            backgroundColor: '#fff',
            formatter: function() {
                const series = this.point.series.chart.series;
                const index = this.point.series.xData.indexOf(this.point.x);

                if (tooltipCheck[index].tooltip === false) {
                    return false;
                } else {
                    let rangeIndex;
                    if (checkForNull === true) {
                        rangeIndex = 2;
                    } else {
                        rangeIndex = 1;
                    }

                    return `
                        <div>
                            <span><strong>${series[0].points[index].category}</strong></span>
                            <br/>
                            <span><span style="color: ${series[0].color};">●</span> ${series[0].name} <strong>${dataLabelsPrefix}${abbreviateNumber(series[0].yData[index])}${dataLabelsSuffix}</strong></span><br/>
                            <span><span style="color: ${series[0].color};">●</span> ${series[rangeIndex].name} <strong>${dataLabelsPrefix}${abbreviateNumber(series[rangeIndex].yData[index][0])}${dataLabelsSuffix} - ${dataLabelsPrefix}${abbreviateNumber(series[rangeIndex].yData[index][1])}${dataLabelsSuffix}</strong></span>
                        </div>
                    `;
                }
            }
        };

        let plotOptions = {
            series: {
                showInLegend: true,
                events: {
                    legendItemClick: function() {
                        return false;
                    }
                }
            }
        };

        this.collection = {title, subtitle, xAxis, yAxis, plotOptions, tooltip, series, exporting, credits};
        return this.collection;
    }
}
