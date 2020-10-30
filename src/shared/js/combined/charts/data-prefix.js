export function displayPrefix(units) {
    let result = new String;

    switch (units) {
    case 'pounds':
        result = '£'
        break;
    case 'dollar':
        result = '$'
        break;
    case 'euro':
        result = '€'
        break;
    default:
        result = ''
        break;
    }
    return result;
}
