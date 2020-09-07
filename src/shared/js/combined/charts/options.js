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
import {
    ChartOptionsDefault,
    ChartOptionsLine,
    ChartOptionsArearange,
    ChartOptionsPie,
    ChartOptionsDonut,
    ChartOptionsBarStacked
} from './dependencies';

export class ChartOptions {
    constructor(container) {
        this.container = container;
        this.brandColours = ['#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac'];
        this.fontFamily = 'Arial, Helvetica, sans-serif';
        this.chartRender = container.querySelector('.displayChart');
        this.dataTable = container.querySelector('.tabledata');
        this.type = container.dataset.chartType;
        this.title = container.dataset.chartTitle;
        this.subtitle = container.dataset.chartSubtitle;
        this.description = container.querySelector('.datacontent__description');
        this.yAxisText = container.dataset.yaxisText;
        this.xAxisText = container.dataset.xaxisText;
        this.units = container.dataset.chartUnits;
        this.colWidth = 75;
        this.dataLabelsSuffix = this.displaySuffix(this.units);
        this.categories = this.chartCategories(this.container);
        this.defaults = new Array;
        this.collection = new Array;

        /*
            Plot events boolean
            - diables click events if only one set of data
        */
        this.plotEvents = false;
        for (let row of this.dataTable.rows) {
            const cells = row.querySelectorAll('td');
            if (cells.length > 2) {
                this.plotEvents = true;
            }
        }

        // get series information
        const getSeriesData = seriesData(this.container);

        this.defaults = {
            chart: {
                type: this.type,
                renderTo: this.chartRender
            },
            series: getSeriesData,
            title: {
                text: this.title,
                style:{
                    color: '#000',
                    fontFamily: this.fontFamily,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                }
            },
            subtitle: {
                text: this.subtitle,
                style: {
                    color: '#000',
                    fontFamily: this.fontFamily,
                    fontSize: '0.9rem',
                    fontWeight: 'regular'
                }
            },
            xAxis: [{
                categories: this.categories,
                title: {
                    text: this.xAxisText
                },
                accessibility: {
                    description: this.title
                },
                labels: {
                    format: this.dataLabelsSuffix,
                    // formatter: function () {

                    //     const date = moment(this.value).format('DD MMMM');
                    //     console.log(`formatDate ${date}`);
                    //     return date;
                    // }
                }
            }],
            plotOptions: {
                series: {
                    showInLegend: true,
                    events: {
                        legendItemClick: () => {
                            return this.plotEvents;
                        }
                    }
                },
                column: {
                    maxPointWidth: this.colWidth
                }
            },
            legend: {
                enabled: true,
                itemStyle: {
                    font: this.fontFamily,
                    color: '#000'
                },
                itemHoverStyle:{
                    color: 'gray'
                }
            },
            accessibility: {
                description: this.description
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            colors: this.brandColours
        };

        this.init();
    }

    init() {
        switch(this.type) {
            case 'pie':
                this.collection = new ChartOptionsPie(this.container);
            break;

            case 'donut':
                this.collection = new ChartOptionsDonut(this.container);
            break;

            case 'line':
                this.collection = new ChartOptionsLine(this.container);
            break;

            case 'barstacked':
                this.collection = new ChartOptionsBarStacked(this.container);
            break;

            case 'arearange':
                this.collection = new ChartOptionsArearange(this.container);
            break;

            default:
                this.collection = new ChartOptionsDefault(this.container);
            break;
        }

        return this.collection;
    }

    chartCategories(container){
         // Categories data collection
        const chartCategories = container.querySelectorAll('.category');
        const categoryArray = [...chartCategories];
        let categories = [];
        // Loop through categories
        categoryArray.forEach((category) => {
            // Set categories
            categories.push(category.textContent);
        });

        return categories;
    }

    displaySuffix(units) {
        let result = new String;
        switch (units) {
        case 'percentage':
            result = `<b>{point.name}</b>: {point.percentage:.1f}%`
            break;
        case 'unit':
            result = `<b>{point.name}</b>: {point.y}`
            break;
        case 'celsius':
            result = `°C`
            break;
        case 'fahrenheit':
            result = `°F`
            break;
        case 'date':
            // this.labelFormatter(this.units);
            break;
        default:
            result = `<b>{point.name}</b>: {point.y}`
            break;
        }
        return result;
    }
}
