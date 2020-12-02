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
        this.brandColourRed = ['#683636', '#904A4A', '#B06666', '#BF8383', '#CEA0A0', '#E0C2C2', '#EFDFDF'];
        this.brandColourBlue = ['#2C486E', '#3D6497', '#5782BB', '#789AC8', '#96B1D4', '#BCCDE4', '#DDE5F1'];
        this.brandColourGreen = ['#354F39', '#496D4E', '#5F8D66', '#7AA680', '#9BBBA0', '#BDD3C0', '#DCE8DD'];
        this.brandColourPurple = ['#4D3B61', '#6B5286', '#886CA6', '#9F89B7', '#B6A5C9', '#CFC5DB', '#E7E1ED'];
        this.brandColourBrown = ['#4D442F', '#6A5F42', '#897A55', '#A5956D', '#B9AD8F', '#D1C9B5', '#E7E3D9'];
        this.brandColourPink = ['#772B4F', '#A33B6D', '#C25689', '#CE76A0', '#D997B6', '#E7BBD0', '#F2DCE6'];
        this.fontFamily = 'Arial, Helvetica, sans-serif';
        this.chartRender = container.querySelector('.displayChart');
        this.dataTable = container.querySelector('.tabledata');
        this.type = container.dataset.chartType;
        this.title = container.dataset.chartTitle;
        this.subtitle = container.dataset.chartSubtitle;
        this.description = container.querySelector('.datacontent__description');
        this.yAxisText = container.dataset.yaxisText;
        this.xAxisText = container.dataset.xaxisText;
        this.colorScheme = container.dataset.colorScheme;
        this.units = container.dataset.chartUnits;
        this.decimals = container.dataset.decimalPoint;
        this.colWidth = 75;
        this.collection = new Array;

        // Set colour scheme
        switch (this.colorScheme) {
            case 'red':
                this.colours = this.brandColourRed;
                break;
            case 'green':
                this.colours = this.brandColourGreen;
                break;
            case 'blue':
                this.colours = this.brandColourBlue;
                break;
            case 'purple':
                this.colours = this.brandColourPurple;
                break;
            case 'brown':
                this.colours = this.brandColourBrown;
                break;
            case 'pink':
                this.colours = this.brandColourPink;
                break;
            default:
                this.colours = this.brandColours;
                break;
        }

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
            colors: this.colours,
            series: getSeriesData
        };
    }
}
