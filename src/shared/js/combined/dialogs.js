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
        };

        action.addEventListener('click', () => {
            new Modal(content, modalOptions);
        });
    });
}


export function dialogModalAjax(content, options) {

    let modalOptions;
    if (options === null) {
        modalOptions = {
            size: 'small',
            transition: true,
            // overlay: true
        };
    } else {
        modalOptions = options;
    }

    // console.log('modalOptions', modalOptions);
    new Modal(content, modalOptions);
}


