import Modal from './utils/modal';
import { customEventListener } from './utils/add-custom-event-listener.js';

export function lightbox() {

    const lightboxHandle = document.querySelectorAll('.lightbox');
    const modalOptions = {
        size: 'default',
        transition: true,
        // overlay: true
    }

    // navigation
    function navigation (e) {
        let goTo = Number;
        const lightboxes = document.querySelectorAll('.lightbox__content--panel');
        const length = lightboxes.length;
        const current = document.querySelector("[data-status='active']");
        const pos = parseInt(current.dataset.pos);
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

        // set active
        delete current.dataset.status;
        lightboxes[goTo].dataset.status = 'active';

        // reset caption
        document.querySelector('.lightbox__caption').innerHTML = lightboxes[goTo].dataset.caption;
    }

    // lightbox handle event
    lightboxHandle.forEach(function (target, index) {
        const rel = target.rel;

        target.addEventListener('click', function(e) {
            e.preventDefault();
            const html = buildLightbox(rel, index);
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
    function buildLightbox(rel, index) {
        const images = document.querySelectorAll('.lightbox');
        const lighboxArray = new Array;
        // filter by 'rel' attribute
        const results = [...images].filter(function(item) {
            return item.rel === rel;
        });
        const length = results.length -1;

        // get the correct postion within the array
        let position = 0;
        if (index >= length) {
            position = index - length;
        } else {
            position = index;
        }

        // build a collection from related images
        results.forEach((target, index) => {
            const img = document.createElement('img');
            img.src = target.href;
            img.alt = target.title;

            const caption = target.title;
            const element = document.createElement('div');
            element.className = 'lightbox__content--panel';
            element.dataset.pos = index;
            element.dataset.caption = caption;
            element.innerHTML = img.outerHTML;
            if (index === position) {
                element.dataset.status = 'active';
            }
            lighboxArray.push(element);
        });

        const containerElement = document.createElement('div');
        const contentElement = document.createElement('div');
        containerElement.className = 'lightbox__container';
        contentElement.className = 'lightbox__content';

        // build image set
        for (let image of lighboxArray) {
            contentElement.append(image);
        }
        // append to container
        containerElement.append(contentElement);

        // build footer
        const footerElement = document.createElement('div');
        const footerPrev = document.createElement('button');
        const footerNext = document.createElement('button');
        const footerCaption = document.createElement('div');
        const caption = [...lighboxArray].filter((elem) => { return elem.dataset.status === 'active' });
        footerElement.className = 'lightbox__footer';
        footerPrev.className = 'lightbox__nav prev';
        footerNext.className = 'lightbox__nav next';
        footerCaption.className = 'lightbox__caption';
        footerCaption.innerHTML = caption[0].dataset.caption;

        footerElement.append(footerCaption);
        if (length > 0) {
            footerElement.insertAdjacentElement('afterbegin', footerPrev);
            footerElement.insertAdjacentElement('beforeend', footerNext);
        }
        containerElement.append(footerElement);

        return containerElement.outerHTML;
    }
}