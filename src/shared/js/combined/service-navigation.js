/**
 * service-navigation.js
 * Handles the mobile toggle for the service navigation component.
 */

export function serviceNavigation() {
  const containers = document.querySelectorAll(
    '[data-module="hse-service-navigation"]',
  );
  if (containers.length === 0) return;

  // Compare resolved paths rather than raw hrefs, so relative links such as
  // "index.htm" or "../../index.htm" work under any base path
  // (e.g. /designsystem/ locally, /website/designsystem/ on the org server).
  const normalise = (path) => path.toLowerCase().replace(/\/(index|default)\.html?$/, '/');
  const sectionOf = (path) => path.slice(0, path.lastIndexOf('/') + 1);
  const currentPath = normalise(window.location.pathname);

  containers.forEach(($root) => {
    let activeLink = null;
    let activeSection = '';

    $root.querySelectorAll('.hse-service-navigation__link').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#') return;

      const linkPath = normalise(link.pathname);
      const section = sectionOf(linkPath);
      // Longest matching section wins, so nested sections beat their parents.
      if (currentPath.indexOf(section) === 0 && section.length > activeSection.length) {
        activeLink = link;
        activeSection = section;
      }
    });

    // Ignore a match on the site root itself (e.g. a "Home" link), which would
    // otherwise be active on every page.
    const others = Array.from($root.querySelectorAll('.hse-service-navigation__link'))
      .filter((l) => l !== activeLink && (l.getAttribute('href') || '').charAt(0) !== '#');
    if (activeLink && others.some((l) => sectionOf(normalise(l.pathname)).indexOf(activeSection) === 0)) {
      activeLink = null;
    }

    if (activeLink) {
      const link = activeLink;
      const item = link.closest('.hse-service-navigation__item');
      if (item) item.classList.add('hse-service-navigation__item--active');
      link.setAttribute('aria-current', normalise(link.pathname) === currentPath ? 'page' : 'true');

      if (!link.querySelector('.hse-service-navigation__active-fallback')) {
        link.innerHTML = '<strong class="hse-service-navigation__active-fallback">'
          + link.innerHTML.trim() + '</strong>';
      }
    }
  });

  containers.forEach(($root) => {
    const $menuButton = $root.querySelector(
      ".hse-js-service-navigation-toggle",
    );
    if (!$menuButton) return;

    const menuId = $menuButton.getAttribute("aria-controls");
    if (!menuId) return;

    const $menu = document.getElementById(menuId);
    if (!$menu) return;

    let menuIsOpen = false;

    const mql = window.matchMedia("(min-width: 641px)");

    const checkMode = () => {
      if (mql.matches) {
        $menu.removeAttribute("hidden");
        $menuButton.setAttribute("hidden", "");
        $menuButton.setAttribute("aria-hidden", "true");
      } else {
        $menuButton.removeAttribute("hidden");
        $menuButton.removeAttribute("aria-hidden");
        $menuButton.setAttribute("aria-expanded", menuIsOpen.toString());

        if (menuIsOpen) {
          $menu.removeAttribute("hidden");
        } else {
          $menu.setAttribute("hidden", "");
        }
      }
    };

    $menuButton.addEventListener("click", () => {
      menuIsOpen = !menuIsOpen;
      checkMode();
    });

    if ("addEventListener" in mql) {
      mql.addEventListener("change", checkMode);
    } else {
      mql.addListener(checkMode);
    }

    checkMode();
  });
}
