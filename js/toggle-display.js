function toggleDisplay(callback){
   var login = window.localStorage.getItem('isLoggedIn');
   console.log(login);
   callback(login);
};

function fuckthis(login) {
  var y = document.getElementsByClassName("logged");
  console.log(y);
  if (login === "true") {
    console.log(login);
    console.log("logged in");
    for (i = 0; i < y.length; i++) {
      y[i].style.display = "initial";
    }
  } else {
    console.log(login);
    console.log("not logged in");
    for (i = 0; i < y.length; i++) {
      y[i].style.display = "none";
    }
  }
}
