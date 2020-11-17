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
import { displayPrefix } from './data-prefix.js';
import { displaySuffix } from './data-suffix.js';
import { dataTooltip } from './tooltip.js';
import { plotBand } from './plot-band';
import {bold} from 'ansi-colors';

export class ChartOptions {
    constructor(container) {
        this.container = container;
        this.brandGrayscale = ['#CCCCCC', '#999999', '#666666']
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
        this.decimals = container.dataset.decimalPoint;
        this.colWidth = 75;
        this.collection = new Array;

        // get series information
        let units = container.querySelectorAll('.unit');
        let total = 0;
        for (let i = 0; i < units.length; i++) {
            total += Number(units[i].innerText)
        }

        const getSeriesData = seriesData(this.container);
        const categoryData = chartCategories(this.container);
        const getTooltip = dataTooltip(this.type, this.units, this.decimals, total);
        const getPlotBand = plotBand(this.container, this.brandGrayscale);

        this.collection = {
            chart: {
                type: this.type,
                renderTo: this.chartRender,
                marginTop: 90
            },
            title: {
                useHTML: true,
                text: '<div style="text-align: center;">' + this.title + '</div>',
                style:{
                    color: '#000',
                    fontFamily: this.fontFamily,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                }
            },
            subtitle: {
                useHTML: true,
                text: '<div style="text-align: center;">' + this.subtitle + '</div>',
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
                    useHTML: true,
                },
                accessibility: {
                    description: this.description
                },
                plotBands: getPlotBand,
                // min: 0,
                // max: 2
            },
            yAxis: {
                labels: {
                    format: '{value:,.0f}'
                },
                title: {
                    text: this.yAxisText,
                    style: {
                        fontWeight: 'bold',
                    }
                },
            },
            tooltip: {
                useHTML: true,
                formatter: getTooltip,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1,
                padding: 1,
                style: {
                    opacity: 1
                }
            },
            legend: {
                enabled: true,
                itemStyle: {
                    font: this.fontFamily,
                    color: '#000'
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
