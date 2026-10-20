import { ChartOptions } from './options.js';
import { chartCategories } from './chart-categories';
import { dataLabel } from './data-label.js';
import { displayPrefix } from './data-prefix.js';
import { displaySuffix } from './data-suffix.js';

// Degrees clockwise from 12 o'clock (see plotOptions.pie.startAngle below)
const pieStartAngle = 90;

/*
    Class @ChartOptionsPie

    Description:
    - extends ChartOptions charts/options.js
    - sets options for pie chart
*/

export class ChartOptionsPie extends ChartOptions {
    constructor(container){
        super(container);
        this.dataTable = container.querySelector('.tabledata');
        this.units = container.dataset.chartUnits;
        this.decimals = container.dataset.decimalPoint;
        // this.xAxisText = container.dataset.xaxisText;

        let units = container.querySelectorAll('.unit');
        let total = 0;
        for (let i = 0; i < units.length; i++) {
            total += Number(units[i].innerText)
        }

        const layout = this.layout();
        const { pie: pieLayout } = layout.plotOptions;
        this.pieSize = pieLayout.size;
        // Align every label to the plot edges rather than positioning it
        // close to its own slice, so labels stack down the side with a
        // (sometimes long, bent) connector line back to their slice —
        // this was already the mobile behaviour; using it at every width
        // means a very small slice's label always has room to sit apart
        // from the pie itself instead of crowding its edge.
        this.alignTo = 'plotEdges';
        this.dataLabelDistance = pieLayout.dataLabels.distance;

        const getCategories = chartCategories(container);
        const getDataLabel = dataLabel(this.units, this.decimals, total);

        const dataLabelsPrefix = displayPrefix(this.units);
        const dataLabelsSuffix = displaySuffix(this.units);

        let plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size: this.pieSize,
                center: pieLayout.center,
                // Start at 3 o'clock rather than 12. Data is usually
                // largest-first, which puts the smallest slices just
                // before the start point; at 12 o'clock all their labels
                // share almost the same height, and Highcharts drops any
                // label it has to move too far from its slice to stack
                // them. At 3 o'clock they can spread up and down instead.
                startAngle: pieStartAngle,
                showInLegend: true,
                states: {
                    select: {
                        borderColor: '#ffdd00', // $hse-focus-color
                        borderWidth: 3
                    }
                },
                dataLabels: {
                    enabled: pieLayout.dataLabels.enabled,
                    alignTo: this.alignTo,
                    // Push labels well clear of the pie itself (rather
                    // than hugging its edge) so they read as a stacked
                    // column with a visible connector line back to their
                    // slice — this is what keeps a very small slice's
                    // label (e.g. a <1% remainder) from crowding the
                    // pie's own edge, regardless of where that slice
                    // happens to sit on the circle.
                    distance: this.dataLabelDistance,
                    // Separate from hideOverlappingLabels above: crop
                    // (default true) hides a label outright if its
                    // computed position falls outside the plot area —
                    // e.g. a stacked label landing just above the plot
                    // area, into the title/subtitle's space, at some
                    // narrow container width. overflow:'allow' is what
                    // actually lets a label render past that boundary
                    // instead of being clipped away; crop:false just
                    // stops Highcharts moving/hiding it to compensate.
                    crop: false,
                    overflow: 'allow',
                    connectorColor: '#ccc',
                    formatter: getDataLabel,
                    style: {
                        fontFamily: this.fontFamily,
                        fontSize: '1rem',
                        // Regular weight, as in the small-screen legend: the
                        // formatter already makes just the value bold.
                        fontWeight: 'normal'
                    }
                }
            }
        };

        let accessibility = {
            point: {
                valuePrefix: dataLabelsPrefix,
                valueSuffix: dataLabelsSuffix
            }
        };

        const collection = this.collection;

        // Highcharts' default collision handling will silently set a
        // data label's visibility to hidden if it decides one doesn't
        // fit — the label just vanishes, with nothing in the console to
        // say why. That's worse than a label sitting a bit too close to
        // something, so disable it: at worst a label looks tight at some
        // width, it never just disappears. (Merge with the existing
        // chart object rather than replacing it — it also carries
        // type/renderTo/marginTop/height from the base ChartOptions.)
        let chart = {
            ...collection.chart,
            hideOverlappingLabels: false,
            marginTop: layout.chart.marginTop,
            height: layout.chart.height,
            events: {
                ...collection.chart.events,
                // layout() can only estimate the small-screen height (it
                // runs before Highcharts has drawn the title, subtitle
                // and legend), so once they're drawn, size the chart to
                // fit them exactly: the pie, a small gap, then the legend.
                render: function () {
                    if (!this.legend.display || !this.series[0]) return;
                    const pieGap = 36;
                    const fittedHeight = Math.round(this.plotTop + this.series[0].center[2] + pieGap +
                        (this.legend.options.margin || 0) + this.legend.legendHeight + this.spacing[2]);
                    if (Math.abs(fittedHeight - this.chartHeight) > 1) {
                        this.setSize(null, fittedHeight, false);
                    }
                }
            }
        };

        // Only shown on small screens, in place of the data labels (see
        // layout() below) — reuse the data label formatter so each item
        // reads the same as its label would: "<name>: <value>".
        let legend = {
            ...collection.legend,
            ...layout.legend,
            itemStyle: {...collection.legend.itemStyle, ...layout.legend.itemStyle, cursor: 'default'},
            itemHoverStyle: { color: collection.legend.itemStyle.color },
            // A key only (clicks are disabled in charts.js): no "Show
            // <slice>" proxy buttons for a toggle that does nothing. Each
            // slice still announces its name and value.
            accessibility: { enabled: false },
            useHTML: true,
            // One item per row, so the height layout() reserves for the
            // legend matches what Highcharts actually draws.
            layout: 'vertical',
            itemMarginBottom: 8,
            labelFormatter: function () {
                return getDataLabel.call({ key: this.name, y: this.y });
            }
        };

        this.collection = {...collection, chart, legend, plotOptions, ...accessibility};

        return this.collection;
    }

    // Pie size, label distance, labels vs legend and chart height all
    // depend on the screen size, so they're part of the layout
    // watchLayout re-applies on resize (see ChartOptions.layout), rather
    // than fixed at page-load values.
    layout() {
        const base = super.layout();
        // Labels beside the pie on desktop only, matching the sass-mq
        // "desktop" breakpoint (769px, breakpoints.scss); tablet and
        // mobile get the stacked legend. Also check the chart's own
        // width: in a narrow column (e.g. two-thirds) a desktop screen
        // can still have a chart too narrow for a 220px pie with labels
        // either side, and Highcharts then hides every label it can't
        // fit (tested: labels still fit at a 505px chart width, but were
        // all hidden at 478px).
        const isDesktop = window.matchMedia('(min-width: 769px)').matches;
        const isSmall = !isDesktop || this.container.clientWidth < 540;
        // Highcharts renders into the container and replaces the data
        // table, so read the values while it's still there (the first
        // call, from the constructor) and reuse them on every resize.
        if (!this.sliceValues) {
            this.sliceValues = [...this.container.querySelectorAll('.unit')].map((unit) => Number(unit.innerText));
            this.sliceNames = [...this.container.querySelectorAll('.category')].map((category) => category.innerText.trim());
        }
        const values = this.sliceValues;
        const sliceCount = values.length;
        const pieSize = isSmall ? 150 : 220;

        // Highcharts stacks outer pie labels down each side of the pie,
        // but only within the pie's radius + label distance above and
        // below its centre — any label that doesn't fit in that band is
        // hidden, regardless of hideOverlappingLabels, and a taller chart
        // alone doesn't help. So:
        // - small screens: labels wrap onto several lines in the narrow
        //   space beside the pie, so swap them for a legend underneath,
        //   wrapping long names to the chart's width, and size the chart
        //   to fit the pie plus every legend line.
        // - larger screens: keep labels, and widen the band (label
        //   distance) to fit the labels on the busier side of the pie,
        //   growing the chart to fit. Slices run clockwise from the
        //   start angle, and a slice whose middle falls between 12 and
        //   6 o'clock is labelled on the right.
        const total = values.reduce((sum, value) => sum + value, 0);
        let runningTotal = 0;
        let rightLabels = 0;
        values.forEach((value) => {
            const midAngle = (pieStartAngle + ((runningTotal + value / 2) / total) * 360) % 360;
            if (midAngle < 180) rightLabels++;
            runningTotal += value;
        });
        const labelsPerSide = Math.max(rightLabels, sliceCount - rightLabels);
        // Labels are capped at a third of the chart's width, so long ones
        // wrap onto 2-3 lines, more so on narrower (tablet) charts.
        const pxPerLabel = this.container.clientWidth < 769 ? 70 : 50;
        const labelBandHeight = labelsPerSide * pxPerLabel;
        // 60 is the minimum that keeps a small slice's label clear of the
        // pie's edge; it only grows when there are more labels than fit.
        const dataLabelDistance = isSmall
            ? 30
            : Math.max(60, Math.ceil((labelBandHeight - pieSize) / 2));

        // Never smaller than the height the chart gets with no height set
        // (the space inside .chart's min-height, padding and border), so
        // pies with only a few slices keep exactly that. Set it as a
        // number rather than leaving it unset: once a chart has grown,
        // Highcharts' "unset" height is the container's current height,
        // so it would never shrink back on resize.
        if (!this.defaultHeight) {
            const style = window.getComputedStyle(this.container);
            this.defaultHeight = ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth']
                .reduce((height, prop) => height - parseFloat(style[prop]), parseFloat(style.minHeight)) || 400;
        }
        const legendItemWidth = this.container.clientWidth - 80; // minus legend symbol and chart padding
        const pxPerLegendLine = 21;
        const legendItemSpacing = 11; // itemMarginBottom + Highcharts' own item padding
        const approxCharWidth = 8.5; // 1rem Arial
        const legendHeight = values.reduce((height, value, i) => {
            const text = `${this.sliceNames[i] || ''}: ${value}`;
            const lines = Math.max(1, Math.ceil((text.length * approxCharWidth) / legendItemWidth));
            return height + (lines * pxPerLegendLine) + legendItemSpacing;
        }, 0);
        const chartBottomPadding = 40;
        const pieClearance = 28; // chart spacing below the plot area, plus a little room
        const requiredHeight = isSmall
            ? base.chart.marginTop + pieSize + chartBottomPadding + legendHeight
            // The plot area also has to fit the (fixed-size) pie itself,
            // plus bottom spacing: if it's shorter than the pie,
            // Highcharts hides the pie's labels altogether.
            : base.chart.marginTop + Math.max(labelBandHeight + chartBottomPadding, pieSize + pieClearance);
        const height = Math.max(requiredHeight, this.defaultHeight);

        return {
            ...base,
            // No outer labels on small screens, so let Highcharts size
            // the top margin to the title and subtitle it actually drew,
            // rather than the measured estimate plus safety margin the
            // base class reserves for labels.
            chart: { ...base.chart, marginTop: isSmall ? null : base.chart.marginTop, height },
            legend: {
                enabled: isSmall,
                itemStyle: { width: legendItemWidth + 'px', textOverflow: null },
            },
            plotOptions: {
                pie: {
                    size: pieSize + 'px',
                    // On small screens sit the pie at the top of the plot
                    // area, rather than centred between the subtitle and
                    // the legend, so any spare height ends up below it.
                    center: isSmall ? ['50%', pieSize / 2] : ['50%', '50%'],
                    dataLabels: { enabled: !isSmall, distance: dataLabelDistance },
                },
            },
        };
    }
}
