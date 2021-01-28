export function customEventListener (selector, event, handler) {
    let rootElement = document.querySelector('body');
    rootElement.addEventListener(event, function (evt) {
            let targetElement = evt.target;
            while (targetElement != null) {
                if (targetElement.matches(selector)) {
                    handler(evt);
                    return;
                }
                targetElement = targetElement.parentElement;
            }
        },
        true
    );
}