export function subnavMenu(container) {
  container.classList.add('subnav-container');
  const first = container.querySelectorAll('ul:first-of-type li');
  const wrapper = container.querySelector('ul:first-of-type');
  wrapper.classList.add('subnav-wrapper');

  // Create draws
  const nestedChildren = container.querySelectorAll('li > ul');

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

    // draw.firstChild.querySelector('li').classList.add('header');

    const drawAction = draw.previousElementSibling;
    drawAction.classList.add('next');
  });

  // create back navigation
  function createBackLinks(elem) {
    const text = elem.parentElement.parentElement.firstElementChild.textContent;
    const regex1 = /Overview/gi;
    const regex2 = /Overview -/gi;
    const regex3 = /- Overview/gi;
    const headerText = text.replaceAll(regex1, '').replaceAll(regex2, '').replaceAll(regex3, '');
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
  function setTabIndexes(clickedElem, direction) {
    let active;
    const activePage = container.querySelector('.active-page').parentElement.parentElement;

    if (clickedElem && direction === 'next') {
      active = clickedElem.parentElement.closest('ul');
    } else if (clickedElem && direction === 'back') {
      active = clickedElem.parentElement.closest('ul').parentElement.closest('ul');
    } else {
      active = activePage;
    }

    const lists = container.querySelectorAll('ul');
    let position = anchorPosition(active, [...lists]);

    function anchorPosition(elementToFind, array) {
      return array
        .map(function (el) {
          return el;
        })
        .indexOf(elementToFind);
    }

    [...lists].forEach((item) => {
      const descendants = Array.from(item.querySelectorAll('*'));
      const directDescendants = descendants.filter(
        (ele) => ele.parentElement === item
      );
      directDescendants.forEach((item) => {
        if (item.parentElement.parentElement.classList.contains('active')) {
          // console.log(item.querySelector('a'))
          item.querySelector('a').tabIndex = 0;
        } else {
          item.querySelector('a').tabIndex = -1;
        }
      });
    });
  }

  // setTabIndexes();

  // Add click event for back
  const back = document.querySelectorAll('.back');
  back.forEach((item) => {
    item.addEventListener('click', backHandler);
  });

  function backHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    const parent = e.target.closest('.draw');
    const grandParent = parent.closest('ul').closest('.draw');
    let drawHeight;
    const position = parent.dataset.depth
      ? parseInt(parent.dataset.depth) - 1
      : 0;

    parent.classList.remove('active');
    if (grandParent) {
      grandParent.classList.add('active');
      drawHeight = grandParent.offsetHeight;
      container.style.height = `${drawHeight}px`;
    } else {
      container.style.height = `auto`;
    }

    wrapper.style.left = `-${position}00%`;
    setTabIndexes(e.target, 'back');
  
    [...first].forEach((item) => {
      if (grandParent === null) {
        item.querySelector('a').tabIndex = 0;
      } else {
        item.querySelector('a').tabIndex = -1;
      }  
    })
  }

  // Add click event for next
  const next = document.querySelectorAll('.next');
  next.forEach((item) => {
    item.addEventListener('click', nextHandler);
  });

  function nextHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    const parent = e.target.nextElementSibling;
    const position = parseInt(parent.dataset.depth);
    const anchors = container.querySelectorAll('.subnav-wrapper .next');
    for (let n = 0; n < anchors.length; ++n) {
      if (anchors[n] !== this) {
        anchors[n].nextElementSibling.classList.remove('active');
      }
    }
    e.target.nextElementSibling.classList.add('active');

    const drawHeight = e.target.nextElementSibling.offsetHeight;
    container.style.height = `${drawHeight}px`;
    wrapper.style.left = `-${position}00%`;
    setTabIndexes(e.target, 'next');
  }

  // height fix 

    const activePage = document.querySelector('.active-page');

    if (activePage) {

    const activeDraw = activePage.closest('.draw.active');

    if (activeDraw) {
    const activePageDrawHeight = activeDraw.clientHeight;
    container.style.height = `${activePageDrawHeight}px`;  
    }

    }  


}



