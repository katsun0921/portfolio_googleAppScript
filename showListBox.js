const FUNC_NAME = "showListBox";

function init() {
  try{
    // 現在登録されているトリガー一覧を取得
    let triggers = ScriptApp.getProjectTriggers();
    // "hoge" という関数がトリガーに登録されているかチェック
    let target = triggers.findIndex(trigger => trigger.getHandlerFunction() === FUNC_NAME);

    if(target !== -1) {
      Browser.msgBox('It has already initialized.');
      return 0;
    }

    let spreadsheet = SpreadsheetApp.getActive();
    // トリガーを設定
    ScriptApp.newTrigger(FUNC_NAME)
    .forSpreadsheet(spreadsheet)
    .onEdit()
    .create();

  }catch(e){
    // エラー
    Logger.log(e);
    Browser.msgBox('Initialization failed: ' + e);
  }
}

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
  const skillData = getSkill();
  const companyData = getCompany();

  const value = {skillData, companyData}
  return value;
}

function getSkill() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName("Skill");
  const skills = sheet.getRange("C2:C7");
  let data = [];
  for (let i = 0; i < skills.getValues().length; i++) {
    let skill = {
      name: "",
    }
    if (!!skills.getValues()[i][0]) {
      skill.name = skills.getValues()[i][0];
      data.push(skill);
    }
  }
  return data;
}

function getCompany() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName("workExpress");
  const companies = sheet.getRange("B2:B7");
  let data = [];
  for (let i = 0; i < companies.getValues().length; i++) {
    let company = {
      name: "",
      row: ""
    }
    if (!!companies.getValues()[i][0]) {
      company.name = companies.getValues()[i][0];
      company.row = companies.getCell(1 + i,1).getRow();
      data.push(company);
    }
  }
  return data;
}
