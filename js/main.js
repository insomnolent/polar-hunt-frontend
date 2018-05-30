$(document).ready(function(){

var token;
var userId;

	var authURL="https://auth.conventionalize82.hasura-app.io/v1/"
	var dataURL="https://data.conventionalize82.hasura-app.io/v1/"




$.ajax({
	url: "https://auth.conventionalize82.hasura-app.io/v1/signup",
	contentType: "application/json",
	data: JSON.stringify({
      "provider": "username",
      "data": {
            "username": "johnsmiths",
            "password": "js@hasura"
      }
	}),
	type: "POST",
	dataType: "json"
}).done(function(json) {
	// Handle Response
	// To save the auth token received to offline storage
	// var authToken = result.auth_token
	// window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
}).fail(function(xhr, status, errorThrown) {
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
});





	//on register click
	$(create).click(function(){
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
//on click login 
$(login).click(function(){
//post request to login end pt

$.ajax({
	url: authUrl + 'login',
	method: 'post',
	headers: {'Content-Type': 'application/json'},
	data: JSON.stringify({
		"provider" : "username",
		"data": {
		"username" :$("#loginname").val(), 
		"password" :$("#loginpassword").val()
		}
	})
}).done(function(data){
	token=data.auth_token;
	userId=data.hasura_id;
	userRoles=data.hasura_roles;
	//redirect to app
	window.location='/app';



	//some expire time shit and cookies
	var d= new Date();
	d.setTime(d.getTime() + (1*24*60*60*1000));
	var expires= "expires" + d.toUTCString();
	document.cookie="cookie_name"+ "=" +token +" ;"+ expires + ";path=/";

})
});

})

}); 