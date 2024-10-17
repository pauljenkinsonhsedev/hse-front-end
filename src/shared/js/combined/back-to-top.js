export function backToTop() {
    const backToTop = document.querySelector('.hse-back-to-top__container');
    const backToTopHook = document.querySelector('.hse-back-to-top');
    const minimumContentHeight = 1500; // Minimum content height required to show the button
    const displayPercentage = 30; // Display the button after 20% of the content is scrolled
    const minimumScrollHeight = 1000; // Minimum pixel height to show the button
    let isScrolling = false; // Flag to track if the user is scrolling back to top

    // Move the back-to-top element before the aside with ID #contentAside
    const contentAside = document.querySelector('#contentAside');
    if (contentAside && contentAside.parentElement) {
        contentAside.parentElement.insertBefore(backToTopHook, contentAside);
    }

    // Initially hide the button
    backToTop.classList.add("hse-back-to-top--hidden");
    backToTop.setAttribute('aria-hidden', 'true'); // Set aria-hidden to true initially

    // Check if the page is a topTask layout
    const topTaskMain = document.querySelector('main.topTask');
    if (topTaskMain) {
        // If the main tag exists, exit the function to prevent further execution
        return;
    }

    // Cache the page contents for performance
    const pageContents = document.querySelector('#page-contents');

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const position = backToTopHook.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check the total height of the page content
        const contentHeight = pageContents ? pageContents.scrollHeight : 0;

        // Calculate the scroll threshold as a percentage of the total content height
        const scrollThreshold = (contentHeight * displayPercentage) / 100;

        // Check if the user has scrolled past the minimum scroll height or the percentage threshold
        if ((scrollY > scrollThreshold || scrollY > minimumScrollHeight) && contentHeight >= minimumContentHeight) {
            // Show the back-to-top link if scrolled past the threshold and it's not in view
            if (position.top > windowHeight && !isScrolling) {
                backToTop.classList.remove("hse-back-to-top--hidden");
                backToTop.classList.add("hse-back-to-top--fixed");
                backToTop.setAttribute('aria-hidden', 'false'); // Set aria-hidden to false when visible
            } else {
                // If in view, remove fixed class and show normally
                backToTop.classList.remove("hse-back-to-top--fixed");
            }
        } else {
            // Hide the link when not scrolled past the threshold or minimum height
            backToTop.classList.add("hse-back-to-top--hidden");
            backToTop.classList.remove("hse-back-to-top--fixed");
            backToTop.setAttribute('aria-hidden', 'true'); // Set aria-hidden to true when hidden
        }
    });

    // Add smooth scroll behavior on link click
    backToTop.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior

        isScrolling = true; // Set the flag to true to indicate scrolling
        backToTop.classList.remove("hse-back-to-top--fixed"); // Immediately hide the fixed style

        // Smooth scroll back to the top
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // This enables the smooth scrolling effect
        });

        // After the scroll, we can reset the flag
        setTimeout(() => {
            isScrolling = false; // Reset the scrolling flag
            backToTop.classList.add("hse-back-to-top--hidden"); // Hide the button after scroll
            backToTop.setAttribute('aria-hidden', 'true'); // Ensure aria-hidden is true when hidden
        }, 500); // Adjust the timeout duration if needed
    });
}
