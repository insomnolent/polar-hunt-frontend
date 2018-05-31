$(document).ready(function(){

var token;
var userId;

	var authURL="https://auth.conventionalize82.hasura-app.io/v1/"
	var dataURL="https://data.conventionalize82.hasura-app.io/v1/"



$(create).click(function(){
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
}).fail(function(xhr, status, errorThrown) {
	alert('failed to create an account, please try again')
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
	alert("fail :" +JSON.parse(json.responseText).message);

});
});




	//on register click
/*	$(create).click(function()
	{
	//some ajax shit
	$.ajax({
		url: authURL+'signup',
		method:'post',
		headers:{'Content-Type' : 'application/json'},
		payload: JSON.stringify({
		"provider" : "user",
		"data": {
		"username" : $("#uname").val(),
		"password" : $("#pwd").val()
		}
	})

	}).done(function(){
		//usr logged in here
		alert('user logged in');
	}).fail(function(payload) {
		console.log(payload)
		console.error(payload);
		alert("fail :" +JSON.parse(payload.responseText).message);
	});
*/
//on click login
$(login).click(function(){
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
}).done(function(data){

	token=data.auth_token;
	userId=data.hasura_id;
	userRoles=data.hasura_roles;
	//redirect to app
	alert('User logged in');
	window.location='https://insomnolent.github.io/polar-hunt-frontend/capture.html';

	//some expire time shit and cookies
	//var d= new Date();
	//d.setTime(d.getTime() + (1*24*60*60*1000));
	//var expires= "expires" + d.toUTCString();
	//document.cookie="cookie_name"+ "=" +token +" ;"+ expires + ";path=/";

}).fail(function(xhr, status, errorThrown) {
		alert('failed to login, please try again!')
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
	alert("fail :" +JSON.parse(data.responseText).message);

});

});

// If you have the auth token saved in offline storage, wanat to get my info this is how to do it
/*
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
	// Handle Response
}).fail(function(xhr, status, errorThrown) {
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
});
*/


})

//});
