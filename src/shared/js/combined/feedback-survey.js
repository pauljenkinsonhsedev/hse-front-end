/*

    Notes:
    Feedback and surveys are being used here purely for Google Analytics and therefore don't submit any data.
    Data is captured in GA, these functions are purely superficial

*/
import { scrollPos } from './utils/feedback-position';

export function feedbackSurvey() {
    const container = document.querySelector('.feedback-container');

    if (!container) {
        return;
    }
    const survey = document.querySelector('.feedback-survey');

    const message = container.querySelector('.feedback-message');

    // Containers
    const yesNoContainer = document.querySelector('.yes-no-container');
    const reportProblemButtonContainer = document.querySelector('.report-a-problem-container');


    // Report a problem

    const userReportProblem = document.querySelector('#report-problem-button');
    const reportProblemForm = document.querySelector('.report-a-problem-form');

    // User yes/no
    const userYes = document.querySelector('#userYes');
    const userNo = document.querySelector('#userNo');

    const surveyHandle = [userYes, userNo];
    const ReportProblemHandle = [userReportProblem];

    scrollPos();

    // open survey
    surveyHandle.forEach((elem) => {
        elem.addEventListener('click', feedbackActions);
    });

    // open report a problem
    ReportProblemHandle.forEach((elem) => {
        elem.addEventListener('click', reportProblem);
    });

    function feedbackActions (e) {
        e.preventDefault();
        websiteFeedback();
        if (survey) {
            setTimeout(function() {
                showSurvey();
            }, 300);
        }
    }

    function websiteFeedback() {
        userYes.parentNode.removeChild(userYes);
        userNo.parentNode.removeChild(userNo);
        userReportProblem.parentNode.removeChild(userReportProblem);
        message.innerHTML = `Thank you for your feedback.`;
        message.classList.add('feedback-message-active');
    }

    function reportProblem() {




      const newURL =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        window.location.search;
      const action = document.createElement('button');
      action.id = 'close-report-a-problem';
      action.classList.add('btn');
      action.textContent = 'Close';

      action.addEventListener(
        'click',
        (e) => {
          e.stopPropagation();
          e.preventDefault();
          closeProblemForm(e);

        },
        false
      );




      // <form id="report-problem-form-html" action="https://resources.hse.gov.uk/responseform.asp" method="post" autocomplete="on">
      const form = document.createElement('form');
      form.id = 'report-problem-form-html';
      form.action = 'https://resources.hse.gov.uk/responseform.asp';
      form.method = 'POST';
      form.autocomplete = 'on';

      const formFields = `<fieldset class="fieldset" id="form-settings">
            <input type="hidden" name="mailto" value="hse.online@hse.gov.uk"/>
            <input type="hidden" name="mailfrom" value="hse.online@hsemail.me"/>
        </fieldset>
        <fieldset class="fieldset">
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
        <fieldset>
            <input name="url" type="hidden" id="url" size="100" class="input input-text" value="${newURL}">
            <input type="hidden" name="mailredirect" value="${newURL}">
            <input type="hidden" name="mailsubject" value="Report a problem with this page: ${newURL}">
            <input type="submit" value="Submit" class="btn btn-primary" />
        </fieldset>`;

        // const formFeedbackHTML = `<div class="report-problem-form-feeback"><h2>Thank you</h2><p>Your feedback is appreciated.</p></div>`;

        form.innerHTML = formFields;
        // form.addEventListener('submit', (e) => {
        //     e.stopPropagation();
        //     e.preventDefault();

        //     reportProblemForm.innerHTML = formFeedbackHTML;

        //     form.submit();
        // }, false);

      reportProblemForm.insertAdjacentElement('afterbegin', form);
      reportProblemForm.insertAdjacentElement('beforebegin', action);

      reportProblemForm.classList.add('survey-in');
      reportProblemButtonContainer.classList.add('js-hide');
      yesNoContainer.classList.add('js-hide');
      reportProblemForm.scrollIntoView({behavior: "auto", block: "start"});

    }

    function closeProblemForm(e) {
        reportProblemForm.classList.remove('survey-in');
        reportProblemButtonContainer.classList.remove('js-hide');
        yesNoContainer.classList.remove('js-hide');

        reportProblemForm.innerHTML = '';
        e.target.parentNode.removeChild(e.target);
    }

    function closeSurvey() {
        survey.classList.remove('survey-in');
    }

    function showSurvey() {
        const questionaire = survey.querySelector('.questionaire');
        const questions = questionaire.querySelectorAll('.question');

        const surveyQuestions = survey.querySelectorAll('.question-list__item a');
        const surveyClose = survey.querySelector('.survey-close');

        [...surveyQuestions].forEach((elem) => {
            // prevent default behaviour
            elem.addEventListener('click', (e) => e.preventDefault());
        });

        // display questions
        questions[0].classList.add('active');
        [...questions].forEach((elem) => {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target;
                if (target.classList.contains('answer') && elem.classList.contains('active')) {
                    elem.classList.remove('active');
                    elem.nextElementSibling.classList.add('active');
                }
            });
        });

        surveyClose.addEventListener('click', closeSurvey);

        // open survey panel
        survey.classList.add('survey-in');

        questionaire.scrollIntoView({behavior: "auto", block: "start"});

    }
}