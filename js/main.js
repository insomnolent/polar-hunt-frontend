$(document).ready(function(){

var token;
var userId;

	var authURL="https://auth.conventionalize82.hasura-app.io/"
	var dataURL="https://data.conventionalize82.hasura-app.io/"
	//on register click
	$(Register).click(function(){
	//some ajax shit
	$.ajax({
		url: authURL='signup',
		method:'post',
		headers:{'Content-Type' : 'application/json'},
		data: JSON.stringify({
		"provider" : "username",
		"data": {
		"username" :$('#uname').val(), 
		"password" :$('#pwd').val()
		}
	})

	}).done(function(){
		//usr logged in here
		alert('user logged in');
	}).fail(function(data)){
		console.error(data);
		alert("fail :" +JSON.parse(data.responseText).message )
	});
//on click login 
$(login).click(function(){
//post request to login end pt

#.ajax({
	url: authUrl + 'login',
	method: 'post',
	headers: {'Content-Type': 'application/json'},
	data: JSON.stringify({
		"provider" : "username",
		"data": {
		"username" :$('#loginname').val(), 
		"password" :$('#loginpassword').val()
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