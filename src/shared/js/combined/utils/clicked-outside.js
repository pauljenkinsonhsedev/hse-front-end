export function clickedOutside (handle) {
    const target = document.querySelector(handle);

    document.addEventListener('click', (event) => {
    const withinBoundaries = event.composedPath().includes(target)
    let result;
        if (withinBoundaries) {
            result = true;
        } else {
            result = false;
        }
    }, false);
}