export function footnoteLinks ()  {
    const container = document.getElementById('pageContainer');
    const links = document.querySelectorAll(
      "#contentContainer a:not([href^='javascript:']):not([href^='mailto:']):not(:empty):not([href^='#'])"
    );

    let listItems = [];
    let count = 0;

    links.forEach((item)=>{
        count++;

        // build list items
        listItems += `<li class="hse-footnotes__list-item"><span class="hse-footnotes__list-item-title">${item.text}</span><span class="hse-footnotes__list-item-url">${item.href}</span></li>
        `;

        // add counter to each link
        item.insertAdjacentHTML(
          'afterend',
          '<sup class="hideFromScreen">[' + count + ']</sup>'
        );

    });

    const html = `
    <div class="hse-footnotes">
    <h2 class="hideFromScreen footnotes">Link URLs in this page</h2>
    <ol class="hse-footnotes__list hideFromScreen">
        ${listItems}
    </ol>
    </div>`;

    if (listItems.length > 0) {
      container.insertAdjacentHTML('beforeend', html);
    }
}
