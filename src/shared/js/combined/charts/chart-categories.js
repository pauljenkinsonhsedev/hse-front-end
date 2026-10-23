import { cellText } from './cell-value.js';
export function chartCategories(container) {
    // Categories data collection
    const chartCategories = container.querySelectorAll('.category');
    const categoryArray = [...chartCategories];
    const dateRegEx = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    const categories = [];

    // Loop through categories
    categoryArray.forEach((category) => {
        // Set categories
        let text = cellText(category);
        if (text.match(dateRegEx)) {
            text = moment(text).format('DD MMM YYYY').toString();
        }

        if (category.classList.contains('highlighted')) {
            text = `<span style="color: #000000; font-size: 1rem; font-weight: 700;">${cellText(category)}</span>`;
        }

        categories.push(text);
    });

    return categories;
}