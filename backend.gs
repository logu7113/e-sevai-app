
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Entry");
  if (!sheet) return ContentService.createTextOutput("No sheet found");

  sheet.appendRow([
    e.parameter.date,
    e.parameter.wallet,
    e.parameter.closing,
    e.parameter.note,
    e.parameter.userCode,
    e.parameter.staffName
  ]);

  return ContentService.createTextOutput("Success");
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Entry");
  const data = sheet.getDataRange().getValues();

  const jsonData = [];
  for (let i = 1; i < data.length; i++) {
    jsonData.push({
      date: data[i][0],
      wallet: data[i][1],
      closing: data[i][2],
      note: data[i][3],
      userCode: data[i][4],
      staffName: data[i][5]
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}
