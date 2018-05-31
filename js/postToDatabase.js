function processImageUploadText(sourceImageUrl, wordsInImage) {
    var subscriptionKey = "a047f43a043e47b4895258bbed161b5f";

    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

    // Request parameters.
    var params = {
        "visualFeatures": "Categories,Description,Color",
        "details": "",
        "language": "en",
    };

    // Display the image.
    //var sourceImageUrl = document.getElementById("inputImage").value;
    //document.querySelector("#sourceImage").src = sourceImageUrl;

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
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    }).done(function(response) {
        // Show formatted JSON on webpage.
        $("#responseTextArea").val(JSON.stringify(response, null, 2));
        console.log(response.description.captions[0].text);

        $.ajax({
            url: "https://data.conventionalize82.hasura-app.io/v1/query/",

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Authorization", "Bearer f533a6e4ab6d6787f9375a540cae4b85084297f455e82f77");
            },

            type: "POST",

            data: JSON.stringify({
                "type":"insert",
                "args":{
                    "table":"Photos",
                    "objects":[
                        {"URL": sourceImageUrl, "info": response.description.captions[0].text, "words": wordsInImage}
                    ]
                }
            })

        }).done(function(response) {
            console.log(response)

        }).fail(function(jqXHR, textStatus, errorThrown) {

            console.log(jqXHR, textStatus, errorThrown)
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });

};
