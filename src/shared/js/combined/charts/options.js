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
import { dataLabel } from './data-label.js';
import { plotBand } from './plot-band';
import {bold} from 'ansi-colors';

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

        // get series information
        const getSeriesData = seriesData(this.container);
        const categoryData = chartCategories(this.container);
        const getDataLabel = dataLabel(this.units);
        const dataLabelsPrefix = displayPrefix(this.units);
        const dataLabelsSuffix = displaySuffix(this.units);
        const getPlotBand = plotBand(this.container, this.brandColours);

        this.collection = {
            chart: {
                type: this.type,
                renderTo: this.chartRender,
                marginTop: 90
            },
            title: {
                useHTML: true,
                text: this.title,
                style:{
                    color: '#000',
                    fontFamily: this.fontFamily,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                }
            },
            subtitle: {
                useHTML: true,
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
                    useHTML: true,


                },
                accessibility: {
                    description: this.description
                },
                plotBands: getPlotBand
            },
            yAxis: {
                title: {
                    text: this.yAxisText,
                    style: {
                        fontWeight: 'bold',
                    }
                }
            },
            tooltip: {
                shared: true,
                format: getDataLabel,
                valuePrefix: `${dataLabelsPrefix}`,
                valueSuffix: `${dataLabelsSuffix}`
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
        // console.log('options', this.collection);
    }
}
