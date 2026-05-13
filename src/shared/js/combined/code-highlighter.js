import Prism from 'prismjs';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';
import ClipboardJS from 'clipboard';

export function codeHighlighter() {
    const preElements = document.querySelectorAll('pre[class*="language-"]');

    if (!preElements.length) {
        return;
    }

    preElements.forEach((pre) => {
        // Allow raw unescaped code via <script type="text/plain"> — no HTML encoding needed
        const rawScript = pre.querySelector('script[type="text/plain"]');
        if (rawScript) {
            const langMatch = pre.className.match(/language-(\S+)/);
            const code = document.createElement('code');
            code.className = `language-${langMatch ? langMatch[1] : 'markup'}`;
            code.textContent = rawScript.textContent;
            pre.replaceChild(code, rawScript);
        }

        // Wrap pre in a container so the button sits outside the pre's CSS context
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const copyButton = document.createElement('button');
        copyButton.type = 'button';
        copyButton.className = 'hse-button hse-button--secondary code-copy-button';
        copyButton.setAttribute('aria-live', 'polite');
        copyButton.textContent = 'Copy code';
        wrapper.insertBefore(copyButton, pre);
    });

    const clipboard = new ClipboardJS('.code-copy-button', {
        target: (trigger) => trigger.nextElementSibling.querySelector('code'),
    });

    clipboard.on('success', (event) => {
        event.trigger.textContent = 'Code copied';
        setTimeout(() => {
            event.clearSelection();
            event.trigger.textContent = 'Copy code';
        }, 2000);
    });

    Prism.highlightAll();
}
