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
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  const range = sheet.getRange("Skill!B2:B7");
  const value = range.getValues();
  return value;
}
