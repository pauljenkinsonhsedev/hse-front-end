export function displaySuffix(units) {
    let result = new String;

    switch (units) {
    case 'percentage':
        result = '%'
        break;
    case 'percentage-calc':
        result = '%'
        break;
    case 'hundreds':
        result = ' hundred'
        break;
    case 'thousands':
        result = ' thousand'
        break;
    case 'millions':
        result = ' million'
        break;
    case 'billions':
        result = ' billion'
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
