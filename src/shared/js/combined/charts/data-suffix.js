export function displaySuffix(units) {
    let result = new String;
    switch (units) {
    case 'percentage':
        result = `<b>{point.name}</b>: {point.percentage:.1f}%`
        break;
    case 'unit':
        result = `<b>{point.name}</b>: {point.y}`
        break;
    case 'celsius':
        result = `°C`
        break;
    case 'fahrenheit':
        result = `°F`
        break;
    case 'date':
        // this.labelFormatter(this.units);
        break;
    default:
        result = `<b>{point.name}</b>: {point.y}`
        break;
    }
    return result;
}