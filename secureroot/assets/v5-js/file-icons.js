$(document).ready(function () {

$('a[href$="pdf"]').append('<span> (<abbr title="Portable Document Format">PDF</abbr>)</span>');
$('a[href$="docx"]').append('<span> (<abbr title="Microsoft Word document">.docx</abbr>)</span>');
$('a[href$="doc"]').append('<span> (<abbr title="Microsoft Word document">.doc</abbr>)</span>');
$('a[href$="xls"]').append('<span> (<abbr title="Microsoft Excel spreadsheet">.xls</abbr>)</span>');
$('a[href$="xlsx"]').append('<span> (<abbr title="Microsoft Excel spreadsheet">.xlsx</abbr>)</span>');
$('a[href$="ppt"]').append('<span> (<abbr title="Microsoft PowerPoint presentation">.ppt)</abbr></span>');
$('a[href$="pptx"]').append('<span> (<abbr title="Microsoft PowerPoint presentation">.pptx</abbr>)</span>');
$('a[href$="pps"]').append('<span> (<abbr title="Microsoft PowerPoint presentation">.pps</abbr>)</span>');
$('a[href$="zip"]').append('<span> (<abbr title="ZIP file">.zip</abbr>)</span>');
$('a[href$="mp3"]').append('<span> (<abbr title="MP3 audio file">.mp3</abbr>)</span>');

});
