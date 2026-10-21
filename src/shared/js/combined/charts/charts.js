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
                shadow: false
            }
        });

        // DRAW THE CHART
        this.chart = Highcharts.chart(container, params);
    }
}

export default ChartsDefault;