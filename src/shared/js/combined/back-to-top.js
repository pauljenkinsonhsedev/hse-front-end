export function backToTop() {
    const backToTop = document.querySelector('.hse-back-to-top__container');
    const backToTopHook = document.querySelector('.hse-back-to-top');
    const scrollThreshold = 800; // Set your desired scroll threshold
    const minimumContentHeight = 1000; // Minimum height required to show the button

    // Move the back-to-top element before the aside with ID #contentAside
    const contentAside = document.querySelector('#contentAside');
    if (contentAside && contentAside.parentElement) {
        contentAside.parentElement.insertBefore(backToTopHook, contentAside);
    }

    // Initially hide the button
    backToTop.classList.add("hse-back-to-top--hidden");
    backToTop.setAttribute('aria-hidden', 'true'); // Set aria-hidden to true initially

    // Cache the page contents for performance
    const pageContents = document.querySelector('#page-contents');

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const position = backToTopHook.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check the total height of the page content
        const contentHeight = pageContents ? pageContents.scrollHeight : 0;

        // Only apply the logic if the content height exceeds the minimum required height
        if (contentHeight >= minimumContentHeight) {
            // Check if the user has scrolled beyond the threshold
            if (scrollY > scrollThreshold) {
                // Show the back-to-top link if scrolled past the threshold and it's not in view
                if (position.top > windowHeight) {
                    backToTop.classList.remove("hse-back-to-top--hidden");
                    backToTop.classList.add("hse-back-to-top--fixed");
                    backToTop.setAttribute('aria-hidden', 'false'); // Set aria-hidden to false when visible
                } else {
                    // If in view, remove fixed class and show normally
                    backToTop.classList.remove("hse-back-to-top--fixed");
                }
            } else {
                // Hide the link when not scrolled past the threshold
                backToTop.classList.add("hse-back-to-top--hidden");
                backToTop.classList.remove("hse-back-to-top--fixed");
                backToTop.setAttribute('aria-hidden', 'true'); // Set aria-hidden to true when hidden
            }
        } else {
            // If content height is less than minimum, ensure link is hidden
            backToTop.classList.add("hse-back-to-top--hidden");
            backToTop.classList.remove("hse-back-to-top--fixed");
            backToTop.setAttribute('aria-hidden', 'true'); // Ensure aria-hidden is true
        }
    });

    // Add smooth scroll behavior on link click
    backToTop.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        // Smooth scroll back to the top
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This enables the smooth scrolling effect
        });
    });
}
