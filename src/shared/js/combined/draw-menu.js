export function drawMenu(container) {
  container.classList.add('draw-container');
  let depth = 0;
  const wrapper = container.querySelector('ul:first-of-type');
  wrapper.classList.add('draw-wrapper');
  const height = wrapper.offsetHeight;
  // container.style.height = `${height}px`;

  // create back navigation

  function createBackLinks(elem) {
    console.log('elem', elem.previousElementSibling);
    const firstItem = elem.previousElementSibling;
    const header = document.createElement('li');
    const headerAction = document.createElement('a');
    headerAction.href = '#';
    headerAction.classList.add('back');
    headerAction.innerHTML = firstItem.textContent;
    headerAction.title = `Back to ${firstItem.textContent}`;
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

    const drawAction = draw.previousElementSibling;
    drawAction.classList.add('next');
  });

  // Back navigation event
  document.querySelector('body').addEventListener('click', (e) => {
    if (e.target.matches('.back')) {
      e.preventDefault();
      depth = depth -1;
      wrapper.style.left = `-${depth}00%`;
      container.classList.remove('open');
      container.style.removeProperty('height');
    }
  });

  // Add click event
  const next = document.querySelectorAll('.next');
  next.forEach((item) => {
    item.addEventListener('click', clickHandler);
  });

  function clickHandler(e) {
    e.preventDefault();
    depth++;

    wrapper.style.left = `-${depth}00%`;
    container.classList.add('open');

    const anchors = container.querySelectorAll('.draw-wrapper li:first-of-type .next');

    for (let n = 0; n < anchors.length; ++n) {
      if (anchors[n] !== e.target) {
        anchors[n].nextElementSibling.classList.remove('active');
      }
    }

    e.target.nextElementSibling.classList.add('active');

    // const drawHeight = e.target.nextElementSibling.offsetHeight;
    // console.log('drawHeight', drawHeight);
    // container.style.height = `${drawHeight}px`;
  }
}
