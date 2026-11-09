/*
    watchLayout

    Description:
    - Highcharts reflows a chart's width when its container resizes,
      but every other size-dependent option we set (title size,
      marginTop, pie size, label distance...) is calculated once, when
      the chart is first built. Resizing the window after load left
      those at their page-load values, e.g. a desktop-sized pie and
      marginTop squeezed into a mobile-width chart.
    - Re-runs getLayout whenever the chart's container resizes and
      applies the result, but only when a value has actually changed,
      so charts whose layout doesn't change are never redrawn.

    Usage:
    chart: {
        events: {
            load: function () {
                watchLayout(this, () => options.layout());
            }
        }
    }
*/

export function watchLayout(chart, getLayout) {
    let lastLayout = JSON.stringify(getLayout());
    let frame;

    const observer = new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            const layout = getLayout();
            const nextLayout = JSON.stringify(layout);
            if (nextLayout === lastLayout) return;
            lastLayout = nextLayout;
            chart.update(layout, true, false, false);
        });
    });

    observer.observe(chart.renderTo);
}
