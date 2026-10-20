import { ChartOptions } from './options.js';
import { chartCategories } from './chart-categories';
import { dataLabel } from './data-label.js';
import { displayPrefix } from './data-prefix.js';
import { displaySuffix } from './data-suffix.js';

/*
    Class @ChartOptionsPie

    Description:
    - extends ChartOptions charts/options.js
    - sets options for pie chart
*/

export class ChartOptionsPie extends ChartOptions {
    constructor(container){
        super(container);
        this.dataTable = container.querySelector('.tabledata');
        this.units = container.dataset.chartUnits;
        this.decimals = container.dataset.decimalPoint;
        // this.xAxisText = container.dataset.xaxisText;

        let units = container.querySelectorAll('.unit');
        let total = 0;
        for (let i = 0; i < units.length; i++) {
            total += Number(units[i].innerText)
        }

        const { pie: pieLayout } = this.layout().plotOptions;
        this.pieSize = pieLayout.size;
        // Align every label to the plot edges rather than positioning it
        // close to its own slice, so labels stack down the side with a
        // (sometimes long, bent) connector line back to their slice —
        // this was already the mobile behaviour; using it at every width
        // means a very small slice's label always has room to sit apart
        // from the pie itself instead of crowding its edge.
        this.alignTo = 'plotEdges';
        this.dataLabelDistance = pieLayout.dataLabels.distance;

        const getCategories = chartCategories(container);
        const getDataLabel = dataLabel(this.units, this.decimals, total);

        const dataLabelsPrefix = displayPrefix(this.units);
        const dataLabelsSuffix = displaySuffix(this.units);

        let plotOptions = {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                size: this.pieSize,
                states: {
                    select: {
                        borderColor: '#ffdd00', // $hse-focus-color
                        borderWidth: 3
                    }
                },
                dataLabels: {
                    enabled: true,
                    alignTo: this.alignTo,
                    // Push labels well clear of the pie itself (rather
                    // than hugging its edge) so they read as a stacked
                    // column with a visible connector line back to their
                    // slice — this is what keeps a very small slice's
                    // label (e.g. a <1% remainder) from crowding the
                    // pie's own edge, regardless of where that slice
                    // happens to sit on the circle.
                    distance: this.dataLabelDistance,
                    // Separate from hideOverlappingLabels above: crop
                    // (default true) hides a label outright if its
                    // computed position falls outside the plot area —
                    // e.g. a stacked label landing just above the plot
                    // area, into the title/subtitle's space, at some
                    // narrow container width. overflow:'allow' is what
                    // actually lets a label render past that boundary
                    // instead of being clipped away; crop:false just
                    // stops Highcharts moving/hiding it to compensate.
                    crop: false,
                    overflow: 'allow',
                    connectorColor: '#ccc',
                    formatter: getDataLabel,
                    style: {
                        fontFamily: this.fontFamily,
                        fontSize: '1rem',
                        fontWeight: 'bold'
                    }
                }
            }
        };

        let accessibility = {
            point: {
                valuePrefix: dataLabelsPrefix,
                valueSuffix: dataLabelsSuffix
            }
        };

        const collection = this.collection;

        // Highcharts' default collision handling will silently set a
        // data label's visibility to hidden if it decides one doesn't
        // fit — the label just vanishes, with nothing in the console to
        // say why. That's worse than a label sitting a bit too close to
        // something, so disable it: at worst a label looks tight at some
        // width, it never just disappears. (Merge with the existing
        // chart object rather than replacing it — it also carries
        // type/renderTo/marginTop/height from the base ChartOptions.)
        let chart = {...collection.chart, hideOverlappingLabels: false};

        this.collection = {...collection, chart, plotOptions, ...accessibility};

        return this.collection;
    }

    // Pie size and label distance depend on the screen size, so they're
    // part of the layout watchLayout re-applies on resize (see
    // ChartOptions.layout), rather than fixed at page-load values.
    layout() {
        // matches the sass-mq "tablet" breakpoint (641px, breakpoints.scss)
        const isSmall = !window.matchMedia('(min-width: 641px)').matches;
        // How far labels sit from the pie has to scale with how much
        // room there actually is: on the smaller mobile pie/chart width,
        // a desktop-sized distance pushes a label's stacked position
        // outside the available area, and Highcharts hides it outright
        // rather than let it overlap anything.
        const dataLabelDistance = isSmall ? 30 : 60;

        return {
            ...super.layout(),
            plotOptions: {
                pie: {
                    size: isSmall ? '150px' : '220px',
                    dataLabels: { distance: dataLabelDistance },
                },
            },
        };
    }
}
