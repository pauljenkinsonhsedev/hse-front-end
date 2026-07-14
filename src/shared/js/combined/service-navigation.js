/**
 * service-navigation.js
 * Handles the mobile toggle for the service navigation component.
 */

export function serviceNavigation() {
  const containers = document.querySelectorAll(
    '[data-module="hse-service-navigation"]',
  );
  if (containers.length === 0) return;

  const currentPath = window.location.pathname;
  containers.forEach(($root) => {
    $root.querySelectorAll('.hse-service-navigation__link').forEach((link) => {
      const linkSegment = (link.getAttribute('href') || '')
        .replace(/\/index\.htm$/i, '')
        .split('/')
        .filter(Boolean)
        .pop();
      if (!linkSegment || currentPath.indexOf('/' + linkSegment + '/') === -1) return;

      const item = link.closest('.hse-service-navigation__item');
      if (item) item.classList.add('hse-service-navigation__item--active');
      link.setAttribute('aria-current', 'page');

      if (!link.querySelector('.hse-service-navigation__active-fallback')) {
        link.innerHTML = '<strong class="hse-service-navigation__active-fallback">'
          + link.innerHTML.trim() + '</strong>';
      }
    });
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
