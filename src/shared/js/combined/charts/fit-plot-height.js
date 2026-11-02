/*
    fitPlotHeight

    Description:
    - Line and column charts are a fixed height (Highcharts' default),
      and the title, subtitle, legend and caption all come out of it. On
      a small screen, where they wrap onto more lines, a chart with long
      text was left with almost no plot area (e.g. a flat line with the
      legend over the axis labels).
    - For a chart.events.render handler: on small screens and narrow
      charts, grow the chart until the plot area is at least
      minPlotHeight tall. Wider desktop charts keep their normal height,
      and a chart that grew goes back to it when the screen gets wider.
*/

export function fitPlotHeight(chart, minPlotHeight = 200) {
    // The height the chart first drew at, to go back to
    if (!chart.defaultChartHeight) {
        chart.defaultChartHeight = chart.chartHeight;
    }
    // Small as for pies and donuts: below the sass-mq "desktop" breakpoint
    // (769px, breakpoints.scss), or a narrow chart on a small desktop
    // (e.g. in a two-thirds column), where the text wraps just as much
    const isDesktop = window.matchMedia('(min-width: 769px)').matches;
    const isSmall = !isDesktop || chart.chartWidth < 600;
    const shortfall = isSmall ? minPlotHeight - chart.plotHeight : -Infinity;
    const height = Math.max(chart.defaultChartHeight, Math.ceil(chart.chartHeight + shortfall));
    if (Math.abs(height - chart.chartHeight) > 1) {
        chart.setSize(null, height, false);
    }
}
