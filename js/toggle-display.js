var login = window.localStorage.getItem('isLoggedIn');

$(document).ready ( function(){
   if (login) {
     console.log("In thingy");
   //now show all the previously hidden pages
   document.getElementById("capture").style.display = "initial";
   document.getElementById("gallery").style.display = "initial";
   document.getElementById("map").style.display = "initial";
   document.getElementById("logout").style.display = "initial";
   }
   else {
     console.log("notloggedin");
   }
})
