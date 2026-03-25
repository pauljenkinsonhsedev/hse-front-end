import load from "./utils/asset-loader";

// -------------------------------
// Remove Google CSE hash on page load
// -------------------------------
if (window.location.hash.includes("gsc.")) {
  history.replaceState(null, "", window.location.pathname + window.location.search);
}

export function googleSearch() {

  // -------------------------------
  // Map friendly refinement names to CSE label IDs
  // -------------------------------
  const refMap = {
    publications: "more:publications",
    research: "more:research",
    news: "more:news",
    products: "more:products"
  };

  // -------------------------------
  // Helper: parse query string and hash parameters
  // -------------------------------
  function getSearchParams() {
    const urlSearch = new URLSearchParams(window.location.search);
    const hash = window.location.hash.replace(/^#/, "");
    const hashParams = new URLSearchParams(hash);

    return {
      query: urlSearch.get("query") || hashParams.get("gsc.q") || "",
      ref: urlSearch.get("ref") || decodeURIComponent(hashParams.get("gsc.ref") || "")
    };
  }

  // -------------------------------
  // Execute search manually
  // -------------------------------
  function runSearch() {
    const { query, ref } = getSearchParams();
    const element = google.search.cse.element.getElement("searchresults");
    if (!element) return;

    const labelId = refMap[ref?.toLowerCase()];
    if (labelId) element.execute(query, labelId);
    else element.execute(query);

    const input = document.querySelector("input.gsc-input");
    if (input) input.value = query;
  }

  // -------------------------------
  // Hook refinement clicks
  // -------------------------------
  function hookRefinementClicks() {
    const container = document.querySelector(".gsc-refinements");
    if (!container) return;

    container.addEventListener("click", (event) => {
      const target = event.target.closest("a.gs-ref");
      if (!target) return;

      const refLabel = target.textContent.toLowerCase();
      const url = new URL(window.location);
      const { query } = getSearchParams();

      if (query) url.searchParams.set("query", query);

      if (refLabel === "all results") {
        url.searchParams.delete("ref");
      } else {
        url.searchParams.set("ref", refLabel);
      }

      history.replaceState(null, "", url);
      runSearch();
    });
  }

  // -------------------------------
  // Hook search box input
  // -------------------------------
  function hookSearchBoxInput() {
    const input = document.querySelector("input.gsc-input");
    if (!input) return;

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const url = new URL(window.location);
        url.searchParams.set("query", input.value);
        const { ref } = getSearchParams();
        if (ref) url.searchParams.set("ref", ref);

        history.replaceState(null, "", url);
        runSearch();
      }
    });

    const searchButton = document.querySelector(".gsc-search-button");
    if (searchButton) {
      searchButton.addEventListener("click", () => {
        const url = new URL(window.location);
        url.searchParams.set("query", input.value);
        const { ref } = getSearchParams();
        if (ref) url.searchParams.set("ref", ref);

        history.replaceState(null, "", url);
        runSearch();
      });
    }
  }

  // -------------------------------
  // Watch for CSE hash changes
  // -------------------------------
  window.addEventListener("hashchange", () => {
    runSearch();
  });

  // -------------------------------
  // Loading state
  // -------------------------------
  const resultsContainer = document.querySelector(".gcse-searchresults-only");
  if (resultsContainer) {
    const loading = document.createElement("div");
    loading.id = "search-loading";
    loading.innerHTML = "<p>Searching HSE website…</p>";
    resultsContainer.prepend(loading);
  }

  // -------------------------------
  // Configure Google CSE
  // -------------------------------
  window.__gcse = {
    callback: function () {
      if (window.google && google.search && google.search.cse) {
        google.search.cse.element.render({
          div: "searchresults",
          tag: "searchresults-only"
        });
      }

      runSearch();
      hookRefinementClicks();
      hookSearchBoxInput();

      const loading = document.getElementById("search-loading");
      if (loading) loading.remove();
    }
  };

  // -------------------------------
  // Load Google CSE asynchronously
  // -------------------------------
  const script = "https://cse.google.com/cse.js?cx=015848178315289032903:hqkynptgd1o";

  load.jsAsync(script)
    .then(() => {
      setTimeout(() => {
        const input = document.querySelector("input.gsc-input");
        if (input) {
          input.removeAttribute("placeholder");
          input.removeAttribute("style");
        }

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
    .catch((err) => console.error(err));
}