import Modal from './modal';
import { customEventListener } from './utils/add-custom-event-listener.js';
import { mediaQuery } from './utils/media-query.js';

export function lightbox() {
    const lightboxHandle = document.querySelectorAll('.lightbox');
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
        const related = [...lightboxHandle].filter(element => element.rel === 'asbestos-gallery');
        const length = related.length;
        const pos = parseInt(lightbox.dataset.pos);
        const target = e.target;

        if (target.classList.contains('prev') || e.key === 'ArrowLeft') {
            if (pos === 0) {
                goTo = length -1;
            } else {
                goTo = pos -1;
            }
        }

        if (target.classList.contains('next') || e.key === 'ArrowRight') {
            if (pos === (length -1)) {
                goTo = 0;
            } else {
                goTo = pos + 1;
            }
        }

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

    // arrow key events
    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 39 || e.keyCode === 37) {
            navigation(e);
        }
    }, false);

    // build collections
    function buildLightbox(pos) {
        const newImage = document.createElement('img');
        const source = document.querySelectorAll('.lightbox')[pos];
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

        // const containerElement = document.createElement('div');
        // containerElement.className = '.lightbox__container';
        const html = `
        <div class=".lightbox__container">
            <div class="lightbox__content" style="max-width: ${width}; max-height: ${height};">
                <div class="lightbox__content--panel" data-pos="${pos}" data-caption="${caption}">${newImage.outerHTML}</div>
            </div>
            <div class="lightbox__footer">
                <button class="lightbox__nav prev" title="previous"></button>
                <div class="lightbox__caption">${caption}</div>
                <button class="lightbox__nav next" title="next"></button>
            </div>
        </div>
        `;

        // containerElement.innerHTML = html;
        // const modal = document.querySelector('.modal__container');

        // const image = () => Promise.resolve(sourceUrl);
        // async function imageLoaded(){
        //     const res = await image();
        //     console.log(res);
        //     modal.classList.add('loaded');
        // }

        // imageLoaded();

        return html;
    }
}