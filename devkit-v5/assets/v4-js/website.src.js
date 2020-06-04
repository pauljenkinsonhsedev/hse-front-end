/* v4.2.7 */
 
/*
  The HSE platform javascript is in the process of being fully rewritten.
  Rewritten functions from hse-primary.js for the website which have been completed have been put into this file.
  This core file is executed *before* hse-primary.js so everything should run side by side.

  Table of contents:
  
  1. Navigation dropdown
  2. Social media.  
  3. Google custom search
  4. HSMS + Toolbox promo-revolve
  5. Site Morse tweak H2 replace
  x. ### Load the above functions when document is ready. ###
*/

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

// Navigation dropdown
// Version 1.0.1

// Changelog
// 1.0.1 (4.2.1)	- Paths now only changed on relative links
// 2.0	- Following analysis of user data the menu was removed by Pat on 12/09/18

// Google custom search
// https://developers.google.com/custom-search/docs/dev_guide

 
(function() {
  var cx = '015848178315289032903:hqkynptgd1o';
  var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
})();

// add alt attribute to the Google brand

function addGoogleAlt() {
    $('img.gsc-branding-img').attr('alt','Google');
};


// ------------------------------------------------------------------------
// ------------------------------------------------------------------------


function promoRevolve() {

  // settings
  var $slider = $('.promo-revolve'); // class or id of carousel slider 
  var $slide = 'li'; // could also use 'img' if you're not using a ul
  var $transition_time = 2000; // 2 second
  var $time_between_slides = 5000; // 5 seconds
  // speeded up for testing was 2000/5000

  function slides(){
    return $slider.find($slide);
  }

  slides().fadeOut();

  // set active classes
  slides().first().addClass('active');
  slides().first().fadeIn($transition_time);

// auto scroll 
$intVar = start();
function start(){
  return setInterval(
      function(){
      var $i = $slider.find($slide + '.active').index();

      slides().eq($i).removeClass('active');
      slides().eq($i).fadeOut($transition_time);

      if (slides().length == $i + 1) $i = -1; // loop to start

      slides().eq($i + 1).fadeIn($transition_time);
      slides().eq($i + 1).addClass('active');
    }
    , $transition_time +  $time_between_slides);
}

//pause on click
$('a.ppAni').toggle(function (){						 
  clearInterval($intVar);
  }, 
  	function(){
  	$intVar = start();
	});
}

// append play button to animation
// hide from screen readers as they cannot see animation and so have no wish to control it.
$('.promo-revolve').prepend('<a href="#" class="ppAni" aria-hidden="true"><span class="stopAni" title="Pause">||</span> <span class="startAni hide" title="Resume">&gt;</span></a>');
// hide show stop/start
// add .hide to start button in Prepend function above
// toggle .hide between start and stop button in time with animation
$('a.ppAni').click(function () {
	 $('a.ppAni span').toggleClass('hide');
});

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// Site Morse tweak H2 replace
function headingTwoReplace(){
$('.headingTwo').each(function() {
   	 var headingTwoContent = $('.headingTwo').html();
	$(this).replaceWith($('<h2>'+headingTwoContent+'</h2>'));
	});
}

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------



// These functions need to on document load



$(window).load(function () {
 
    addGoogleAlt();
    });

// All other functions run on document ready

$(document).ready(function() {
			
	textResizer(); // From core.js file
	cookieNotify(); // From core.js file
	navigationDropdown();
	rssEngine(); // From core.js file	
	socialMedia();	
	promoRevolve();
	headingTwoReplace();
	
	
/*	$('.navDropdown a').hover(function(){
		$('.navDrop').addClass('selected');
	}, function(){
		$('.navDrop').removeClass('selected');
	});*/
	
	
	// Analytics overlay
	// Called once document has finishing loading dynamic content
	
	// noOverlay: Areas we want to specifically not include in the overlay
	// genericId: This is for the main page content.
	// specificId: Areas where we want to specifically distinguish where the link is to avoid id duplicaton.

	// IMPORTANT: All parent div containers should be in one of the above 3 options.
	
	$(document).ajaxStop(function() {		  
		$('a').analyticsOverlay({
	//		noOverlay: '',
	    	/*genericId: '#contentContainer',*/
			specificId:'#top, #cookieContainer, #headerContainer, #navSecondary, #accessibilityTab, #contentContainer, #textTab, #sideBar, #breadCrumb, #socialMediaTop, #socialMediaBottom, #footerContainer, #toolboxDialog'
		})	
	});
		
	// Function from core file to fix multiple CSS class selectors for IE6 only	
	if ($.browser.msie && $.browser.majorVersion < 7) {
		multipleClassFix(); // From core.js file	
	}
	
	// ### Function to attach CSS3Pie so CSS3 properties can be rendered in IE6 - 9 ###
	// Note: F4.1.0 has removed TH as there is a conflict between accordion and TH
	
	$(function() {
		if (window.PIE) {
			$('#cookieContainer, #headerContainer, .navDropdown li, .navDropdown li.home, .navDrop, #navDivider, #accessibilityTab, #textTab, #baseStrip, #footerContainer, .box, .boxPromoImage img, .more, .moreAboveSplit, ul.semtabs li, .tabPanel, .icapsl, .icapml, .icapll, .icapsr, .icapmr, .icaplr, .downloadBox, #newsItemFirst, #newsItemLast, #toolboxHomepage, .toolboxDialogCommon a, .toolboxDialogCommon img').each(function() {
				PIE.attach(this);
			});
		}
	});		
	
});