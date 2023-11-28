function doGet(e) {
  var spreadsheetId = '1gLT1JrKWtLaFRUPXkd7NTq4udVXCp3xtJAPzjFQ4L2M';
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var queryStr = e.queryString;


    function getCountryString(){
      if(queryStr){
        //assumes that there is one input value
        var arr = queryStr.split("=");
        var country = decodeURIComponent(arr[1]);
        return country;
      }
      return "null";
    }

    function getSubDivisions(countrycode) {
      var spreadsheetId = '1gLT1JrKWtLaFRUPXkd7NTq4udVXCp3xtJAPzjFQ4L2M';
      var targetSheet = 'countrystates';
      var q1 = 'select B where E="';
      var query = q1.concat(countrycode, '"');
      Logger.log(query)

      var ss = SpreadsheetApp.openById(spreadsheetId);
      var sheetId = ss.getSheetByName(targetSheet).getSheetId();
      var url = "https://docs.google.com/spreadsheets/d/" + spreadsheetId + "/gviz/tq?gid=" + sheetId + "&tqx=out:csv&tq=" + encodeURIComponent(query);
      var res = UrlFetchApp.fetch(url, {headers: {Authorization: "Bearer " + ScriptApp.getOAuthToken()}});
      var values = Utilities.parseCsv(res.getContentText());
      Logger.log(values)
      return ContentService.createTextOutput(JSON.stringify({'subdivisions': values})).setMimeType(ContentService.MimeType.JSON);
    }

    var countrycode = getCountryString(queryStr);
    Logger.log(countrycode)
    return getSubDivisions(countrycode);

}

