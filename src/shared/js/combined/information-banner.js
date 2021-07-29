
export function informationBanner() {
    const container = document.getElementById('information-banner');

    if (!container) {
      return;
    }

    const inner = container.querySelector('.information-banner__inner');
    const content = container.dataset.content;

    if (content) {
        fetch(`/assets/ajax/${content}`)
          .then((response) => response.json())
          .then((data) => {
            inner.innerHTML = data.message;
            container.setAttribute('aria-label', data.ariaLabel);
          })
          .catch(() => {
            console.error(`No such file: ${content}`);
          });
    } else {
      return;
    }
}
