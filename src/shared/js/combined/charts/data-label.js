import { displaySuffix } from './data-suffix.js';
import { displayPrefix } from './data-prefix.js';
import { abbreviateNumber } from '../utils/number-abbreiviation.js';

export function dataLabel(units, decimal, total) {
    const dataLabelsSuffix = displaySuffix(units);
    const dataLabelsPrefix = displayPrefix(units);

    let decimals = new Number;
    let result = new String;

    decimal ? decimals = decimal : decimals = 0;

    const round = (num, dec) => {
        const factorOfTen = Math.pow(10, dec);
        return Math.round(num * factorOfTen) / factorOfTen;
    }

    const labelFormatted = function () {
        const name = this.key;
        const number = round(this.y, decimals);
        const percentage = Math.floor((this.y / total) * 100);
        let value = new Number;
        if (this.y > 1000000) {
            value = abbreviateNumber(number);
        } else {
            value = number.toLocaleString('en-GB', {maximumFractionDigits:2}) ;
        }
        switch (units) {
            case 'percentage':
                result = `<div>${name}: <strong>${value}${dataLabelsSuffix}</strong></div>`;
                break;
            case 'percentage-calc':
                result = `<div>${name}: <strong>${percentage}${dataLabelsSuffix}</strong></div>`;
                break;
            default:
                result = `<div>${name}: <strong>${dataLabelsPrefix}${value}${dataLabelsSuffix}</strong></div>`;
                break;
        }

        return result;
    };

    return labelFormatted

}
