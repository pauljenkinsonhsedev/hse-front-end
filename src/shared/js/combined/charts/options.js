/*
    Class @ChartOptions

    Description:
    - foundation for all HighCharts options
    - loops through charts to determine their options
    - imports options for various chart types

    Usage:
    chartArray.forEach((container) => {
        let defaultOptions = new ChartOptions(container);
        ...build charts function here
    });
*/

import { seriesData } from './series-data.js';
import { cellValue } from './cell-value.js';
import { chartCategories } from './chart-categories';
import { displayPrefix } from './data-prefix.js';
import { displaySuffix } from './data-suffix.js';
import { dataTooltip } from './tooltip.js';
import { plotBand } from './plot-band';
import resizer from '../utils/resizer.js';
import { measureElementHeight } from './measure-element-height.js';
import { watchLayout } from './watch-layout.js';

export class ChartOptions {
    constructor(container) {
        this.container = container;
        this.brandGrayscale = ['#e5e5e5', '#d5d5d5', '#d1d1d1']
        this.brandColours = ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac'];
        this.brandColourRed = ['#683636', '#904A4A', '#B06666', '#BF8383', '#CEA0A0', '#E0C2C2', '#EFDFDF'];
        this.brandColourBlue = ['#2C486E', '#3D6497', '#5782BB', '#789AC8', '#96B1D4', '#BCCDE4', '#DDE5F1'];
        this.brandColourGreen = ['#354F39', '#496D4E', '#5F8D66', '#7AA680', '#9BBBA0', '#BDD3C0', '#DCE8DD'];
        this.brandColourPurple = ['#4D3B61', '#6B5286', '#886CA6', '#9F89B7', '#B6A5C9', '#CFC5DB', '#E7E1ED'];
        this.brandColourBrown = ['#4D442F', '#6A5F42', '#897A55', '#A5956D', '#B9AD8F', '#D1C9B5', '#E7E3D9'];
        this.brandColourPink = ['#772B4F', '#A33B6D', '#C25689', '#CE76A0', '#D997B6', '#E7BBD0', '#F2DCE6'];
        this.fontFamily = 'Arial, Helvetica, sans-serif';
        // The chart title is styled as the site's H3 (h3 / .hse-heading-m in
        // base/core/styles/typography.scss): the page font (page.scss) and
        // text colour ($hse-text-color), like the Tabular data tab's heading.
        this.headingFontFamily = 'Roboto, Arial, "Helvetica Neue", Helvetica, sans-serif';
        this.headingColor = '#212b32'; // $hse-text-color
        this.chartRender = container.querySelector('.displayChart');
        this.dataTable = container.querySelector('.tabledata');
        this.type = container.dataset.chartType;
        this.title = container.dataset.chartTitle;
        this.subtitle = container.dataset.chartSubtitle;
        this.caption = container.dataset.chartCaption;
        // The chart's description for screen readers: a summary of what it
        // shows (data-chart-description), as text. Read before the chart as
        // {chartLongdesc}; without one, Highcharts uses the chart's caption.
        const descriptionText = (container.dataset.chartDescription || '')
            .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        this.description = descriptionText || undefined;
        this.yAxisText = container.dataset.yaxisText;
        this.xAxisText = container.dataset.xaxisText;
        this.colorScheme = container.dataset.colorScheme;
        this.gridLine = container.dataset.gridline;
        this.units = container.dataset.chartUnits;
        this.decimals = container.dataset.decimalPoint;
        this.colWidth = 75;
        this.collection = new Array;
        this.firstLast = container.dataset.xaxisFirstlast;

        // define height of chart
        const captionLength = (this.caption != undefined) ? this.caption.length: 0;
        const chartRatio = () => {
            if (container.clientWidth <= 400) {
                this.height = (4 / 3 * 100) + '%';
            } else {
                this.height = (3 / 4 * 100) + '%';
            }


            // increase height for captions
            // if (captionLength >= 0) {
            //     console.log(container.clientWidth / captionLength );
            // }


            return this.height;
        }

        // watch chartRatio on resize
        const chartHeight = resizer(chartRatio);

        // Set gridlines
        switch (this.gridLine) {
            case 'true':
                this.gridLineWidth = 1;
                break;
            case 'false':
                this.gridLineWidth = 0;
                break;
            default:
                this.gridLineWidth = 1;
                break;
        }

        // Set colour scheme
        switch (this.colorScheme) {
            case 'red':
                this.colours = this.brandColourRed;
                break;
            case 'green':
                this.colours = this.brandColourGreen;
                break;
            case 'blue':
                this.colours = this.brandColourBlue;
                break;
            case 'purple':
                this.colours = this.brandColourPurple;
                break;
            case 'brown':
                this.colours = this.brandColourBrown;
                break;
            case 'pink':
                this.colours = this.brandColourPink;
                break;
            default:
                this.colours = this.brandColours;
                break;
        }

        // set caption
        if (this.caption) {
            this.captionText = this.caption;
        } else {
            this.captionText = null;
        }

        let subTitle;
        if (this.subtitle) {
            subTitle = '<div style="text-align: center;">' + this.subtitle + '</div>';
        } else {
            subTitle = null;
        }

        // get series information
        let units = container.querySelectorAll('.unit');
        let total = 0;
        for (let i = 0; i < units.length; i++) {
            total += cellValue(units[i])
        }

        const getSeriesData = seriesData(this.container);
        const categoryData = chartCategories(this.container);
        const getTooltip = dataTooltip(this.type, this.units, this.decimals, total);
        const getPlotBand = plotBand(this.container, this.brandGrayscale);

        let flag = false;
        const checkForNull = getSeriesData.reduce(function (result, item, index) {
            if (index === 0) {
                flag = true;
            }
            return flag;
        }, 0);

        const layout = this.layout();
        this.titleFontSize = layout.title.style.fontSize;
        this.titleLineHeight = layout.title.style.lineHeight;
        this.marginTop = layout.chart.marginTop;

        const getLayout = () => this.layout();

        this.collection = {
          chart: {
            type: this.type,
            renderTo: this.chartRender,
            marginTop: this.marginTop,
            height: this.height,
            events: {
              load: function () {
                watchLayout(this, getLayout);
              },
            },
            style: {
              fontFamily: this.fontFamily,
              fontSize: '1rem',
              fontWeight: 'regular',
            },
          },
          accessibility: {
            description: this.description,
            screenReaderSection: {
              beforeChartFormat:
                '<div>{chartTitle}</div>' +
                '<div>{typeDescription}</div>'+
                '<div>{chartSubtitle}</div>' +
                '<div>{chartLongdesc}</div>'
            },
            // Each point is announced with its unit, as its label shows it
            // (e.g. "Injury, 38%."). Not for percentage-calc charts: their
            // values are counts, from which the chart works out percentages.
            point: {
              valuePrefix: displayPrefix(this.units),
              valueSuffix: this.units === 'percentage-calc' ? '' : displaySuffix(this.units),
            },
            keyboardNavigation: {
              focusBorder: {
                enabled: true,
                style: {
                  color: '#ffdd00', // $hse-focus-color
                  lineWidth: 4, // $hse-focus-width
                  borderRadius: 0,
                },
                margin: 0,
              },
            },
          },
          title: {
            useHTML: true,
            text: '<div style="text-align: center;">' + this.title + '</div>',
            // Highcharts shrinks a title that doesn't fit on one line (to
            // as little as 0.67x) before wrapping it, so titles of
            // different lengths render at different sizes. Always wrap at
            // the full H3 size instead.
            minScale: 1,
            style: {
              color: this.headingColor,
              fontFamily: this.headingFontFamily,
              fontSize: this.titleFontSize,
              lineHeight: this.titleLineHeight,
              fontWeight: '600', // $hse-font-bold
            },
          },
          subtitle: {
            useHTML: true,
            text: subTitle,
            style: {
              color: '#000',
              fontFamily: this.fontFamily,
              fontSize: '1rem',
              fontWeight: 'regular',
            },
          },
          caption: {
            text: this.captionText,
            useHTML: true,
            style: {
              color: '#666',
              fontFamily: this.fontFamily,
              fontSize: '1rem',
              fontWeight: 'regular',
            },
          },
          xAxis: {
            categories: categoryData,
            title: {
              text: this.xAxisText,
              align: 'high',
              style: {
                color: '#000',
                fontFamily: this.fontFamily,
                fontSize: '1rem',
                fontWeight: 'normal',
              },
            },
            labels: {
              overflow: 'justify',
              formatter: function () {
                if (this.firstLast === 'true') {
                    if(this.isFirst || this.isLast) {
                        return this.value
                    } else {
                        return ''
                    }
                } else {
                    return this.value
                }
              },
              // useHTML: true,
              style: {
                fontFamily: this.fontFamily,
                fontSize: '1rem',
                fontWeight: 'regular',
              },
            },
            // accessibility: {
            //   description: this.description,
            // },
            plotBands: getPlotBand,
          },
          yAxis: {
            labels: {
              format: '{value:,.0f}',
              style: {
                fontFamily: this.fontFamily,
                fontSize: '1rem',
                fontWeight: 'regular',
              },
            },
            title: {
              text: this.yAxisText,
              // Regular black, like the legend and subtitle, rather than
              // bold Highcharts grey
              style: {
                color: '#000',
                fontFamily: this.fontFamily,
                fontSize: '1rem',
                fontWeight: 'normal',
              },
            },
            gridLineWidth: this.gridLineWidth,
            minorGridLineWidth: this.gridLineWidth,
          },
          tooltip: {
            useHTML: true,
            formatter: getTooltip,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
            padding: 1,
            style: {
              opacity: 1,
              fontFamily: this.fontFamily,
              fontSize: '1rem',
            },
          },
          legend: {
            enabled: true,
            itemStyle: {
              font: this.fontFamily,
              fontSize: '1rem',
              color: '#000',
            },
          },
          plotOptions: {
            series: {
              pointWidth: 15,
              borderWidth: 0,
              showInLegend: true,
              events: {
                legendItemClick: function () {
                  return false;
                },
              },
              dataLabels: {
                style: {
                  fontFamily: this.fontFamily,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                },
              },
            },
          },
          credits: {
            enabled: false,
          },
          exporting: {
            enabled: false,
          },
          colors: this.colours,
          series: getSeriesData,
        };
    }

    // Every option that depends on the chart's current width. Called
    // once when the chart is built, then again by watchLayout whenever
    // the container resizes (see watch-layout.js), so subclasses that
    // add their own width-dependent options should override this and
    // merge in super.layout().
    layout() {
        // Chart title mirrors the site's H3 heading scale (rather than H2),
        // since charts always sit below an H2 on the page. Values match
        // the "24" entry of $hse-typography-scale (settings/typography.scss),
        // switching at the sass-mq "tablet" breakpoint (641px, breakpoints.scss)
        // of the viewport, as H3s elsewhere on the page do, so the title
        // matches them even in a narrow (e.g. two-thirds) column.
        const isTabletUp = window.matchMedia('(min-width: 641px)').matches;
        const titleFontSize = isTabletUp ? '1.5rem' : '1.25rem'; // 24px / 20px
        const titleLineHeight = isTabletUp ? '2rem' : '1.75rem'; // 32px / 28px

        // chart.marginTop reserves space above the plot area for the
        // title + subtitle. 100px covers the common case (short title,
        // no/short subtitle), but a long subtitle (a multi-line
        // paragraph) can need more room than that — the plot area (and
        // any data labels that sit outside the shape itself, e.g. a
        // pie's outer labels) would otherwise start before the subtitle
        // has actually finished rendering and overlap it. Measure the
        // actual content height and only grow past 100px when it's
        // needed, so every chart with a short title/subtitle keeps
        // today's exact spacing.
        // Highcharts wraps the (HTML) title and subtitle narrower than the
        // container: .chart's padding (8px each side) and chart spacing
        // (10px each side). Measure at that width: narrower and they
        // measure extra lines (an ~80px gap above the plot on mobile),
        // wider and two-line titles measure as one.
        const textWidth = this.container.clientWidth - 36;
        const titleHeight = measureElementHeight(textWidth, this.title, {
          fontFamily: this.headingFontFamily,
          fontSize: titleFontSize,
          lineHeight: titleLineHeight,
          fontWeight: '600',
        });
        const subtitleHeight = measureElementHeight(textWidth, this.subtitle, {
          fontFamily: this.fontFamily,
          fontSize: '1rem',
          fontWeight: 'normal',
        });
        // The off-screen measurement above approximates Highcharts' own
        // SVG text wrapping but isn't pixel-identical to it (different
        // rendering engine, font metrics), so a plain content+padding
        // total can still land a few px short in the real chart. Add a
        // second, larger safety margin, but only for charts that
        // actually need to grow past the 100px floor in the first place
        // — that keeps every chart with a short title/subtitle at
        // exactly 100px, unchanged, while charts with long subtitles get
        // real breathing room instead of a razor-thin gap.
        const chartTopPadding = 24; // baseline breathing room below the subtitle, above the plot area
        const measurementSafetyMargin = 24; // extra buffer once base padding requires growing past 100px
        const requiredHeight = titleHeight + subtitleHeight + chartTopPadding;
        const marginTop = requiredHeight > 100
          ? requiredHeight + measurementSafetyMargin
          : 100;

        return {
            chart: { marginTop },
            title: {
                style: { fontSize: titleFontSize, lineHeight: titleLineHeight },
            },
        };
    }
}
