export function drawMenu(container) {
  container.classList.add('draw-container');
  const wrapper = container.querySelector('ul:first-of-type');
  wrapper.classList.add('draw-wrapper');

  // Create draws
  const nestedChildren = container.querySelectorAll('ul:not(:first-child)');
  [...nestedChildren].reverse().forEach((item) => {
    // insert header
    const header = createBackLinks(item);
    item.insertAdjacentElement('afterbegin', header);

    // create draw
    const draw = document.createElement('div');

    draw.classList.add('draw');
    draw.appendChild(item.cloneNode(true));

    // replace item with draw
    item.replaceWith(draw);

    draw.firstChild.querySelector('li').classList.add('header');

    const drawAction = draw.previousElementSibling;
    drawAction.classList.add('next');
  });

  // create back navigation
  function createBackLinks(elem) {
    const text = elem.parentElement.firstElementChild.textContent;
    const regex = /Overview -/gi;
    const headerText = text.replaceAll(regex, '');
    const headerItem = document.createElement('li');
    const headerAction = document.createElement('a');
    headerAction.href = '#';
    headerAction.classList.add('back');
    headerAction.innerHTML = headerText;
    headerAction.title = `Back to ${headerText}`;
    headerItem.classList.add('header');
    headerItem.appendChild(headerAction.cloneNode(true));

    return headerItem;
  }

  // set depths for draws
  const lists = container.querySelectorAll('.draw');
  [...lists].forEach((item) => {
    item.dataset.depth = `${depthArray(item, 'draw')}`;
  });

  // get depth array
  function depthArray(node, selector) {
    let current = node;
    let list = [];
    while (
      current.parentNode != null &&
      current.parentNode != document.documentElement
    ) {
      if (current.classList.contains(selector)) {
        list.push(current.parentNode);
      }
      current = current.parentNode;
    }
    return list.length;
  }

  // set current item and tab indexes
  // when a user lands on a page this will select the active page
  const urlStringPath = window.location.pathname.substring(
    window.location.pathname.lastIndexOf('/') + 1
  );
  const navItems = container.querySelectorAll('a');
  [...navItems].forEach((item) => {
    let activePage;
    const link = item.getAttribute('href');
    let position = Number;
    if (link === urlStringPath) {
      const draw = item.closest('.draw');
      if (draw) {
        draw.classList.add('active');
        position = parseInt(draw.dataset.depth);
      } else {
        position = 0;
      }
      activePage = item.classList.add('active-page');
      item.setAttribute('aria-current', 'page');
      wrapper.style.left = `-${position}00%`;
    }
  });

  // set tab indexes
  function setTabIndexes() {
    const anchors = container.querySelectorAll('a');
    [...anchors].forEach((item) => {
      const parent = item.closest('.draw');

      console.log(parent);
      item.tabIndex = 0;

      if (parent && parent.classList.contains('active')) {
        item.tabIndex = 0;
        console.log('has it');
      } else if (parent) {
        item.tabIndex = -1;
        console.log('not it');
      }

    });
  }

  // Add click event for back
  const back = document.querySelectorAll('.back');
  back.forEach((item) => {
    item.addEventListener('click', backHandler);
  });

  function backHandler(e) {
    e.preventDefault();
    let drawHeight;
    const parent = e.target.closest('.draw');
    const grandParent = parent.closest('ul').closest('.draw');
    const position = parent.dataset.depth
      ? parseInt(parent.dataset.depth) - 1
      : 0;

    parent.classList.remove('active');
    if (grandParent) {
      grandParent.classList.add('active');
      container.style.height = `${drawHeight}px`;
    } else {
      container.style.height = `auto`;
    }
    wrapper.style.left = `-${position}00%`;
    setTabIndexes();
  }

  // Add click event for next
  const next = document.querySelectorAll('.next');
  next.forEach((item) => {
    item.addEventListener('click', nextHandler);
  });

  function nextHandler(e) {
    e.preventDefault();
    const parent = e.target.nextElementSibling;
    const position = parseInt(parent.dataset.depth);
    const anchors = container.querySelectorAll('.draw-wrapper .next');
    for (let n = 0; n < anchors.length; ++n) {
      if (anchors[n] !== this) {
        anchors[n].nextElementSibling.classList.remove('active');
      }
    }
    e.target.nextElementSibling.classList.add('active');

    const drawHeight = e.target.nextElementSibling.offsetHeight;
    container.style.height = `${drawHeight}px`;
    wrapper.style.left = `-${position}00%`;
    setTabIndexes();
  }
}