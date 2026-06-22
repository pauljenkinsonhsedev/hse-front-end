/**
 * accordion.js
 * Progressively enhances [data-aria-accordion] containers.
 * Transforms data-attribute HTML into the class-based structure the SCSS expects,
 * replacing the old a11y_accordions vendor library dependency.
 */

export function accordion() {
    const containers = document.querySelectorAll('[data-aria-accordion]');
    if (containers.length === 0) return;

    containers.forEach(container => {
        const headings = Array.from(container.querySelectorAll('[data-aria-accordion-heading]'));
        const isMulti = container.hasAttribute('data-multi');

        headings.forEach((heading, index) => {
            const panel = heading.nextElementSibling;
            if (!panel || !panel.hasAttribute('data-aria-accordion-panel')) return;

            // Wrap heading in section + header divs with the expected classes
            const section = document.createElement('div');
            section.className = 'hse-accordion__section';

            const header = document.createElement('div');
            header.className = 'hse-accordion__section-header';

            heading.classList.add('hse-accordion__section-heading');

            // Build the button inside the heading
            const panelId = panel.id || `accordion-panel-${Date.now()}-${index}`;
            panel.id = panelId;

            const button = document.createElement('button');
            button.className = 'hse-accordion__section-button';
            button.type = 'button';
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', panelId);
            button.innerHTML = heading.innerHTML;
            heading.innerHTML = '';
            heading.appendChild(button);

            // Add content class to panel and hide it
            panel.classList.add('hse-accordion__section-content');
            panel.style.display = 'none';

            // Restructure: section > header > heading, then section > panel
            container.insertBefore(section, heading);
            header.appendChild(heading);
            section.appendChild(header);
            section.appendChild(panel);
        });

        // Wire up toggle behaviour after DOM is restructured
        const buttons = container.querySelectorAll('.hse-accordion__section-button');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                const panel = document.getElementById(button.getAttribute('aria-controls'));

                if (!isMulti && !isExpanded) {
                    buttons.forEach(otherBtn => {
                        if (otherBtn !== button) {
                            otherBtn.setAttribute('aria-expanded', 'false');
                            const otherPanel = document.getElementById(otherBtn.getAttribute('aria-controls'));
                            if (otherPanel) otherPanel.style.display = 'none';
                        }
                    });
                }

                button.setAttribute('aria-expanded', String(!isExpanded));
                if (panel) panel.style.display = isExpanded ? 'none' : 'block';
            });
        });
    });

    const openFromHash = () => {
        const hash = window.location.hash.substring(1);
        if (!hash) return;

        const heading = document.getElementById(hash);
        const button = heading
            ? heading.querySelector('.hse-accordion__section-button')
            : document.querySelector(`[aria-controls="${hash}"]`);

        if (button && button.getAttribute('aria-expanded') === 'false') {
            button.click();
            setTimeout(() => button.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
}
