import { displaySuffix } from './data-suffix.js';
import { displayPrefix } from './data-prefix.js';
import { abbreviateNumber } from '../utils/number-abbreiviation.js';

export function dataValue(units, decimal, total) {
    const dataLabelsSuffix = displaySuffix(units);
    const dataLabelsPrefix = displayPrefix(units);

    let decimals = new Number;
    let result = new String;

    decimal ? decimals = decimal : decimals = 0;

    const round = (num, dec) => {
        const factorOfTen = Math.pow(10, dec);
        return Math.round(num * factorOfTen) / factorOfTen;
    }

    const valueFormatted = function () {
        const number = round(this.y, decimals);
        const percentage = Math.floor((number / total) * 100);
        let value = new Number;

        if (this.y > 1000000) {
            value = abbreviateNumber(number);
        } else {
            value = number.toLocaleString('en-GB', {maximumFractionDigits:2}) ;
        }

        switch (units) {
            case 'percentage':
                result = `${value}${dataLabelsSuffix}`;
                break;
            case 'percentage-calc':
                result = `${percentage}${dataLabelsSuffix}`;
                break;
            default:
                result = `${dataLabelsPrefix}${value}${dataLabelsSuffix}`;
                break;
        }

        return result;
    };

    return valueFormatted
}
