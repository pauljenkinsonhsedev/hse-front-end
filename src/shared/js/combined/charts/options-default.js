import { ChartOptions } from './dependencies';

/*
    Class @ChartOptionsDefault

    Description:
    - extends ChartOptions charts/options.js
*/


export class ChartOptionsDefault extends ChartOptions {
    constructor(container, collection){
        super(container, collection);
    }

    init() {
        return this.defaults;
    }
}
