import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import Data from 'highcharts/modules/data';
import Exporting from 'highcharts/modules/exporting';
import Accessibility from 'highcharts/modules/accessibility';

// PLOT TWIST FIX: Module bundlers often wrap imported functions in a 'default' object.
// This helper safely initializes Highcharts modules regardless of how the bundler packaged them.
const safeInit = (module, hc) => {
    if (typeof module === 'function') {
        module(hc);
    } else if (module && typeof module.default === 'function') {
        module.default(hc);
    }
};

// WCAG 2.2 1.4.13 (content on hover): after Esc dismisses a tooltip (see
// ChartsDefault.init), keep it closed while the pointer stays on the same
// point. Hiding a tooltip that overlaps its own point exposes the point
// underneath, the browser fires a hover on it, and the tooltip would
// otherwise reopen straight away. Moving to another point, or out of the
// chart, lets tooltips show again.
Highcharts.wrap(Highcharts.Tooltip.prototype, 'refresh', function (proceed, pointOrPoints, event) {
    const points = [].concat(pointOrPoints);
    const dismissed = this.chart.dismissedTooltipPoint;
    if (dismissed) {
        if (points.includes(dismissed)) return;
        this.chart.dismissedTooltipPoint = null;
    }
    // Remembered for Esc: while the pointer is on the tooltip itself,
    // chart.hoverPoint has already been cleared.
    this.lastPoint = points[0];
    return proceed.call(this, pointOrPoints, event);
});

// Initialize everything safely!
safeInit(HighchartsMore, Highcharts);
safeInit(Data, Highcharts);
safeInit(Exporting, Highcharts);
safeInit(Accessibility, Highcharts);

import {
    ChartOptionsDefault,
    ChartOptionsLine,
    ChartOptionsDual,
    ChartOptionsArearange,
    ChartOptionsPie,
    ChartOptionsDonut,
    ChartOptionsBarStacked,
    ChartOptionsColumnStacked
} from './dependencies';

class ChartsDefault {
    constructor() {
        this.chart = window.chart || {};
        this.init();
    }

    // Bypass the broken asset loader by returning an empty resolved promise
    loadChartsFn() {
        return Promise.resolve(); 
    }

    init() {
        // WCAG 2.2 1.4.13 (content on hover): Esc dismisses an open chart
        // tooltip without moving the pointer. Highcharts only does this
        // during its own keyboard navigation, not after a mouse hover.
        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            // While the pointer rests on a sticky tooltip, Highcharts has
            // already marked it hidden internally although it's still on
            // screen, so tooltip.hide() alone does nothing. Mark it shown
            // again first, so hide() actually takes it off screen.
            Highcharts.charts.forEach((chart) => {
                const tooltip = chart && chart.tooltip;
                if (tooltip && tooltip.label) {
                    chart.dismissedTooltipPoint = tooltip.lastPoint;
                    tooltip.label.show();
                    tooltip.isHidden = false;
                    tooltip.hide(0);
                }
            });
        });

        return this.loadChartsFn().then(() => {
            const chartContainer = document.querySelectorAll('.chart');
            const chartArray = [...chartContainer];

            chartArray.forEach((container) => {
                let type = container.dataset.chartType;
                if (type && type.includes('with')) {
                    type = 'with';
                }

                switch(type) {
                    case 'with':
                        this.collection = new ChartOptionsDual(container);
                    break;
                    case 'pie':
                        this.collection = new ChartOptionsPie(container);
                    break;
                    case 'donut':
                        this.collection = new ChartOptionsDonut(container);
                    break;
                    case 'line':
                        this.collection = new ChartOptionsLine(container);
                    break;
                    case 'barstacked':
                        this.collection = new ChartOptionsBarStacked(container);
                    break;
                    case 'columnstacked':
                        this.collection = new ChartOptionsColumnStacked(container);
                    break;
                    case 'arearange':
                        this.collection = new ChartOptionsArearange(container);
                    break;
                    default:
                        this.collection = new ChartOptionsDefault(container);
                    break;
                }

                this.buildFn(container, this.collection);
            });
        });
    }

    buildFn(container, params){
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            },
            // Legends are a key only: clicking an item must not hide its
            // series (or, in a pie, its slice). Since Highcharts 11 the
            // toggle runs from legend.events.itemClick; the series-level
            // legendItemClick handlers in the options files fire after it
            // and returning false from them no longer prevents anything.
            legend: {
                events: {
                    itemClick: function () {
                        return false;
                    }
                }
            },
            // A plain 1px border with square corners in the standard HSE
            // border colour ($hse-border-color, settings/colours.scss),
            // rather than Highcharts' rounded corners, series-coloured
            // border and drop shadow.
            tooltip: {
                borderRadius: 0,
                borderColor: '#cecece',
                borderWidth: 1,
                shadow: false,
                // WCAG 2.2 1.4.13 (content on hover): keep the tooltip open
                // while the pointer moves onto it, e.g. for screen
                // magnifier users panning to read it.
                stickOnContact: true
            }
        });

        // DRAW THE CHART
        this.chart = Highcharts.chart(container, params);

        // Leaving the chart ends an Esc dismissal (see the Tooltip
        // refresh wrapper above), so the next hover shows its tooltip.
        const chart = this.chart;
        chart.container.addEventListener('mouseleave', () => {
            chart.dismissedTooltipPoint = null;
        });
    }
}

export default ChartsDefault;