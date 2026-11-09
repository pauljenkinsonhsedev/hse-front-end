import { ChartOptions } from './options.js';
import { cellValue } from './cell-value.js';
import { displaySuffix } from './data-suffix.js';
import { displayPrefix } from './data-prefix.js';
import { dataLabel } from './data-label.js';
import { dataValue } from './data-value.js';
import { fitPlotHeight } from './fit-plot-height.js';
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
            total += cellValue(units[i])
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

        // On bar charts with error bars, each value label is pushed past its
        // error bar (in the render handler below). Highcharts doesn't leave
        // room for that, so the longest bar's label was cut off at the edge
        // of the chart (e.g. "5,53" for 5,530). An error bar never goes past
        // the end of the axis, so reserve room there for the widest label,
        // worked out from the table before the chart is drawn.
        // Desktop only (see layout()): on a narrow chart the room taken from
        // the bars was more than the label needed, and squeezed them.
        if (this.type === 'bar' && container.querySelector('.error-high')) {
            const context = document.createElement('canvas').getContext('2d');
            const fontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
            context.font = `bold ${fontSize}px ${this.fontFamily}`; // as plotOptions.bar.dataLabels
            const widestLabel = [...units].reduce((widest, unit) => (
                Math.max(widest, context.measureText(getValue.call({ y: cellValue(unit) })).width)
            ), 0);
            const labelOffset = 10 + 5; // past the error bar (render handler), plus the label's padding
            const edgeGap = 10; // the chart's own right spacing
            this.labelMarginRight = Math.ceil(edgeGap + labelOffset + widestLabel + 5);
        }

        let chart = {};
        if (this.type === 'bar' || this.type === 'column') {
            const categoryCount = container.querySelectorAll('.category').length;
            // Starting estimate only, so the first render is close; the
            // bar chart's height is corrected by fitPlotToCategories.
            const pxPerCategory = 60;
            const chartPadding = 150; // title, subtitle, axis labels, legend, margins
            const estimatedHeight = (categoryCount * pxPerCategory) + chartPadding;
            chart = {
                // Columns run across the chart, so their height doesn't
                // depend on how many categories there are: leave it to the
                // default, as for line charts.
                height: this.type === 'bar' ? estimatedHeight + this.marginTop : undefined,
                marginRight: this.layout().chart.marginRight,
                events: {
                    // Push each point's value label clear of its error bar's
                    // upper CI bound, otherwise the label overlaps the
                    // whisker whenever the CI extends past the bar's own
                    // value (the common case).
                    render() {
                        if (this.options.chart.type === 'bar') {
                            fitPlotToCategories(this);
                        } else {
                            fitPlotHeight(this);
                        }
                        this.series.forEach((series) => {
                            if (series.type !== 'bar' && series.type !== 'column') {
                                return;
                            }
                            series.points.forEach((point) => {
                                if (typeof point.high !== 'number' || !point.dataLabel) {
                                    return;
                                }
                                // Highcharts' own position for the label,
                                // unless it's still where we last moved it:
                                // after a resize Highcharts places it again,
                                // so take the new position (keeping the one
                                // from the first render left labels off the
                                // edge of the chart after a resize)
                                if (point.dataLabel.x !== point.movedLabelX) {
                                    point.defaultLabelX = point.dataLabel.x;
                                }
                                const axis = series.yAxis;
                                const highOffset = Math.abs(
                                    axis.toPixels(point.high, true) - axis.toPixels(point.y, true)
                                );
                                point.movedLabelX = point.defaultLabelX + highOffset + 10;
                                point.dataLabel.attr({
                                    x: point.movedLabelX
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
        // Legend clicks are disabled (legend.events.itemClick in
        // charts.js), so with a single series the legend item is just a
        // key: show it as plain text. Turning off legend accessibility removes the "Show
        // <series>" proxy button Highcharts adds for keyboard and screen
        // reader users, which announced a toggle that does nothing; the
        // series name is still announced with each bar.
        const dataSeries = (collection.series || []).filter((series) => series.type !== 'errorbar');
        const isSingleSeries = dataSeries.length === 1;
        const legend = isSingleSeries ? {
            ...collection.legend,
            accessibility: { enabled: false },
            itemStyle: { ...collection.legend.itemStyle, cursor: 'default' },
            itemHoverStyle: { color: collection.legend.itemStyle.color },
        } : collection.legend;

        // Highcharts describes a chart with error bars to screen readers as
        // a "Combination chart with 2 data series", counting the error bars
        // as a second series. Say what it is instead: bars (or columns)
        // with confidence intervals.
        const hasErrorBars = (collection.series || []).some((series) => series.type === 'errorbar');
        let accessibility = collection.accessibility;
        if (hasErrorBars && (this.type === 'bar' || this.type === 'column')) {
            const shape = this.type === 'bar' ? 'bar' : 'column';
            const description = isSingleSeries
                ? `${dataSeries[0].data.length} ${shape}s`
                : `${dataSeries.length} data series`;
            accessibility = {
                ...collection.accessibility,
                typeDescription: `${shape === 'bar' ? 'Bar' : 'Column'} chart with ${description}, with confidence intervals.`,
            };
        }

        // Highcharts cuts a category label short with an ellipsis once it
        // has more lines than fit its slot, but on bar charts the slot
        // grows to fit the label (fitPlotToCategories), so let labels run
        // to their full height. Also let a slash-joined word that's too
        // wide for the label area (e.g. "Information/communication" on a
        // small chart) break after its "/", rather than being cut short
        // however many lines are allowed. Highcharts only wraps at
        // ordinary spaces (not a zero-width space), so this adds a space
        // after the slash, and only in words that wouldn't otherwise fit.
        const baseXAxisLabels = collection.xAxis.labels;
        const xAxis = this.type === 'bar' ? {
            ...collection.xAxis,
            labels: {
                ...baseXAxisLabels,
                formatter: function () {
                    const label = baseXAxisLabels.formatter.call(this);
                    if (typeof label !== 'string') return label;
                    const labelWidth = parseFloat(this.axis.options.labels.style.width) || this.chart.chartWidth * 0.33;
                    const approxCharWidth = 8.5; // 1rem Arial
                    return label.replace(/\S+\/\S+/g, (word) => (
                        word.length * approxCharWidth > labelWidth ? word.replace(/\//g, '/ ') : word
                    ));
                },
                style: { ...baseXAxisLabels.style, ...this.layout().xAxis.labels.style, lineClamp: 20 },
            },
        } : collection.xAxis;

        // Merge chart.events too, not just chart: a plain spread would
        // replace the base class's events (its load handler starts
        // watchLayout, which re-applies title size and marginTop on
        // resize) with the render handler above.
        this.collection = {
            ...collection,
            chart: {
                ...collection.chart,
                ...chart,
                events: {...collection.chart.events, ...chart.events},
            },
            legend,
            xAxis,
            plotOptions,
            accessibility,
        };
        return this.collection;
    }

    // Bar charts only: on small charts the category labels' default width
    // (about a third of the chart) is too narrow for single long words
    // like "Manufacturing" or "Luxembourg", which Highcharts then cuts
    // short with an ellipsis. Give them more of the chart below the
    // tablet breakpoint (641px, as in ChartOptions.layout()); larger
    // charts keep Highcharts' default width. Larger charts with error bars
    // also get room on the right for the value labels (labelMarginRight).
    layout() {
        const base = super.layout();
        if (this.type !== 'bar') return base;
        const isSmall = this.container.clientWidth < 641;
        const labelWidth = isSmall ? Math.round(this.container.clientWidth * 0.45) + 'px' : undefined;
        return {
            ...base,
            // From 500px: charts are 579-627px wide on desktop and 324-356px
            // on phones, where the room for the labels squeezed the bars
            chart: { ...base.chart, marginRight: this.container.clientWidth >= 500 && this.labelMarginRight ? this.labelMarginRight : null },
            xAxis: { labels: { style: { width: labelWidth } } },
        };
    }
}
