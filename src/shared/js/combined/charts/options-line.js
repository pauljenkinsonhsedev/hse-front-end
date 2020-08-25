import { ChartOptions } from './dependencies';

/*
    @ChartOptionsLine
    extends ChartOptions charts/options.js

    sets options for line chart
*/

export class ChartOptionsLine extends ChartOptions {
    constructor(container, collection){
        super(container, collection);
        this.defaults;
        this.init();
    }

    init() {

        const defaults = this.defaults;
        this.collection = {...defaults};
        return this.collection;
    }
}
