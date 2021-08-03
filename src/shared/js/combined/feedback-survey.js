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
    const reportProblemClose = document.querySelector('#close-report-a-problem');
    const submitForm = document.querySelector('#user-url');
    const formSettings = document.querySelector('#form-settings');

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
        userYes.remove();
        userNo.remove();
        userReportProblem.remove();
        message.innerHTML = `Thank you for your feedback.`;
        message.classList.add('feedback-message-active');
    }

    

    function reportProblem() {
        reportProblemForm.classList.add('survey-in');
        reportProblemClose.classList.remove('js-hide');
        reportProblemButtonContainer.classList.add('js-hide');
        yesNoContainer.classList.add('js-hide');



        const newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
        submitForm.innerHTML += '<label id="url-label" class="label" for="url">Hidden</label><input name="url" type="hidden" id="url" size="100" class="input input-text" value="' + newURL + '">';
        formSettings.innerHTML += '<input type="hidden" name="mailredirect" value="' + newURL + '">';
        formSettings.innerHTML += '<input type="hidden" name="mailsubject" value="Report a problem with this page: ' + newURL + '">';

        console.log(newURL);

        reportProblemClose.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            closeProblemForm();
        }, false)

        function closeProblemForm() {
            reportProblemForm.classList.remove('survey-in');
            reportProblemClose.classList.add('js-hide');
            reportProblemButtonContainer.classList.remove('js-hide');
            yesNoContainer.classList.remove('js-hide');
            const hiddenURL = document.querySelector('#url');
            const hiddenURLLabel = document.querySelector('#url-label');

            hiddenURL.remove();
            hiddenURLLabel.remove();

            console.log('clicked');
        }
        

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
    }
}