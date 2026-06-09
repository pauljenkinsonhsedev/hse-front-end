/*
  Overview:
  This script controls the page feedback component, including:
  - Yes/No feedback buttons
  - Optional follow-up survey UI
  - "Report a problem" form

  Behaviour:
  - Clicking Yes/No removes the controls, shows a thank-you message,
    and optionally opens a survey panel (UI only, no data submission).
  - Clicking "Report a problem" dynamically generates a form and submits it
    via POST to an external ASP endpoint:
      /assets/asp/feedback.asp

  Form handling:
  - The form includes user input plus hidden metadata (URL, browser, OS, etc.).
  - Submission is handled server-side by the ASP script (e.g. email/processing + redirect).
  - The page reloads after submission.

  Confirmation flow:
  - Cookies are set before submission to persist state across the reload.
  - On return, the script checks these cookies to:
      - Display a "Thank you" confirmation message
      - Scroll the user to that message
*/

import Bowser from "bowser";
import { scrollPos } from "./utils/feedback-position";

export function feedbackSurvey() {
  const container = document.querySelector(".hse-feedback");

  // Exit early if the feedback component is not present on the page.
  if (!container) {
    return;
  }

  // Main UI elements
  const survey = document.querySelector(".feedback-survey");
  const message = container.querySelector("#feedback-message");
  const feedbackPrompt = container.querySelector(".hse-feedback__prompt");

  // Containers
  const yesNoContainer = document.querySelector(
    ".hse-feedback__prompt-questions-answers",
  );
  const reportProblemButtonContainer = document.querySelector(
    ".hse-feedback__report-a-problem",
  );

  // Buttons / interactive controls
  const userReportProblem = document.querySelector("#report-problem-button");
  const reportProblemForm = document.querySelector(".report-a-problem-form");
  const userYes = document.querySelector("#userYes");
  const userNo = document.querySelector("#userNo");

  const surveyHandles = [userYes, userNo];
  const reportProblemHandles = [userReportProblem];

  // Initialise scroll position behaviour used by the feedback component.
  scrollPos();

  // Bind yes/no buttons to feedback flow.
  surveyHandles.forEach((elem) => {
    if (elem) {
      elem.addEventListener("click", handleFeedbackClick);
    }
  });

  // Bind "report a problem" button.
  reportProblemHandles.forEach((elem) => {
    if (elem) {
      elem.addEventListener("click", openReportProblemForm);
    }
  });

  /**
   * Handles yes/no feedback clicks.
   * Shows the thank-you message and optionally opens the survey panel.
   */
  function handleFeedbackClick(event) {
    event.preventDefault();
    showWebsiteFeedbackAcknowledgement();

    if (survey) {
      setTimeout(() => {
        showSurvey();
      }, 300);
    }
  }

  /**
   * Removes the initial feedback controls and shows a thank-you message.
   */
  function showWebsiteFeedbackAcknowledgement() {
    removeElement(userYes);
    removeElement(userNo);
    removeElement(userReportProblem);

    if (message) {
      message.innerHTML = "Thank you for your feedback.";
      message.classList.add("feedback-message-active");
    }
  }

  /**
   * Opens the "report a problem" form and populates hidden metadata fields.
   */
  function openReportProblemForm() {
    const browserUA = Bowser.getParser(window.navigator.userAgent);

    // Browser / OS / platform details for the hidden UA field
    const browser = browserUA.getBrowser();
    const os = browserUA.getOS();
    const platform = browserUA.getPlatform();

    const browserName = browser.name;
    const browserVersion = browser.version;
    const osName = os.name;
    const osVersion = os.version;
    const platformType = platform.type;
    const platformVendor = platform.vendor;

    // Build a canonical page URL without hash fragments
    const newURL =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      window.location.search;

    // Close button for the dynamic form
    const closeButton = document.createElement("button");
    closeButton.id = "close-report-a-problem";
    closeButton.classList.add(
      "hse-button",
      "hse-button--small",
      "hse-button--transparent",
    );
    closeButton.textContent = "Close";

    closeButton.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
        event.preventDefault();
        closeProblemForm(event);
      },
      false,
    );

    // Detect whether the current page looks like a 404 page.
    let notFoundPrefix = "";
    const h1 = document.querySelector("h1");

    if (h1) {
      const headingText = h1.innerText;
      if (headingText.includes("404")) {
        notFoundPrefix = "404! ";
      }
    }

    // Create the form element and inject all required fields.
    const form = document.createElement("form");
    form.id = "report-problem-form-html";
    form.action = "https://www.hse.gov.uk/assets/asp/feedback.asp";
    form.method = "POST";
    form.autocomplete = "on";

    const formFields = `
      <fieldset class="hse-fieldset report-a-problem-form__questions fieldset">
        <legend class="hse-fieldset__legend">
          <h2 class="hse-fieldset__heading">Help us improve HSE.GOV.UK</h2>
        </legend>
        <p>Don’t include personal or financial information like your National Insurance number or credit card details.</p>

        <div class="hse-form-group">
          <label class="hse-label" for="what-were-you-doing?">What were you doing?</label>
          <input
            required
            class="hse-input"
            name="what-were-you-doing?"
            type="text"
            id="what-were-you-doing?"
          />
        </div>

        <div class="hse-form-group">
          <label class="hse-label" for="what-went-wrong?">What went wrong?</label>
          <input
            required
            class="hse-input"
            id="what-went-wrong?"
            name="what-went-wrong?"
            type="text"
          />
        </div>
      </fieldset>

      <div class="hse-form-group js-hide" id="user-url"></div>

      <fieldset class="report-a-problem-form__hidden-fields fieldset">
        <input
          name="url"
          type="hidden"
          id="url"
          size="100"
          class="hse-input"
          value="${newURL}"
        >
        <input
          name="ua"
          type="hidden"
          id="ua"
          size="100"
          class="hse-input"
          value="Browser name: ${browserName}, Browser version: ${browserVersion}, OS name: ${osName}, OS version: ${osVersion}, Platform type: ${platformType}, Platform vendor: ${platformVendor}"
        >
        <input type="hidden" name="mailredirect" value="${newURL}">
        <input
          type="hidden"
          name="mailsubject"
          value="${notFoundPrefix}Report a problem with this page: ${newURL}"
        >
        <div class="report-a-problem-form__actions">
          <button
            type="submit"
            class="hse-button hse-button--small report-problem-submit"
          >Submit</button>
        </div>
      </fieldset>
    `;

    form.innerHTML = formFields;

    if (!reportProblemForm) {
      return;
    }

    reportProblemForm.insertAdjacentElement("afterbegin", form);

    // Switch the UI into "report a problem" mode.
    reportProblemForm.classList.add("survey-in");
    reportProblemButtonContainer?.classList.add("js-hide");
    yesNoContainer?.classList.add("js-hide");
    feedbackPrompt?.classList.add("js-feedback-open");

    reportProblemForm.scrollIntoView({ behavior: "auto", block: "start" });

    const reportProblemFormEnd = document.querySelector(
      ".report-a-problem-form__actions",
    );

    if (reportProblemFormEnd) {
      reportProblemFormEnd.insertAdjacentElement("beforeend", closeButton);
    }

    // Store lightweight confirmation state in cookies so the page can
    // show a confirmation message after the ASP form submission refreshes.
    const reportProblemPage = window.location.href;
    const encodedURL = window.btoa(reportProblemPage);

    function confirmationCookies() {
      Cookies.set("report_problem", encodedURL, { expires: 1 });
      Cookies.set("report_problem_confirmation", true, { expires: 1 });
    }

    reportProblemForm.addEventListener("submit", confirmationCookies);
  }

  // Confirmation status after form submission and redirect/refresh.
  const currentURL = window.location.href;
  const reportProblemStatus = Cookies.get("report_problem");
  const reportProblemConfirmation = Cookies.get("report_problem_confirmation");

  if (reportProblemStatus) {
    const decodedURL = window.atob(reportProblemStatus);

    if (decodedURL === currentURL) {
      container.innerHTML =
        '<div class="feedback__report-problem-alert" role="alert">Thank you for your feedback</div>';
    }

    // After submission the page refreshes; move focus/viewport back to the alert.
    if (reportProblemConfirmation === "true") {
      const anchor = document.querySelector(".feedback__report-problem-alert");

      if (anchor) {
        setTimeout(() => {
          anchor.scrollIntoView();
        }, 1);
      }

      Cookies.set("report_problem_confirmation", false, { expires: 1 });
    }
  }

  /**
   * Closes the report problem form and restores the default feedback UI.
   */
  function closeProblemForm(event) {
    if (reportProblemForm) {
      reportProblemForm.classList.remove("survey-in");
      reportProblemForm.innerHTML = "";
    }

    reportProblemButtonContainer?.classList.remove("js-hide");
    yesNoContainer?.classList.remove("js-hide");
    feedbackPrompt?.classList.remove("js-feedback-open");

    removeElement(event.target);
  }

  /**
   * Closes the survey panel.
   */
  function closeSurvey() {
    if (survey) {
      survey.classList.remove("survey-in");
    }
  }

  /**
   * Opens the survey panel and wires the question progression behaviour.
   */
  function showSurvey() {
    if (!survey) {
      return;
    }

    const questionaire = survey.querySelector(".questionaire");
    const questions = questionaire?.querySelectorAll(".question");
    const surveyQuestions = survey.querySelectorAll(".question-list__item a");
    const surveyClose = survey.querySelector(".survey-close");

    // Prevent default anchor behaviour in survey navigation.
    [...surveyQuestions].forEach((elem) => {
      elem.addEventListener("click", (event) => event.preventDefault());
    });

    if (!questions || !questions.length) {
      return;
    }

    // Activate the first question initially.
    questions[0].classList.add("active");

    // Progress through the questionnaire when an answer is selected.
    [...questions].forEach((elem) => {
      elem.addEventListener("click", (event) => {
        event.preventDefault();

        const target = event.target;
        if (
          target.classList.contains("answer") &&
          elem.classList.contains("active") &&
          elem.nextElementSibling
        ) {
          elem.classList.remove("active");
          elem.nextElementSibling.classList.add("active");
        }
      });
    });

    if (surveyClose) {
      surveyClose.addEventListener("click", closeSurvey);
    }

    survey.classList.add("survey-in");
    questionaire?.scrollIntoView({ behavior: "auto", block: "start" });
  }

  /**
   * Safely removes an element from the DOM if it exists.
   */
  function removeElement(element) {
    if (element?.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}
