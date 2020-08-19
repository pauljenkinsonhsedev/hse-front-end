import load from '../utils/asset-loader';

class ChartsDefault {
    constructor() {
        this.colours = ['#981E32', '#BB253E', '#D7334E', '#DD556B', '#E47789', '#EB99A6', '#F2BBC4', '#F8DDE1'];
        this.loader = document.createElement('div');
        this.loader.className = 'hse-loader';
        this.loader.innerHTML = '<div></div><div></div><div></div><div></div>';
        this.chart = window.chart || {};
    }

    loadChartsFn() {
        const promise = new Promise((reslove, reject) => {
            try {
                load.js('./assets/v5-js/vendor/highcharts/highcharts.js');
                load.js('./assets/v5-js/vendor/highcharts/data.js');
                load.js('./assets/v5-js/vendor/highcharts/exporting.js');
                load.js('./assets/v5-js/vendor/highcharts/accessibility.js');
                reslove();
            } catch (err) {
                console.error(`Error initiating charts: ${err}`);
                reject();
            }
        });
        return promise;
    }

   init() {
        const getUrl = window.location;
        const path = `${getUrl.protocol}//${getUrl.host}`;

        Promise.all([
            load.js(path + '/assets/v5-js/vendor/highcharts/highcharts.js'),
            load.js(path + '/assets/v5-js/vendor/highcharts/data.js'),
            load.js(path + '/assets/v5-js/vendor/highcharts/exporting.js'),
            load.js(path + '/assets/v5-js/vendor/highcharts/accessibility.js')
        ])
        .then(() => {
            // remove loaders
            // this.loaderRemove();
        })
        .then(() => {
            const chartContainer = document.querySelectorAll('.chart');
            const chartArray = [...chartContainer];

            // initialise charts
            chartArray.forEach((container) => {
                this.buildChartsFn(container);
            });
        })
        .then(() => {
            // update chart options for specific chart types
            // this.updateChart();

            // chart.addSeries(this.seriesData);
        })
        .catch((err) => {
            console.log(`There was an error creating charts: ${err}`);
        });
    }

    loaderAdd(container) {
        container.appendChild(this.loader);
        setTimeout(() => {
            this.loader.classList.add('loader-in');
        }, 500);
    }

    loaderRemove(container) {
        this.loader.classList.remove('loader-in');
        container.removeChild(this.loader);
    }

    buildChartsFn(container) {
        this.chartRender = container.querySelector('.displayChart');
        this.dataTable = container.querySelector('.tabledata');
        this.type = container.dataset.chartType;
        this.title = container.dataset.chartTitle;
        this.subtitle = container.dataset.chartSubtitle;
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

        try {
            // Set global options
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
                legend: {
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

            /* -------------------------------------- */
            /*   Update options for each chart type   */
            /* -------------------------------------- */

            // Set legend if more than one set of data
            this.legend = false
            for (let row of this.dataTable.rows) {
                const cells = row.querySelectorAll('td');
                if (cells.length > 2) {
                    this.legend = true;
                }
            }
            let plotOptions = {};
            let xAxis = [];
            let yAxis = [];
            switch (this.type) {
                case 'pie':
                    let pieOptions = {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: this.displayUnits,
                            connectorColor: 'silver'
                        }
                    }
                    plotOptions = {
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
                    options = { ...options, pieOptions, plotOptions};
                break;
                default:
                    xAxis = [{
                        categories: categories,
                        title: {
                            text: this.tableDescXText
                        },
                        accessibility: {
                            description: this.title
                        }
                    }];
                    yAxis = [{
                        title: {
                            text: this.tableDescYText,
                        },
                        accessibility: {
                            description: this.title
                        }
                    }];
                    plotOptions = {
                        series: {
                            showInLegend: this.legend
                        },
                        column: {
                            /* Here is the setting to limit the maximum column width. */
                            maxPointWidth: 75
                        }
                    }

                    options = { ...options, plotOptions, xAxis, yAxis};
                break;
            }

            // console.log(options);

            this.chart = new Highcharts.chart(container, options);
            var msg = this.chart ? 'successful' : 'unsuccessful';
            console.log(`Charts loaded ${msg}`);

        } catch (err) {
            console.error(`Error building charts: ${err}`);
        }
    }
}

export default ChartsDefault;