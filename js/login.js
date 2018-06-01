$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$(document).ready(function(){

	var token;
	var userId;


  var loginAlert = document.getElementById("user-login");
  var creationAlert = document.getElementById("user-creation");
  var loginHTML = loginAlert.innerHTML;
  var creationHTML = creationAlert.innerHTML;

	var authURL="https://auth.conventionalize82.hasura-app.io/v1/"
	var dataURL="https://data.conventionalize82.hasura-app.io/v1/"

	toggleDisplay();

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
      creationAlert = document.getElementById("user-creation");
      creationAlert.setAttribute("class", "alert alert-success");
      creationAlert.innerHTML = "User creation successful!" + creationHTML;
      creationAlert.style.display = "inherit";
    	alert('user created');
    	// Handle Response
    	// To save the auth token received to offline storage
    	var authToken = result.auth_token
    	window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
  	}).fail(function(json, xhr, status, errorThrown) {
      creationAlert = document.getElementById("user-creation");
      creationAlert.innerHTML = JSON.parse(json.responseText).message + creationHTML;
      creationAlert.style.display = "inherit";
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
			toggleDisplay();
    	token = data.auth_token;
      window.localStorage.setItem('HASURA_AUTH_TOKEN', token);
    	userId = data.hasura_id;
    	userRoles = data.hasura_roles;
    	window.location = 'capture.html';
  	}).fail(function(data, xhr, status, errorThrown) {
      loginAlert = document.getElementById("user-login");
      loginAlert.innerHTML = JSON.parse(data.responseText).message + loginHTML;
      loginAlert.style.display = "inherit";
    	console.log("Error: " + errorThrown);
    	console.log("Status: " + status);
    	console.dir(xhr);
			window.localStorage.setItem('isLoggedIn', false);
			toggleDisplay();
  	});
	}); //login
}); //document.ready

function dismissLoginAlert() {
    document.getElementById("user-login").style.display = "none";
}

function dismissCreationAlert() {
    document.getElementById("user-creation").style.display = "none";
}
