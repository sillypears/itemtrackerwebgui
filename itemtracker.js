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
	//console.log(data);s
	//"Find the length of the amount we are overrunning the div by, divide it equally amongst the items, and move them all closer by that amount."
	//margin-left = -((numItems * itemPNGWidth) - element.width() / numItems)
	img_width = 48;
	img_height = 48;
	var html = $('<div id=response ></div>');
	html.append('<table id=stuff></table');
	$.each(data, function(x, contents) {
		num_items = contents.item_list.length;
		html.find('#stuff').append('<tr><td colspan='+ num_items + '>Current seed: '+contents.seed+'</td></tr>');	
		html.find('#stuff').append('<tr id=items_row ><td id=items></td></tr>');
		$.each(contents.item_list, function(y, object){
			//console.log(contents);
			if (object.starting_item){
				console.log("starting item "+object.item_id);
			}
			html.find('#items_row').children('td').append('<img width='+img_width+'px height='+img_height + 'px' +((object.starting_item) ? ' class=starting-item' : ' class=non-start-item') + ' src=collectibles/collectibles_'+("000" + object.item_id).slice(-3) + '.png />');
		});
		
	});
	
	$('#content').html(html);
	
	
	var table_dimensions = {"width" : $('html').width(), "height" : $('#stuff').height()}
	console.log(img_width * num_items +  " " +table_dimensions['width']);
	var non_starts = $('#items').find('.non-start-item');
	
	if (img_width * num_items > table_dimensions['width']) {
		console.log("items are longer " + img_width * num_items +  " " +table_dimensions['width'] + " " + (img_width * num_items - table_dimensions['width']));
		$.each(non_starts, function(x, item){
			offset = Math.ceil(( (img_width * num_items + (img_width * num_items * .1)) - table_dimensions["width"]) / num_items) * -1;
			console.log(offset);
			$(item).css({"margin-left": offset+"px"});
		});

	console.log($('#items').width());
	}
	$.each(table_dimensions, function(prop, value) {
		console.log();
	});
}

$(document).ready(function() {
	var player = "";
	player = gup('player');
	if (player != "") {	
		get_items(player);
		setInterval(function(){
		get_items(player);
	}, 15000);
		
	} else {
		$('#content').html('<div>hi</div>');
	}

});