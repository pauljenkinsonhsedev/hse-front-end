import { hex_to_rgba } from '../utils/hex-to-rgba';

export function plotBand(data, colours) {
    const plotData = new Array;
    const thead = data.querySelector('.table__head');
    const plotArea = thead.querySelectorAll('.plot-area');
    const plotLength = plotArea.length;

    if (plotLength < 0) {
        return null;
    }

    for (let k = 0; k < plotLength; k++) {
        const title = plotArea[k].querySelectorAll('.plot-title');
        const band = plotArea[k].querySelectorAll('.plot-band');
        const titleText = title[0].textContent.trim();
        const from = band[0].textContent;
        const to = band[1].textContent;

        plotData.push(
            {
                from: from,
                to: to,
                color: hex_to_rgba(colours[k], 1),
                label: {
                    text: titleText,
                    align: 'left',
                    style: {
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        color: '#666666'
                    },
                    y: -10
                }
            }
        );
    }
    return plotData;
}
