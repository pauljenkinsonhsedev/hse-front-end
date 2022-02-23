import moment from 'moment';
import { styles, defaultStyles } from './pdf-styles';
import { logo } from './logo';
import { palette } from '../utils/palette';

const pdfMake = require('pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
const htmlToPdfMake = require('html-to-pdfmake');
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
    pageMargins: [25, 90, 25, 50],
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
              widths: ['80%', '20%'],
              body: [
                [
                  {
                    text: `This page was printed on ${footerDate} and is subject to future changes`,
                  },
                  {
                    text: `${currentPage.toString()} of ${pageCount}`,
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
