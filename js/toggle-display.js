function toggleDisplay(){
  var y = document.getElementsByClassName("logged");
  console.log(y);
  var login = window.localStorage.getItem('isLoggedIn');
  console.log(login)
  if (login === "true") {
    console.log("logged in");
    for (i = 0; i < y.length; i++) {
      y[i].style.display = "initial";
    }
  } else {
    console.log("not logged in");
    for (i = 0; i < y.length; i++) {
      y[i].style.display = "none";
    }
  }
};
