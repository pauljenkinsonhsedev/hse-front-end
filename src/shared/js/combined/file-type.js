export function fileTypeFunction() {

    const anchors = document.querySelectorAll('#pageContainer a');

    // Add file extentions and descriptions here
    const fileTypeArr = [
        {
            ext: 'pdf',
            shortText: 'PDF',
            longText: 'Portable Document Format',
        },
        {
            ext: 'doc',
            shortText: '.doc',
            longText: 'Microsoft Word document',
        },
        {
            ext: 'docx',
            shortText: '.docx',
            longText: 'Microsoft Word document'
        },
        {
            ext: 'xls',
            shortText: '.xls',
            longText: 'Microsoft Excel spreadsheet'
        },
        {
            ext: 'xlsx',
            shortText: '.xlsx',
            longText: 'Microsoft Excel spreadsheet'
        },
        {
            ext: 'ppt',
            shortText: '.ppt',
            longText: 'Microsoft PowerPoint presentation'
        },
        {
            ext: 'pptx',
            shortText: '.pptx',
            longText: 'Microsoft PowerPoint presentation'
        },
        {
            ext: 'pps',
            shortText: '.pps',
            longText: 'Microsoft PowerPoint presentation'
        },
        {
            ext: 'zip',
            shortText: '.zip',
            longText: 'Zip file'
        },
        {
            ext: 'mp3',
            shortText: '.mp3',
            longText: 'MP3 audio file'
        }
    ];

    anchors.forEach((elem) => {
        const path = elem.href;
        const [extension] = path.split('.').reverse();

        fileTypeArr.filter(function(file) {
            if (file.ext === extension) {
                elem.innerHTML += `
                    <span class="fileType">
                        <span> (<abbr title="${file.longText}">${file.shortText}</abbr>)</span>
                    </span>`
                ;
            }
        });
    });
}
