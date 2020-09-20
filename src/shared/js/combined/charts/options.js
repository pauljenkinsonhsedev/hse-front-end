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
import { chartCategories } from './chart-categories';
import { displaySuffix } from './data-suffix.js';

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
        this.collection = new Array;

        console.log(`y ${this.yAxisText}`);
        console.log(`x ${this.xAxisText}`);

        // get series information
        const getSeriesData = seriesData(this.container);

        const categories = new Array;
        const categoryData = chartCategories(this.container);
        const dataLabelsSuffix = displaySuffix(this.units);


        this.collection = {
            chart: {
                type: this.type,
                renderTo: this.chartRender
            },
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
            xAxis: {
                categories: categoryData,
                title: {
                    text: this.xAxisText,
                    align: 'high'
                },
                labels: {
                    overflow: 'justify',
                },
                accessibility: {
                    description: this.description
                },
            },
            yAxis: {
                title: {
                    text: this.yAxisText
                },
            },
            tooltip: {
                shared: true,
                formatter: function () {
                    return [].concat(
                    this.points ?
                    this.points.map(function (point) {
                        let key = point.key;
                        return `<b>${key}</b><br />${point.series.name}: ${point.y}${dataLabelsSuffix} `;
                    }) : []
            );
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
            colors: this.brandColours,
            series: getSeriesData
        };
    }
}
