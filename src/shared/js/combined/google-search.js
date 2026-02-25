import load from "./utils/asset-loader";

export function googleSearch() {
  let script =
    "https://cse.google.com/cse.js?cx=015848178315289032903:hqkynptgd1o";

  let promises = [];
  promises.push(load.jsAsync(script));

  Promise.all(promises)
    .then(() => {
      // Give CSE a little time to render the input
    setTimeout(() => {

  function cleanSearchInput() {
    const input = document.querySelector("input.gsc-input");
    if (input) {
      input.removeAttribute("placeholder");
      input.removeAttribute("style");
    }
  }

  // Run immediately
  cleanSearchInput();

  // Run again in case CSE redraws
  setTimeout(cleanSearchInput, 500);

  // Table cleanup (this only needs to run once)
  const searchTable = document.querySelector("table.gsc-search-box");
  const searchTable2 = document.querySelector("table.gsc-input");
  const searchTable3 = document.querySelector("table.gssb_c");

  searchTable?.removeAttribute("cellpadding");
  searchTable?.removeAttribute("cellspacing");
  searchTable2?.removeAttribute("cellpadding");
  searchTable2?.removeAttribute("cellspacing");
  searchTable3?.removeAttribute("cellpadding");
  searchTable3?.removeAttribute("cellspacing");

  appendSearchIcon();

}, 200);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Function to append the search icon to the input
function appendSearchIcon() {
  const input = document.querySelector('.gsc-input');
  if (!input) return;
  if (document.querySelector('.search-icon-end')) return;

  // Wrap input in a relative container if not already
  const container = input.parentNode;
  container.style.position = 'relative';

  container.appendChild(btn);
}

// Observe when the search box loads dynamically
const observer = new MutationObserver(() => {
  if (document.querySelector('.gsc-input')) {
    appendSearchIcon();
    observer.disconnect();
  }
});
observer.observe(document.body, { childList: true, subtree: true });

