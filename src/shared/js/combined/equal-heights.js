function setHeight(el, val) {
  if (typeof val === 'function') val = val();
  if (typeof val === 'string') el.style.height = val;
  else el.style.height = val + 'px';
}

const equalise = function (container) {
  let currentTallest = 0;
  let currentRowStart = 0;
  const rowDivs = new Array();
  let topPostion;
  let currentDiv;

  Array.from(document.querySelectorAll(container)).forEach((el, i) => {
    el.style.height = 'auto';
    topPostion = el.offsetTop;
    if (currentRowStart != topPostion) {
      for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
        setHeight(rowDivs[currentDiv], currentTallest);
      }
      rowDivs.length = 0;
      currentRowStart = topPostion;
      currentTallest = parseFloat(
        getComputedStyle(el, null).height.replace('px', '')
      );
      rowDivs.push(el);
    } else {
      rowDivs.push(el);
      currentTallest =
        currentTallest <
        parseFloat(getComputedStyle(el, null).height.replace('px', ''))
          ? parseFloat(getComputedStyle(el, null).height.replace('px', ''))
          : currentTallest;
    }
    for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
      setHeight(rowDivs[currentDiv], currentTallest);
    }
  });
};

export function equalHeights() {
  const blocks = document.querySelectorAll("[class*='equalHeight']");
  let list = [];

  // build 'list' array of classnames with equalheights
  blocks.forEach((item) => {
    const classes = item.classList;
    classes.forEach((item) => {
      if (item.match('equalHeight')) {
        if (list.indexOf(item) === -1) list.push(item);
      }
    });
  });

  // Apply equal heights to selectors in the 'list' array
  list.forEach((item) => {
    const classname = `.${item}`;

    // Initiate equal heights
    equalise(classname);

    // Watch for changes
    window.addEventListener('resize', function () {
      setTimeout(function () {
        equalise(classname);
      });
    });
  });
}
