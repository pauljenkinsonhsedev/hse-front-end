export function ariaLabels() {
  const headerContainer = document.getElementById("headerContainer");
  headerContainer.setAttribute("role", "banner");

  const navigationContainer = document.getElementById("navigationContainer");
  if (navigationContainer) {
    navigationContainer.setAttribute("role", "navigation");
    navigationContainer.setAttribute("aria-label", "Main menu");
  }

  const navSecondary = document.getElementById("navSecondary");
  if (navSecondary) {
    navSecondary.setAttribute("aria-label", "Secondary");
  }

  const lastUpdated = document.getElementById("lastUpdated");
  if (lastUpdated) {
    lastUpdated.setAttribute("aria-label", "Last updated");
  }

  const breadcrumb = document.getElementById("breadCrumb");
  if (breadcrumb) {
    breadcrumb.setAttribute("aria-label", "Previous page:");
    const lastItem = breadcrumb.querySelector("li:last-of-type");
    lastItem.setAttribute("aria-current", "page");
  }

  const top = document.getElementById("top");
  if (top) {
    top.setAttribute("aria-label", "Skip to content");
  }

  const betaUserTesting = document.getElementById("beta-user-testing");
  if (betaUserTesting) {
    betaUserTesting.setAttribute("aria-label", "Beta feedback");
  }

  const feedback = document.getElementById("feedback");
  if (feedback) {
    feedback.setAttribute("aria-label", "Is this page useful");
    const feedbackMessage = document.querySelector("p.feedback-message");
  }

  const pagination = document.getElementById("pagination");
  if (pagination) {
    pagination.setAttribute("role", "navigation");
    pagination.setAttribute("aria-label", "Pagination Navigation");
  }

  const multistepNav = document.getElementById("multistepNav");
  if (multistepNav) {
    multistepNav.setAttribute("role", "navigation");
    multistepNav.setAttribute("aria-label", "Secondary");
  }

  const sideBar = document.getElementById("sideBar");
  if (sideBar) {
    sideBar.setAttribute("role", "complementary");
  }

  const search = document.querySelector("form.gsc-search-box");
  if (search) {
    search.setAttribute("aria-label", "Primary");
    search.setAttribute("role", "search");
  }

  const localsearch = document.querySelector("form.gsc-search-box");
  if (localsearch) {
    localsearch.setAttribute("aria-label", "Secondary");
    localsearch.setAttribute("role", "search");
  }

  const gscSearch = document.querySelector("form.gsc-search-box");
  if (gscSearch) {
    gscSearch.setAttribute("role", "search");
  }

  const asideBottom = document.querySelector("#asideBottom");
  if (asideBottom) {
    asideBottom.setAttribute("role", "complementary");
  }

  const sidebarAside = document.querySelector("#sidebarAside");
  if (sidebarAside) {
    sidebarAside.setAttribute("role", "complementary");
  }


  const aside = document.querySelector("#contentAside");
  if (aside) {
    aside.setAttribute("role", "complementary");
  }

  const micrositeHomepage = document.querySelector(
    ".columnbetacontentpage.column1"
  );

  const callout = document.querySelectorAll(".callout");
  if (callout) {
    callout.forEach((box, index) => {
      box.setAttribute("id", `callout-${index}`);
      box.setAttribute("role", "note");
      if (micrositeHomepage) {
        box.setAttribute("role", "region");
      }
    });
  }

  const boxNoteInformation = document.querySelectorAll(".callout--information");
  if (boxNoteInformation) {
    boxNoteInformation.forEach((box, index) => {
      box.setAttribute("id", `callout-information-${index}`);
      box.setAttribute("role", "note");
      box.setAttribute("aria-label", "Information");
      if (micrositeHomepage) {
        box.setAttribute("role", "region");
      }
    });
  }

  const boxNoteWarning = document.querySelectorAll(".callout--warning");
  if (boxNoteWarning) {
    boxNoteWarning.forEach((box, index) => {
      box.setAttribute("id", `callout-warning-${index}`);
      box.setAttribute("role", "note");
      box.setAttribute("aria-label", "Warning");
    });
  }

  const boxNoteSurvey = document.querySelectorAll(".callout--survey");
  if (boxNoteSurvey) {
    boxNoteSurvey.forEach((box, index) => {
      box.setAttribute("id", `callout-survey-${index}`);
      box.setAttribute("role", "note");
      box.setAttribute("aria-label", "Survey");
    });
  }


  const contentsList = document.querySelector(".hse-contents-list");
  if (contentsList) {
    contentsList.setAttribute("aria-label", "Contents");
  }


}
