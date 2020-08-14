import CsvConvert from './combined/classes/csv-convertor';
import ChartsDefault from './combined/classes/charts/charts';

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
      const charts = new ChartsDefault();
      charts.init();
  }
}); // end window load
