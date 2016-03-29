// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
	// Magic
	$.ajaxSetup({
		async: false
	});

	var json = $.getJSON("http://www.mattbowytz.com/simple_api.json",{data: "all"}, function( json ) {
		console.log(json);
		return json;
	});
	var parsed = JSON.parse(json.responseText);
	var programming = parsed.data.programming;
	var interests = parsed.data.interests;



	$(".flexsearch").keyup(function() {

		$(".matches").remove();
		var prefixes = [];
		var input = $('.flexsearch-input').val();
		var inputLength = input.length;
		for(var i=0; i<interests.length; i++){
			var substring = interests[i].substring(0, inputLength).toLowerCase();
			if(substring == input) {
				prefixes.push(interests[i]);
			}
		}
		for(var i=0; i<programming.length; i++){
			var substring = programming[i].substring(0, inputLength).toLowerCase();
			if(substring === input){
				prefixes.push(programming[i]);
			}
		}
		$(".flexsearch").append("<ul class='matches'></ul>");
		if(prefixes.length>8){
			$(".matches").remove();
		}
		for(var i=0; i<prefixes.length; i++){
			var link = "http://www.google.com/search?q=" + prefixes[i].replace("","+") + ">" + prefixes[i];
			$(".matches").append("<li><a href=" + link + "</a></li>");
		}
	});
})();