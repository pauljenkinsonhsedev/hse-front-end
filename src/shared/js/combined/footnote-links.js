export function footnoteLinks ()  {
    const container = document.getElementById('contentContainer');
    const links = document.querySelectorAll(
      "#contentContainer a:not([href^='javascript:']):not([href^='mailto:']):not(:empty):not([href^='#'])"
    );

    let listItems = [];
    let count = 0;

    links.forEach((item)=>{
        count++;

        // build list items
        listItems += `<li>${item.text}<br>${item.href}</li>
        `;

        // add counter to each link
        item.insertAdjacentHTML(
          'afterend',
          '<sup class="hideFromScreen">[' + count + ']</sup>'
        );

    });

    const html = `
    <h2 class="hideFromScreen footnotes">Link URLs in this page</h2>
    <ol class="hideFromScreen">
        ${listItems}
    </ol>`;

    if (listItems.length > 0) {
      container.insertAdjacentHTML('beforeend', html);
    }
}
