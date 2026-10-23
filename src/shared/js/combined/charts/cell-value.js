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
    - cellText: a cell's text as a label (category and series names). The
      chart reads the table while it's hidden, so the browser hasn't
      collapsed the whitespace from the HTML's own line wrapping and
      indentation; without this, a name like "Injuries with up to 7 days
      <newline + 16 spaces> absence" breaks and indents oddly in the chart.
      Collapses it as the browser does in the table, but keeps any <br> the
      author added, as a line break Highcharts understands.
*/

export function parseCellNumber(cell) {
    return parseFloat(cell.textContent.replace(/,/g, ''));
}

export function cellValue(cell) {
    const value = parseCellNumber(cell);
    return Number.isNaN(value) ? 0 : value;
}

const lineBreak = '\uE000'; // a private-use character, as a placeholder for <br>

export function cellText(cell) {
    const copy = cell.cloneNode(true);
    copy.querySelectorAll('br').forEach((br) => br.replaceWith(lineBreak));
    return copy.textContent
        .replace(/\s+/g, ' ')
        .split(lineBreak).map((part) => part.trim()).filter(Boolean)
        // A space before each <br>: Highcharts strips the tag from what
        // screen readers hear, which would otherwise run the words together.
        .join(' <br>');
}
