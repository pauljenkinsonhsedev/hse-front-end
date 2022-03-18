import { palette } from '../utils/palette.js';

var fonts = {
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  }
};

export const defaultStyles = {
  font: 'Helvetica',
  a: {
    color: palette.red,
    fontSize: 12,
    lineHeight: 1.4,
  },
  th: '',
  td: '',
  li: '',
  p: '',
  span: '',
  sup: '',
  sub: ''
};

export const styles = {
  'html-h1': {
    fontSize: 32,
    bold: true,
    color: palette.red,
    lineHeight: 1.2,
    marginBottom: 15
  },
  'html-h2': {
    fontSize: 26,
    bold: true,
    color: palette.red,
    lineHeight: 1.2,
    marginBottom: 15
  },
  'html-h3': {
    fontSize: 17.6,
    bold: true,
    color: palette.black,
    lineHeight: 1.2,
    marginBottom: 15
  },
  'html-h4': {
    fontSize: 14.4,
    bold: true,
    color: palette.black,
    lineHeight: 1.2,
    marginBottom: 15
  },
  'html-p': {
    fontSize: 12,
    lineHeight: 1.4,
    color: palette.black,
    marginBottom: 15
  },
  'html-sup': {
    fontSize: 10,
    lineHeight: 2,
    color: palette.black,
  },
  'html-sub': {
    fontSize: 10,
    lineHeight: 0,
    color: palette.black,
  },
  'html-ul': {
    marginBottom: 30,
  },
  'html-li': {
    marginBottom: 5,
    fontSize: 12,
    lineHeight: 1.4,
    marginLeft: 5,
  },
  'html-table': {
    margin: [0, 0, 15, 0],
  },
  'html-a': {
    fontSize: 24,
    color: palette.red,
    decoration: 'lineThrough',
  },
  footer: {
    fontSize: 10,
    margin: 15,
  },
};
