export function htmlFormsAntiSpam() {


const accordionFormButton = document.querySelector('.btn-form');
  if (!accordionFormButton) {
    return;
  }
  // Event listener for form button

  accordionFormButton.addEventListener('click', insertForm);

  function insertForm() {

  const formButton = document.querySelector('.btn-form');

  if (!formButton) {
    return;
  }
  const formContainer = document.querySelector('.form-content');
  const content = formContainer.dataset.content;

  // get html form
  fetch(`/assets/ajax/forms/${content}.htm`).then(function (response) {
    return response.text();
    }).then(function (html) {

    // form html string
    const formhtml = (html);
    formContainer.innerHTML = formhtml ;

    }).catch(() => {
        console.error(`No such file: ${content}`);
    });

    // scroll to content
    formContainer.scrollIntoView({behavior: "smooth", block: "start"});

    // remove form button
    const contentContainer = document.querySelector('#contentContainer');
    contentContainer.removeChild(accordionFormButton);
  }
}