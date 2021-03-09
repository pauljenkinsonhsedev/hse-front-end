import { displaySuffix } from './data-suffix.js';
import { displayPrefix } from './data-prefix.js';
import { abbreviateNumber } from '../utils/number-abbreiviation.js';

export function dataTooltip(type, units, decimal, total, areaRangeTitle) {
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
        let name = this.key ? this.key : this.x;
        const number = round(this.y, decimals);
        const percentage = Math.floor((this.y / total) * 100);
        let value = new Number;
        if (this.y > 1000000) {
            value = abbreviateNumber(number);
        } else {
            value = number.toLocaleString('en-GB', {maximumFractionDigits:2});
        }

        // Area Range charts requires more information for tooltips
        let ranges = new String;

        if (type === 'arearange') {
            const low = this.points[1].point.low;
            const high = this.points[1].point.high;
            let lowValue = low.toLocaleString('en-GB', {maximumFractionDigits:2});
            let highValue = high.toLocaleString('en-GB', {maximumFractionDigits:2});

            if (low > 10000 || high > 10000) {
                lowValue = abbreviateNumber(low);
                highValue = abbreviateNumber(high);
            }

            ranges = `
            <div style="background-color: #FFFFFF; padding: 7px; font-size: 0.9rem;">
                <strong style="display: block; margin-bottom: 4px;">${this.points[0].x}</strong>
                <ul style="margin: 0; padding: 0;">
                    <li style="font-size: 0.9rem; margin: 0; padding: 4px 0 4px 10px;">${this.points[0].point.series.name}: <strong>${dataLabelsPrefix}${value}</strong></li>
                    <li style="font-size: 0.9rem; margin: 0; padding: 4px 0 4px 10px;">${areaRangeTitle} <strong>${dataLabelsPrefix}${lowValue} - ${dataLabelsPrefix}${highValue}</strong></li>
                </ul>
            </div>
            `;
        }

        switch (units) {
            case 'percentage':
                result = `
                    <div style="background-color: #FFFFFF; padding: 7px;">
                        <div>${name}: <strong>${value}${dataLabelsSuffix}</strong></div>
                    </div>`;
                break;
            case 'percentage-calc':
                result = `
                    <div style="background-color: #FFFFFF; padding: 7px;">
                        <div>${name}: <strong>${percentage}${dataLabelsSuffix}</strong></div>
                    </div>`;
                break;
            default:
                result = `
                    <div style="background-color: #FFFFFF; padding: 7px; ">
                        <div>${name}: <strong>${dataLabelsPrefix}${value}${dataLabelsSuffix}</strong></div>
                    </div>`;
                break;
        }

        if (areaRangeTitle) {
            return ranges;
        } else {
            return result;
        }
    }
    return labelFormatted;
}
