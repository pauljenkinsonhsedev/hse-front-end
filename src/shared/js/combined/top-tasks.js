export function topTasks() {
  const multiStep = document.querySelectorAll("ol.multistep a");

  if (multiStep.length <= 0) {
    return;
  }

  const path = window.location.pathname;
  const pathAnchor = window.location.pathname + "#article";

  const url = path ? path.split(/[\\\/]/).pop() : "index.htm";
  const urlAnchor = pathAnchor ? pathAnchor.split(/[\\\/]/).pop() : "index.htm";

  multiStep.forEach((step) => {
    const parent = step.closest("li");

    const href = step.href.split(/[\\\/]/).pop();

    if (href === url || href === urlAnchor) {
      if (!parent.classList.contains("step-detail")) {
        parent.innerHTML = step.textContent;
        console.log("no detail");
      }
    }
  });
}
