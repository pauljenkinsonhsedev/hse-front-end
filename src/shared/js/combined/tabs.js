import { mediaQuery } from './utils/media-query.js';

export function tabs(container) {
    const mediaquery = mediaQuery();
    const tabTitle = container.getElementsByClassName('hse-tabs__tab');
    const listItem = container.getElementsByClassName('hse-tabs__list-item');
    const tabContent = container.getElementsByClassName('hse-tabs__panel');

    if (tabTitle.length == 0 || tabTitle == undefined || tabTitle == "undefined") {
        return;
    }

    // initial aria and tabindex
    tabContent[0].classList.remove('hse-tabs__panel--hidden');
    listItem[0].classList.add('hse-tabs__list-item--selected');
    tabTitle[0].setAttribute("aria-selected", "true");
    tabTitle[0].setAttribute("tabindex", "0");

    for (var i = 0; i < tabContent.length; i++) {
        tabTitle[i].addEventListener('click', showHideTabs.bind(null, i));
    }

    function showHideTabs(i, event) {
        // disable click for small devices
        if (mediaquery !== 'small') {
            event.preventDefault();
        }

        if (!tabTitle[i].classList.contains('selected')) {
            [].forEach.call(container.querySelectorAll('.hse-tabs__list-item'), function (el) {
                el.classList.remove('hse-tabs__list-item--selected');
            });
            [].forEach.call(container.querySelectorAll('.hse-tabs__panel'), function (el) {
                el.classList.add('hse-tabs__panel--hidden');
            });
            [].forEach.call(container.querySelectorAll('.hse-tabs__tab'), function (el) {
                // aria-selected and tabindex
                el.setAttribute("aria-selected", "false");
                el.setAttribute("tabindex", "-1");
            });
            listItem[i].classList.add('hse-tabs__list-item--selected');
            tabContent[i].classList.remove('hse-tabs__panel--hidden');
            // aria-selected and tabindex
            tabTitle[i].setAttribute("aria-selected", "true");
            tabTitle[i].setAttribute("tabindex", "0");
        }
    }
}