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

function showListBox(){
  const html = HtmlService.createHtmlOutput(`
  <div>
    <select id="list" multiple>
      <option value="いちご">いちご</option>
      <option value="りんご">りんご</option>
      <option value="ブルーベリー">ブルーベリー</option>
    </select>
  </div>
  <div>
   <label for="cell">Cell Id</label>
   <input type="text" id="cell" minlength="2" maxlength="2" size="10">
  </div>
  <div>
    <button onclick="submit()">決定</button>
  </div>
  <script>
    function submit() {
      const list = document.getElementById("list");
      const cell = document.getElementById("cell");
      const arr = [];
      for ( const item of list ) {
        if ( item.selected ) { arr.push(item.value); }
      }
      const cellId = cell.value;
      const opts = {
        cellId,
        items: arr.join(",")
        };
      google.script.run.setSelectedValues(opts);
      google.script.host.close();
    }
  </script>
  `);
  SpreadsheetApp.getUi().showModalDialog(html, "選択してください");
}

function setSelectedValues(opts){
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getActiveSheet();
  sheet.getRange(opts.cellId).setValue(opts.items);
}