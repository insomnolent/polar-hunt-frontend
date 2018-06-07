// to rest the list
var resetList = document.getElementById('reset');
resetList.onclick = function() {
	// clear local storage
	localStorage.clear();
    
    // uncheck the items in checklist
    var itemsToFind = ["bear", "banana", "fountain", "computers", "flowers", "piano", "ice_cream", "stadium", "pizza", "tree", "books"];

    $(document).ready(function(){
        var list = "";
        for(i=0; i<itemsToFind.length; i++){
        	var item_id = "#" + itemsToFind[i];
    		$(item_id).remove();
        	list +="<li class='item' id='" + itemsToFind[i] + "'>" +itemsToFind[i]+"</li>";
	    }
	    $("#myUL").append(list);
	});
};

// to check storage for debugging purposes
// can also be used to tell other users how many things are still left to find
// var checkStorage = document.getElementById('checkStorage');
// checkStorage.onclick = function() {
//     console.log('local storage length', localStorage.length);
//     for (var i = 0; i < localStorage.length; i++){
//         console.log('localStorage key is ', localStorage.key(i));
//         console.log('localStorage pair is ', localStorage.getItem(localStorage.key(i)));
//     }
// };

// renders the list with found items checked
function renderList() {
    var itemsToFind = ["bear", "banana", "fountain", "computers", "flowers", "piano", "ice_cream", "stadium", "pizza", "tree", "books"];

	$(document).ready(function(){
        var list = "";

        for (k = 0; k < localStorage.length; k++) {
	        if (localStorage.getItem(localStorage.key(k))) {
	        	if (localStorage.key(k) != "isLoggedIn" &&
	        		localStorage.key(k) !=  "HASURA_AUTH_TOKEN" &&
	        		localStorage.key(k) != "PHONENUMBER")
	        	{
	    		list +="<li class='item checked' id='" + localStorage.key(k) + "'>" +localStorage.key(k)+"</li>";
	    		}
	    		var index = itemsToFind.indexOf(localStorage.key(k));
	    		if (index > -1) {
	    			itemsToFind.splice(index, 1);
	    		}
	    	} 
	    }

        for(i=0; i<itemsToFind.length; i++){
            // console.log(typeof localStorage.getItem(itemsToFind[i]));
        	if (localStorage.getItem(itemsToFind[i]) !== null) {
        		list +="<li class='item checked' id=" + itemsToFind[i] + ">" +itemsToFind[i]+"</li>";
        	} else {
        		list +="<li class='item' id=" + itemsToFind[i] + ">" +itemsToFind[i]+"</li>";
        	}
	    }

	    $("#myUL").append(list);

	});
}
renderList();
