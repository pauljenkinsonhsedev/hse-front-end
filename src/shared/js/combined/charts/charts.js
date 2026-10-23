import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import Data from 'highcharts/modules/data';
import Exporting from 'highcharts/modules/exporting';
import Accessibility from 'highcharts/modules/accessibility';

// PLOT TWIST FIX: Module bundlers often wrap imported functions in a 'default' object.
// This helper safely initializes Highcharts modules regardless of how the bundler packaged them.
const safeInit = (module, hc) => {
    if (typeof module === 'function') {
        module(hc);
    } else if (module && typeof module.default === 'function') {
        module.default(hc);
    }
};

// Initialize everything safely!
safeInit(HighchartsMore, Highcharts);
safeInit(Data, Highcharts);
safeInit(Exporting, Highcharts);
safeInit(Accessibility, Highcharts);

import {
    ChartOptionsDefault,
    ChartOptionsLine,
    ChartOptionsDual,
    ChartOptionsArearange,
    ChartOptionsPie,
    ChartOptionsDonut,
    ChartOptionsBarStacked,
    ChartOptionsColumnStacked
} from './dependencies';

class ChartsDefault {
    constructor() {
        this.chart = window.chart || {};
        this.init();
    }

    // Bypass the broken asset loader by returning an empty resolved promise
    loadChartsFn() {
        return Promise.resolve(); 
    }

    init() {
        return this.loadChartsFn().then(() => {
            const chartContainer = document.querySelectorAll('.chart');
            const chartArray = [...chartContainer];

            chartArray.forEach((container) => {
                let type = container.dataset.chartType;
                if (type && type.includes('with')) {
                    type = 'with';
                }

                switch(type) {
                    case 'with':
                        this.collection = new ChartOptionsDual(container);
                    break;
                    case 'pie':
                        this.collection = new ChartOptionsPie(container);
                    break;
                    case 'donut':
                        this.collection = new ChartOptionsDonut(container);
                    break;
                    case 'line':
                        this.collection = new ChartOptionsLine(container);
                    break;
                    case 'barstacked':
                        this.collection = new ChartOptionsBarStacked(container);
                    break;
                    case 'columnstacked':
                        this.collection = new ChartOptionsColumnStacked(container);
                    break;
                    case 'arearange':
                        this.collection = new ChartOptionsArearange(container);
                    break;
                    default:
                        this.collection = new ChartOptionsDefault(container);
                    break;
                }

                this.buildFn(container, this.collection);
            });
        });
    }

    buildFn(container, params){
        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            },
            // Legends are a key only: clicking an item must not hide its
            // series (or, in a pie, its slice). Since Highcharts 11 the
            // toggle runs from legend.events.itemClick; the series-level
            // legendItemClick handlers in the options files fire after it
            // and returning false from them no longer prevents anything.
            legend: {
                events: {
                    itemClick: function () {
                        return false;
                    }
                }
            },
            // No hover tooltips: every value is either labelled on the chart
            // or in its Tabular data tab (addViewTabs), so they only repeated
            // what's already there, as GOV.UK charts don't use them either.
            // Screen readers still announce each point's name and value.
            // The chart types' tooltip formatters are kept, so a tooltip
            // could be turned back on here; it would then need to be
            // hoverable and dismissible again (WCAG 2.2 1.4.13).
            tooltip: {
                enabled: false
            }
        });

        // DRAW THE CHART
        // Into its .displayChart element, not the whole .chart container:
        // rendering into the container replaced everything in it,
        // including the title, description and data table the chart is
        // built from, which the Tabular data tab (addViewTabs) shows.
        const renderTarget = container.querySelector('.displayChart') || container;
        this.chart = Highcharts.chart(renderTarget, params);
        const chart = this.chart;

        if (renderTarget !== container) {
            this.addViewTabs(container, chart);
        }
    }

    // "Chart" and "Tabular data" tabs above the chart box (the box is the
    // tab panel), to switch between the chart and its data table: every
    // value can be read at once, by anyone, rather than one point at a time
    // through the chart. The table is the chart's own source data, already
    // in the page (and the only view without JavaScript). Styled like the
    // HSE tabs component, and built to the ARIA tabs pattern, so screen
    // readers announce each tab and its selected state, and the arrow keys
    // move between them.
    addViewTabs(container, chart) {
        const id = container.id || `chart-${ChartsDefault.tabsCount = (ChartsDefault.tabsCount || 0) + 1}`;
        container.id = id;

        const tablist = document.createElement('div');
        tablist.className = 'chart-tabs';
        tablist.setAttribute('role', 'tablist');
        tablist.setAttribute('aria-label', 'Show as');

        const views = [
            { key: 'chart', label: 'Chart' },
            { key: 'table', label: 'Tabular data' },
        ];
        const tabs = views.map(({ key, label }) => {
            const tab = document.createElement('button');
            tab.type = 'button';
            tab.className = 'chart-tabs__tab';
            tab.id = `${id}-tab-${key}`;
            // In a span so the focus style can wrap just the label, inside
            // the tab, as the tabs component's links do
            const text = document.createElement('span');
            text.className = 'chart-tabs__label';
            text.textContent = label;
            tab.append(text);
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-controls', id);
            tab.dataset.view = key;
            tablist.append(tab);
            return tab;
        });
        container.before(tablist);
        container.setAttribute('role', 'tabpanel');

        // The Tabular data tab's title is always the chart's own title
        // (data-chart-title), whatever heading the page markup has (some
        // tables have an <h2 class="datacontent__title">, some a
        // <caption>, some nothing), so both tabs show the same title.
        // charts.scss hides the markup's own heading, and keeps a caption
        // for screen readers only, since it names the table.
        const figure = container.querySelector('figure');
        if (figure && container.dataset.chartTitle) {
            const heading = document.createElement('h2');
            heading.className = 'datacontent__title chart-table-title';
            heading.innerHTML = container.dataset.chartTitle;
            figure.prepend(heading);
            container.classList.add('chart--with-table-title');
        }

        // Let a table that's wider than the box scroll sideways inside it,
        // rather than widening the whole page on small screens (WCAG 2.2
        // 1.4.10), as .hse-table-container does for the site's standard
        // tables. Focusable and labelled, so keyboard users can scroll it
        // with the arrow keys and screen readers announce what it is.
        const table = container.querySelector('table');

        // A donut's headline total (data-chart-total, see options-donut.js)
        // as a total row. In a <tfoot> with plain cells (no category/unit
        // classes), so the chart, which reads the <tbody> and those classes,
        // never treats it as data.
        if (table && container.dataset.chartTotal && !table.tFoot) {
            const columns = table.rows[0] ? table.rows[0].cells.length : 2;
            const row = table.createTFoot().insertRow();
            row.className = 'chart-table-total';
            const label = document.createElement('th');
            label.scope = 'row';
            label.textContent = container.dataset.chartTotalLabel || 'Total';
            const value = row.insertCell();
            value.textContent = container.dataset.chartTotal;
            if (columns > 2) value.colSpan = columns - 1;
            row.prepend(label);
        }

        if (table) {
            const scroller = document.createElement('div');
            scroller.className = 'chart-table-scroll';
            scroller.tabIndex = 0;
            scroller.setAttribute('role', 'region');
            const title = document.createElement('div');
            title.innerHTML = container.dataset.chartTitle || '';
            scroller.setAttribute('aria-label', `${title.textContent.replace(/\s+/g, ' ').trim() || 'Chart'} data table`);
            table.before(scroller);
            scroller.append(table);
        }

        const select = (tab, moveFocus) => {
            const showTable = tab.dataset.view === 'table';
            tabs.forEach((other) => {
                const selected = other === tab;
                other.setAttribute('aria-selected', String(selected));
                other.tabIndex = selected ? 0 : -1;
                other.classList.toggle('chart-tabs__tab--selected', selected);
            });
            container.setAttribute('aria-labelledby', tab.id);
            container.classList.toggle('chart--table-view', showTable);
            // Tab then moves into the panel: to the chart, or to the
            // table's focusable scroll area (so the panel itself doesn't
            // need to be focusable).
            if (!showTable) {
                // The window may have been resized while the chart was hidden
                chart.reflow();
            }
            if (moveFocus) tab.focus();
        };

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => select(tab, false));
            tab.addEventListener('keydown', (event) => {
                const keys = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: tabs.length - 1 };
                if (!(event.key in keys)) return;
                event.preventDefault();
                select(tabs[(keys[event.key] + tabs.length) % tabs.length], true);
            });
        });

        select(tabs[0], false);
    }
}

export default ChartsDefault;