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

    const links = container.querySelector('.feedback-links');
    const message = container.querySelector('.feedback-message');

    const userYes = document.querySelector('#userYes');
    const userNo = document.querySelector('#userNo');
    const surveyHandle = [userYes, userNo];

    scrollPos();

    // open survey
    surveyHandle.forEach((elem) => {
        elem.addEventListener('click', feedbackActions);
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
        links.remove();
        message.innerHTML = `Thank you for your feedback.`;
    }

    function closeSurvey() {
        survey.classList.remove('survey-show');
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
        setTimeout(function() {
            survey.classList.add('survey-show');
        }, 100);
    }
}