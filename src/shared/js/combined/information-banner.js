
export function informationBanner() {
    const container = document.getElementById('information-banner');
    const inner = container.querySelector('.information-banner__inner');

    if (!container) {
      return;
    }

    const content = container.dataset.content;

    if (content) {
        fetch(`/ajax/${content}`)
          .then((response) => response.json())
          .then((data) => {
            const active = data.active;
            const message = data.message;
            inner.innerHTML = message;
          })
          .catch(() => {
              console.error(`No such file: ${content}`);
          });
    } else {
      return;
    }
}