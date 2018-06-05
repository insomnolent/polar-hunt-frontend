$(document).ready(function(){
  var logoutAlert = document.getElementById("user-logout");
  var logoutHTML = logoutAlert.innerHTML;

  $(logoutbutton).click(function() {
    var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
    headers = { "Authorization" : "Bearer " + authToken }

    $.ajax({
	     url: "https://auth.conventionalize82.hasura-app.io/v1/user/logout",
	     contentType: "application/json",
	     headers: {
         "Authorization": "Bearer " +authToken
	     },
	     data: JSON.stringify(null),
	     type: "POST",
	     dataType: "json"
    }).done(function(json) {
       window.localStorage.setItem('isLoggedIn', false);
       window.localStorage.removeItem('HASURA_AUTH_TOKEN');
       window.location = 'index.html';
	  // Handle Response
  }).fail(function(data, xhr, status, errorThrown) {
       logoutAlert = document.getElementById("user-logout");
       logoutAlert.innerHTML = JSON.parse(data.responseText).message + logoutHTML;
       logoutAlert.style.display = "inherit";
	     console.log("Error: " + errorThrown);
	     console.log("Status: " + status);
	     console.dir(xhr);
    });
  });
})

function dismissLogoutAlert() {
    document.getElementById("user-logout").style.display = "none";
}
