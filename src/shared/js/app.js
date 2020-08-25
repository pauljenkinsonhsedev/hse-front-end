import CsvConvert from './combined/csv-convertor/csv-convertor';
import ChartsDefault from './combined/charts/charts';

// Window load
window.addEventListener('load',() => {
  const htmlDoc = document.getElementsByTagName('html')[0];
  htmlDoc.classList.add('js-enabled');

  // CSV Convertor
  const csvForm = document.getElementById('csvconvertor');
  if (document.body.contains(csvForm)) {
    const convert = new CsvConvert(csvForm);
    convert.init(csvForm);
  }

  // HighCharts JS
  const chartSelector = document.querySelector('.chart');
  if (document.body.contains(chartSelector)) {
    new ChartsDefault();
  }
}); // end window load
