import PrismToolbar from 'prismjs/plugins/toolbar/prism-toolbar.js';
import Prism from 'prismjs';
import ClipboardJS from 'clipboard';

export function codeHighlighter() {
    const codeExample = document.getElementsByTagName('code');

    if (!codeExample) {
        return;
    }

    // all pre tags on the page
    const preElement = document.getElementsByTagName('pre');

    if (preElement !== null) {
        const copyButton = `<div class='copy'>copy</div>`;
        for (let i = 0; i < preElement.length; i++) {
            if (isPrismClass(preElement[i])) {
                preElement[i].insertAdjacentHTML('afterbegin', copyButton);
            }
        }
    }
    // create clipboard for every copy element
    const clipboard = new ClipboardJS('.copy', {
        target: (trigger) => {
            return trigger.nextElementSibling;
        },
    });

    clipboard.on('success', (event) => {
        event.trigger.textContent = 'copied';

        setTimeout(() => {
            event.clearSelection();
            event.trigger.textContent = 'copy';
        }, 2000);
    });

    // helper function - checks that PrismJS class exists
    function isPrismClass(preElement) {
        return preElement.className.includes('language');
    }
}
