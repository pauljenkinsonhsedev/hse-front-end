/**
 * service-navigation.js
 * Handles the mobile toggle for the service navigation component.
 */

export function serviceNavigation() {
  const containers = document.querySelectorAll(
    '[data-module="hse-service-navigation"]',
  );
  if (containers.length === 0) return;

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
