import load from '../../utils/asset-loader';

class ChartsDefault {
    constructor() {
        this.colours = ['#981E32', '#BB253E', '#D7334E', '#DD556B', '#E47789', '#EB99A6', '#F2BBC4', '#F8DDE1'];
        this.loader = document.createElement('div');
        this.loader.className = 'hse-loader';
        this.loader.innerHTML = '<div></div><div></div><div></div><div></div>';
        this.chart = window.chart || {};
        this.optionSettings;
        this.path = `${window.location.protocol}//${window.location.host}`;
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
        .then(() => {
            console.log('HighCharts scripts loaded');
        }).catch((err) => {
            console.error(`Error initiating charts: ${err}`);
        });
    }

    init() {
        return this.loadChartsFn().then(() => {
            const chartContainer = document.querySelectorAll('.chart');
            const chartArray = [...chartContainer];

            // initialise charts
            chartArray.forEach((container) => {
                const options = this.options(container);
                this.build(container, options);
            });
        })
        .catch((err) => {
            console.error(`There was an error initialising charts: ${err}`);
        });
    }

    build(container, options){
        this.chart = new Highcharts.chart(container, options);
        const msg = this.chart ? 'successful' : 'unsuccessful';
        console.log(`Charts loaded ${msg}`);
    }

    labelFormatter(units){
        console.log(`units ${units}`);
    }

    options(container) {
        this.chartRender = container.querySelector('.displayChart');
        this.dataTable = container.querySelector('.tabledata');
        this.type = container.dataset.chartType;
        this.title = container.dataset.chartTitle;
        this.subtitle = container.dataset.chartSubtitle;
        this.description = container.querySelector('.datacontent__description');
        this.tableDescYText = container.dataset.tableDescY;
        this.tableDescXText = container.dataset.tableDescX;

        this.displayUnits = null;
        this.units = container.dataset.chartUnits;

        switch (this.units) {
            case 'percentage':
                this.displayUnits = `<b>{point.name}</b>: {point.percentage:.1f}%`
                break;
            case 'unit':
                this.displayUnits = `<b>{point.name}</b>: {point.y}`
                break;
            case 'date':
                this.labelFormatter(this.units);
                break;
            default:
                this.displayUnits = `<b>{point.name}</b>: {point.y}`
                break;
        }

        // Categories data collection
        const chartCategories = container.querySelectorAll('.category');
        const categoryArray = [...chartCategories];
        const categories = [];
        // Loop through categories
        categoryArray.forEach((category) => {
            // Set categories
            categories.push(category.innerText);
        });

        // Set legend if more than one set of data
        this.showLegend = false
        for (let row of this.dataTable.rows) {
            const cells = row.querySelectorAll('td');
            if (cells.length > 2) {
                this.showLegend = true;
            }
        }

        // set options
        let options = {
            chart: {
                spacingBottom: 20,
                spacingTop: 20,
                spacingLeft: 20,
                spacingRight: 20,
                borderColor: '#E1E1E1',
                borderWidth: 1,
                type: this.type,
                renderTo: this.chartRender,
            },
            data: {
                table: this.dataTable
            },
            exporting: {
                enabled: false
            },
            colors: this.colours,
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
            accessibility :{
                description: this.description
            },
            legend: {
                enabled: this.showLegend,
                itemStyle: {
                    font: 'Arial, Helvetica, sans-serif',
                    color: '#000'
                },
                itemHoverStyle:{
                    color: 'gray'
                }
            },
            credits: {
                enabled: false
            }
        };

        switch(this.type) {
            case 'pie':
                options = this.pieChartOptions(options);
            break;

            case 'barstacked':
                options = this.barStackedOptions(options, categories);
            break;

            case 'arearange':
                options = this.areaRangeOptions(options);
            break;

            default:
                options = this.defaultChartOptions(options, categories);
            break;
        }

        return options;
    }

    defaultChartOptions(getOptions, categories) {

        let xAxis = [{
            categories: categories,
            title: {
                text: this.tableDescXText
            },
            accessibility: {
                description: this.title
            },
            labels: {
                // here
                // formatter: function () {
                //     const date = moment(this.value).format('DD MMMM');
                //     console.log(`formatDate ${date}`);
                //     return date;
                // }
            }
        }];
        let yAxis = [{
            title: {
                text: this.tableDescYText,
            },
            accessibility: {
                description: this.title
            }
        }];
        let plotOptions = {
            series: {
                showInLegend: this.legend
            }
        }

        let tooltip = {
            // shared: true
        };

        const options = { ...getOptions, plotOptions, xAxis, yAxis, tooltip};

        return options;
    }

    barStackedOptions(getOptions, categories) {
        let chart=  {
            type: 'bar'
        };
        let xAxis = {
            categories: categories
        };
        let yAxis = {
            min: 0,
            title: {
                text: this.title
            }
        };
        let legend = {
            reversed: true
        };
        let plotOptions = {
            series: {
                stacking: 'normal'
            }
        };

        const options = { ...getOptions, chart, xAxis, yAxis, legend, plotOptions};

        return options;
    }

    areaRangeOptions(getOptions){
        let tooltip = {
            crosshairs: true,
            shared: true,
            valueSuffix: '°C'
        };

        let series = [{
            name: 'Temperature',
            zIndex: 1,
            marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: this.colours[0]
            }
        }, {
            name: 'Range',
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: this.colours[0],
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
                enabled: false
            }
        }];

        let yAxis = {
            title: {
                text: null
            }
        }

        const options = { ...getOptions, tooltip, series, yAxis};

        return options;
    }

    pieChartOptions(getOptions){
        let pieOptions = {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: this.displayUnits,
                connectorColor: 'silver'
            }
        }
        let plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: this.displayUnits,
                    connectorColor: 'silver'
                }
            }
        }

        const options = { ...getOptions, pieOptions, plotOptions};

        return options;
    }
}

export default ChartsDefault;

// case 'columnrange':
    //                 let chart = {
    //                     type: 'columnrange',
    //                     inverted: true
    //                 };

    //                 let xAxis = {
    //                     categories: categories
    //                 };

    //                 let yAxis = {
    //                     title: {
    //                         text: this.tableDescYText
    //                     }
    //                 }

    //                 let tooltip = {
    //                     valueSuffix: this.displayUnits
    //                 };

    //                 let plotOptions = {
    //                     columnrange: {
    //                         dataLabels: {
    //                             enabled: true,
    //                             format: this.displayUnits
    //                         }
    //                     }
    //                 };

    //                 let legend = {
    //                     enabled: false
    //                 };

    //                 let series = [{
    //                     name: '',
    //                     data: this.seriesDataSet
    //                 }];

    //                 options = {...options, chart, xAxis, yAxis, tooltip, plotOptions, legend, series};
    //             break;

    //     function tableToArray(table) {
    //         const tbody = table.querySelector('.table__body');
    //         const result = [].reduce.call(tbody.rows, function (result, row) {
    //             const unit = row.querySelector('.unit');
    //             // console.log(`unit ${unit.textContent}`);
    //             const catgeory = row.querySelector('.category');
    //             // console.log(`catgeory ${catgeory.textContent}`);

    //             if (row.contains(catgeory)) {
    //                 // result.name.push(catgeory.textContent);
    //             }
    //             result.push([].reduce.call(row.cells, function(res, cell) {

    //                 // if (cell.classList.contains('unit')) {
    //                 // }
    //                 // console.log(`dataSet ${JSON.stringify(dataSet)}`);
    //                 let unit = parseInt(cell.innerHTML);

    //                 if (unit) {
    //                     res.push(unit);
    //                 }
    //                 // console.log(`data ${JSON.stringify(data)}`);
    //                 return res;
    //             }, []));
    //             return result;
    //         }, []);
    //         return result;
    //     }

    //     this.seriesDataSet = tableToArray(this.dataTable);

    //     console.log(this.seriesDataSet);