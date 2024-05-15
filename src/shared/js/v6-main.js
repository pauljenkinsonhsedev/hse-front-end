import "./combined/polyfills.js";
import ChartsDefault from "./combined/charts/charts.js";
import { mainMenu } from "./combined/main-menu.js";
import { loadPicturefillFn } from "./combined/utils/picture-elem.js";
import { fileTypeFunction } from "./combined/file-type.js";
import { getInternetExplorerVersion } from "./combined/utils/internet-explorer-detection.js";
import { tableSortable } from "./combined/tables/table-sortable.js";
import { feedbackSurvey } from "./combined/feedback-survey.js";
import { dialogModal } from "./combined/dialogs.js";
import { tabs } from "./combined/tabs.js";
import { backLinks } from "./combined/back-link.js";
import { ariaLabels } from "./combined/aria-labels.js";
import { googleSearch } from "./combined/google-search.js";
import { mainSearch } from "./combined/main-search.js";
import { footnoteLinks } from "./combined/footnote-links.js";
import { footnoteAbbr } from "./combined/footnote-abbr.js";
import { topTasks } from "./combined/top-tasks.js";
import { equalHeights } from "./combined/equal-heights.js";
import { informationBanner } from "./combined/information-banner.js";
import { codeHighlighter } from "./combined/code-highlighter.js";
import { htmlFormsAntiSpam } from "./combined/html-forms-anti-spam.js";
import { subnavMenu } from "./combined/subnav-menu.js";
// import { subNavPosition } from "./combined/subnav-position.js";
import { subNavMobile } from "./combined/subnav-mobile.js";
import { accordion } from "./combined/accordion.js";
import { htmlPrintGuide } from "./combined/html-print-guide.js";
import { backToTop } from "./combined/back-to-top.js";
import { sideNavDesign } from "./combined/side-nav-design.js";
import { dsSiteNavigation } from "./combined/ds-site-navigation.js";

// Window load
window.addEventListener("DOMContentLoaded", () => {
  // Selector to reference prgressive enhancements in css
  const body = document.querySelector("body");
  body.classList.add("hasScript");

  // picturefill.min.js
  const pictureElemSelector = document.getElementsByTagName("picture")[0];
  if (pictureElemSelector && getInternetExplorerVersion() <= 11) {
    loadPicturefillFn();
  }

  const backToTopLink = document.querySelector(".hse-back-to-top");
  
  if (backToTopLink) {
    backToTop();
  }

  accordion();

  informationBanner();

  codeHighlighter();

  // aria labels
  ariaLabels();

  // Top tasks
  topTasks();

  // Equal heights
  equalHeights();

  // HTML Print Guide
  const htmlPrintGuideContainer = document.querySelector(".html-print-guide");
  if (htmlPrintGuideContainer) {
    htmlPrintGuide();
  } else {
    // footnotes (for all printed pages)
    footnoteLinks();
    footnoteAbbr();
  }

  const googleSearchContainer = document.getElementById("globalSearch");
  if (googleSearchContainer) {
    googleSearch();
  }

  // Back links
  const backLink = document.querySelector(".hse-breadcrumb");
  if (backLink) {
    backLinks();
  }

  // small device menu
  const menu = document.querySelector(".js-menu");
  if (menu) {
    mainMenu();
  }

  // small device menu
  const search = document.querySelector(".js-search");
  if (search) {
    mainSearch();
  }

  // JS Enabled flag
  const htmlDoc = document.getElementsByTagName("html")[0];
  htmlDoc.classList.add("js-enabled");

  // Tables
  const tableSortableSelector = document.querySelector(".sortable");
  if (document.body.contains(tableSortableSelector)) {
    tableSortable(tableSortableSelector);
  }

  // Tabs
  const tabSelector = document.querySelector(".hse-tabs");
  if (document.body.contains(tabSelector)) {
    tabs(tabSelector);
  }

  // Dialogs
  const dialog = document.querySelector(".dialog");
  if (document.body.contains(dialog)) {
    dialogModal(dialog);
  }

  // HighCharts JS
  const chartSelector = document.querySelector(".chart");
  if (document.body.contains(chartSelector)) {
    new ChartsDefault();
  }

  // Append file types to anchors
  const anchorSelector = document.querySelector("#page-contents a");
  if (document.body.contains(anchorSelector)) {
    fileTypeFunction();
  }


  feedbackSurvey();

  // Design system side-nav
  const dsSide = document.querySelector(".hse-design-side-navigation");
  if (dsSide) {
    sideNavDesign();
  }

  // Design system site navigation
  const dsSiteNav = document.querySelector(".hse-ds-navigation");
  if (dsSiteNav) {
    dsSiteNavigation();
  }
  

  
  const secondaryMenuSelector = document.getElementById("menu");

  if (secondaryMenuSelector) {
    subnavMenu(secondaryMenuSelector);
    subNavMobile();
    // subNavPosition();
  }

  htmlFormsAntiSpam();

}); // end window load
