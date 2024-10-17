export function fileTypeFunction() {
    // Select anchors from #page-contents and .hse-browse-section__list
    const anchors = document.querySelectorAll('#page-contents a, .hse-browse-section__list a');

    // Use a mapping for file types
    const fileTypes = {
        pdf: { shortText: 'PDF', longText: 'Portable Document Format' },
        doc: { shortText: '.doc', longText: 'Microsoft Word document' },
        docx: { shortText: '.docx', longText: 'Microsoft Word document' },
        xls: { shortText: '.xls', longText: 'Microsoft Excel spreadsheet' },
        xlsx: { shortText: '.xlsx', longText: 'Microsoft Excel spreadsheet' },
        ppt: { shortText: '.ppt', longText: 'Microsoft PowerPoint presentation' },
        pptx: { shortText: '.pptx', longText: 'Microsoft PowerPoint presentation' },
        pps: { shortText: '.pps', longText: 'Microsoft PowerPoint presentation' },
        zip: { shortText: '.zip', longText: 'Zip file' },
        mp3: { shortText: '.mp3', longText: 'MP3 audio file' }
    };

    anchors.forEach((elem) => {
        const path = elem.href;
        const extension = path.split('.').pop();

        // Get the file type description if exists
        const fileType = fileTypes[extension];

        // If a matching file type is found, append the description
        if (fileType) {
            const description = `
                <span class="fileType">
                    <span> (<abbr title="${fileType.longText}">${fileType.shortText}</abbr>)</span>
                </span>`;
            elem.innerHTML += description; // Append description
        }
    });
}
