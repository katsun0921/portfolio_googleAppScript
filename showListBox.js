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

function doGet(pageName) {
  return HtmlService.createTemplateFromFile(pageName).evaluate();
}

function showListBox(){
  const html = HtmlService.createHtmlOutput(doGet("modal"));
  SpreadsheetApp.getUi().showModalDialog(html, "選択してください");
}

function setSelectedValues(opts){
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  sheet.getRange(opts.cellId).setValue(opts.items);
}
