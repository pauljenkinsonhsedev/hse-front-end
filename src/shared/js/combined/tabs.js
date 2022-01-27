import { mediaQuery } from './utils/media-query.js';

export function tabs(container) {
    const mediaquery = mediaQuery();
    const tabTitle = container.getElementsByClassName('tabs__tab');
    const listItem = container.getElementsByClassName('tabs__list-item');
    const tabContent = container.getElementsByClassName('tabs__panel');

    if (tabTitle.length == 0 || tabTitle == undefined || tabTitle == "undefined") {
        return;
    }

    listItem[0].classList.add('selected');
    tabContent[0].classList.add('show');

    for (var i = 0; i < tabContent.length; i++) {
        tabTitle[i].addEventListener('click', showHideTabs.bind(null, i));
    }

    function showHideTabs(i, event) {
        // disable click for small devices
        if (mediaquery !== 'small') {
            event.preventDefault();
        }

        if (!tabTitle[i].classList.contains('selected')) {
            [].forEach.call(container.querySelectorAll('.tabs__list-item'), function (el) {
                el.classList.remove('selected');
            });
            [].forEach.call(container.querySelectorAll('.tabs__panel'), function (el) {
                el.classList.remove('show');
            });
            listItem[i].classList.add('selected');
            tabContent[i].classList.add('show');
        }
    }
}