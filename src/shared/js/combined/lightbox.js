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

    // select prev
    function previous() {
        let prev;
        const panel = document.querySelectorAll('.lightbox__content--panel');
        const length = panel.length;
        const selected = [...panel].filter(element => element.classList.contains('active'));
        const pos = parseInt(selected[0].dataset.pos);

        if (pos === 0) {
            prev = length -1;
        } else {
            prev = pos -1;
        }

        displayPanel(pos, prev);
    }

    // select next
    function next() {
        let next;
        const panel = document.querySelectorAll('.lightbox__content--panel');
        const length = panel.length;
        const selected = [...panel].filter(element => element.classList.contains('active'));
        const pos = parseInt(selected[0].dataset.pos);

        if (pos === (length -1)) {
            next = 0;
        } else {
            next = pos + 1;
        }

        displayPanel(pos, next);
    }

    // lightbox handle event
    lightboxHandle.forEach(function (target, index) {
        target.addEventListener('click', function(e) {
            e.preventDefault();
            const html = buildLightbox(index);

            new Modal(html, modalOptions);
        });
    });

    // prev next events
    customEventListener('.lighbox__prev', 'click', previous);
    customEventListener('.lighbox__next', 'click', next);

    // select panel to display
    function displayPanel(pos, index) {
        const panel = document.querySelectorAll('.lightbox__content--panel');

        panel[pos].classList.remove('active');
        panel[index].classList.add('active');
    }

    // build collections
    function buildLightbox(active) {
        const mediaquery = mediaQuery();
        let content = ``;
        let caption = ``;
        lightboxArray.forEach(function(elem, index) {

            const image = elem.querySelector('img');
            const newImage = document.createElement('img');
            let activeClass = ''
            newImage.src = image.src;
            newImage.alt = image.alt;
            caption = elem.title;

            const width = image.naturalWidth;

            if (mediaquery !== 'small') {
                elem.style.width = width + 'px';
            }

            if (active === index) {
                activeClass = 'active'
            }

            content = content + `<div class="lightbox__content--panel ${activeClass}" data-pos="${index}" data-caption="${image.alt}">${newImage.outerHTML}<div class="lighbox__caption"><p>${caption}</p></div></div>`;
        });

        return `
        <div class="lightbox__container">
            <div class="lightbox__content">
            ${content}
            </div>
            <div class="lighbox__footer">
                <button class="lighbox__prev">
                    <span>Prev</span>
                </button>
                <button class="lighbox__next">
                    <span>Next</span>
                </button>
            </div>
        </div>
        `
    }
}