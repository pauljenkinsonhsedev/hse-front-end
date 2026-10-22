/*
    cellValue

    Description:
    - The numeric value of a chart data table cell. Uses parseFloat, as the
      chart's series data does (series-data.js), so a cell can show its unit
      after the number (e.g. "38%" for a percentage chart) and still be read
      as 38. An empty or non-numeric cell counts as 0, as Number('') did.
*/

export function cellValue(cell) {
    const value = parseFloat(cell.textContent);
    return Number.isNaN(value) ? 0 : value;
}
