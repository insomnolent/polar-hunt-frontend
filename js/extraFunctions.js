// window.onload = function() {

// Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");

// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }


// long list of IDs for each thing cause I don't know how to JS

// var fountain_found = document.getElementById('fountain');
// fountain_found.onclick = function() {
// $("#fountain").attr('class', 'item checked');
// };
// var computers_found = document.getElementById('computers');
// computers_found.onclick = function() {
// $("#computers").attr('class', 'item checked');
// };
// var flowers_found = document.getElementById('flowers');
// flowers_found.onclick = function() {
// $("#flowers").attr('class', 'item checked');
// };
// var piano_found = document.getElementById('piano');
// piano_found.onclick = function() {
// $("#piano").attr('class', 'item checked');
// };
// var ice_cream_found = document.getElementById('ice_cream');
// ice_cream_found.onclick = function() {
// $("#ice_cream").attr('class', 'item checked');
// };
// var stadium_found = document.getElementById('stadium');
// stadium_found.onclick = function() {
// $("#stadium").attr('class', 'item checked');
// };
// var pizza_found = document.getElementById('pizza');
// pizza_found.onclick = function() {
// $("#pizza").attr('class', 'item checked');
// };
// var tree_found = document.getElementById('tree');
// tree_found.onclick = function() {
// $("#tree").attr('class', 'item checked');
// }
// var books_found = document.getElementById('books');
// books_found.onclick = function() {
// $("#books").attr('class', 'item checked');
// }


// Create a new list item when clicking on the "Add" button
// maybe something we can do later with different permission users

// function newElement() {
// 	var li = document.createElement("li");
// 	var inputValue = document.getElementById("myInput").value;
// 	var t = document.createTextNode(inputValue);
// 	li.appendChild(t);
// 	if (inputValue === '') {
// 	  alert("You must write something!");
// 	} else {
// 	  document.getElementById("myUL").appendChild(li);
// 	}
// 	document.getElementById("myInput").value = "";

// 	var span = document.createElement("SPAN");
// 	var txt = document.createTextNode("\u00D7");
// 	span.className = "close";
// 	span.appendChild(txt);
// 	li.appendChild(span);

// 	for (i = 0; i < close.length; i++) {
// 	  close[i].onclick = function() {
// 		var div = this.parentElement;
// 		div.style.display = "none";
// 	  }
// 	}
// }