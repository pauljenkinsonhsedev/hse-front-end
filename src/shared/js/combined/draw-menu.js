export function drawMenu(container) {
  container.classList.add('draw-container');
  let depth = 0;
  const wrapper = container.querySelector('ul:first-of-type');
  wrapper.classList.add('draw-wrapper');
  const height = wrapper.offsetHeight;
  // container.style.height = `${height}px`;

  // create back navigation
  function createBackLinks(elem) {
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

  // Add click event
  const back = document.querySelectorAll('.back');
  back.forEach((item) => {
    console.log(item);
    item.addEventListener('click', backHandler);
  });

  function backHandler(e) {
    e.preventDefault();
    depth--;

    wrapper.style.left = `-${depth}00%`;

    const parent = e.target.closest('.draw');
    const grandParent = parent.closest('ul').closest('.draw');
    parent.classList.remove('active');
    grandParent.classList.add('active');
  }

  // Add click event
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
        // anchors[n].nextElementSibling.style.visibility = 'hidden';
      }
    }
    // e.target.nextElementSibling.style.visibility = 'visible';
    e.target.nextElementSibling.classList.add('active');

    // const drawHeight = e.target.nextElementSibling.offsetHeight;
    // console.log('drawHeight', drawHeight);
    // container.style.height = `${drawHeight}px`;
  }
}
