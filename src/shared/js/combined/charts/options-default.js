import { ChartOptions } from './dependencies';

export class ChartOptionsDefault extends ChartOptions {
    constructor(container, collection){
        super(container, collection);
        this.init();
    }

    init() {
        // Set legend only if more than one set of data
        this.showLegend = false;
        for (let row of this.dataTable.rows) {
            const cells = row.querySelectorAll('td');
            if (cells.length > 2) {
                this.showLegend = true;
            }
        }

        let accessibility = {
            description: this.description
        };

        let legend = {
            enabled: true,
            itemStyle: {
                font: 'Arial, Helvetica, sans-serif',
                color: '#000'
            },
            itemHoverStyle:{
                color: 'gray'
            }
        };

        let xAxis = [{
            categories: this.categories,
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
                showInLegend: true,
                point: {
                    events: {
                        legendItemClick: function() {
                            return false;
                        }
                    }
                }
            },
            column: {
                maxPointWidth: this.colWidth
            }
        }

        let tooltip = {
            // shared: true
        };

        const defaults = this.defaults;
        this.collection = {...defaults, accessibility, plotOptions, xAxis, yAxis, legend, tooltip};
        return this.collection;
    }
}
