import { displaySuffix } from './data-suffix.js';

export function dataLabel(units) {
    const dataLabelsSuffix = displaySuffix(units);
    let result = new String;

    switch (units) {
    case 'percentage':
        result = `<b>{series.name}</b>: {point.percentage:.1f}${dataLabelsSuffix}`;
        break;
    default:
        result = `{point.name}: <b>{point.y}${dataLabelsSuffix}</b>`;
        break;
    }
    return result;
}
