///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// scrolling content for the list of languages on the 'migrant workeres' site
// used for index page and index page of each language

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){

	$height = 250; // set height
	$('.scrollBox').css({'overflow-y':'auto', 'overflow-x':'hidden'}); // set overflow
	$('.scrollBox').height($height);
	
	hse_equaliseHeights();

});