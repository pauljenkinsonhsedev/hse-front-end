// import { feedback } from './feedback.mjs';
// import { ChartOptions } from '../charts/dependencies';
// import ChartsDefault from '../charts/charts';

// class CsvConvert {
//   constructor(csvForm) {
//     this.form = csvForm;
//     this.copyButton = document.querySelector('.copy');
//     this.downloadButton = document.querySelector('.download');
//     this.previewCodeButton = document.querySelector('.preview-code-action');
//     this.previewTableButton = document.querySelector('.preview-table-action');
//     this.previewChartButton = document.querySelector('.preview-chart-action');
//     this.previewCodeOutput = document.querySelector('.table-output-code');
//     this.fileCsvButton = document.querySelector('.input-file');
//     this.formFieldDisplay = document.querySelectorAll('.form-field-display');
//     this.tableMetaForm = document.getElementById('tableMeta');
//     this.tableMetaFormInputs = document.querySelectorAll('.input-watch');
//     this.chartTypeField = document.querySelector('.chartType');
//     this.formGroupUnits = document.getElementById('formGroupUnits');
//     this.formGroupXAxis = document.getElementById('formGroupXAxis');
//     this.formGroupYAxis = document.getElementById('formGroupYAxis');
//     this.storedCsvData = [];
//     this.headingData = String;
//     this.charts = new ChartsDefault();
//   }

//   init() {
//     /*
//          Events
//     */

//     // CSV Upload
//     this.form.onsubmit = (e) => {
//       e.preventDefault();
//     };

//     // Input CSV
//     let fileReader = new FileReader();
//     fileReader.onload = () => {
//         this.createTableFn(fileReader.result);
//         this.disableOptions(fileReader.result);
//         this.tableMetaForm.classList.add('in');
//         setTimeout(() => {
//           this.tableMetaForm.classList.add('show');
//         }, 100);
//     };

//     // show hide form fields
//     for(let elem of this.formFieldDisplay) {
//         const target = elem.dataset.target;
//         elem.onchange = (event) => {
//             this.headingData = target;
//             const targetElem = document.querySelector(`.${target}`);
//             if (event.target.value === 'Yes') {
//                 targetElem.classList.remove('form-group-hide');
//             } else {
//                 targetElem.classList.add('form-group-hide');
//             }
//         }
//     }

//     this.fileCsvButton.onchange = function(event) {
//         this.sendCsvData = fileReader.readAsText(event.target.files[0]);

//         // Reset meta form when new .csv is uploaded
//         if (document.getElementById('tableMeta') !== 'undefined') {
//           document.getElementById('tableMeta').reset();
//         }
//     };

//     // Copy table
//     this.copyButton.addEventListener('click', () => {
//       this.copyTableFn();
//     });

//     const codeBlock = document.getElementById('code');
//     const tableBlock = document.getElementById('table');
//     const chartBlock = document.getElementById('chart');

//     codeBlock.classList.add('in');
//     codeBlock.classList.add('show');

//     this.previewCodeButton.addEventListener('click', function() {
//       tableBlock.setAttribute("class", "preview");
//       chartBlock.setAttribute("class", "preview");
//       codeBlock.classList.add('in');
//       setTimeout(function() {
//         codeBlock.classList.add('show');
//       }, 100);
//     });

//     this.previewTableButton.addEventListener('click', function() {
//       codeBlock.setAttribute("class", "preview");
//       chartBlock.setAttribute("class", "preview");
//       tableBlock.classList.add('in');
//       setTimeout(function() {
//         tableBlock.classList.add('show');
//       }, 100);
//     });

//     this.previewChartButton.addEventListener('click', function() {
//       tableBlock.setAttribute("class", "preview");
//       codeBlock.setAttribute("class", "preview");
//       chartBlock.classList.add('in');

//       setTimeout(function() {
//         chartBlock.classList.add('show');
//       }, 100);
//     });

//     // Update table meta
//     this.tableMetaForm.onsubmit = (e) => {
//       e.preventDefault();
//       this.tableMeta = this.getFormData();
//       this.updateTableMetaFn(this.tableMeta);
//     };

//     for (let i = 0; i < this.tableMetaFormInputs.length; i++){
//       this.tableMetaFormInputs[i].addEventListener('change', () => {
//         this.tableMeta = this.getFormData();
//         this.updateTableMetaFn(this.tableMeta);
//       });
//     }
//   }

//   disableOptions(data) {
//     // set flags
//     let allRows = data.split(/\r?\n|\r/);
//     for (let singleRow = 0; singleRow < allRows.length; singleRow++) {
//       const rowCells = allRows[singleRow].split(',');
//       if (rowCells.length > 2) {
//         this.disableSelectOption = true;
//       } else {
//         this.disableSelectOption = false;
//       }
//     }

//     // disable / enable options
//     const op = document.getElementById('chartType').getElementsByTagName('option');
//     for (let i = 0; i < op.length; i++) {
//       if (op[i].value.toLowerCase() == 'pie' && this.disableSelectOption == true) {
//         op[i].disabled = true;
//         op[i].style.color = '#F00';
//       } else {
//         op[i].disabled = false;
//         op[i].style.color = '#FFF';
//       }
//     }
//   }

//   getFormData() {
//     const outputData = {};
//     const formData = new FormData(this.tableMetaForm)
//     for (var pair of formData.entries()) {
//       let key = pair[0];
//       let val = pair[1];
//       outputData[key] = val;
//     }
//     return outputData;
//   }

//   updateTableMetaFn(tableMeta) {
//       this.createTableFn(this.storedCsvData, tableMeta);
//       return false;
//   }

//   copyTableFn() {
//     const copyTextarea = document.querySelector('.table-output-textarea');
//     copyTextarea.select();

//     try {
//       var successful = document.execCommand('copy');
//       var msg = successful ? 'successful' : 'unsuccessful';
//       feedback(`Copy to clipboard ${msg}`);
//     } catch (err) {
//       feedback(`Oops, unable to copy ${err}`);
//     }
//   }

//   createTableFn (data, meta) {
//     const outputHeading = document.getElementById('outputHeading');
//     outputHeading.innerHTML = "Your chart is ready to use!";

//     // Store data
//     this.storedCsvData = data;

//     let metaTitle = meta ? meta.chartTitle : '';
//     let metaSubtitle = meta ? meta.chartSubtitle : '';
//     let metaDescription = meta ? meta.chartDescription : '';
//     let metaType = meta ? meta.chartType : 'line';
//     let metaUnits = meta ? meta.chartUnits : '';
//     let metaXTitle = meta ? meta.chartXAxisTitle : '';
//     let metaYTitle = meta ? meta.chartYAxisTitle : '';

//     let rangeAxis = meta ? parseInt(meta.rangeAxis) : '';
//     let rangeAverage = meta ? parseInt(meta.rangeAverage) : '';
//     let rangeLow = meta ? parseInt(meta.rangeLow) : '';
//     let rangeHigh = meta ? parseInt(meta.rangeHigh) : '';

//     let intervalLow = meta ? parseInt(meta.intervalLow) : '';
//     let intervalHigh = meta ? parseInt(meta.intervalHigh) : '';

//     // Set variables
//     let csvData = [];
//     let headingData = [];

//     const chartContainer = document.createElement('div');
//     chartContainer.className = 'chart';
//     chartContainer.setAttribute('data-chart-type', metaType);
//     chartContainer.setAttribute('data-chart-units', metaUnits);
//     chartContainer.setAttribute('data-chart-title', metaTitle);
//     chartContainer.setAttribute('data-chart-subtitle', metaSubtitle);
//     chartContainer.setAttribute('data-chart-description', metaDescription);
//     chartContainer.setAttribute('data-xaxis-text', metaXTitle);
//     chartContainer.setAttribute('data-yaxis-text', metaYTitle);

//     // create html
//     const figure = document.createElement('figure');
//     figure.className = 'datacontent';

//     const chartTitle = document.createElement('h2');
//     const chartSubtitle = document.createElement('h3')
//     const chartDescription = document.createElement('p');
//     chartTitle.className = 'datacontent__title';
//     chartSubtitle.className = 'datacontent__subtitle';
//     chartDescription.className = 'datacontent__description';
//     chartTitle.textContent = meta ? meta.chartTitle : '';
//     chartSubtitle.textContent = meta ? meta.chartSubtitle : '';
//     chartDescription.textContent = meta ? meta.chartDescription : '';

//     const output = document.querySelector('.table-output');
//     const tablePreview = document.querySelector('.table-output-preview');
//     const codePreview = document.querySelector('.table-output-textarea');
//     const chartPreview = document.querySelector('.chart-output-preview');
//     const table = document.createElement('table');
//     const tableBody = document.createElement('tbody');
//     const tableHead = document.createElement('thead');

//     table.classList.add('table');
//     table.classList.add('tabledata');
//     table.id = 'previewTable';
//     tableBody.classList.add('table__body');
//     tableHead.classList.add('table__head');

//     let rows = data.split("\n");
//     rows.forEach((res) => {
//         csvData.push(res.split(","));
//     });

//     csvData.forEach(function(rowData, i) {
//       let rowCount = i;
//       let cell;
//       const row = document.createElement('tr');
//       row.classList.add('table__row');
//       rowData.forEach(function(cellData, i) {
//         if (rowCount === 0) {
//           cell = document.createElement('th');
//           cell.classList.add('heading');

//           let dataAttr = cellData.toLowerCase();
//           dataAttr = dataAttr.replace(/[^a-zA-Z0-9+]/g, '');
//           headingData.push(dataAttr);
//         } else {
//           cell = document.createElement('td');
//         }
//         // Create cell classnames
//         cell.classList.add('table__cell');
//         if (rowCount >= 1) {
//           let cellCount = i;
//           if (cellCount === 0) {
//             cell.classList.add('category');
//           } else {
//             cell.classList.add('unit');
//           }

//           if (cellCount === 0) {
//             cell.classList.add('series-range-axis');
//           }
//           if (cellCount === 1) {
//             cell.classList.add('series-range-average');
//           }
//           if (cellCount === 2) {
//             cell.classList.add('series-range-low');
//           }
//           if (cellCount === 3) {
//             cell.classList.add('series-range-high');
//           }

//           switch(cellCount) {
//             case rangeAxis:
//               // console.log(`cellCount ${cellCount}: rangeAxis ${rangeAxis}`);
//               cell.classList.add('series-range-axis');
//             break;

//             case rangeAverage:
//               // console.log(`cellCount ${cellCount}: rangeAxis ${rangeAverage}`);
//               cell.classList.add('series-range-average');
//             break;

//             case rangeLow:
//               // console.log(`cellCount ${cellCount}: rangeAxis ${rangeLow}`);
//               cell.classList.add('series-range-low');
//             break;

//             case rangeHigh:
//               // console.log(`cellCount ${cellCount}: rangeAxis ${rangeHigh}`);
//               cell.classList.add('series-range-high');
//             break;
//           }

//         }
//         cell.appendChild(document.createTextNode(cellData));
//         row.appendChild(cell);
//       });
//       if (rowCount === 0) {
//         tableHead.appendChild(row);
//       } else {
//         tableBody.appendChild(row);
//       }
//     });


//     if (this.chartTypeField.value === 'arearange') {
//       this.rangeOptions(headingData);
//     }

//     switch (this.headingData) {
//         case 'range-inputs':
//           this.rangeOptions(headingData);
//         break;
//         case 'interval-inputs':
//           this.intervalOptions(headingData);
//         break;
//     }

//     const displayChart = document.createElement('div');
//     displayChart.className = 'displayChart';

//     // Create thead and tbody
//     table.append(tableHead, tableBody);

//     // Create chart meta elements
//     const chartMetaElems = document.createDocumentFragment();
//     if (chartTitle.textContent != '') {
//       chartMetaElems.append(chartTitle);
//     }
//     if (chartSubtitle.textContent != '') {
//       chartMetaElems.append(chartSubtitle);
//     }
//     if (chartDescription.textContent != '') {
//       chartMetaElems.append(chartDescription);
//     }

//     figure.append(chartMetaElems, table);
//     chartContainer.append(displayChart, figure);

//     // Preview table
//     tablePreview.innerHTML = chartContainer.innerHTML;

//     // Preview code
//     let displayCode = chartContainer.outerHTML;
//     codePreview.value = displayCode;

//     const html_format_options = {
//       "indent": "auto",
//       "indent-spaces": 2,
//       "wrap": 80,
//       "markup": true,
//       "output-xml": false,
//       "numeric-entities": true,
//       "quote-marks": true,
//       "quote-nbsp": false,
//       "show-body-only": true,
//       "quote-ampersand": false,
//       "break-before-br": true,
//       "uppercase-tags": false,
//       "uppercase-attributes": false,
//       "drop-font-tags": true,
//       "tidy-mark": false
//     }

//     const html_formated = tidy_html5(displayCode, html_format_options);

//     while (this.previewCodeOutput.firstChild) {
//       this.previewCodeOutput.removeChild(this.previewCodeOutput.firstChild)
//     };

//     this.previewCodeOutput.append(html_formated);

//     // Preview chart
//     chartPreview.innerHTML = chartContainer.outerHTML;

//     const chartDisplayContainer = document.getElementById('chart');
//     const chartDisplay = chartDisplayContainer.querySelector('.chart');
//     const chartOptions = new ChartOptions(chartDisplay);
//     this.charts.buildFn(chartDisplay, chartOptions.collection);

//     // Display table meta form
//     output.classList.add('in');
//     setTimeout(function() {
//       output.classList.add('show');
//     }, 100);
//   }

//   rangeOptions(ranges) {
//     const rangeAxis = document.getElementById('rangeAxis');
//     const rangeAverage = document.getElementById('rangeAverage');
//     const rangeLow = document.getElementById('rangeLow');
//     const rangeHigh = document.getElementById('rangeHigh');


//     // only populate if doesn't already have values
//     if (rangeAxis.options.length < 5) {
//       rangeAxis.options[rangeAxis.options.length] = new Option('Select a range', null, false, false);
//       rangeAverage.options[rangeAverage.options.length] = new Option('Select a range', null, false, false);
//       rangeLow.options[rangeLow.options.length] = new Option('Select a range', null, false, false);
//       rangeHigh.options[rangeHigh.options.length] = new Option('Select a range', null, false, false);
//     }

//     // create options
//     ranges.forEach(function (data, i) {
//       // only populate if doesn't already have values
//       if (rangeAxis.options.length < 5) {
//         rangeAxis.options[rangeAxis.options.length] = new Option(data, i, false, false);
//         rangeAverage.options[rangeAverage.options.length] = new Option(data, i, false, false);
//         rangeLow.options[rangeLow.options.length] = new Option(data, i, false, false);
//         rangeHigh.options[rangeHigh.options.length] = new Option(data, i, false, false);
//       }
//     });

//     rangeAxis.options[1].setAttribute("selected", true);
//     rangeAverage.options[2].setAttribute("selected", true);
//     rangeLow.options[3].setAttribute("selected", true);
//     rangeHigh.options[4].setAttribute("selected", true);
//   }

//   intervalOptions(ranges) {
//     const intervalLow = document.getElementById('intervalLow');
//     const intervalHigh = document.getElementById('intervalHigh');

//     // only populate if doesn't already have values
//     if (intervalLow.options.length < 5) {
//       intervalLow.options[intervalLow.options.length] = new Option('Select an interval', null, false, false);
//       intervalHigh.options[intervalHigh.options.length] = new Option('Select an interval', null, false, false);
//     }

//     // create options
//     ranges.forEach(function (data, i) {
//       // only populate if doesn't already have values
//       if (intervalLow.options.length < 5) {
//         intervalLow.options[intervalLow.options.length] = new Option(data, i, false, false);
//         intervalHigh.options[intervalHigh.options.length] = new Option(data, i, false, false);
//       }
//     });

//     intervalLow.options[1].setAttribute("selected", true);
//     intervalHigh.options[2].setAttribute("selected", true);
//   }
// };

// export default CsvConvert;