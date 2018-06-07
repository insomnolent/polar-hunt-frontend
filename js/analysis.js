var upload_btn = document.getElementById('file_submit');
var file_input = document.getElementById('file_input');

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
}


upload_btn.onclick = function () {
    if (! (file_input || file_input.files || file_input.files[0])) {
        upload_btn.innerHTML = 'Please select a file and try again';
        return;
    }
    /*Fixed the authtoken thing for up here as well so its not a hard-coded user but from localStorage.getItem instead.*/
    var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
    // var number = window.localStorage.getItem('PHONENUMBER');

    var url = "https://filestore.conventionalize82.hasura-app.io/v1/file/";

    var file = file_input.files[0];
    var requestOptions = {
        method: 'POST',
        body: file,
        headers: {
          "Authorization": "Bearer "+authToken
        },
        // By default, the session cookie is automatically used!
        credentials: 'include'
    };
    upload_btn.innerHTML = 'Uploading...';
    var fileId;

    fetch(url, requestOptions)
        .then(function(response) {
           upload_btn.innerHTML = 'Uploaded!';

           //window.location.reload();
/*
           //using sms global
           var client = new HttpClient();
			client.get('https://api.smsglobal.com/http-api.php?action=sendsms&user=m9dkkcsc&password=TixAHt7N&&from=Hello&to=16692516002&text=Hello%20world', function(response) {
    		// do something/nothing with response
			});
*/
			//using swift sms gateway
// 'https://secure.smsgateway.ca/SendSMS.aspx?CellNumber=16692516002&AccountKey=q38Y1fUBqc80IhY00p34n02Xn48Ldzm2&MessageBody="Your photo has been uploaded successfully!"'

			// var baseURL = 'https://secure.smsgateway.ca/SendSMS.aspx?'
			// var accountKey = 'q38Y1fUBqc80IhY00p34n02Xn48Ldzm2'
			// var destinationNumber = number
			// var message = '"Your photo has been uploaded successfully!"'
			// var targetURL = baseURL + 'CellNumber=' + destinationNumber + '&AccountKey='
			// 			+ accountKey + '&MessageBody=' + message
   //         var client = new HttpClient();
			// client.get(targetURL, function(response) {
   //  			// do something/nothing with response
			// });

/*
            //testing twilio...
            $.ajax({
                   url:"twilio.py"
            });
*/
           return response.json();
       })
       .then(function(data) {
          fileId = data.file_id;
          url = url + fileId;
           getDescription(url);

       })
       .catch(function(error) {
           alert('Upload failed:' + error);
       });

};

// these are terribly organized because files should be split apart but oh well
// the following 3 functions are all related to only the checklist

/////////////////////////
// Checklist Functions //
/////////////////////////

// check if word is on checklist and if it is mark as checked
function checkOffItem(wordFound) {
    var item = "";
    var item_found;
    var number = window.localStorage.getItem('PHONENUMBER');
    //notify the user with SMS Gateway
	var baseURL = 'https://secure.smsgateway.ca/SendSMS.aspx?'
	var accountKey = '7ebfcee67ea4452db82b8a620cc81f70'
	var destinationNumber = number
	var message = "You just found a " + wordFound + "!"
	// var message = '"Your photo has been uploaded successfully!"'
	var targetURL = baseURL + 'CellNumber=' + destinationNumber + '&AccountKey='
				+ accountKey + '&MessageBody=' + message

    //using textlocal Messenger
    var baseURL2 = 'https://api.txtlocal.com/send/?'
    // var accountKey2 = 'k8lyS53WV04-q8I5tpghwhUK2a2zjwxtgpfYTlTEjh'
    //use this one later: 
    var destinationNumber2 = '1'+number
    var message2 = message
    var targetURL2 = baseURL2 + 'apikey=' + accountKey2 + '&numbers='
                + destinationNumber2 + '&message=' + message + '&sender=BearHunt'


   var client = new HttpClient();

   //use SMS Gateway
	// client.get(targetURL, function(response) {
	// 	// do something/nothing with response
	// });

    //or use textlocal
    client.get(targetURL2, function(response) {
        // do something/nothing with response
    });


    switch (wordFound) {
        case "bear":
            item = "bear";
            break;
        case "banana":
            item = "banana";
            break;
        case "bananas":
            item = "banana";
            break;
        case "fountain":
            item = "fountain";
            break;
        case "computer":
            item = "computers";
            break;
        case "computers":
            item = "computers";
            break;
        case "flower":
            item = "flowers";
            break;
        case "flowers":
            item = "flowers";
            break;
        case "piano":
            item = "piano";
            break;
        case "ice_cream":
            item = "ice_cream";
            break;
        case "stadium":
            item = "stadium";
            break;
        case "pizza":
            item = "pizza";
            break;
        case "tree":
            item = "tree";
            break;
        case "trees":
            item = "tree";
            break;
        case "books":
            item = "books";
            break;
        case "books":
            item = "books";
            break;
    };
    var item_found = document.getElementById(`${item}`);
    var item_id= "#" + `${item}`;
    $(`${item_id}`).attr('class', 'item checked');
    localStorage.setItem(`${item}`, true);
};


// check if text description contains an item word
function parseOutput(text) {
    text = text.toLowerCase();
    var wordsInText = text.split(" ");
    var itemWords = ["bear", "banana", "bananas", "fountain", "computer", "computers", "flower", "flowers", "piano", "ice_cream", "stadium", "pizza", "tree", "trees", "book", "books"];

    itemWords.forEach(function(element) {
        if (wordsInText.indexOf(element) > -1) {
            checkOffItem(element);
        }
    });

};


/////////////////////////
// Computer Vision API //
/////////////////////////

// gets description of picture
function getDescription(url) {
    var subscriptionKey = "b15fb91cceb144bba6c26757acd14956";

    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze";

    // Request parameters.
    var params = {
        "visualFeatures": "Categories,Description,Color",
        "details": "",
        "language": "en",
    };

    // Display the image.
    document.querySelector("#sourceImage").src = url;
    // $("#img-card").fadeIn(200);
    $('#img-card').addClass('animated slideInLeft');
    $('#img-card').attr('style','display: inherit');


    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + url + '"}',
    })

    .done(function(data) {
        console.log('see description');
        console.log(JSON.stringify(data, null, 2));

        // Show formatted JSON on webpage.
        $("#responseTextArea").val(JSON.stringify(data, null, 2));

        var label = data.description.captions[0].text;
        console.log('description', label);

        // send to function in checklist.js to see if photo matches any words
        parseOutput(label);


        /*small change to not get a hard-coded user auth token*/
         var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');

        // post url and description to the database
        $.ajax({
            url: "https://data.conventionalize82.hasura-app.io/v1/query/",

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Authorization", "Bearer "+authToken);
            },

            type: "POST",

            data: JSON.stringify({
                "type":"insert",
                "args":{
                    "table":"Photos",
                    "objects":[
                        {"URL": url, "info": label}
                    ]
                }
            })

        }).done(function(response) {
            console.log(response)

        }).fail(function(jqXHR, textStatus, errorThrown) {

            console.log(jqXHR, textStatus, errorThrown)
        });


        $("#descriptionTextArea").text(label);
        $('#desc-card').addClass('animated slideInRight');
        $('#desc-card').attr('style','display: inherit');

        //var dataS = JSON.stringify(data);
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
};

// get words from picture but for now not necessary
// so I guess everything below here isn't necessary lmao

function getImageText(url) {
    var subscriptionKey = "b15fb91cceb144bba6c26757acd14956";

    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr";

    // Request parameters.
    var params = {
        "language": "unk",
        "detectOrientation ": "true",
    };

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(jqXHR){
            jqXHR.setRequestHeader("Content-Type","application/json");
            jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + url + '"}',
    })

    .done(function(data) {

        var wordArr = [];
        data.regions.forEach(regionObj => {
            regionObj.lines.forEach(lineObj => {
                lineObj.words.forEach(wordObj => {
                    // console.log(wordObj.text)
                    wordArr.push(wordObj.text)
                })
            })
        })

        var text = wordArr.join(' ');

        // Show formatted JSON on webpage.

        $("#textTextArea").text(text);
        if (text.length == 0) {
            $("#textTextArea").text("(No text detected in image)");
        }
        //$("#text-card").fadeIn(200);
        $('#text-card').addClass('animated slideInRight');
        $('#text-card').attr('style','display: inherit');
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
            jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
    });
};

function processImage(url) {
    getDescription(url);
    // getImageText(url);
};