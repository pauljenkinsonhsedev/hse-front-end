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
