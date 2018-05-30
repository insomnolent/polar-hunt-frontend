$(document).ready(function(){
	var authURL="https://auth.conventionalize82.hasura-app.io/"
	var dataURL="https://data.conventionalize82.hasura-app.io/"
	//on register click
	$(Register).click(function(){
	//some ajax shit
	$.ajax({
		url: authURL='signup',
		method:'post',
		headers:{'Content-Type' : 'application/json'},
		data.JSON.stringify({
			"username": 'newusername',
			"password": 'newpassword'
		})

	}).done(function(){
		
	})
})
});