import { ChartOptions } from './dependencies';
import load from '../utils/asset-loader';
import {loading} from '../utils/loader';

class ChartsDefault {
    constructor() {
        this.chart = window.chart || {};
        this.path = location.href.substring(0, location.href.lastIndexOf("/")+1)
        this.init();
    }

    loadChartsFn() {
        console.log('charts loader');
        return Promise.all([
            load.js(this.path + '/assets/v5-js/vendor/highcharts/highcharts.js'),
            load.js(this.path + '/assets/v5-js/vendor/highcharts/highcharts-more.js'),
            load.js(this.path + '/assets/v5-js/vendor/highcharts/data.js'),
            load.js(this.path + '/assets/v5-js/vendor/highcharts/exporting.js'),
            load.js(this.path + '/assets/v5-js/vendor/highcharts/accessibility.js'),
            load.js(this.path + '/assets/v5-js/vendor/moment/moment.js'),
        ])
        .then(() => {
            console.log('HighCharts scripts loaded');
        })
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
