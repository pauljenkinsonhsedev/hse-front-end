import { ChartOptions } from './dependencies';

export class ChartOptionsPie extends ChartOptions {
    constructor(container, collection){
        super(container, collection);
        this.defaults;
        this.init();
    }

    init() {

        console.log(this.defaults);
        let pieOptions = {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: this.dataLabelsUnits,
                connectorColor: 'silver'
            }
        }
        let plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: this.dataLabelsUnits,
                    connectorColor: 'silver'
                }
            }
        };
        const defaults = this.defaults;
        this.collection = {...defaults, pieOptions, plotOptions};
        return this.collection;
    }
}


export default ChartOptionsPie;