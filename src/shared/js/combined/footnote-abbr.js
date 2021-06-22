export function footnoteAbbr ()  {
  const container = document.getElementById('contentContainer');
  const accronym = container.querySelectorAll('accronym, abbr');

  let listItems = [];

  // build definition list items
  accronym.forEach((item) => {
    listItems += `<dt>${item.innerText}</dt><dd>${item.title}</dd>
    `;
  });

  const html = `
    <h2 class="hideFromScreen footnotes">Glossary of abbreviations/acronyms on this page</h2>
    <dl class="hideFromScreen">
        ${listItems}
    </dl>`;

  if (listItems.length > 0) {
    container.insertAdjacentHTML('beforeend', html);
  }
}
