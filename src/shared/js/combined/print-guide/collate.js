import { omit } from './omit.js';
import { generatePDF } from './generate-pdf.js';
import { getBase64ImageFromURL } from '../utils/base64image-from-url';

export function collate(data, action) {
    if (!data) {
        return;
    }

    const insertPageBreaks = async (data) => {
      const htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;
      const headings = htmlObject.querySelectorAll('h1');
      [...headings].forEach((heading, index) => {
        if (index != 0) {
          heading.classList.add('pdf-pagebreak-before');
        }
      });

      return htmlObject;
    }

    const convertImages = async (data) => {
      const images = data.querySelectorAll('img');

      const b64Arry = await Promise.all(
        [...images].map((image) => getBase64ImageFromURL(image.src)))
        .then((converted) => {
          return converted;
        })
        .catch((error) => {
          console.error(error);
        });

        // replace images
        [...images].forEach((item, index) => {
          const imgsrc = item.getAttributeNode('src');
          imgsrc.nodeValue = b64Arry[index];
        });

        return data;
    }

    // retrieve pages
    const getPages = async (url) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'document';

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  const html =
                    xhr.responseXML.getElementById('contentContainer');
                  // const parser = new DOMParser();
                  // const parsedHtml = parser.parseFromString(
                  //   html.innerHTML,
                  //   'text/html'
                  // );

                  // remove non-required ids
                  [...omit].forEach((item) => {
                    const removeItem = html.querySelector(`#${item}`);
                    if (removeItem) {
                      removeItem.parentNode.removeChild(removeItem);
                    }
                  }); 

                  resolve(html);
                }
            };
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    };

    // collate pages
    const json = data;
    const collatePages = async () => {
      const response = await fetch(`/print-guides/${json}`);
      const data = await response.json();
      const pages = data.pages;
      const metadata = data.metadata;

      await Promise.all(pages.map((page) => getPages(page)))
        .then((data) => {

          return data.map(function (page) {
              const pageURL = `<p>${page.baseURI}</p>`;
              page.querySelector('h1').insertAdjacentHTML('afterend',pageURL);
              let html = page.innerHTML;
              return html;
            }).join('');
        })
        .then((data) => {
          return insertPageBreaks(data);
        })
        .then((data) => {
          return convertImages(data);
        })
        .then((data) => {
            const html = data.innerHTML;
            generatePDF(html, metadata, action);
        })
        .catch((error) => {
          console.error('Error: ', error);
        });
    };

    return collatePages();
}
