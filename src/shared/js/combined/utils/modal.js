import { customEventListener } from './add-custom-event-listener';

/*

    option params:
    type: notification, warning, information, dialog
    size: default, fullscreen
    transition: [scale, fadein, slide]
*/

class Modal {
  constructor(content, options) {
    this.content = content;
    this.options = options;
    this.container = document.createElement('div');
    this.overlay = document.createElement('div');
    this.containerName = 'modal__container';
    this.containerInner = 'modal__inner';
    this.modal = false;
    this.init();
  }

  init() {
    new Promise((resolve, reject) => {
      if (this.content) {
        resolve();
      } else {
        reject();
      }
    })
      .then(() => {
        this.modalDestroy();
      })
      .then(() => {
        this.modalBulid();
      })
      .then(() => {
        this.modalEvents();
      })
      .catch((err) => {
        console.error(`Error initiating modal: ${err}`);
      });
  }

  outsideClick(event, selector) {
    const target = document.querySelectorAll(selector);
    var clickedOut = true,
      i,
      len = target.length;

    for (i = 0; i < len; i++) {
      if (event.target == target[i] || target[i].contains(event.target)) {
        clickedOut = false;
      }
    }
    if (clickedOut) {
      return true;
    } else {
      return false;
    }
  }

  modalEvents() {
    // close modal
    customEventListener('.close-action', 'click', () => {
      this.modalClose();
    });

    // close modal escape key
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.keyCode == 27) {
          this.modalClose();
        }
      },
      false
    );

    // close modal if clicked outside
    window.addEventListener('mouseup', (e) => {
      if (this.outsideClick(e, '.modal__container')) {
        this.modalClose();
      }
      return false;
    });
  }

  setModalOptions() {
    const type = this.options.type || 'dialog';
    const size = this.options.size || 'default';
    const overlay = this.options.overlay || '';
    const transition = this.options.transition ? 'transition' : 'no-transition';
    const actionDefault = { title: null, url: null };
    const action = this.options.action || actionDefault;
    const options = {
      type: type,
      size: size,
      transition: transition,
      overlay: overlay,
      action: action,
    };
    return options;
  }

  modalBulid() {
    const options = this.setModalOptions();
    let content = String;
    const htmlContent = this.content;
    const isHTML = (text) => {
      try {
        const fragment = new DOMParser().parseFromString(text, 'text/html');
        return fragment.body.children.length > 0;
      } catch (error) {}
      return false;
    };

    // check if content is loaded from DOM or passed as a string
    if (isHTML(htmlContent)) {
      content = htmlContent; // return as DOM
    } else {
      content = new XMLSerializer().serializeToString(htmlContent); // convert to string
    }
    const container = this.container;
    const modalAction = options.action.url
      ? `<div class="modal__action"><a href="${options.action.url}">${options.action.title}</a></div>`
      : '';
    const html = `
        <div class="modal__header">
            <button class="modal__close close-action">
                <div class="close-icon"></div>
                <span>Close</span>
            </button>
        </div>
        <div class="${this.containerInner}">

            <div class="modal__content">
                ${content}
                ${modalAction}
            </div>
        </div>
    `;

    const overlay = this.overlay;
    overlay.classList.add('modal__overlay');
    if (options.overlay == true) {
      document.body.append(overlay);
      container.classList.add('has-overlay');
    }

    container.innerHTML = html;
    container.classList.add(
      this.containerName,
      options.type,
      options.size,
      options.transition
    );
    document.body.append(container);

    container.classList.add('modal-in');
    setTimeout(function () {
      container.classList.add('modal-show');
      return false;
    }, 100);
  }

  modalDestroy() {
    if (this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }

  modalClose() {
    const container = this.container;
    container.classList.remove('modal-show');
    setTimeout(() => {
      container.classList.remove('modal-in');
      this.modalDestroy();
      return false;
    }, 300);
  }
}

export default Modal;
