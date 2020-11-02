import { displaySuffix } from './data-suffix.js';
import { displayPrefix } from './data-prefix.js';

export function dataLabel(units) {
    const dataLabelsSuffix = displaySuffix(units);
    const dataLabelsPrefix = displayPrefix(units);
    let result = new String;

    switch (units) {
    case 'percentage':
        result = `<b>{point.name}</b>: {point.percentage:.0f}${dataLabelsSuffix}`;
        break;
    case 'pounds':
        result = `{point.name}: <b>${dataLabelsPrefix}{point.y}</b>${dataLabelsSuffix}`;
        break;
    default:
        result = `{point.name}: <b>{point.y:,.0f}${dataLabelsSuffix}</b>`;
        break;
    }
    return result;
}
