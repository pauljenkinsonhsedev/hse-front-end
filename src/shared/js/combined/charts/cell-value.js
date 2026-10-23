/*
    Reading numbers from chart data table cells

    Description:
    - A cell can show its value as people expect to read it: with thousands
      separators and its unit after the number (e.g. "556,000" or "38%"),
      and still be read as a number (556000, 38).
    - parseCellNumber: NaN for an empty or non-numeric cell, so the chart
      leaves a gap there (series data).
    - cellValue: 0 for an empty or non-numeric cell, as Number('') was
      (totals).
*/

export function parseCellNumber(cell) {
    return parseFloat(cell.textContent.replace(/,/g, ''));
}

export function cellValue(cell) {
    const value = parseCellNumber(cell);
    return Number.isNaN(value) ? 0 : value;
}
