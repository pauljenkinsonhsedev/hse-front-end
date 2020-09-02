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
        const defaults = this.defaults;
        this.collection = {...defaults};
        return this.collection;
    }
}
