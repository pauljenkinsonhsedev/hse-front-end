import { omit } from './omit.js';
import { generatePDF } from './generate-pdf.js';
import { getBase64ImageFromURL } from '../utils/base64image-from-url';

export function collate(data, action) {
    if (!data) {
        return;
    }

    const setDOM = async (data) => {
      // This function returns a html object in order to manipulate DOM.
      const htmlObject = document.createElement('div');
      htmlObject.innerHTML = data;

      // Uncomment below if pagebreaks ever required.
      // const headings = htmlObject.querySelectorAll('h1');
      // [...headings].forEach((heading, index) => {
      //   if (index != 0) {
      //     heading.classList.add('pdf-pagebreak-before');
      //   }
      // });

      return htmlObject;
    }

    const convertLinks = async (data) => {
      const links = data.querySelectorAll('a');
      [...links].map((link) => {
        const urlObj = new URL(link);
        const firstChar = link.getAttribute('href').substr(0, 1);
        if (urlObj.hostname === window.location.hostname && firstChar != '#') {
          link.href = `http://www.hse.gov.uk${link.pathname}`
        }
      });

      return data;
    }

    const linkList = async (data) => {
      const links = data.querySelectorAll('a');
      const list = document.createElement('div');
      const unorderedList = document.createElement('ol');  
      const listHeading = document.createElement('h2');
      const hr = document.createElement('hr');
      listHeading.textContent = 'Link URLs in this page';

      [...links].map((link, i) => {
        // start at 1
        i = i + 1;
        
        // add numbering to links
        const number = document.createElement('span');
        number.innerHTML = `<sup>[${i}]</sup>`;
        link.insertAdjacentElement('afterend',number);
        
        // create link list
        const listItem = document.createElement('li');
        listItem.innerHTML = link.href;
        unorderedList.insertAdjacentElement('beforeend',listItem);
      });

      list.insertAdjacentElement('beforeend',hr);
      list.insertAdjacentElement('beforeend',listHeading);
      list.insertAdjacentElement('beforeend',unorderedList);
      data.insertAdjacentElement('beforeend',list);

      return data;
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
          return setDOM(data);
        })
        .then((data) => {
          return convertLinks(data);
        })
        .then((data) => {
          console.log('links', data);
          return linkList(data);
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
