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



        // Bars are a fixed thickness on every bar chart, at every screen
        // size, rather than stretching to fill whatever height the chart
        // happens to be. Each category gets a fixed slot (its bars plus a
        // gap), and the slot only grows when a wrapped category label is
        // taller than that, so labels never overlap. The chart height is
        // then fitted after render (see fitPlotToCategories below) so the
        // plot area is exactly categories x slot, whatever the title,
        // subtitle, legend and caption add around it.
        const barThickness = 30;
        const barGap = 24; // between one category's bars and the next
        const labelGap = 12; // between wrapped category labels
        const fitPlotToCategories = (chart) => {
            const axis = chart.xAxis[0];
            const categoryCount = (axis.categories || []).length || (chart.series[0] ? chart.series[0].points.length : 0);
            if (!categoryCount) return;
            const tallestLabel = Object.values(axis.ticks).reduce((tallest, tick) => (
                // The label's rendered size: getBBox() can still hold its
                // pre-wrapping size at this point
                tick.label ? Math.max(tallest, tick.label.element.getBoundingClientRect().height) : tallest
            ), 0);
            // Count bar series, not data table columns: error bar charts
            // have extra (confidence interval) columns.
            const barSeriesCount = chart.series.filter((series) => series.type === 'bar' && series.visible).length || 1;
            const slot = Math.max((barSeriesCount * barThickness) + barGap, tallestLabel + labelGap);
            const heightChange = Math.round((categoryCount * slot) - chart.plotHeight);
            if (Math.abs(heightChange) > 1) {
                chart.setSize(null, chart.chartHeight + heightChange, false);
            }
        };

        let chart = {};
        if (this.type === 'bar' || this.type === 'column') {
            const categoryCount = container.querySelectorAll('.category').length;
            // Starting estimate only, so the first render is close; the
            // bar chart's height is corrected by fitPlotToCategories.
            const pxPerCategory = 60;
            const chartPadding = 150; // title, subtitle, axis labels, legend, margins
            const minChartHeight = 1000; // columns only: matches the industry/self-reported-ill-health chart (17 categories)
            const estimatedHeight = (categoryCount * pxPerCategory) + chartPadding;
            chart = {
                height: this.type === 'bar' ? estimatedHeight + this.marginTop : Math.max(estimatedHeight, minChartHeight),
                events: {
                    // Push each point's value label clear of its error bar's
                    // upper CI bound, otherwise the label overlaps the
                    // whisker whenever the CI extends past the bar's own
                    // value (the common case).
                    render() {
                        if (this.options.chart.type === 'bar') {
                            fitPlotToCategories(this);
                        }
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
                pointWidth: barThickness,
                borderRadius: 0,
                clip: false,
                dataLabels: {
                    enabled: true,
                    formatter: getValue,
                    style: {
                        fontFamily: this.fontFamily,
                        fontSize: '1rem',
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
