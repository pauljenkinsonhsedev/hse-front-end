import { ChartOptionsDefault, ChartOptionsArearange, ChartOptionsPie, ChartOptionsBarStacked } from './dependencies';

export class ChartOptions {
    constructor(container) {
        this.container = container;
        this.brandColours = ['#981E32', '#BB253E', '#D7334E', '#DD556B', '#E47789', '#EB99A6', '#F2BBC4', '#F8DDE1'];
        this.chartRender = container.querySelector('.displayChart');
        this.dataTable = container.querySelector('.tabledata');
        this.type = container.dataset.chartType;
        this.title = container.dataset.chartTitle;
        this.subtitle = container.dataset.chartSubtitle;
        this.description = container.querySelector('.datacontent__description');
        this.tableDescYText = container.dataset.tableDescY;
        this.tableDescXText = container.dataset.tableDescX;
        this.units = container.dataset.chartUnits;
        this.colWidth = 75;
        this.dataLabelsUnits = this.displayUnits(this.units);
        this.categories = this.chartCategories(this.container);
        this.defaults = new Array;
        this.collection = new Array;

        this.defaults = {
            chart: {
                spacingBottom: 20,
                spacingTop: 20,
                spacingLeft: 20,
                spacingRight: 20,
                borderColor: '#E1E1E1',
                borderWidth: 1,
                type: this.type,
                renderTo: this.chartRender
            },
            data: {
                table: this.dataTable
            },
            title: {
                text: this.title,
                style:{
                    color: '#000',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                }
            },
            subtitle: {
                text: this.subtitle,
                style: {
                    color: '#000',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 'regular'
                }
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

    displayUnits(units) {
        let result = new String;
        switch (units) {
        case 'percentage':
            result = `<b>{point.name}</b>: {point.percentage:.1f}%`
            break;
        case 'unit':
            result = `<b>{point.name}</b>: {point.y}`
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


    // defaultChartOptions(getOptions, categories) {
    //     let xAxis = [{
    //         categories: categories,
    //         title: {
    //             text: this.tableDescXText
    //         },
    //         accessibility: {
    //             description: this.title
    //         },
    //         labels: {
    //             // here
    //             // formatter: function () {

    //             //     const date = moment(this.value).format('DD MMMM');
    //             //     console.log(`formatDate ${date}`);
    //             //     return date;
    //             // }
    //         }
    //     }];
    //     let yAxis = [{
    //         title: {
    //             text: this.tableDescYText,
    //         },
    //         accessibility: {
    //             description: this.title
    //         }
    //     }];
    //     let plotOptions = {
    //         series: {
    //             showInLegend: this.legend
    //         },
    //         column: {
    //             maxPointWidth: 75
    //         }
    //     }

    //     let tooltip = {
    //         // shared: true
    //     };

    //     const options = { ...getOptions, plotOptions, xAxis, yAxis, tooltip};

    //     return options;
    // }

    // barStackedOptions(getOptions, categories) {
    //     let chart=  {
    //         type: 'bar'
    //     };
    //     let xAxis = {
    //         categories: categories
    //     };
    //     let yAxis = {
    //         min: 0,
    //         title: {
    //             text: this.title
    //         }
    //     };
    //     let legend = {
    //         reversed: true
    //     };
    //     let plotOptions = {
    //         series: {
    //             stacking: 'normal'
    //         }
    //     };

    //     const options = { ...getOptions, chart, xAxis, yAxis, legend, plotOptions};

    //     return options;
    // }

    // areaRangeOptions(){
    //     const seriesRangeData = seriesDataRanges(this.dataTable);
    //     const averagesData = seriesRangeData.averagesData();
    //     const rangesData = seriesRangeData.rangesData();

    //     let title = {
    //         text: 'July temperatures'
    //     };

    //     let tooltip = {
    //         crosshairs: true,
    //         shared: true,
    //         valueSuffix: '°C'
    //     };

    //     let series = [{
    //         name: 'Temperature',
    //         data: averagesData[0],
    //         zIndex: 1,
    //         fillOpacity: 0.3,
    //         color: this.brandColours[0],
    //         marker: {
    //             fillColor: 'white',
    //             lineWidth: 2,
    //             lineColor: this.brandColours[0]
    //         }
    //     }, {
    //         name: 'Range',
    //         data: rangesData[0],
    //         type: 'arearange',
    //         lineWidth: 0,
    //         linkedTo: ':previous',
    //         color: this.brandColours[0],
    //         fillOpacity: 0.3,
    //         zIndex: 0,
    //         marker: {
    //             enabled: false
    //         }
    //     }];

    //     let xAxis = {
    //         type: 'datetime',
    //         accessibility: {
    //             rangeDescription: 'Range: Jul 1st 2009 to Jul 31st 2009.'
    //         }
    //     }

    //     let yAxis = {
    //         title: {
    //             text: null
    //         }
    //     }

    //     let credits = {
    //         enabled: false
    //     };

    //     let exporting = {
    //         enabled: false
    //     };

    //     const options = {title, xAxis, yAxis, tooltip, series, credits, exporting};

    //     return options;
    // }

    // pieChartOptions(getOptions){
    //     let pieOptions = {
    //         allowPointSelect: true,
    //         cursor: 'pointer',
    //         dataLabels: {
    //             enabled: true,
    //             format: this.dataLabelsUnits,
    //             connectorColor: 'silver'
    //         }
    //     }
    //     let plotOptions = {
    //         pie: {
    //             allowPointSelect: true,
    //             cursor: 'pointer',
    //             dataLabels: {
    //                 enabled: true,
    //                 format: this.dataLabelsUnits,
    //                 connectorColor: 'silver'
    //             }
    //         }
    //     }

    //     const options = { ...getOptions, pieOptions, plotOptions};

    //     return options;
    // }


// export default ChartOptions;

    // labelFormatter(units){
    //     console.log(`units ${units}`);
    // }