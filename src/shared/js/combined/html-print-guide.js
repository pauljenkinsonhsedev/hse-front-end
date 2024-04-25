import { footnoteLinks } from "./footnote-links.js";
import { footnoteAbbr } from "./footnote-abbr.js";
import pathEnv from "./utils/asset-env-path";

export function htmlPrintGuide() {
  // Get print guide JSON file name from dataset
  const CTAPrintGuide = document.querySelector(".html-print-guide");
  const printGuideName = CTAPrintGuide.dataset.printGuide;

  // Get JSON and return data
  const guidePages = fetch(`${pathEnv}/print-guides/${printGuideName}`)
    .then((response) => response.json())
    .then((guide) => {
      return guide.pages;
    })
    .catch((error) =>
      CTAPrintGuide.insertAdjacentHTML(
        "afterend",
        `<p>Print guide unavailable (Valid JSON required) - <a href="./index.htm">guide overview</a></p>`
      )
    );

  const guideMeta = fetch(`${pathEnv}/print-guides/${printGuideName}`)
    .then((response) => response.json())
    .then((meta) => {
      const h1 = meta.metadata.title;
      const metaContent = document.querySelector("#pageContainer");

      const h1Tag = document.createElement("h1");
      const pTag = document.createElement("p");
      const printButton = document.createElement("button");

      // Add classes
      printButton.classList.add("btn", "display-none-print", "btn-print");
      pTag.classList.add("lead-paragraph", "display-none-print");

      // Prepend meta content
      h1Tag.textContent = "" + h1;
      pTag.textContent = "Printable version";
      printButton.textContent = "Print this page";

      metaContent.prepend(printButton);
      metaContent.prepend(pTag);
      metaContent.prepend(h1Tag);
      metaContent.classList.add('hse-print-guide-page');

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

    // Get the content from the page contents ID
    let content = doc.querySelector("#page-contents");

    // Assemble

    const printContent = document.querySelector("#pageContainer");

    if (content != null) {
      printContent.append(content);
    } else {
      console.log(
        "One or more of your page URLs retured null, check the JSON file"
      );
    }

    const pagination = document.querySelector("#pagination");
    const surveybox = document.querySelector(".box.backgroundRed");
    const printableVersion = document.querySelector(".printable-version");
    const calloutSurvey = document.querySelector(".callout.callout--survey");
    const backToTop = document.querySelector(".hse-back-to-top");

    // Remove clutter
    if (pagination) {
      pagination.remove();
    }
    if (calloutSurvey) {
      calloutSurvey.remove();
    }
    if (surveybox) {
      surveybox.remove();
    }
    if (printableVersion) {
      printableVersion.remove();
    }
    if (backToTop) {
      backToTop.remove();
    }
  };

  const fetchPages = async () => {
    var pageURL = await guidePages;

    for (const url of pageURL) {
      await getGuidePages(url);
    }
  };

  fetchPages().catch((err) =>
    console.log(
      "Cannot fetch all pages, check pages exist in JSON file and have correct file names, with .htm extension included"
    )
  );

  // When page has loaded, rename <article> ids for accessibility

  window.onload = function (event) {
    var articleElements = document.querySelectorAll("#page-contents");

    // Set their ids
    for (var i = 0; i < articleElements.length; i++)
      articleElements[i].id = "guide-section-" + i;
      footnoteLinks();
      footnoteAbbr();
  };

}
