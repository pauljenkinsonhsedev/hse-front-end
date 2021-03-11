export function chartCategories(container) {
    // Categories data collection
    const chartCategories = container.querySelectorAll('.category');
    const categoryArray = [...chartCategories];
    const dateRegEx = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    const categories = [];

    // Loop through categories
    categoryArray.forEach((category) => {
        // Set categories
        let text;
        if (category.textContent.match(dateRegEx)) {
            text = moment(category.textContent).format('DD MMM YYYY').toString();
        } else {
            text = category.textContent;
        }

        if (category.classList.contains('highlighted')) {
            text = `<span style="color: #000000; font-size: 0.7rem; font-weight: 700;">${category.textContent}</span>`;
        }

        categories.push(text);
    });

    return categories;
}