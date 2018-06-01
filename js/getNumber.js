
/* The stuff here is related to obtaining, after a user is logged in, username = phone number
 */
 var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
 headers = { "Authorization" : "Bearer " + authToken }
  //console.log("Bearer "+authToken)
$.ajax({
    url: "https://auth.conventionalize82.hasura-app.io/v1/user/info",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer "+authToken
    },
    data: JSON.stringify(null),
    type: "GET",
    dataType: "json"
}).done(function(json) {
    // Handle Response
    alert('test phone # stored')
    
    
     var phoneNumber =json.username;
    window.localStorage.setItem('PHONENUMBER', phoneNumber);

}).fail(function(xhr, status, errorThrown) {
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
});
