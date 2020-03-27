$(document).ready(function(){
						   
	//Get heights of divs while they are shown and calculate closed height of box
	var myHeight = $('.showHide').height();
	var openHeight = $('.equalHeights1').height();
	var closedHeight = openHeight - myHeight;
	
	//Hide divs, set variable for toggle
	$('.showHide').css({
		'display': 'none'
	});	
	$('.equalHeights1').css({
		'height': closedHeight
	});	
	var hidden = true;
	
	// Write in show/hide toggle link
	$('.showHide').before('<p><a href="#" class="showHideToggle">Show list</a></p>');
	
	function hideMe() {
		//Close divs
		$('.equalHeights1').animate({
			height: closedHeight
		}, "fast", function() {				
				$('.showHide').css({
					'display': 'none'
				});	
			});
		hidden = true;
		$('.showHideToggle').text("Show list");
	}
	
	function showMe() {
		//Open divs
		$('.showHide').css({
				'display': 'block'
		});	
		myHeight = $('.showHide').height();
		$('.equalHeights1').animate({
			height: myHeight + closedHeight
		}, "fast");			
		hidden = false;
		$('.showHideToggle').text("Hide list");	
		hse_equaliseHeights();
	}

	$('.showHideToggle').click(function(event) {
		//Stop # from appearing in URL when link is clicked
		event.preventDefault();
		
		//Toggle behaviour of show/hide link
		if (hidden == true)
		{
			showMe();
		}
		else
		{
			hideMe();
		}
	});
	
	$(document).bind('fontresize', function() {
		//Recalculate heights if font size of page is changed - stops it breaking if font size is changed in IE
		if (hidden == true)
		{
			closedHeight = $('.equalHeights1').height();
		}
		else
		{
			openHeight = $('.equalHeights1').height();
			myHeight = $('.showHide').height();
			closedHeight = openHeight - myHeight;
		}
	});
});