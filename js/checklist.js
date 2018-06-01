// to reset the list
// var resetList = document.getElementById('resetList');

// resetList.onclick = function() {
//      $(".item").attr('class', 'item');
// };

var resetList = document.getElementById('reset');

resetList.onclick = function() {
    console.log('hopefully cleared localStorage');
    localStorage.clear();
};


var checkStorage = document.getElementById('checkStorage');

checkStorage.onclick = function() {
    console.log('local storage length', localStorage.length);
    for (var i = 0; i < localStorage.length; i++){
        console.log('localStorage key is ', localStorage.key(i));
        console.log('localStorage pair is ', localStorage.getItem(localStorage.key(i)));
    }
};

//var renderList = document.getElementById('#myUL');
function renderList() {
    // var item_found = document.getElementById(`${item}`);
    // var item_id= "#" + `${item}`;
    // console.log('does it reach here', item_id);
    // $(`${item_id}`).attr('class', 'item checked');

    var itemsToFind = ["bear", "banana", "fountain", "computers", "flowers", "piano", "ice_cream", "stadium", "pizza", "tree", "books"];

	$(document).ready(function(){
        var list = "";
        for(i=0; i<itemsToFind.length; i++){
        	if (localStorage.key(itemsToFind[i])) {
        		list +="<li class='item checked' id=" + itemsToFind[i] + ">" +itemsToFind[i]+"</li>";
        	} else {
        		list +="<li class='item' id=" + itemsToFind[i] + ">" +itemsToFind[i]+"</li>";
        	}
	    }
	    $("#myUL").append(list);

	});
}
renderList();