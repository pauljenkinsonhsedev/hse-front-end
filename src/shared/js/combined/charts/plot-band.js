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
        const titleText = title[0].textContent;
        const from = band[0].textContent;
        const to = band[1].textContent;

        plotData.push(
            {
                from: from,
                to: to,
                color: ahex_to_rba(colours[k], 0.3),
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

function ahex_to_rba(ahex, opacity) {
    //clean #
    ahex = ahex.substring(1, ahex.length);
    ahex = ahex.split('');

    var r = ahex[0] + ahex[0],
        g = ahex[1] + ahex[1],
        b = ahex[2] + ahex[2],
        a = ahex[3] + ahex[3];

    if (ahex.length >= 6) {
        r = ahex[0] + ahex[1];
        g = ahex[2] + ahex[3];
        b = ahex[4] + ahex[5];
        a = ahex[6] + (ahex[7] ? ahex[7] : ahex[6]);
    }

    var int_r = parseInt(r, 16),
        int_g = parseInt(g, 16),
        int_b = parseInt(b, 16),
        int_a = parseInt(a, 16);


    int_a = int_a / 255;

    if (int_a < 1 && int_a > 0) int_a = int_a.toFixed(2);

    if (int_a || int_a === 0)
        // return `rgba(, '+int_g+', '+int_b+', '+int_a+')`;
        return `rgb(${int_r},${int_g},${int_b}, ${opacity})`;
    return `rgb(${int_r},${int_g},${int_b}, ${opacity})`;
}