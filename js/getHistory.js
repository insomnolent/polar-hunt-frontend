var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    x[slideIndex-1].style.display = "block";  
    }

    // If you have the auth token saved in offline storage
    // var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
    // headers = { "Authorization" : "Bearer " + authToken }
    $.ajax({
        url: "https://data.conventionalize82.hasura-app.io/v1/query",
        contentType: "application/json",
        headers: {
          "Authorization": "Bearer 26f356ffccdf9f7bf02d3e1dce92bf28b0e12b37437be2cd"
        },
        data: JSON.stringify({
          "type": "select",
          "args": {
                "table": {
                      "schema": "hf_catalog",
                      "name": "hf_file"
                },
                "columns": [
                      "*"
                ]
          }
        }),
        type: "POST",
        dataType: "json"
    }).done(function(json) {
        // console.log("JSON IS", json);
        var url = "https://filestore.conventionalize82.hasura-app.io/v1/file/";
        // Handle Response
        if (json.length == 0) {
            $("#no-hist").attr('style','visibility: visible');
            $("#picture1").attr('style','visibility: hidden');
            // $("#description1").attr('style','visibility: hidden');
        } else {
            url += json[json.length-1].file_id;
            document.querySelector("#picture1").src=url;
        }

    }).fail(function(xhr, status, errorThrown) {
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
});

function noWords(words) {
    if (words.length == 0) {
        return "No words";
    } else {
        return words;
    }
}

// headers = { "Authorization" : "Bearer " + authToken }
$.ajax({
    url: "https://data.conventionalize82.hasura-app.io/v1/query",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer 26f356ffccdf9f7bf02d3e1dce92bf28b0e12b37437be2cd"
    },
    data: JSON.stringify({
      "type": "select",
      "args": {
            "table": "Photos",
            "columns": [
                  "info",
            ]
      }
    }),
    type: "POST",
    dataType: "json"
}).done(function(json) {
    if (json.length == 0) {
        $("#description1").attr('style','visibility: hidden');
    } else {
        var text = json[json.length-1].info;
        $("#description1").text(text);
    }
}).fail(function(xhr, status, errorThrown) {
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
});

var resetList = document.getElementById('resetList');

resetList.onclick = function() {

}