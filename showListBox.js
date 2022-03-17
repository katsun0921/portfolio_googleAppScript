function doGet(fileName) {
  return HtmlService.createTemplateFromFile(fileName).evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function showListBox(){
  const html = HtmlService.createHtmlOutput(doGet("Modal"));
  SpreadsheetApp.getUi().showModalDialog(html, "選択してください");
}

function setSelectedValues(opts){
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  sheet.getRange(opts.cellId).setValue(opts.items);
}

function getValue() {
  const skillData = getCellData("Skill", "C2:C30");
  const companyData = getCellData("workExpress", "B2:B20");

  const value = {skillData, companyData}
  return value;
}

function getCellData(sheetName, cellRange) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);
  const range = sheet.getRange(cellRange);
  let data = [];
  for (let i = 0; i < range.getValues().length; i++) {
    let cell = {
      name: "",
      row: ""
    }
    if (!!range.getValues()[i][0]) {
      cell.name = range.getValues()[i][0];
      cell.row = range.getCell(1 + i,1).getRow();
      data.push(cell);
    }
  }
  return data;
}
