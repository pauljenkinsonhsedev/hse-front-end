import Modal from './modal';
import { customEventListener } from './utils/add-custom-event-listener.js';
import { mediaQuery } from './utils/media-query.js';

export function lightbox() {
    const lightboxHandle = document.querySelectorAll('.lightbox li a');
    const lightboxArray = [...lightboxHandle];
    const modalOptions = {
        size: 'default',
        transition: true,
        // overlay: true
    }

    // navigation
    function navigation (e) {
        let goTo = Number;
        const lightbox = document.querySelector('.lightbox__content--panel');
        const lightboxes = document.querySelectorAll('.lightbox__content--panel');
        const selected = [...lightboxes].filter(element => element.classList.contains('active'));
        const related = [...lightboxHandle].filter(element => element.rel === 'asbestos-gallery');
        const length = related.length;
        const pos = parseInt(lightbox.dataset.pos);

        const target = e.target;

        if (target.classList.contains('prev')) {
            if (pos === 0) {
                console.log('current', pos);
                goTo = length -1;
            } else {
                goTo = pos -1;
            }
        }

        if (target.classList.contains('next')) {
            if (pos === (length -1)) {
                console.log('current', pos);
                goTo = 0;
            } else {
                goTo = pos + 1;
            }
        }

        // console.log('selected', selected);
        // console.log('related', related);
        // console.log('related length', length);
        console.log('goTo', goTo);

        console.log('navigate');

        const html = buildLightbox(goTo);
        const modalContent = document.querySelector('.modal__content');
        modalContent.innerHTML = html;
    }

    // lightbox handle event
    lightboxHandle.forEach(function (target, index) {
        const rel = target.rel;
        target.addEventListener('click', function(e) {
            e.preventDefault();
            const html = buildLightbox(index, rel);
            new Modal(html, modalOptions);
        });
    });

    // prev next events
    customEventListener('.lightbox__nav', 'click', navigation);

    // window.addEventListener('keydown', (e) => {
    //     if (e.keyCode === 39 || e.keyCode === 37) {
    //     console.log('nav');
    //         navigation();
    //     }
    // }, false);

    // build collections
    function buildLightbox(pos) {
        const newImage = document.createElement('img');
        const source = document.querySelectorAll('.lightbox a')[pos];
        const sourceUrl = source.href;
        const caption = source.title;
        newImage.src = source.href;
        newImage.alt = source.title;
        let width = newImage.naturalWidth;
        let height = newImage.naturalHeight;

        if (width === 0) {
            width = `100%`;
        } else {
            width = `${width}px`;
        }

        if (height === 0) {
            height = `100%`;
        } else {
            height = `${height}px`;
        }

        // const headers = new Headers({'Access-Control-Allow-Origin': 'https://via.placeholder.com'});
        // const imagePromise = fetch(sourceUrl, {
        //     method: 'GET',
        //     referrerPolicy: 'no-referrer',
        //     headers: headers,
        //     credentials: 'include',
        //     mode: 'cors',
        //     cache: 'reload'
        // });

        // Promise
        // .all([imagePromise])
        // .then(responses => {
        //     console.log('imagePromise',responses);
        // })
        // .catch(error => {
        //     console.error(error);
        // });

        return `
        <div class="lightbox__container">
            <div class="lightbox__content" style="width: ${width}; height: ${height};">
                <div class="lightbox__content--panel" data-pos="${pos}" data-caption="${caption}">${newImage.outerHTML}</div>
            </div>
            <div class="lightbox__footer">
                <button class="lightbox__nav prev" title="previous"></button>
                <div class="lightbox__caption">${caption}</div>
                <button class="lightbox__nav next" title="next"></button>
            </div>
        </div>
        `;
    }
}