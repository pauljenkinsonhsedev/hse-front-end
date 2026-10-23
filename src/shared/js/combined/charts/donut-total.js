/*
    drawDonutTotal

    Description:
    - Shows a donut chart's headline total (data-chart-total, with an optional
      data-chart-total-label, e.g. "£22.9 bn" / "Total cost") in the hole of
      the donut. Call from a chart.events.render handler: it's redrawn and
      re-centred on every render, and scaled down if it doesn't fit the hole
      (e.g. the smaller ring on small screens).
    - Drawn inside the chart's SVG, which screen readers don't read, so it's
      hidden from them here: the same total is in the chart's screen reader
      summary (options-donut.js) and the Tabular data tab's total row
      (charts.js).
*/

export function drawDonutTotal(chart, total, label) {
    if (chart.donutTotal) {
        chart.donutTotal.destroy();
        chart.donutTotal = null;
    }
    const series = chart.series[0];
    if (!total || !series || !series.center) return;

    const [centerX, centerY, diameter] = series.center;
    const innerSize = parseFloat(series.options.innerSize) / 100 || 0.65;
    const maxWidth = diameter * innerSize * 0.85; // leave a margin inside the hole
    const x = chart.plotLeft + centerX;
    const y = chart.plotTop + centerY;
    const renderer = chart.renderer;

    const group = renderer.g('donut-total').attr({ zIndex: 5, 'aria-hidden': 'true' }).add();
    const fontFamily = 'Roboto, Arial, "Helvetica Neue", Helvetica, sans-serif'; // as the chart title
    const value = renderer.text(total, x, y)
        .attr({ align: 'center' })
        .css({ color: '#212b32', fontFamily, fontSize: '24px', fontWeight: '600' })
        .add(group);
    const caption = label
        ? renderer.text(label, x, y)
            .attr({ align: 'center' })
            .css({ color: '#212b32', fontFamily, fontSize: '16px', fontWeight: '400' })
            .add(group)
        : null;

    // Scale both down together if either is wider than the hole
    const widest = Math.max(value.getBBox().width, caption ? caption.getBBox().width : 0);
    const scale = widest > maxWidth ? maxWidth / widest : 1;
    if (scale < 1) {
        value.css({ fontSize: `${Math.floor(24 * scale)}px` });
        if (caption) caption.css({ fontSize: `${Math.max(12, Math.floor(16 * scale))}px` });
    }

    // Centre the value (and caption below it) vertically in the hole
    const valueHeight = value.getBBox().height;
    const captionHeight = caption ? caption.getBBox().height : 0;
    const top = y - (valueHeight + captionHeight) / 2;
    value.attr({ y: top + valueHeight * 0.8 });
    if (caption) caption.attr({ y: top + valueHeight + captionHeight * 0.8 });

    chart.donutTotal = group;
}
