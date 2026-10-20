/*
    Function @measureElementHeight

    Description:
    - renders an HTML string off-screen at a given width/font style and
      returns its actual height, so chart layout (e.g. marginTop) can be
      sized to content instead of guessed as a fixed value
*/

export function measureElementHeight(width, html, style) {
    if (!html) {
        return 0;
    }

    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.pointerEvents = 'none';
    el.style.width = `${width}px`;
    el.style.textAlign = 'center';
    Object.assign(el.style, style);
    el.innerHTML = html;

    document.body.appendChild(el);
    const height = el.offsetHeight;
    document.body.removeChild(el);

    return height;
}
