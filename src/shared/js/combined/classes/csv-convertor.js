import { feedback } from './feedback.mjs';
import ChartsDefault from './charts/charts';
import load from '../utils/asset-loader';

class CsvConvert {
  constructor(csvForm) {
    this.form = csvForm;
    this.copyButton = document.querySelector('.copy');
    this.downloadButton = document.querySelector('.download');
    this.previewCodeButton = document.querySelector('.preview-code-action');
    this.previewTableButton = document.querySelector('.preview-table-action');
    this.previewChartButton = document.querySelector('.preview-chart-action');
    this.previewCodeOutput = document.querySelector('.table-output-code');
    this.fileCsvButton = document.querySelector('.input-file');
    this.tableMetaForm = document.getElementById('tableMeta');
    this.tableMetaFormInputs = document.querySelectorAll('.input-watch');
    this.chartTypeField = document.querySelector('.chartType');
    this.formGroupUnits = document.getElementById('formGroupUnits');
    this.formGroupXAxis = document.getElementById('formGroupXAxis');
    this.formGroupYAxis = document.getElementById('formGroupYAxis');

    this.storedCsvData = [];

    this.charts = new ChartsDefault();
  }

  // loadVendorFn() {
  //   Promise.all([
  // //     load.css('./js/vendor/prismjs/prism-twilight.css'),
  // //     load.js('./js/vendor/prismjs/prism.js'),
  // //     load.js('./js/vendor/tidy/tidy.js')
  //   ])
  //   .then(function() {
  //     console.log('Vendors loaded');
  //   })
  //   .catch(function(err) {
  //     console.log(`There was a problem loading some vendors: ${err}`);
  //   });
  // }

  init() {
    // this.loadVendorFn();
    this.charts.loadChartsFn();
    // Events
    // Input CSV
    let fileReader = new FileReader();
    fileReader.onload = () => {
        this.createTableFn(fileReader.result);
        this.disableOptions(fileReader.result);
        this.tableMetaForm.classList.add('in');
        setTimeout(() => {
          this.tableMetaForm.classList.add('show');
        }, 100);
    };
    this.fileCsvButton.onchange = function(event) {
        this.sendCsvData = fileReader.readAsText(event.target.files[0]);

        // Reset meta form when new .csv is uploaded
        if (document.getElementById('tableMeta') !== 'undefined') {
          document.getElementById('tableMeta').reset();
        }
    };


    // Display units field
    // this.chartTypeField.addEventListener('change', (e) => {
      // console.log(e.target.value);
      // if (e.target.value === 'pie' || e.target.value === 'columnrange') {
      //   this.formGroupUnits.disabled = false;
      //   this.formGroupXAxis.disabled = true;
      //   this.formGroupYAxis.disabled = true;

      // } else {
      //   this.formGroupUnits.disabled = false;
      //   this.formGroupXAxis.disabled = false;
      //   this.formGroupYAxis.disabled = true;
      // }
    // });

    // Copy table
    this.copyButton.addEventListener('click', () => {
      this.copyTableFn();
    });

    const codeBlock = document.getElementById('code');
    const tableBlock = document.getElementById('table');
    const chartBlock = document.getElementById('chart');

    codeBlock.classList.add('in');
    codeBlock.classList.add('show');

    this.previewCodeButton.addEventListener('click', function() {
      tableBlock.setAttribute("class", "preview");
      chartBlock.setAttribute("class", "preview");
      codeBlock.classList.add('in');
      setTimeout(() => {
        codeBlock.classList.add('show');
      }, 100);
    });

    this.previewTableButton.addEventListener('click', function() {
      codeBlock.setAttribute("class", "preview");
      chartBlock.setAttribute("class", "preview");
      tableBlock.classList.add('in');
      setTimeout(() => {
        tableBlock.classList.add('show');
      }, 100);
    });

    this.previewChartButton.addEventListener('click', function() {
      tableBlock.setAttribute("class", "preview");
      codeBlock.setAttribute("class", "preview");
      chartBlock.classList.add('in');

      setTimeout(() => {
        chartBlock.classList.add('show');
      }, 100);
    });

    // Update table meta
    this.tableMetaForm.onsubmit = (e) => {
      e.preventDefault();
      this.tableMeta = this.getFormData();
      this.updateTableMetaFn(this.tableMeta);
    };

    for (let i = 0; i < this.tableMetaFormInputs.length; i++){
      this.tableMetaFormInputs[i].addEventListener('change', () => {
        this.tableMeta = this.getFormData();
        this.updateTableMetaFn(this.tableMeta);
      });
    }
  }

  disableOptions(data) {
    // set flags
    let allRows = data.split(/\r?\n|\r/);
    for (let singleRow = 0; singleRow < allRows.length; singleRow++) {
      const rowCells = allRows[singleRow].split(',');
      if (rowCells.length > 2) {
        this.disableSelectOption = true;
      } else {
        this.disableSelectOption = false;
      }
    }

    // disable / enable options
    const op = document.getElementById('chartType').getElementsByTagName('option');
    for (let i = 0; i < op.length; i++) {
      if (op[i].value.toLowerCase() == 'pie' && this.disableSelectOption == true) {
        op[i].disabled = true;
        op[i].style.color = '#F00';
      } else {
        op[i].disabled = false;
        op[i].style.color = '#FFF';
      }
    }
  }

  getFormData() {
    const outputData = {};
    const formData = new FormData(this.tableMetaForm)
    for (var pair of formData.entries()) {
      let key = pair[0];
      let val = pair[1];
      outputData[key] = val;
    }
    return outputData;
  }

  updateTableMetaFn(tableMeta) {
      this.createTableFn(this.storedCsvData, tableMeta);
      return false;
  }

  copyTableFn() {
    const copyTextarea = document.querySelector('.table-output-textarea');
    copyTextarea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      feedback(`Copy to clipboard ${msg}`);
    } catch (err) {
      feedback(`Oops, unable to copy ${err}`);
    }
  }

  createTableFn (data, meta) {
    const outputHeading = document.getElementById('outputHeading');
    outputHeading.innerHTML = "Your chart is ready to use!";

    // Store data
    this.storedCsvData = data;

    let metaTitle = meta ? meta.chartTitle : '';
    let metaSubtitle = meta ? meta.chartSubtitle : '';
    let metaDescription = meta ? meta.chartDescription : '';
    let metaType = meta ? meta.chartType : '';
    let metaUnits = meta ? meta.chartUnits : '';
    let metaXTitle = meta ? meta.chartXAxisTitle : '';
    let metaYTitle = meta ? meta.chartYAxisTitle : '';

    // Set variables
    let csvData = [];
    let rangeValues = [];

    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart';
    chartContainer.setAttribute('data-chart-type', metaType);
    chartContainer.setAttribute('data-chart-units', metaUnits);
    chartContainer.setAttribute('data-chart-title', metaTitle);
    chartContainer.setAttribute('data-chart-subtitle', metaSubtitle);
    chartContainer.setAttribute('data-chart-description', metaDescription);
    chartContainer.setAttribute('data-table-desc-x', metaXTitle);
    chartContainer.setAttribute('data-table-desc-y', metaYTitle);

    // create html
    const figure = document.createElement('figure');
    figure.className = 'datacontent';

    const chartTitle = document.createElement('h2');
    const chartSubtitle = document.createElement('h3')
    const chartDescription = document.createElement('p');
    chartTitle.className = 'datacontent__title';
    chartSubtitle.className = 'datacontent__subtitle';
    chartDescription.className = 'datacontent__description';
    chartTitle.textContent = meta ? meta.chartTitle : '';
    chartSubtitle.textContent = meta ? meta.chartSubtitle : '';
    chartDescription.textContent = meta ? meta.chartDescription : '';

    const output = document.querySelector('.table-output');
    const tablePreview = document.querySelector('.table-output-preview');
    const codePreview = document.querySelector('.table-output-textarea');
    const chartPreview = document.querySelector('.chart-output-preview');
    const table = document.createElement('table');
    const tableBody = document.createElement('tbody');
    const tableHead = document.createElement('thead');

    table.classList.add('table');
    table.classList.add('tabledata');
    table.id = 'previewTable';
    tableBody.classList.add('table__body');
    tableHead.classList.add('table__head');

    let rows = data.split("\n");
    rows.forEach((res) => {
        csvData.push(res.split(","));
    });

    csvData.forEach(function(rowData, i) {
      let rowCount = i;
      let cell;
      const row = document.createElement('tr');
      row.classList.add('table__row');
      rowData.forEach(function(cellData, i) {
        if (rowCount === 0) {
          cell = document.createElement('th');
          let dataAttr = cellData.toLowerCase();
          dataAttr = dataAttr.replace(/[^a-zA-Z0-9+]/g, '');
          rangeValues.push(dataAttr);
        } else {
          cell = document.createElement('td');
        }
        // Create cell classnames
        cell.classList.add('table__cell');
        if (rowCount >= 1) {
          let cellCount = i;
          if (cellCount === 0) {
            cell.classList.add('category');
          } else {
            cell.classList.add('unit');
          }
        }
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
      if (rowCount === 0) {
        tableHead.appendChild(row);
      } else {
        tableBody.appendChild(row);
      }
    });


    if (this.chartTypeField.value === 'arearange') {
      this.createRanges(rangeValues);
    }

    const displayChart = document.createElement('div');
    displayChart.className = 'displayChart';

    // Create thead and tbody
    table.append(tableHead, tableBody);

    // Create chart meta elements
    const chartMetaElems = document.createDocumentFragment();
    if (chartTitle.textContent != '') {
      chartMetaElems.append(chartTitle);
    }
    if (chartSubtitle.textContent != '') {
      chartMetaElems.append(chartSubtitle);
    }
    if (chartDescription.textContent != '') {
      chartMetaElems.append(chartDescription);
    }

    figure.append(chartMetaElems, table);
    chartContainer.append(displayChart, figure);

    // Preview table
    tablePreview.innerHTML = chartContainer.innerHTML;

    // Preview code
    let displayCode = chartContainer.outerHTML;
    codePreview.value = displayCode;

    const html_format_options = {
      "indent": "auto",
      "indent-spaces": 2,
      "wrap": 80,
      "markup": true,
      "output-xml": false,
      "numeric-entities": true,
      "quote-marks": true,
      "quote-nbsp": false,
      "show-body-only": true,
      "quote-ampersand": false,
      "break-before-br": true,
      "uppercase-tags": false,
      "uppercase-attributes": false,
      "drop-font-tags": true,
      "tidy-mark": false
    }

    const html_formated = tidy_html5(displayCode, html_format_options);

    while (this.previewCodeOutput.firstChild) {
      this.previewCodeOutput.removeChild(this.previewCodeOutput.firstChild)
    };

    this.previewCodeOutput.append(html_formated);

    // Preview chart
    chartPreview.innerHTML = chartContainer.outerHTML;

    const chartDisplayContainer = document.getElementById('chart');
    const chartDisplay = chartDisplayContainer.querySelector('.chart');
    const options = this.charts.options(chartDisplay);
    this.charts.build(chartDisplay, options);

    // Display table meta form
    output.classList.add('in');
    setTimeout(() => {
      output.classList.add('show');
    }, 100);
  }

  createRanges(ranges) {
    const rangeAxis = document.getElementById('rangeAxis');
    const rangeAverage = document.getElementById('rangeAverage');
    const rangeLow = document.getElementById('rangeLow');
    const rangeHigh = document.getElementById('rangeHigh');

    // only populate if doesn't already have values
    if (rangeAxis.options.length < 5) {
      rangeAxis.options[rangeAxis.options.length] = new Option('Select a range', null, false, false);
      rangeAverage.options[rangeAverage.options.length] = new Option('Select a range', null, false, false);
      rangeLow.options[rangeLow.options.length] = new Option('Select a range', null, false, false);
      rangeHigh.options[rangeHigh.options.length] = new Option('Select a range', null, false, false);
    }

    // create options
    for (let data of ranges) {
      const optionElem = document.createElement('option');
      optionElem.value = data;
      optionElem.innerHTML = data;
      // only populate if doesn't already have values
      if (rangeAxis.options.length < 5) {
        rangeAxis.options[rangeAxis.options.length] = new Option(data, data, false, false);
        rangeAverage.options[rangeAverage.options.length] = new Option(data, data, false, false);
        rangeLow.options[rangeLow.options.length] = new Option(data, data, false, false);
        rangeHigh.options[rangeHigh.options.length] = new Option(data, data, false, false);
      }
    }
  }
};

export default CsvConvert;