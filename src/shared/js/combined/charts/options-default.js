import { ChartOptions } from './dependencies';

/*
    Class @ChartOptionsArearange

    Description:
    - extends ChartOptions charts/options.js
*/

export class ChartOptionsDefault extends ChartOptions {
    constructor(container, collection){
        super(container, collection);
        this.init();
    }

    init() {
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

        let yAxis = [{
            title: {
                text: this.yAxisText,
            },
            accessibility: {
                description: this.title
            }
        }];

        const defaults = this.defaults;
        this.collection = {...defaults, accessibility};
        return this.collection;
    }
}
