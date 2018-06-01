$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$(document).ready(function(){

	var token;
	var userId;

	var authURL="https://auth.conventionalize82.hasura-app.io/v1/"
	var dataURL="https://data.conventionalize82.hasura-app.io/v1/"

	toggleDisplay(fuckthis);

	$(create).click(function() {
  	$.ajax({
    	url: "https://auth.conventionalize82.hasura-app.io/v1/signup",
    	contentType: "application/json",
    	data: JSON.stringify({
      	"provider": "username",
      	"data": {
        	"username": $("#uname").val(),
        	"password": $("#pwd").val()
      	}
    	}),
    	type: "POST",
    	dataType: "json"
  	}).done(function(json) {
    	alert('user created');
    	// Handle Response
    	// To save the auth token received to offline storage
    	var authToken = result.auth_token
    	window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
  	}).fail(function(json, xhr, status, errorThrown) {
    	alert('failed to create an account, please try again: ' + JSON.parse(json.responseText).message);
    	console.log("Error: " + errorThrown);
    	console.log("Status: " + status);
    	console.dir(xhr);
  	});
	}); //creating user

	//on click login
	$(login).click(function() {
  	//post request to login end pt
  	$.ajax({
    	url: "https://auth.conventionalize82.hasura-app.io/v1/login",
    	contentType: "application/json",
    	data: JSON.stringify({
      	"provider": "username",
      	"data": {
        	"username": $("#loginname").val(),
        	"password": $("#loginpassword").val()
      	}
    	}),
    	type: "POST",
    	dataType: "json"
  	}).done(function(data) {
			window.localStorage.setItem('isLoggedIn', true);
			toggleDisplay(fuckthis);
    	token = data.auth_token;
    	userId = data.hasura_id;
    	userRoles = data.hasura_roles;
    	//redirect to app
    	alert('User logged in');
    	window.location = 'capture.html';
  	}).fail(function(data, xhr, status, errorThrown) {
    	alert('failed to login, please try again! The error was ' + JSON.parse(data.responseText).message);
    	console.log("Error: " + errorThrown);
    	console.log("Status: " + status);
    	console.dir(xhr);
			window.localStorage.setItem('isLoggedIn', false);
			toggleDisplay(fuckthis);
  	});
	}); //login
}) //document.ready
