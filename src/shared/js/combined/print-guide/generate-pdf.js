
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfMake from 'html-to-pdfmake';

import { styles, defaultStyles } from './pdf-styles';
import { logo } from './logo';
import { palette } from '../utils/palette';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function generatePDF(data, metadata, action) {
  const today = new Date();
  const footerDate = moment(today).format('DD MMM YYYY').toString();


  // create file name
  const fileNameTitle = metadata.title.toLowerCase().replace(' ', '-');
  const fileNameDate = moment(today).format('DD-MM-YY').toString();
  const fileName = `${fileNameTitle}-${fileNameDate}`;
  const html = htmlToPdfMake(data, {defaultStyles}); 

  const docDefinition = {
    info: {
      title: `Health and Safety Executive - ${metadata.title}`,
      author: 'Health and Safety Executive',
      subject: metadata.description,
      keywords: metadata.keywords,
    },
    styles: styles,
    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [25, 90, 25, 70],
    header: {
      margin: 0,
      columns: [
        {
          table: {
            headerRows: 0,
            widths: ['*'],
            body: [
              [
                {
                  svg: logo,
                  width: 30,
                  height: 30,
                  fillColor: palette.red,
                  margin: [25, 10, 10, 10],
                },
              ],
            ],
          },
          layout: 'noBorders',
        },
      ],
    },
    content: [html],
    pageBreakBefore: function (currentNode) {
      return (
        currentNode.style &&
        currentNode.style.indexOf('pdf-pagebreak-before') > -1
      );
    },
    footer: function (currentPage, pageCount) {
      return {
        style: 'footer',
        margin: [25, 20, 25, 20],
        columns: [
          {
            table: {
              headerRows: 1,
              widths: ['85%', '15%'],
              body: [
                [
                  {
                    text: `This page was printed on ${footerDate} and is subject to future review.\n Please see legal information at the end of this doument.`,
                  },
                  {
                    text: `\n${currentPage.toString()} of ${pageCount}`,
                    alignment: 'right',
                  },
                ],
              ],
            },
            layout: 'noBorders',
          },
        ],
      };
    },
    layout: 'noBorders',
  };

  switch (action) {
    case 'download':
      pdfMake.createPdf(docDefinition).download(fileName);
      break;
    case 'print':
      pdfMake.createPdf(docDefinition).print();
      break;
    default:
      pdfMake.createPdf(docDefinition).download(fileName);
  }

}
