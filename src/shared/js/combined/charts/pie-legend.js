/*
    Pie/donut legend helpers

    Description:
    - Pie and donut charts show labels beside the ring on desktop and a
      stacked legend underneath on smaller screens (see the layout()
      methods in options-pie.js and options-donut.js). These are the
      sizing pieces both share.
*/

// The height a chart gets with no height set: the space inside .chart's
// min-height, padding and border. Pies and donuts set their height as a
// number rather than leaving it unset, because once a chart has grown,
// Highcharts' "unset" height is the container's current height, so it
// would never shrink back on resize.
export function defaultChartHeight(container) {
    const style = window.getComputedStyle(container);
    return ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth']
        .reduce((height, prop) => height - parseFloat(style[prop]), parseFloat(style.minHeight)) || 400;
}

// For a chart.events.render handler. layout() can only estimate the
// small-screen height (it runs before Highcharts has drawn the title,
// subtitle and legend), so once they're drawn, size the chart to fit them
// exactly: the pie or ring (near the top of the plot area), a small gap,
// then the legend. Works from where the legend actually is, so
// anything Highcharts puts below it (e.g. a caption) is allowed for too.
// For a chart.events.render handler, when the pie or ring has outer
// data labels rather than a legend. Highcharts reserves room below the
// plot area for the caption, but not for outer labels, so with a long
// (multi-line) caption the plot area shrinks to about the ring's own
// height and a label near 6 o'clock ends up level with the caption.
// Grow the chart until the ring and its lowest label clear the caption.
// Only ever grows, so a chart that already fits is unchanged.
export function fitHeightToCaption(chart) {
    if (chart.legend.display || !chart.caption || !chart.series[0]) return;
    if (!chart.caption.element.textContent.trim()) return; // nothing to clear
    const captionGap = 20;
    const top = chart.container.getBoundingClientRect().top;
    const captionTop = chart.caption.element.getBoundingClientRect().top - top;
    const [, centerY, diameter] = chart.series[0].center;
    const lowest = chart.series[0].points.reduce((bottom, point) => {
        const label = point.dataLabel && point.dataLabel.element;
        return label && point.dataLabel.visibility !== 'hidden'
            ? Math.max(bottom, label.getBoundingClientRect().bottom - top)
            : bottom;
    }, chart.plotTop + centerY + (diameter / 2));
    const shortfall = captionGap - (captionTop - lowest);
    // The ring is centred in the plot area, so it (and its labels) moves
    // down half as far as the caption: grow by twice the shortfall.
    if (shortfall > 1) {
        chart.setSize(null, chart.chartHeight + Math.ceil(shortfall * 2), false);
    }
}

export function fitHeightToLegend(chart) {
    const legend = chart.legend;
    if (!legend.display || !legend.group || !chart.series[0]) return;
    const pieGap = 16; // to the legend box, which has its own padding above the items
    const legendTop = legend.group.translateY;
    const [, centerY, diameter] = chart.series[0].center;
    const wantedLegendTop = chart.plotTop + centerY + (diameter / 2) + pieGap + (legend.options.margin || 0);
    const heightChange = Math.round(wantedLegendTop - legendTop);
    if (Math.abs(heightChange) > 1) {
        chart.setSize(null, chart.chartHeight + heightChange, false);
    }
}
