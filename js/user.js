$(document).ready(function(){
// If you have the auth token saved in offline storage, wanat to get my info this is how to do it

 var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
 headers = { "Authorization" : "Bearer " + authToken }
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
	alert('check your phone number!')
	
	phoneNumber=json.username
	window.localStorage.setItem('PHONENUMBER', phoneNumber);

}).fail(function(xhr, status, errorThrown) {
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
});



//I WANT TO LOGOUT heres how to do it
// If you have the auth token saved in offline storage
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
	alert('logged out successfully!')
	window.localStorage.setItem('isLoggedIn',false);
	// Handle Response
}).fail(function(xhr, status, errorThrown) {
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
});

})
