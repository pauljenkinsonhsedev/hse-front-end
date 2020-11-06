export function abbreviateNumber(num) {
    const SI_SYMBOL = ['', 'k', ' million', ' bn', 'T', 'P', 'E'];
    const tier = Math.floor(Math.log10(num) / 3) || 0;
    let result = '' + num;
    // if zero, we don't need a suffix
    if (tier > 0) {
        // get suffix and determine scale
        const suffix = SI_SYMBOL[tier];
        const scale = Math.pow(10, tier * 3);
        // scale the number
        const scaled = num / scale;
        // format number and add suffix
        result = scaled.toFixed(1).replace('.0', '') + suffix;
    }
    return result;
}