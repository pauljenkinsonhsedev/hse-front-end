import { ChartOptions } from './options.js';
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



        // Bar/column charts lay out one bar per category, but the base
        // class sizes chart height as a ratio of container width, so a
        // chart with many categories gets squeezed into the same height
        // as one with few. Scale height with category count instead, so
        // each bar keeps consistent breathing room regardless of how many
        // categories are in the data.
        let chart = {};
        if (this.type === 'bar' || this.type === 'column') {
            const categoryCount = container.querySelectorAll('.category').length;
            const pxPerCategory = 50;
            const chartPadding = 150; // title, subtitle, axis labels, legend, margins
            const minChartHeight = 1000; // matches the industry/self-reported-ill-health chart (17 categories)
            chart = {
                height: Math.max((categoryCount * pxPerCategory) + chartPadding, minChartHeight),
                events: {
                    // Push each point's value label clear of its error bar's
                    // upper CI bound, otherwise the label overlaps the
                    // whisker whenever the CI extends past the bar's own
                    // value (the common case).
                    render() {
                        this.series.forEach((series) => {
                            if (series.type !== 'bar' && series.type !== 'column') {
                                return;
                            }
                            series.points.forEach((point) => {
                                if (typeof point.high !== 'number' || !point.dataLabel) {
                                    return;
                                }
                                if (point.defaultLabelX === undefined) {
                                    point.defaultLabelX = point.dataLabel.x;
                                }
                                const axis = series.yAxis;
                                const highOffset = Math.abs(
                                    axis.toPixels(point.high, true) - axis.toPixels(point.y, true)
                                );
                                point.dataLabel.attr({
                                    x: point.defaultLabelX + highOffset + 10
                                });
                            });
                        });
                    }
                }
            };
        }

        const plotOptions = {
            bar: {
                borderRadius: 0,
                clip: false,
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
            errorbar: {
                clip: false
            },
            series: {
                showInLegend: true,
                borderWidth: 0,
                events: {
                    legendItemClick: () => {
                        return false;
                    }
                }
            },
            column: {
                maxPointWidth: this.colWidth,
                borderRadius: 0,
                clip: false
            }
        };

        const collection = this.collection;
        this.collection = {...collection, chart: {...collection.chart, ...chart}, plotOptions};
        return this.collection;
    }
}
