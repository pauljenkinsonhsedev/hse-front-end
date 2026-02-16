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
        // --- Existing placeholder & label logic ---
        const searchInput = document.querySelector("input.gsc-input");
        const searchTable = document.querySelector("table.gsc-search-box");
        const searchTable2 = document.querySelector("table.gsc-input");
        const searchTable3 = document.querySelector("table.gssb_c");

        if (searchInput) {
          const searchLabel = document.createElement("label");
          searchLabel.innerHTML = "Search hse.gov.uk";
          searchLabel.classList.add("hide");
          searchLabel.setAttribute("for", "gsc-i-id1");

          searchInput.removeAttribute("style");
          searchInput.insertAdjacentElement("beforebegin", searchLabel);
          searchInput.setAttribute("placeholder", "Search hse.gov.uk");

          searchTable?.removeAttribute("cellpadding");
          searchTable?.removeAttribute("cellspacing");
          searchTable2?.removeAttribute("cellpadding");
          searchTable2?.removeAttribute("cellspacing");
          searchTable3?.removeAttribute("cellpadding");
          searchTable3?.removeAttribute("cellspacing");
        }

        // --- New: Append search icon ---
        appendSearchIcon();
      }, 200); // slightly longer to ensure rendering
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

  const btn = document.createElement('button');
  btn.className = 'search-icon-end';
  btn.type = 'submit';
  btn.style.position = 'absolute';
  btn.style.right = '5px';
  btn.style.top = '50%';
  btn.style.transform = 'translateY(-50%)';
  btn.style.border = 'none';
  btn.style.background = 'transparent';
  btn.style.cursor = 'pointer';
  btn.style.padding = '0';
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#333" d="M21.71 20.29l-3.388-3.388A7.936 7.936 0 0016 9a8 8 0 10-8 8 7.936 7.936 0 007.902-5.318l3.388 3.388a1 1 0 001.42-1.42zM10 16a6 6 0 116-6 6 6 0 01-6 6z"/>
    </svg>
  `;

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

