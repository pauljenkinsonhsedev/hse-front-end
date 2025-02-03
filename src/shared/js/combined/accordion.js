import load from './utils/asset-loader';
import pathEnv from './utils/asset-env-path';

// Function to initialize the accordion
export function accordion() {
    const accordion = document.querySelector('[data-aria-accordion]');
    if (!accordion) {
        return;
    }

    return Promise.all([
        load.js(pathEnv + '/assets/v6-js/vendor/a11y_accordions/index.js'),
    ]).then(() => {
        openAccordionFromHash(); // Call function to handle hash-based opening
    }).catch((err) => {
        console.error(`Error initiating accordion: ${err}`);
    });
}

// Function to open an accordion section based on the URL hash
function openAccordionFromHash() {
    const hash = window.location.hash; // Get hash from URL
    if (hash) { // Ensure there's a hash value
        const section = document.querySelector(hash); // Get the accordion heading
        if (section) {
            const button = section.querySelector('button, .accordion-toggle'); // Find the accordion trigger
            const content = section.nextElementSibling; // Find the corresponding accordion content
            
            if (button && content) {
                // Ensure proper ARIA attributes
                if (!button.hasAttribute("role")) {
                    button.setAttribute("role", "button");
                }

                if (!button.hasAttribute("aria-controls")) {
                    const contentId = content.id || `accordion-content-${Math.random().toString(36).substring(2, 9)}`;
                    content.id = contentId;
                    button.setAttribute("aria-controls", contentId);
                }

                // Check if accordion is already open
                const isOpen = button.getAttribute('aria-expanded') === 'true';

                if (!isOpen) {
                    button.setAttribute('aria-expanded', 'true'); // Mark as expanded
                    content.setAttribute('aria-hidden', 'false'); // Ensure it's visible
                    
                    // Use maxHeight instead of display to prevent screen reader issues
                    content.style.maxHeight = `${content.scrollHeight}px`;

                    section.classList.add('active'); // Add active class
                }

                // Respect reduced motion settings
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                if (!prefersReducedMotion) {
                    setTimeout(() => {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300); // Delay ensures it scrolls after the accordion opens
                }
            }
        }
    }
}

// Ensure function runs when the document is loaded
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(openAccordionFromHash, 200); // Delay to ensure DOM is fully ready
});

// Also re-check the hash when navigating within the same page
window.addEventListener("hashchange", openAccordionFromHash);

