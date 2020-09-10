import { ChartOptions } from './dependencies';
import load from '../utils/asset-loader';
import {loading} from '../utils/loader';

class ChartsDefault {
    constructor() {
        this.chart = window.chart || {};

        switch(process.env.NODE_ENV) {
            case 'development':
                this.path = window.location.protocol + '//' + window.location.host + '/';
            break;
            case 'staging':
                this.path = window.location.protocol + '//' + window.location.host;
            break;
            case 'production':
                this.path = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1];
            break;
            default:
                this.path = window.location.protocol + '//' + window.location.host;
            break;
        }

        // conditional for shadow directory
        if (window.location.href.match(/(?:\b|_)(?:livelive)(?:\b|_)/i)) {
            this.path = window.location.protocol + '//' + window.location.host + '/secureroot/hseonline/website/livelive/secureroot';
        }

        console.log('pathname');
        console.log(`${this.path}`);

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
                let defaultOptions = new ChartOptions(container);
                this.buildFn(container, defaultOptions.collection.collection);
            });
        })
        .catch((err) => {
            console.error(`There was an error initialising charts: ${err}`);
        });
    }

    buildFn(container, params){
        this.chart = new Highcharts.chart(container, params);

        if (process.env.NODE_ENV === 'development') {
            const msg = this.chart ? 'successful' : 'unsuccessful';
            console.log(`Charts loaded ${msg}`);
        }
    }
}

export default ChartsDefault;
