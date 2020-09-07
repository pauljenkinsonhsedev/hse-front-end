import { ChartOptions } from './dependencies';
import load from '../utils/asset-loader';
import {loading} from '../utils/loader';

class ChartsDefault {
    constructor() {
        this.chart = window.chart || {};
        this.path = window.location.protocol + '//' + window.location.host + '/';
        // this.path = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1]; // for use on testbed
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
        const msg = this.chart ? 'successful' : 'unsuccessful';
        console.log(`Charts loaded ${msg}`);
    }
}

export default ChartsDefault;
