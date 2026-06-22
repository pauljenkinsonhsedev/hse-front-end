import { codeHighlighter } from "./combined/code-highlighter.js";
import { mainMenu } from "./combined/main-menu.js";
import { fileTypeFunction } from "./combined/file-type.js";
import { tableSortable } from "./combined/tables/table-sortable.js";
import { feedbackSurvey } from "./combined/feedback-survey.js";
import { tabs } from "./combined/tabs.js";
import { ariaLabels } from "./combined/aria-labels.js";
import { googleSearch } from "./combined/google-search.js";
import { topTasks } from "./combined/top-tasks.js";
import { hseBanner } from "./combined/banner.js";
import { globalBanner } from "./combined/global-banner.js";
import { accordion } from "./combined/accordion.js";
import { backToTop } from "./combined/back-to-top.js";
import { dsSiteNavigation } from "./combined/ds-site-navigation.js";
import { sideNavDesign } from "./combined/side-nav-design.js";
import { dsBackToTop } from "./combined/ds-back-to-top.js";
import { serviceNavigation } from "./combined/service-navigation.js";

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("hasScript");
  document.documentElement.classList.add("js-enabled");

  // Initialize Core Navigation
  try {
    if (document.getElementById("globalSearch")) {
      googleSearch();
    }
    if (document.querySelector(".js-menu")) {
      mainMenu();
    }
    dsSiteNavigation();
  } catch (e) {
    console.error("Navigation failed to load:", e);
  }

  // Initialize Components
  accordion();
  hseBanner();
  globalBanner();
  topTasks();
  ariaLabels();
  document.querySelectorAll(".hse-tabs").forEach((container) => tabs(container));
  document.querySelectorAll(".sortable").forEach((container) => tableSortable(container));
  fileTypeFunction();

  // Initialize Charts if container exists — loaded as a separate chunk
  if (document.querySelector(".chart")) {
    import("./combined/charts/charts.js").then(({ default: ChartsDefault }) => {
      new ChartsDefault();
    });
  }

  codeHighlighter();
  feedbackSurvey();

  if (document.querySelector(".hse-back-to-top")) {
    backToTop();
  }

  if (document.querySelector('[data-module="hse-service-navigation"]')) {
    serviceNavigation();
  }

  if (document.querySelector(".hse-design-side-navigation")) {
    sideNavDesign();
  }

  if (document.querySelector(".ds-back-to-top")) {
    dsBackToTop();
  }
});
