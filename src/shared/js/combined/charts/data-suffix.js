export function displaySuffix(units) {
    let result = new String;

    switch (units) {
    case 'percentage':
        result = '%'
        break;
    case 'celsius':
        result = '°C'
        break;
    case 'fahrenheit':
        result = '°F'
        break;
    default:
        result = ''
        break;
    }
    return result;
}
