export function dsBackToTop() {
    const $backToTop = document.querySelector('.ds-back-to-top');
    if (!$backToTop) return;

    const $sideNav = document.querySelector('.hse-design-side-navigation');
    const $footer = document.querySelector('.hse-footer');
    if (!$sideNav) return;

    if (!('IntersectionObserver' in window)) return;

    // Must match bottom value in CSS for a seamless handoff
    const defaultBottom = 40; // hse-spacing(6)

    const adjustForFooter = () => {
        if (!$footer) return;
        const footerOffset = Math.max(0, window.innerHeight - $footer.getBoundingClientRect().top);
        $backToTop.style.bottom = footerOffset > defaultBottom
            ? footerOffset + 'px'
            : '';
    };

    const show = () => {
        $backToTop.style.left = $sideNav.getBoundingClientRect().left + 'px';
        $backToTop.classList.add('ds-back-to-top--visible');
        window.removeEventListener('scroll', adjustForFooter);
        window.addEventListener('scroll', adjustForFooter, { passive: true });
        adjustForFooter();
    };

    const hide = () => {
        $backToTop.style.left = '';
        $backToTop.style.bottom = '';
        $backToTop.classList.remove('ds-back-to-top--visible');
        window.removeEventListener('scroll', adjustForFooter);
    };

    const observer = new IntersectionObserver((entries) => {
        const entry = entries.find(e => e.target === $sideNav);
        if (!entry) return;
        entry.isIntersecting ? hide() : show();
    });

    // Matches CSS $mq-breakpoints desktop: 769px (when the grid goes two-column)
    const mql = window.matchMedia('(min-width: 769px)');

    const handleBreakpointChange = () => {
        if (!mql.matches) {
            hide();
        } else {
            observer.unobserve($sideNav);
            observer.observe($sideNav);
        }
    };

    if ('addEventListener' in mql) {
        mql.addEventListener('change', handleBreakpointChange);
    } else {
        mql.addListener(handleBreakpointChange);
    }

    // Hide for the entire duration of a resize to prevent the element jumping
    // between fixed and static states or rendering with a stale left value.
    // Restore and recalculate once the user stops dragging.
    let resizeTimer;
    window.addEventListener('resize', () => {
        $backToTop.style.display = 'none';
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            $backToTop.style.display = '';
            if (mql.matches && $backToTop.classList.contains('ds-back-to-top--visible')) {
                $backToTop.style.left = $sideNav.getBoundingClientRect().left + 'px';
            }
        }, 200);
    }, { passive: true });

    observer.observe($sideNav);
}
