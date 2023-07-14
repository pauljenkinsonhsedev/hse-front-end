/*

    Notes:
    Feedback and surveys are being used here purely for Google Analytics and therefore don't submit any data.
    Data is captured in GA, these functions are purely superficial

*/
import { scrollPos } from "./utils/feedback-position";
import { bowser } from "./bowser.js";

export function feedbackSurvey() {
  const container = document.querySelector(".hse-feedback");

  if (!container) {
    return;
  }
  const survey = document.querySelector(".feedback-survey");

  const message = container.querySelector("#feedback-message");

  const feedbackPrompt = container.querySelector(".hse-feedback__prompt");

  // Containers
  const yesNoContainer = document.querySelector(".hse-feedback__prompt-questions-answers");
  const reportProblemButtonContainer = document.querySelector(
    ".hse-feedback__report-a-problem"
  );

  // Report a problem

  const userReportProblem = document.querySelector("#report-problem-button");
  const reportProblemForm = document.querySelector(".report-a-problem-form");

  // User yes/no
  const userYes = document.querySelector("#userYes");
  const userNo = document.querySelector("#userNo");

  const surveyHandle = [userYes, userNo];
  const ReportProblemHandle = [userReportProblem];

  scrollPos();

  // open survey
  surveyHandle.forEach((elem) => {
    elem.addEventListener("click", feedbackActions);
  });

  // open report a problem
  ReportProblemHandle.forEach((elem) => {
    elem.addEventListener("click", reportProblem);
  });

  function feedbackActions(e) {
    e.preventDefault();
    websiteFeedback();
    if (survey) {
      setTimeout(function () {
        showSurvey();
      }, 300);
    }
  }

  function websiteFeedback() {
    userYes.parentNode.removeChild(userYes);
    userNo.parentNode.removeChild(userNo);
    userReportProblem.parentNode.removeChild(userReportProblem);
    message.innerHTML = `Thank you for your feedback.`;
    message.classList.add("feedback-message-active");
  }

  function reportProblem() {
    bowser();

    const Bowser = require("bowser");
    const browserUA = Bowser.getParser(window.navigator.userAgent);

    // Get browser info
    const browser = browserUA.getBrowser();
    const os = browserUA.getOS();
    const platform = browserUA.getPlatform();

    // Browser
    const browserName = browser.name;
    const browserVersion = browser.version;
    // OS
    const osName = os.name;
    const osVersion = os.version;
    // Platform
    const platformType = platform.type;
    const platformVendor = platform.vendor;

    const newURL =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      window.location.search;
    const action = document.createElement("button");
    action.id = "close-report-a-problem";
    action.classList.add("btn");
    action.textContent = "Close";

    action.addEventListener(
      "click",
      (e) => {
        e.stopPropagation();
        e.preventDefault();
        closeProblemForm(e);
      },
      false
    );

    const form = document.createElement("form");

    const checkH1 = document.querySelector("h1");
    if (checkH1) {
    const notFoundHeading = document.querySelector("h1").innerText;
      
    const notFound = "404";

    if (notFoundHeading.includes(notFound)) {
      var notFoundTrue = "404! ";
    } else {
      var notFoundTrue = "";
    }
  }


    form.id = "report-problem-form-html";
    form.action = "https://www.hse.gov.uk/assets/asp/feedback.asp";
    form.method = "POST";
    form.autocomplete = "on";

    const formFields = `<fieldset class="report-a-problem-form__questions fieldset">
            <legend class="fieldset__legend">
                <h2 class="fieldset__heading">Help us improve HSE.GOV.UK</h2>
            </legend>
            <p>Don’t include personal or financial information like your National Insurance number or credit card details.</p>
            <div class="form-group">
                <label class="label" for="what-were-you-doing?">What were you doing?</label>
                <input required class="input input-text input-width-full" name="what-were-you-doing?" type="text" id="what-were-you-doing?"/>
            </div>
            <div class="form-group">
                <label class="label" for="what-went-wrong?">What went wrong?</label>
                <input required class="input input-text input-width-full" id="what-went-wrong?" name="what-went-wrong?" type="text">
            </div>
        </fieldset>
        <div class="form-group js-hide" id="user-url"></div>
        <fieldset class="report-a-problem-form__hidden-fields fieldset">
            <input name="url" type="hidden" id="url" size="100" class="input input-text" value="${newURL}">
            <input name="ua" type="hidden" id="ua" size="100" class="input input-text" value="Browser name: ${browserName}, Browser version: ${browserVersion}, OS name: ${osName}, OS version: ${osVersion}, Platform type: ${platformType}, Platform vendor: ${platformVendor}">
            <input type="hidden" name="mailredirect" value="${newURL}">
            <input type="hidden" name="mailsubject" value="${notFoundTrue}Report a problem with this page: ${newURL}">
            <input type="submit" value="Submit" class="btn btn-primary report-problem-submit" />
        </fieldset>`;

    // const formFeedbackHTML = `<div class="report-problem-form-feeback"><h2>Thank you</h2><p>Your feedback is appreciated.</p></div>`;

    form.innerHTML = formFields;
    // form.addEventListener('submit', (e) => {
    //     e.stopPropagation();
    //     e.preventDefault();

    //     reportProblemForm.innerHTML = formFeedbackHTML;

    //     form.submit();
    // }, false);

    
    reportProblemForm.insertAdjacentElement("afterbegin", form);

    reportProblemForm.classList.add("survey-in");
    reportProblemButtonContainer.classList.add("js-hide");
    yesNoContainer.classList.add("js-hide");
    feedbackPrompt.classList.add("js-feedback-open");

    reportProblemForm.scrollIntoView({ behavior: "auto", block: "start" });
    const reportProblemFormEnd = document.querySelector("#report-problem-form-html");
    
    reportProblemFormEnd.insertAdjacentElement("beforeend", action);

    // Form confirmation




    // Get page URL and encode
    const reportProblemPage = window.location.href;
    const encodedURL = window.btoa(reportProblemPage);

    // Set cookies for confirmation status

    function confirmationCookies(event) {
      Cookies.set("report_problem", encodedURL, { expires: 1 });
      Cookies.set("report_problem_confirmation", true, { expires: 1 });
    }

    reportProblemForm.addEventListener("submit", confirmationCookies);
  }

  // Confirmation status
  const URLcheck = window.location.href;
  const reportProblemStatus = Cookies.get("report_problem");
  const reportProblemConfirmation = Cookies.get("report_problem_confirmation");

  if (reportProblemStatus) {
    // Add feedback alert
    const decoded = window.atob(reportProblemStatus);
    if (decoded === URLcheck) {
      container.innerHTML =
        '<div class="feedback__report-problem-alert" role="alert">Thank you for your feedback</div>';
    }

    // page refreshes on submission (asp script), move viewport to report problem alert message

    if (reportProblemConfirmation === "true") {
      var anchor = document.querySelector(".feedback__report-problem-alert");

      setTimeout(function () {
        anchor.scrollIntoView();
      }, 1);

      Cookies.set("report_problem_confirmation", false, { expires: 1 });
    }
  }

  function closeProblemForm(e) {
    reportProblemForm.classList.remove("survey-in");
    reportProblemButtonContainer.classList.remove("js-hide");
    yesNoContainer.classList.remove("js-hide");
    feedbackPrompt.classList.remove("js-feedback-open");
    reportProblemForm.innerHTML = "";
    e.target.parentNode.removeChild(e.target);
  }

  function closeSurvey() {
    survey.classList.remove("survey-in");
  }

  function showSurvey() {
    const questionaire = survey.querySelector(".questionaire");
    const questions = questionaire.querySelectorAll(".question");

    const surveyQuestions = survey.querySelectorAll(".question-list__item a");
    const surveyClose = survey.querySelector(".survey-close");

    [...surveyQuestions].forEach((elem) => {
      // prevent default behaviour
      elem.addEventListener("click", (e) => e.preventDefault());
    });

    // display questions
    questions[0].classList.add("active");
    [...questions].forEach((elem) => {
      elem.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target;
        if (
          target.classList.contains("answer") &&
          elem.classList.contains("active")
        ) {
          elem.classList.remove("active");
          elem.nextElementSibling.classList.add("active");
        }
      });
    });

    surveyClose.addEventListener("click", closeSurvey);

    // open survey panel
    survey.classList.add("survey-in");

    questionaire.scrollIntoView({ behavior: "auto", block: "start" });
  }
}
