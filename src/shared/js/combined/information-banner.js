
export function informationBanner() {
    const container = document.getElementById('information-banner');

    if (!container) {
      return;
    }

    const inner = container.querySelector('.hse-information-banner__inner');
    const content = container.dataset.content;

 

    if (content) {

      const firstPath = window.location.pathname.split('/')[1]; 
      const secondPath = window.location.pathname.split('/')[2]; 
      const thirdPath = window.location.pathname.split('/')[3];

      //console.log(firstPath);
      //console.log(secondPath);
      //console.log(thirdPath);
  
      if (firstPath === 'website') {

        fetch(`/${firstPath}/${secondPath}/${thirdPath}/assets/ajax/${content}`)
        .then((response) => response.json())
        .then((data) => {
          inner.innerHTML = data.message;
          container.setAttribute('aria-label', data.ariaLabel);
        })
        .catch(() => {
          console.error(`No such file: ${content}`);
        });

        }
        else {

        fetch(`/assets/ajax/${content}`)
        .then((response) => response.json())
        .then((data) => {
          inner.innerHTML = data.message;
          container.setAttribute('aria-label', data.ariaLabel);
        })
        .catch(() => {
          console.error(`No such file: ${content}`);
        });
        }
      
         
    } else {
      return;
    }
}
