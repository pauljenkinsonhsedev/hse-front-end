export function drawMenu(container) {
  container.classList.add('draw-container');
  const wrapper = container.querySelector('ul:first-of-type');
  wrapper.classList.add('draw-wrapper');

  const height = wrapper.offsetHeight;
  console.log('height', height);
  // container.style.height = `${height}px`;

  // create back navigation
  const firstItem = container.querySelector('li:first-of-type');
  const header = document.createElement('li');
  const headerAction = document.createElement('a');
  headerAction.href = '#';
  headerAction.classList.add('back');
  headerAction.innerHTML = firstItem.textContent;
  headerAction.title = `Back to ${firstItem.textContent}`;
  header.classList.add('header');
  header.appendChild(headerAction.cloneNode(true));

  // create draws
  const nestedChildren = container.querySelectorAll('ul:not(:first-child)');

  [...nestedChildren].forEach((item, index) => {
    const draw = document.createElement('div');
    draw.classList.add('draw');
    draw.appendChild(header.cloneNode(true));
    draw.appendChild(item.cloneNode(true));

    if (index < nestedChildren.length) {
      draw.setAttribute('data-depth', index);
    }

    item.replaceWith(draw);
    // item.insertAdjacentElement('beforeend', draw);

    const drawAction = draw.previousElementSibling;
    drawAction.classList.add('next');
  });

  // for (let i = 0; i < nestedChildren.length; ++i) {

  //   let item = nestedChildren[i];

  //   const draw = document.createElement('div');
  //   draw.classList.add('draw');
  //   draw.appendChild(header.cloneNode(true));
  //   draw.appendChild(item.cloneNode(true));

  //   if (i < nestedChildren.length) {
  //     draw.setAttribute('data-depth', i);
  //   }

  //   item.replaceWith(draw);

  //   console.log('item', i);
  //   console.log(item);
  //   console.log(draw);

  //   const drawAction = draw.previousElementSibling;
  //   drawAction.classList.add('next');
  // }

  // back navigation event
  document.querySelector('body').addEventListener('click', (e) => {
    if (e.target.matches('.back')) {
      e.preventDefault();
      wrapper.style.left = '0px';
      container.classList.remove('open');
      container.style.removeProperty('height');
    }
  });

  // add click event
  const next = document.querySelectorAll('.next');
  next.forEach((item) => {
    console.log(item);
    item.addEventListener('click', clickHandler);
  });

  function clickHandler(e) {
    e.preventDefault();
    console.log(e);
    const depth = e.target.nextElementSibling.getAttribute('data-depth');
    console.log('depth', depth);
    wrapper.style.left = '-100%';
    container.classList.add('open');

    const anchors = container.querySelectorAll('.draw-wrapper .next');

    for (let n = 0; n < anchors.length; ++n) {
      if (anchors[n] !== this) {
        // console.log('ch anchors', anchors[n].textContent);
        anchors[n].nextElementSibling.style.display = 'none';
        anchors[n].classList.remove('active');
      }
    }

    console.log('target', e.target.nextElementSibling);

    e.target.nextElementSibling.style.display = 'block';
    this.classList.add('active');

    const drawHeight = e.target.nextElementSibling.offsetHeight;
    console.log('drawHeight', drawHeight);
    container.style.height = `${drawHeight}px`;
  }
}
