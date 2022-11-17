import { footnoteLinks } from "./footnote-links.js";

export function htmlPrintGuide() {
  // Get print guide JSON file name from dataset
  const CTAPrintGuide = document.querySelector(".html-print-guide");
  const printGuideName = CTAPrintGuide.dataset.printGuide;

  // Get JSON and return data
  const guidePages = fetch(`/print-guides/${printGuideName}`)
    .then((response) => response.json())
    .then((guide) => {
      return guide.pages;
    });

  const guideMeta = fetch(`/print-guides/${printGuideName}`)
    .then((response) => response.json())
    .then((meta) => {
      var h1 = meta.metadata.title;
      console.log(h1);

      const metaContent = document.querySelector("#contentContainer");

      let h1Tag = document.createElement("h1");
      let pTag = document.createElement("p");
      let printButton = document.createElement("button");

      // Add classes
      printButton.classList.add("btn", "btn-primary", "display-none-print");
      pTag.classList.add("lead-paragraph", "display-none-print");

      // Prepend meta content
      h1Tag.textContent = "" + h1;
      pTag.textContent = "Printable version";
      printButton.textContent = "Print this page";

      metaContent.prepend(printButton);
      metaContent.prepend(pTag);
      metaContent.prepend(h1Tag);

      document.title = "Print: " + h1;

      printButton.addEventListener("click", (e) => {
        print();
      });
    });

  const getGuidePages = async (url) => {
    const res = await fetch(url);
    const data = await res.text();

    // Convert the HTML string into a document object
    var parser = new DOMParser();
    var doc = parser.parseFromString(data, "text/html");

    // Get the content from the article tag
    var content = doc.querySelector("#article");

    // Assemble

    const printContent = document.querySelector("#contentContainer");

    printContent.append(content);

    var pagination = document.querySelector("#pagination");
    var surveybox = document.querySelector(".box.backgroundRed");

    // Remove clutter
    pagination.remove();
    surveybox.remove();
  };

  const fetchPages = async () => {
    var pageURL = await guidePages;

    for (const url of pageURL) {
      await getGuidePages(url);
    }
  };

  fetchPages();

  // When page has loaded, rename <article> ids for accessibility

  window.onload = function (event) {
    var articleElements = document.querySelectorAll("#article");
    console.log(articleElements);

    // Set their ids
    for (var i = 0; i < articleElements.length; i++)
      articleElements[i].id = "guide-section-" + i;

    footnoteLinks();
  };
}
