/**
 * accordion.js
 * Handles multiple accordion containers and deep-linking.
 */

export function accordion() {
    // 1. Find ALL accordion containers on the page
    const containers = document.querySelectorAll('[data-aria-accordion]');
    if (containers.length === 0) return;

    // Use a shared function for the hash-based opening so it can find any button on the page
    const openFromHash = () => {
        const hash = window.location.hash.substring(1);
        if (!hash) return;

        const targetButton = document.querySelector(`[aria-controls="content-${hash}"], #${hash}`);
        
        if (targetButton && targetButton.getAttribute('aria-expanded') === 'false') {
            targetButton.click();
            setTimeout(() => {
                targetButton.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    // 2. Loop through each container (Board and Executive)
    containers.forEach(container => {
        const buttons = container.querySelectorAll('.hse-accordion__section-button');
        const isMulti = container.hasAttribute('data-multi');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                const panel = button.closest('.hse-accordion__section').querySelector('[data-aria-accordion-panel]');

                // Close others in THIS container if not multi-expand
                if (!isMulti && !isExpanded) {
                    buttons.forEach(otherBtn => {
                        if (otherBtn !== button) {
                            otherBtn.setAttribute('aria-expanded', 'false');
                            const otherPanel = otherBtn.closest('.hse-accordion__section').querySelector('[data-aria-accordion-panel]');
                            if (otherPanel) otherPanel.style.display = 'none';
                        }
                    });
                }

                // Toggle current section
                button.setAttribute('aria-expanded', !isExpanded);
                if (panel) panel.style.display = isExpanded ? 'none' : 'block';
            });
        });
    });

    // Run on page load and hash change
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
}