export function drawMenu(container) {
  container.classList.add('draw-container');
  let depth = 0;
  const wrapper = container.querySelector('ul:first-of-type');
  wrapper.classList.add('draw-wrapper');

  // create back navigation
  function createBackLinks(elem) {
    const returnTo = elem.parentElement.parentElement.firstElementChild.textContent;
    const regex = /Overview -/gi;
    const headerText = returnTo.replaceAll(regex, '');
    const header = document.createElement('li');
    const headerAction = document.createElement('a');
    headerAction.href = '#';
    headerAction.classList.add('back');
    headerAction.innerHTML = headerText;
    headerAction.title = `Back to ${headerText}`;
    header.classList.add('header');
    header.appendChild(headerAction.cloneNode(true));

    return header;
  }

  // Create draws
  const nestedChildren = container.querySelectorAll('ul:not(:first-child)');
  [...nestedChildren].reverse().forEach((item) => {
    const header = createBackLinks(item);
    const draw = document.createElement('div');
    draw.classList.add('draw');
    draw.appendChild(header.cloneNode(true));
    draw.appendChild(item.cloneNode(true));
    item.replaceWith(draw);

    draw.querySelector('li').classList.add('header');

    const drawAction = draw.previousElementSibling;
    drawAction.classList.add('next');
  });

  // Add click event for back
  const back = document.querySelectorAll('.back');
  back.forEach((item) => {
    item.addEventListener('click', backHandler);
  });

  function backHandler(e) {
    e.preventDefault();
    depth--;

    wrapper.style.left = `-${depth}00%`;
    let drawHeight;
    const parent = e.target.closest('.draw');
    const grandParent = parent.closest('ul').closest('.draw');
    parent.classList.remove('active');
    if (grandParent) {
      grandParent.classList.add('active');
      container.style.height = `${drawHeight}px`;
    } else {
      container.style.height = `auto`;
    }
  }

  // Add click event for next
  const next = document.querySelectorAll('.next');
  next.forEach((item) => {
    item.addEventListener('click', nextHandler);
  });

  function nextHandler(e) {
    e.preventDefault();
    depth++;

    wrapper.style.left = `-${depth}00%`;
    container.classList.add('open');

    const anchors = container.querySelectorAll('.draw-wrapper .next');
    for (let n = 0; n < anchors.length; ++n) {
      if (anchors[n] !== this) {
        anchors[n].nextElementSibling.classList.remove('active');
      }
    }
    e.target.nextElementSibling.classList.add('active');

    const drawHeight = e.target.nextElementSibling.offsetHeight;
    container.style.height = `${drawHeight}px`;
  }
}
