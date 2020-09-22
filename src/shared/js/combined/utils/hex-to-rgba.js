export function hex_to_rgba(hex, opacity) {
    hex = hex.substring(1, hex.length);
    hex = hex.split('');

    if (opacity === null) {
        opacity = 1;
    }

    let r = hex[0] + hex[0],
        g = hex[1] + hex[1],
        b = hex[2] + hex[2],
        a = hex[3] + hex[3];

    if (hex.length >= 6) {
        r = hex[0] + hex[1];
        g = hex[2] + hex[3];
        b = hex[4] + hex[5];
        a = hex[6] + (hex[7] ? hex[7] : hex[6]);
    }

    let int_r = parseInt(r, 16),
        int_g = parseInt(g, 16),
        int_b = parseInt(b, 16),
        int_a = parseInt(a, 16);

    int_a = int_a / 255;

    if (int_a < 1 && int_a > 0) {
        int_a = int_a.toFixed(2);
    }

    if (int_a || int_a === 0) {
        return `rgb(${int_r},${int_g},${int_b}, ${opacity})`;
    }
    return `rgb(${int_r},${int_g},${int_b}, ${opacity})`;
}