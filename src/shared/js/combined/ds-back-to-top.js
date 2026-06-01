export function dsBackToTop() {
    const $backToTop = document.querySelector('.ds-back-to-top');
    if (!$backToTop) return;

    const $sideNav = document.querySelector('.hse-design-side-navigation');
    const $footer = document.querySelector('.hse-footer');

    if (!$sideNav) return;

    if (!('IntersectionObserver' in window)) return;

    // Must match the bottom value in the CSS for a seamless handoff
    const defaultBottom = 40; // hse-spacing(6)

    const adjustForFooter = () => {
        if (!$footer) return;
        // How many px the footer has entered the viewport from the bottom
        const footerOffset = Math.max(0, window.innerHeight - $footer.getBoundingClientRect().top);
        // Only override once the footer would start overlapping the link.
        // When footerOffset === defaultBottom the inline value matches the
        // CSS value exactly, so there is no visual jump at the transition.
        $backToTop.style.bottom = footerOffset > defaultBottom
            ? footerOffset + 'px'
            : '';
    };

    const setFixed = () => {
        const rect = $sideNav.getBoundingClientRect();
        $backToTop.style.left = rect.left + 'px';
        $backToTop.classList.add('ds-back-to-top--fixed');
        // Remove first to avoid stacking duplicate listeners
        window.removeEventListener('scroll', adjustForFooter);
        window.addEventListener('scroll', adjustForFooter, { passive: true });
        adjustForFooter();
    };

    const unsetFixed = () => {
        $backToTop.style.left = '';
        $backToTop.style.bottom = '';
        $backToTop.classList.remove('ds-back-to-top--fixed');
        window.removeEventListener('scroll', adjustForFooter);
    };

    const observer = new IntersectionObserver((entries) => {
        const sideNavEntry = entries.find((entry) => entry.target === $sideNav);
        if (!sideNavEntry) return;

        if (!sideNavEntry.isIntersecting) {
            setFixed();
        } else {
            unsetFixed();
        }
    });

    observer.observe($sideNav);
}
