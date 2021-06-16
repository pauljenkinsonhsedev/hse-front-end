import {
    ChartOptions,
    ChartOptionsDefault,
    ChartOptionsLine,
    ChartOptionsDual,
    ChartOptionsArearange,
    ChartOptionsPie,
    ChartOptionsDonut,
    ChartOptionsBarStacked,
    ChartOptionsColumnStacked
} from './dependencies';

import load from '../utils/asset-loader';
// import {loading} from '../utils/loader';

class ChartsDefault {
    constructor() {
        this.chart = window.chart || {};

        // switch(process.env.NODE_ENV) {
        //     case 'development':
        //         this.path = window.location.protocol + '//' + window.location.host + '/';
        //     break;
        //     case 'staging':
        //         this.path = window.location.protocol + '//' + window.location.host;
        //     break;
        //     case 'production':
        //         this.path = window.location.protocol + '//' + window.location.host;
        //     break;
        //     default:
        //         this.path = window.location.protocol + '//' + window.location.host;
        //     break;
        // }

        // conditional for shadow directory
        this.path = window.location.protocol + '//' + window.location.host;
        if (window.location.href.match(/(?:\b|_)(?:livelive)(?:\b|_)/i)) {
            this.path = window.location.protocol + '//' + window.location.host + '/website/livelive/secureroot';
        }
        if (window.location.href.match(/(?:\b|_)(?:testbed)(?:\b|_)/i)) {
            this.path = window.location.protocol + '//' + window.location.host + '/testbed/';
        }
        if (window.location.href.match(/(?:\b|_)(?:devguide)(?:\b|_)/i)) {
            this.path = window.location.protocol + '//' + window.location.host + '/devguide/';
        }

        this.init();
    }

    loadChartsFn() {
        return Promise.all([
            load.js(this.path + '/assets/v5-js/vendor/highcharts/highcharts.js'),
            load.js(this.path + '/assets/v5-js/vendor/highcharts/highcharts-more.js'),
            load.js(this.path + '/assets/v5-js/vendor/highcharts/data.js'),
            load.js(this.path + '/assets/v5-js/vendor/highcharts/exporting.js'),
            load.js(this.path + '/assets/v5-js/vendor/highcharts/accessibility.js'),
            load.js(this.path + '/assets/v5-js/vendor/moment/moment.js'),
        ])
        .catch((err) => {
            console.error(`Error initiating charts: ${err}`);
        });
    }

    init() {
        return this.loadChartsFn().then(() => {
            const chartContainer = document.querySelectorAll('.chart');
            const chartArray = [...chartContainer];

            // initialise charts
            chartArray.forEach((container) => {
                let type = container.dataset.chartType;
                if (type.includes('with')) {
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
        // .catch((err) => {
        //     console.error(`There was an error initialising charts: ${err}`);
        // });
    }

    buildFn(container, params){
        Highcharts.setOptions({
            lang: {
                thousandsSep: ',',
                // numericSymbols: ['k', ' million', ' billion']
            }
        });
        this.chart = new Highcharts.chart(container, params);

        if (process.env.NODE_ENV === 'development') {
            const msg = this.chart ? 'successful' : 'unsuccessful';
        }
    }
}

export default ChartsDefault;
