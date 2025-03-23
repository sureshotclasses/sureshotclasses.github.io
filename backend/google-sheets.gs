// This file is not used. Google Apps Script runs online.
//   1XHGpfU6lupUHcWZTwozR_xXRiGysw5V43xrTKttWN-A

function doPost(e) {
  try {
    var requestData = JSON.parse(e.postData.contents);

    var sheetId = "1XHGpfU6lupUHcWZTwozR_xXRiGysw5V43xrTKttWN-A";  // 🔹 Hardcoded Google Sheet ID

    var sheet = SpreadsheetApp.openById(sheetId).getSheetByName("Sheet1");

    if (!sheet) {
      return sendCORSResponse({ result: "Error", message: "Sheet not found in the provided Google Sheet ID" });
    }

    sheet.appendRow([
      requestData.name, requestData.father_name, requestData.mother_name, requestData.address, 
      requestData.adhar, requestData.photo, requestData.study, requestData.mobile, requestData.email, new Date()
    ]);

    return sendCORSResponse({ result: "Success" });

  } catch (error) {
    return sendCORSResponse({ result: "Error", message: "Error Processing Request: " + error.message });
  }
}

// Handle GET Requests & Preflight OPTIONS Requests (Fix for CORS)
function doGet(e) {
  return sendCORSResponse({ result: "Success" });
}

// ✅ Fix CORS Headers for Google Apps Script
function sendCORSResponse(data) {
  var jsonResponse = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);

  var responseHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  for (var key in responseHeaders) {
    jsonResponse = jsonResponse.setHeader(key, responseHeaders[key]);
  }

  return jsonResponse;
}
