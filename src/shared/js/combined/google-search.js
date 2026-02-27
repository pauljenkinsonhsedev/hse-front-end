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

}, 200);
    })
    .catch((err) => {
      console.error(err);
    });
}