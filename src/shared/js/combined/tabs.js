import { mediaQuery } from './utils/media-query.js';

export function tabs(container) {
    const mediaquery = mediaQuery();
    const tabTitle = container.getElementsByClassName('tabs__tab');
    const listItem = container.getElementsByClassName('tabs__list-item');
    const tabContent = container.getElementsByClassName('tabs__panel');

    if (tabTitle.length == 0 || tabTitle == undefined || tabTitle == "undefined") {
        return;
    }

    // initial aria and tabindex

    listItem[0].classList.add('selected');
    tabContent[0].classList.add('show');
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
            [].forEach.call(container.querySelectorAll('.tabs__list-item'), function (el) {
                el.classList.remove('selected');
            });
            [].forEach.call(container.querySelectorAll('.tabs__panel'), function (el) {
                el.classList.remove('show');
            });
            [].forEach.call(container.querySelectorAll('.tabs__tab'), function (el) {
                // aria-selected and tabindex
                el.setAttribute("aria-selected", "false");
                el.setAttribute("tabindex", "-1");
            });
            listItem[i].classList.add('selected');
            tabContent[i].classList.add('show');
            // aria-selected and tabindex
            tabTitle[i].setAttribute("aria-selected", "true");
            tabTitle[i].setAttribute("tabindex", "0");
        }
    }
}