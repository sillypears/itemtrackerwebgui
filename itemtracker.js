itemTracker = "http://whateverorigin.org/get?url=http://104.233.120.36:8000/tracker/api/user/"

function get_items(player) {
	$.ajax({
		type : "GET",
        url : itemTracker + player,
//        cache : false,
        dataType: 'jsonp',
        }).done(print_response);
 };

 function gup(name){
 	name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 	var regexS="[\\?&]"+name+"=([^&#]*)";
 	var regex=new RegExp(regexS);
 	var results=regex.exec(window.location.href);
 	if(results==null) return ""; else return results[1].toLowerCase();
 };

function print_response(data) {
	//console.log(data);
	var html = $('<div id=response ></div>');
	html.append('<table id=stuff></table');
	$.each(data, function(x, contents) {
		html.append('<tr><td>Current seed: '+contents.seed+'</td></tr>');	
		$.each(contents, function(y, object){
		});
	});
	$('#content').html(html);
}

$(document).ready(function() {
	var player = "";
	player = gup('player');
	if (player != "") {	
		get_items(player);
		setInterval(function(){
		get_items(player);
	}, 5000);
		
	} else {
		$('#content').html('<div>hi</div>');
	}

});