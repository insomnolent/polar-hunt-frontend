var upload_btn = document.getElementById('file_submit');
var file_input = document.getElementById('file_input');


upload_btn.onclick = function () {
    if (! (file_input || file_input.files || file_input.files[0])) {
        upload_btn.innerHTML = 'Please select a file and try again';
        return;
    }
    var url = "https://filestore.conventionalize82.hasura-app.io/v1/file/";

    var file = file_input.files[0];
    var requestOptions = {
        method: 'POST',
        body: file,
        headers: {
          "Authorization": "Bearer 26f356ffccdf9f7bf02d3e1dce92bf28b0e12b37437be2cd"
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
           return response.json();
       })
       .then(function(data) {
          fileId = data.file_id;
          url = url + fileId;
          processImage(url);

       })
       .catch(function(error) {
           alert('Upload failed:' + error);
       });

};

// Computer Vision API

function getDescription(url) {
    var subscriptionKey = "a047f43a043e47b4895258bbed161b5f";

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
    $('#img-card').attr('style','visibility: visible');


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
        var label = data.description.captions[0].text;
        // Show formatted JSON on webpage.

        $("#descriptionTextArea").text(label);
        $('#desc-card').addClass('animated slideInRight');
        $('#desc-card').attr('style','visibility: visible');
        // $("#description1").val(label);
        // $("#description2").val(label);
        // $("#description3").val(label);
        // $("#description4").val(label);

        //var dataS = JSON.stringify(data);

        // remove text-to-speech for now
        // 
        // var msg = new SpeechSynthesisUtterance(label);
        // window.speechSynthesis.speak(new SpeechSynthesisUtterance("Image Description"));
        // window.speechSynthesis.speak(msg);
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
};

function getImageText(url) {
    var subscriptionKey = "6c800afb97194ac8ab0147ec640967ac";

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
        $('#text-card').attr('style','visibility: visible');


        // remove text-to-speech for now
        //
        // if (text.length > 0) {
        //     window.speechSynthesis.speak(new SpeechSynthesisUtterance("Here are the words in this image."));
        //     var msg = new SpeechSynthesisUtterance(text);
        //     window.speechSynthesis.speak(msg);
        //     console.log("words in image are", text);
        //     processImageUploadText(url, text);
        // } else {
        //     var msg = new SpeechSynthesisUtterance("There are no words in this image.");
        //     window.speechSynthesis.speak(msg);
        // }
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
    getImageText(url);
}
