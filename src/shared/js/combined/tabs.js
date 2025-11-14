// tabs.js
import { tabsMediaQuery } from "./utils/tabs-media-query.js";

export function tabs(container) {
  const tabTitles = container.querySelectorAll(".hse-tabs__tab");
  const listItems = container.querySelectorAll(".hse-tabs__list-item");
  const tabPanels = container.querySelectorAll(".hse-tabs__panel");

  if (!tabTitles.length) return;

  // Track whether we are in mobile or desktop mode
  let currentSize = tabsMediaQuery();

  // Update when resized
  window.addEventListener("resize", () => {
    currentSize = tabsMediaQuery();
  });

  // Add ARIA roles
  const tabList = container.querySelector(".hse-tabs__list");
  tabList.setAttribute("role", "tablist");

  tabTitles.forEach((tab, index) => {
    const href = tab.getAttribute("href");
    const panelId = href.replace("#", "");
    const tabId = tab.getAttribute("id") || `tab-${index + 1}`;

    tab.setAttribute("id", tabId);
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panelId);
    tab.setAttribute("tabindex", "-1");
    tab.setAttribute("aria-selected", "false");

    const panel = container.querySelector(`#${panelId}`);
    if (panel) {
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tabId);
    }
  });

  // --- Activate a tab ---
  function activateTab(index, setFocus = true) {
    listItems.forEach((li) =>
      li.classList.remove("hse-tabs__list-item--selected")
    );
    tabPanels.forEach((panel) =>
      panel.classList.add("hse-tabs__panel--hidden")
    );
    tabTitles.forEach((tab) => {
      tab.setAttribute("aria-selected", "false");
      tab.setAttribute("tabindex", "-1");
    });

    listItems[index].classList.add("hse-tabs__list-item--selected");
    tabPanels[index].classList.remove("hse-tabs__panel--hidden");
    tabTitles[index].setAttribute("aria-selected", "true");
    tabTitles[index].setAttribute("tabindex", "0");

    if (setFocus) tabTitles[index].focus();
  }

  // --- Click handler ---
  tabTitles.forEach((tab, i) => {
    tab.addEventListener("click", (e) => {
      // Prevent page jump on desktop mode
      if (currentSize === "desktop") {
        e.preventDefault();
      }

      activateTab(i, true);
    });

    // --- Keyboard navigation ---
    tab.addEventListener("keydown", (e) => {
      const key = e.key;
      let newIndex;

      switch (key) {
        case "ArrowLeft":
          newIndex = (i - 1 + tabTitles.length) % tabTitles.length;
          activateTab(newIndex, true);
          e.preventDefault();
          break;
        case "ArrowRight":
          newIndex = (i + 1) % tabTitles.length;
          activateTab(newIndex, true);
          e.preventDefault();
          break;
        case "Home":
          activateTab(0, true);
          e.preventDefault();
          break;
        case "End":
          activateTab(tabTitles.length - 1, true);
          e.preventDefault();
          break;
      }
    });
  });

  // --- Deep linking: activate tab based on hash ---
  const currentHash = window.location.hash?.substring(1);
  const matchIndex = Array.from(tabPanels).findIndex(
    (panel) => panel.id === currentHash
  );

  if (matchIndex !== -1) {
    activateTab(matchIndex, false);
    tabTitles[matchIndex].scrollIntoView({ block: "nearest" });
  } else {
    activateTab(0, false);
  }
}
