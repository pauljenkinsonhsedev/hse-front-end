export function clickedOutside (handle) {
    const target = document.querySelector(handle);

    document.addEventListener('click', (event) => {
    const withinBoundaries = event.composedPath().includes(target)
    let result;
        if (withinBoundaries) {
            console.log('within bounds');
            result = true;
        } else {
            console.log('out of bounds');
            result = false;
        }
    }, false);
}