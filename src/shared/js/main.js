import ChartsDefault from "./combined/charts/charts.js";
import { mainMenu } from "./combined/main-menu.js";
import { fileTypeFunction } from "./combined/file-type.js";
import { tableSortable } from "./combined/tables/table-sortable.js";
import { feedbackSurvey } from "./combined/feedback-survey.js";
import { dialogModal } from "./combined/dialogs.js";
import { tabs } from "./combined/tabs.js";
import { ariaLabels } from "./combined/aria-labels.js";
import { googleSearch } from "./combined/google-search.js";
import { topTasks } from "./combined/top-tasks.js";
import { informationBanner } from "./combined/information-banner.js";
import { accordion } from "./combined/accordion.js";
import { backToTop } from "./combined/back-to-top.js";
import { dsSiteNavigation } from "./combined/ds-site-navigation.js";

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("hasScript");

  // Initialize Core Navigation
  try {
    if (document.getElementById("globalSearch")) { googleSearch(); }
    if (document.querySelector(".js-menu")) { mainMenu(); }
    dsSiteNavigation();
  } catch (e) {
    console.error("Navigation failed to load:", e);
  }

  // Initialize Components
  accordion();
  informationBanner();
  topTasks();
  ariaLabels();
  tabs();
  dialogModal();
  tableSortable();
  fileTypeFunction();

  // Initialize Charts if container exists
  if (document.querySelector(".chart")) {
    new ChartsDefault();
  }

  feedbackSurvey();

  if (document.querySelector(".hse-back-to-top")) { 
    backToTop(); 
  }
});