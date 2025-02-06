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

document.addEventListener("DOMContentLoaded", function () {
    let hasInteracted = false; // Flag to track user interaction

    function openAccordionFromHash() {
        const hash = window.location.hash.substring(1);
        if (!hash) return;

        const heading = document.querySelector(`[id="${hash}"][data-aria-accordion-heading]`);
        if (!heading) return;

        const panel = heading.nextElementSibling;
        if (!panel || !panel.hasAttribute("data-aria-accordion-panel")) return;

        const button = heading.querySelector("button");
        if (button && button.getAttribute("aria-expanded") === "false") {
            button.click();
        }

        // Scroll and move focus to the heading
        setTimeout(() => {
            heading.scrollIntoView({ behavior: "smooth", block: "start" });
            heading.focus();
            history.replaceState(null, null, " "); // Remove hash from URL
        }, 300);
    }

    // Remove hash when clicking **any link** on the page
    document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            history.replaceState(null, null, " "); // Clear hash
        });
    });

    // Optional: Remove hash if user clicks anywhere on the page (outside accordion and links)
    document.body.addEventListener("click", (event) => {
        // Only remove hash if the user has interacted with the accordion
        if (hasInteracted && !event.target.closest("[data-aria-accordion-heading]") && !event.target.closest("a")) {
            history.replaceState(null, null, " "); // Clear hash
        }
    });

    // Accordion logic: Set flag after user interacts with an accordion
    document.querySelectorAll("[data-aria-accordion-heading]").forEach((heading) => {
        heading.addEventListener("click", () => {
            hasInteracted = true; // Mark the interaction flag as true
        });
    });

    // Run function when page loads
    if (window.ARIAaccordion) {
        openAccordionFromHash();
    } else {
        setTimeout(openAccordionFromHash, 500);
    }

    // Handle hash changes dynamically
    window.addEventListener("hashchange", openAccordionFromHash);
});

