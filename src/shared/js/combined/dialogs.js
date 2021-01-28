import Modal from './utils/modal';

export function dialogModal(container) {

    const dialogContainer = document.querySelectorAll('.dialog');

    [...dialogContainer].forEach((elem) => {
        console.log('dataset', elem.dataset);
        const size = elem.dataset.size ? elem.dataset.size : 'default';
        const content = elem.querySelector('.dialog__content').innerHTML;
        const action = elem.querySelector('.dialog__action');
        const modalOptions = {
            size: size,
            transition: true,
            // overlay: true
        };

        console.log('modalOptions', modalOptions);

        action.addEventListener('click', () => {
            new Modal(content, modalOptions);
        });
    });

}
