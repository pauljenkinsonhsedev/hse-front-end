export function topTasks() {
  const multiStep = document.querySelectorAll('ol.multistep a');

  if (multiStep.length <= 0) {
    return;
  }

  const path = window.location.pathname;
  const url = path ? path.split(/[\\\/]/).pop() : 'index.htm';

  multiStep.forEach((step) => {
    const parent = step.closest('li');
    const href = step.href.split(/[\\\/]/).pop();

    if (href === url) {
      parent.innerHTML = step.textContent;
    }
  });
}