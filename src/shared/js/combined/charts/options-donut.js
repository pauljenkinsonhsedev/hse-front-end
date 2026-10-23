import { ChartOptions } from './options.js';
import { cellValue } from './cell-value.js';
import { seriesData } from './series-data.js';
import { dataLabel } from './data-label.js';
import { displayPrefix } from './data-prefix.js';
import { displaySuffix } from './data-suffix.js';
import { defaultChartHeight, fitHeightToLegend } from './pie-legend.js';
import { drawDonutTotal } from './donut-total.js';

/*
    Class @ChartOptionsChartOptionsDonut

    Description:
    - extends ChartOptions charts/options.js
    - sets options for donut chart
*/

export class ChartOptionsDonut extends ChartOptions {
    constructor(container){
        super(container);

        let units = container.querySelectorAll('.unit');
        let total = 0;
        for (let i = 0; i < units.length; i++) {
            total += cellValue(units[i])
        }

        this.units = container.dataset.chartUnits;
        this.decimals = container.dataset.decimalPoint;
        const getDataLabel = dataLabel(this.units, this.decimals, total);
        const layout = this.layout();
        const { pie: pieLayout } = layout.plotOptions;
        this.pieSize = pieLayout.size;

        // The title uses the base chart title, above the donut like every
        // other chart. It used to sit in the donut's hole (verticalAlign
        // 'middle'), where any title longer than a few words spilled out
        // over the ring itself.

        // The donut's headline total, shown in its hole (donut-total.js),
        // read in its screen reader summary and added as a total row in the
        // Tabular data tab (charts.js): data-chart-total="£22.9 bn",
        // data-chart-total-label="Total cost".
        const headlineTotal = (container.dataset.chartTotal || '').trim();
        const headlineTotalLabel = (container.dataset.chartTotalLabel || '').trim();

        // Merge with the base chart options rather than replacing them:
        // they carry renderTo, marginTop (room for the title above the
        // donut) and the load event that re-applies layout on resize.
        let chart = {
            ...this.collection.chart,
            type: 'pie',
            marginTop: layout.chart.marginTop,
            height: layout.chart.height,
            // Regular weight: text that doesn't set its own (e.g. the
            // tooltip) inherits this, and was all bold.
            style: {
                color: '#000',
                fontFamily: this.fontFamily,
                fontSize: '1rem',
                fontWeight: 'normal'
            },
            events: {
                ...this.collection.chart.events,
                render: function () {
                    fitHeightToLegend(this);
                    drawDonutTotal(this, headlineTotal, headlineTotalLabel);
                }
            }
        };

        // Only shown below desktop, in place of the data labels (see
        // layout() below): one item per row, reusing the data label
        // formatter so each item reads the same as its label would. A key
        // only (legend clicks are disabled in charts.js), so plain text
        // with no "Show <segment>" accessibility proxy buttons; each
        // segment still announces its name and value.
        let legend = {
            ...this.collection.legend,
            ...layout.legend,
            itemStyle: {
                ...this.collection.legend.itemStyle,
                ...layout.legend.itemStyle,
                fontWeight: 'normal',
                cursor: 'default'
            },
            itemHoverStyle: { color: this.collection.legend.itemStyle.color },
            accessibility: { enabled: false },
            useHTML: true,
            layout: 'vertical',
            itemMarginBottom: 8,
            labelFormatter: function () {
                return getDataLabel.call({ key: this.name, y: this.y });
            }
        };

        let xAxis = {
            labels: {
                enabled: false
            },
        };

        let plotOptions = {
            pie: {
                slicedOffset: 0,
                size: this.pieSize,
                center: pieLayout.center,
                showInLegend: true,
                // No click-to-select (as for pies).
                innerSize: '65%',
                dataLabels: {
                    enabled: pieLayout.dataLabels.enabled,
                    formatter: getDataLabel,
                    connectorColor: '#ccc',
                    style: {
                        width: '150px',
                        fontFamily: this.fontFamily,
                        fontSize: '1rem',
                        // Regular weight, as on pie labels: the formatter
                        // already makes just the value bold.
                        fontWeight: 'normal'
                    }
                },
            },
            series: {
                states:{
                    hover:{
                        halo: {
                            size: 1
                        }
                    }
                }
            }
        };

        const collection = this.collection;

        // Highcharts describes a donut to screen readers as a "Pie chart",
        // from its series type; say what it is instead.
        const segmentCount = container.querySelectorAll('.unit').length;
        const accessibility = {
            ...collection.accessibility,
            typeDescription: `Donut chart with ${segmentCount} ${segmentCount === 1 ? 'segment' : 'segments'}.`
                + (headlineTotal ? ` ${headlineTotalLabel || 'Total'}: ${headlineTotal}.` : ''),
        };

        this.collection = {...collection, chart, legend, xAxis, plotOptions, accessibility};

        return this.collection;
    }

    // Labels vs legend, ring size and chart height depend on the screen
    // size, so they're part of the layout watchLayout re-applies on resize
    // (see ChartOptions.layout), rather than fixed at page-load values.
    layout() {
        const base = super.layout();
        // Labels beside the ring on desktop only (sass-mq "desktop"
        // breakpoint, 769px, breakpoints.scss), as for pie charts;
        // tablet and mobile get a stacked legend underneath. Also use the
        // legend when the chart itself is narrow, e.g. a two-thirds column
        // on a small desktop, where labels either side of the 220px ring
        // run off the bottom of the chart (donut labels are a fixed 150px
        // wide: tested, they fit at a 595px chart width but not at 529px).
        const isDesktop = window.matchMedia('(min-width: 769px)').matches;
        const isSmall = !isDesktop || this.container.clientWidth < 600;
        const ringSize = isSmall ? 160 : 220;

        // Highcharts renders into the container and replaces the data
        // table, so count the segments while it's still there (the first
        // call, from the constructor).
        if (this.segmentCount === undefined) {
            this.segmentCount = this.container.querySelectorAll('.unit').length;
        }
        if (!this.defaultHeight) {
            this.defaultHeight = defaultChartHeight(this.container);
        }
        // Small screens: a starting estimate for the ring plus legend,
        // corrected after render by fitHeightToLegend. Desktop: the
        // default height, as before.
        const pxPerLegendItem = 80; // donut segment names are long, wrapping onto 2-4 lines
        const height = isSmall
            ? Math.max(this.defaultHeight, base.chart.marginTop + ringSize + 40 + (this.segmentCount * pxPerLegendItem))
            : this.defaultHeight;
        const legendItemWidth = this.container.clientWidth - 80; // minus legend symbol and chart padding

        return {
            ...base,
            // No outer labels on small screens, so let Highcharts size
            // the top margin to the title and subtitle it actually drew.
            chart: { ...base.chart, marginTop: isSmall ? null : base.chart.marginTop, height },
            legend: {
                enabled: isSmall,
                itemStyle: { width: legendItemWidth + 'px', textOverflow: null },
            },
            plotOptions: {
                pie: {
                    size: ringSize + 'px',
                    // On small screens sit the ring near the top of the
                    // plot area, so any spare height ends up below it. The
                    // 20px matches the title-to-ring gap on pie charts
                    // (Highcharts leaves less room under a donut's title).
                    center: isSmall ? ['50%', (ringSize / 2) + 20] : ['50%', '50%'],
                    dataLabels: { enabled: !isSmall },
                },
            },
        };
    }
}
