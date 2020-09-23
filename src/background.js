var fileContentType     = null;
var fileRequestBody     = null;
var fileRequestName     = null;
var originalUrl         = null;
var originalMethod      = null;
var originalType        = null;
var originalRequest     = null;
const REBUILD_URL       = 'https://8oiyjy8w63.execute-api.us-west-2.amazonaws.com/Prod/api/rebuild/base64';
const REBUILD_API_KEY   = 'dp2Ug1jtEh4xxFHpJBfWn9V7fKB3yVcv60lhwOAG';
var inProcess           = false;

chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
        console.log('inProcess = '+inProcess)
        if(isRebuildRequest(details) == true || inProcess == true){
            return;
        }
        var initiator               = details.initiator;
        if(initiator != null && initiator.indexOf("localhost:8080") > -1 ){
            console.log('Request Details '+JSON.stringify(details))
         }
         originalUrl                = details.url;
         originalMethod             = details.method;
         originalType               = details.type;
         var body                   = details.requestBody;
         if(body != null){
             if(body.hasOwnProperty("formData")){
                inProcess = true;
                var rawBody         = body["formData"];
                if(rawBody.hasOwnProperty("file") && rawBody.hasOwnProperty("name")){
                    fileRequestBody    = rawBody["file"][0];
                    fileRequestName    = rawBody["name"];
                    console.log('============= Body Captured ==================');
                    console.log('fileRequestName = '+fileRequestName);
                    console.log('fileRequestBody = '+fileRequestBody);
                    console.log('originalUrl = '+originalUrl);
                    console.log('originalMethod = '+originalMethod);
                    console.log('originalType = '+originalType);
                    console.log('============= End Body ==================');
                     const data      = JSON.stringify({
                                            Base64: fileRequestBody
                                        });
                    sendHttpRequestAsync(REBUILD_URL,'POST',data,rebuildCallback)
                }
             }
         }
        },
        {urls: ["<all_urls>"]},
        ["requestBody","extraHeaders"]);


/*chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
        if(isRebuildRequest(details) == true){
            return;
        }
        var initiator               = details.initiator;
        if(initiator != null && initiator.indexOf("localhost:8080") > -1 ){
          console.log('Header Details '+JSON.stringify(details))
          }
          for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'Content-Type') {
              var contentType = details.requestHeaders[i].value;
              if(contentType.indexOf("multipart/form-data") > -1){
                fileContentType = contentType;
                console.log('============= Header Captured ==================');
                console.log('fileRequestName = '+fileRequestName);
                console.log('fileRequestBody = '+fileRequestBody);
                console.log('originalUrl = '+originalUrl);
                console.log('originalMethod = '+originalMethod);
                console.log('originalType = '+originalType);
                console.log('============= End Header ==================');
                if(originalUrl !== null && fileRequestBody != null && fileRequestName != null && originalMethod != null){
                    // Needs rebuild
                const data      = JSON.stringify({
                                        Base64: fileRequestBody
                                    });
                const headers = {
                    'Content-Type'  : 'application/json',
                    'x-api-key'     : REBUILD_API_KEY
                }
                console.log('data - '+data)
                sendHttpRequestAsync(REBUILD_URL,'POST',data,rebuildCallback)
                }
              }
              break;
            }
          }
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]);

*/

function rebuildCallback(statusAndResponse){
    console.log('Rebuilt response status - '+statusAndResponse[0])
    console.log('Rebuilt response body - '+statusAndResponse[1])
    if(statusAndResponse[0] == 200 && statusAndResponse[1] != null && statusAndResponse[1] != undefined){
        invokeOriginalHttp(statusAndResponse[1])
    }
}

function invokeOriginalHttp(rebuiltFile){
    var formData = new FormData();
	formData.append("file", rebuiltFile);
	formData.append("name", fileRequestName);
	var request = new XMLHttpRequest();
    request.open(originalMethod, originalUrl);
    request.send(formData);
    inProcess = false;
}

function isRebuildRequest(details){
    var requestString = JSON.stringify(details);
    console.log("requestString "+requestString);
    if(requestString.indexOf(REBUILD_URL) == -1){
        console.log("isRebuildRequest false");
        return false;
    }
    console.log("isRebuildRequest true");
    return true;
}

function sendHttpRequestAsync(url,method,body,callback){
	console.log('sendhttpRequestAsync [IN] url - '+url+',method - '+method+', body - '+body);
	var statusAndResponse = new Array(2);
	if(method == 'GET'){
		var xmlhttp;
		if (window.XMLHttpRequest){
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}
		else{
			// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && (xmlhttp.status==200 || xmlhttp.status==201)){
				response = xmlhttp.responseText;
				statusAndResponse[0] = xmlhttp.status;
				statusAndResponse[1] = response;
				console.log('Done. Status '+xmlhttp.status
						+", "+statusAndResponse[0]+", "+statusAndResponse[1]);
				//return statusAndResponse;
				callback(statusAndResponse);
			}
			else{
				statusAndResponse[0] = xmlhttp.status;
				//return statusAndResponse;
				console.log('Error retrieving URL. Status state  '+xmlhttp.readyState+','+xmlhttp.status
						+", "+xmlhttp.responseText);
				//callback(statusAndResponse);
			}
		}
		xmlhttp.open("GET",url+'?t='+ Math.random(),true);
		xmlhttp.setRequestHeader("Accept", "application/json");
		xmlhttp.send();
	}
	if(method == 'POST' || method == 'PUT'){
		var xmlhttp;
		if (window.XMLHttpRequest){
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}
		else{
			// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && (xmlhttp.status==200 || xmlhttp.status==201)){
				response = xmlhttp.responseText;
				statusAndResponse[0] = xmlhttp.status;
				statusAndResponse[1] = response;
				//console.log('Done. Status '+xmlhttp.status+", "+statusAndResponse[0]+", "+statusAndResponse[1]);
				//return statusAndResponse;
				callback(statusAndResponse);
			}
			else{
				statusAndResponse[0] = xmlhttp.status;
				// return statusAndResponse;
				console.log('Error retrieving URL. Status '+xmlhttp.status+", "+statusAndResponse);
				callback(statusAndResponse);
			}
		}
		xmlhttp.open(method,url+'?t='+ Math.random(),true);
		xmlhttp.crossDomaintrue = true;
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.setRequestHeader("x-api-key",       REBUILD_API_KEY);
		xmlhttp.send(body);
	}
}
