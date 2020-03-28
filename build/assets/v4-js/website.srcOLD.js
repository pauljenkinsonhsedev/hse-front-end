/* v4.2.8 */
 
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

function navigationDropdown() {
	
	$.get(platformPath+'/assets/v4-includes/website-dropdown.txt', function(data) {	
		//changed to *.txt for stats on sites that use log files eg communities
																			
		var newsContent = $(data).filter(".news").children();	
		var guidanceContent = $(data).filter(".guidance").children();	
		var aboutHSEContent = $(data).filter(".aboutHSE").children();
		var aboutYouContent = $(data).filter(".aboutYou").children();
		var contactContent = $(data).filter(".contact").children();

		$(".navDropdown .navDropNews .navDropContent").html(newsContent);
		$(".navDropdown .navDropGuidance .navDropContent").html(guidanceContent);
		$(".navDropdown .navDropAboutHSE .navDropContent").html(aboutHSEContent);
		$(".navDropdown .navDropAboutYou .navDropContent").html(aboutYouContent);
		$(".navDropdown .navDropContact .navDropContent").html(contactContent);
		
		$(".navDropContent img").attr("src", function (i, val) {
			return platformPath+relativeLink(val);
		});		
		
		// 18-03-13 Function changed so it now only replaces the path if the links are relative ones
		// ie. they do not contain http or https (KW)
		$(".navDropContent a").attr("href", function (i, val) {
			if(!relativeLink(val).match("^(http|https)://"))
			{
				return platformPath+relativeLink(val);
			}
		});	
																			
	});	
	
}

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

// Social media
// Version 1.0.5

// Changelog
// 1.0.5 (4.1.5)	- Changed html path include to fit naming conventions.
// 1.0.4 (4.1.4)	- Twitter HTML5 data tags are now added via Javascript.
// 1.0.3 (4.1.3)	- Improved rate this cookie detection and writing
// 1.0.2 (4.1.0)	- Removed Facebook API
// 1.0.1 (4.0.4)	- Updated rating iJento id tags.

// Documentation TBA
// TO DO: Update rate to jQuery 1.7+ standards ( remove .bind() )

function socialMedia(){
	//insert social media container
	
	$('.socialMedia').html('<div class="socialBar"> <div class="socialDropdown"> <ul> <li class="socialRate"><span>Rate this page</span> <a href="#" class="rating" id="rated-1"><span class="rating1">One star</span></a> <a href="#" class="rating" id="rated-2"><span class="rating2">Two stars</span></a> <a href="#" class="rating" id="rated-3"><span class="rating3">Three stars</span></a> <a href="#" class="rating" id="rated-4"><span class="rating4">Four stars</span></a> <a href="#" class="rating" id="rated-5"><span class="rating5">Five stars</span></a></li> <li class="socialShare"><a id="shareTop" href="#share-this-page"><span>Share</span></a></li> <li class="socialUpdate"><a id="updateTop" href="#free-updates"><span>Free updates</span></a></li> <li class="socialBookmark"><a id="BookmarkTop" href="#bookmark-this-page"><span>Bookmark</span></a></li> </ul> </div> <div class="socialLinks"> <p>Follow HSE on Twitter:</p><a href="https://twitter.com/H_S_E" class="twitter-follow-button"><img src="'+platformPath+'/assets/v4-images/website/socialmedia/twit-follow.png" width="60" height="20" alt="Follow @H_S_E" /></a> </div> </div> <div id="socialDynamicTop" class="socialDynamic"></div>');
	
	if($('.socialMedia').length) { 
	// Checking if social media container div exists in the HTML (Dreamweaver template property)
	
		$(".socialDropdown p").remove();
		$(".socialDropdown ul").show();
		
		// iJento rate this ID tags. Required to be inserted via javascript to avoid validation issues.
		$(".rating1").parent().attr('id', 'rated-1');
		$(".rating2").parent().attr('id', 'rated-2');
		$(".rating3").parent().attr('id', 'rated-3');
		$(".rating4").parent().attr('id', 'rated-4');
		$(".rating5").parent().attr('id', 'rated-5');
		
		// Add Twitter data tag via javascript to avoid validation issues.
		$(".twitter-follow-button").attr('data-show-count', 'false');
		$(".twitter-follow-button").attr('data-show-screen-name', 'false');
		$(".twitter-follow-button").attr('data-dnt', 'true');
		
		$.get(platformPath+'/assets/v4-includes/website-sm.txt', function(data) { // Social media bar HTML
		//changed to *.txt for stats on sites that use log files eg communities
																		 
			$('#socialDynamicTop').html(data);
			
			$('<div class="socialCloseButton"><a href="#"><img src="/assets/v4-images/website/socialmedia/close.png" alt="Close this panel" /></a></div>').prependTo('.socialDynamic .socialRateContent, .socialDynamic .socialShareContent, .socialDynamic .socialUpdateContent, .socialDynamic .socialBookmarkContent');
			
			$("#socialDynamicTop img").attr("src", function (i, val) {
				return platformPath+relativeLink(val);
			});
			
			$('<p><a href="http://stumbleupon.com/submit?url='+window.location.href+'&amp;title='+$('title').text()+'" title="Share on Stumbleupon">Share on Stumbleupon</a></p>').appendTo(".socialStumble");			
						
			//var copyCode = $('#socialDynamicTop').html();
			//$('#socialDynamicBottom').html(copyCode);
			
			//$('#socialDynamicBottom .hideFromScreen').remove();
			
			// Force Twitter to rerender the AJAX version of the button
			// JS will already be cached so shouldn't be an issue			
			//$.ajax({ url: 'http://platform.twitter.com/widgets.js', dataType: 'script', cache:true});	
			// Removed call to twitter to speed up site
			
			//collect <title> for twitter link
			var twitterTitle = document.title;
			// alert ('Title of page = '+twitterTitle);
			//collect current URL for twitter link
			var twitterURL = $(location).attr('href');
			// alert ('URL of page = '+twitterURL);
			//Swap non-javascript basic link for enhanced link
			$("a[href='https://twitter.com/share']").attr('href','https://twitter.com/share?url='+encodeURIComponent(twitterURL)+'&text='+escape(twitterTitle));
			//encode and escape URL and title
	
		});	
		
	// Toggle section
	
	$(".socialDropdown li a").click(function(e){								 
				
		e.preventDefault();
						
		var $t = $(this);
		var targetArea = '#socialMediaTop, #socialMediaBottom';	
		var getParent = $t.parents(targetArea).attr("id");
		var getClass = $t.parent().attr('class')+'Content';
					
		if ($('#'+getParent+' .socialDynamic').children().hasClass('active')) {	
			if ($t.hasClass('active') == false) {
				$('#'+getParent+' .socialDynamic .active').removeClass('active').slideUp('500', function() {							 
					$('#'+getParent+' .socialDynamic .'+getClass).slideDown('500').addClass('active');
					$('#'+getParent+' .socialDropdown a').removeClass('active');
					$t.addClass('active');
				})
			}
		}
		
		else {
			$('#'+getParent+' .socialDynamic .'+getClass).slideDown('500').addClass('active');
			$t.addClass('active');
		}
	
	});
	
	// Close functionality
	
	$('.socialCloseButton').live('click', function(e) {							   
		e.preventDefault();
		$('.socialDynamic .active').removeClass('active').slideUp('500');
	});	
	
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			e.preventDefault();
			$('.socialDynamic .active').removeClass('active').slideUp('500');
		}
	});		
		
	// Rate
	
	var $rateCookie = $.cookie('hseRate'); // What cookie are we going to use?
	
	if ($rateCookie != null && $rateCookie.match(window.location.pathname)) {
		$(".socialDropdown .socialRate").text('Page already rated.');	  
	}
	
	else if ($rateCookie == null || $rateCookie.match(window.location.pathname) == null) {
		$('.socialRate a.rating').attr('title', function() {
			return $(this).text();
		})
		
		.bind('mouseover focusin', function()  {
			$(this).prevAll('.socialRate a.rating').andSelf().addClass('ratingActive');
		})
		
		.bind('mouseout focusout', function() {
			$('.socialRate a.rating').removeClass('ratingActive');
		})
		
		$(".socialDropdown li.socialRate a").click(function(e){
			var $t = $(this);
			var starSelect = $t.children().attr('class');
					
			$(this).prevAll('.socialRate a.rating').andSelf().addClass('ratingActive');
										 
			SiTrackLink(this);
		
			$('.socialDropdown .socialRate').html('<span>You rated: </span> <img src="'+platformPath+'/assets/v4-images/website/socialmedia/'+starSelect+'.png" class="socialStarRating" />');
			
			var getStarId = $(this).attr('id');
											
			switch (getStarId) {
				case "rated-1":
					var questionType = '.socialDialogRateNegative';
				break;	
				case "rated-2":
					var questionType = '.socialDialogRateNegative';
				break;	
				case "rated-3":
					var questionType = '.socialDialogRateNeutral';
				break;	
				case "rated-4":
					var questionType = '.socialDialogRatePositive';
				break;
				case "rated-5":
					var questionType = '.socialDialogRatePositive';
				break;						
			}
		
			$(questionType).dialog({
					resizable: false,
					modal: true,
					minWidth: 320,
					open: function(event, ui) {
						$(".socialDialogRate ul li a").click(function(event){
							event.preventDefault();
							console.log(this);
							SiTrackLink(this);
							$(questionType).dialog( "close" );
						})
					}
			});	
							
			$(window).resize(function() {
				$(".socialDialogRate").dialog("option", "position", "center");
			});				
											
			if ($rateCookie) {
	
				var rateCookieExistingData = $rateCookie;
				rateCookieInput = rateCookieExistingData+' '+window.location.pathname;
				//alert('rateCookieExistingData: '+rateCookieExistingData);
				//alert('rateCookieInput: '+rateCookieInput);
				$.cookie('hseRate',rateCookieInput, { path: '/', expires: 1 });
					  
			}
			
			else {
				
				//alert('cookie NOT detected - write a new one');
				$.cookie('hseRate',window.location.pathname, { path: '/', expires: 1 });
				
			}
	
			return false;
		});	
	}	
	
	// Email a friend
	
	$(document).on("click", ".socialEmail a", function(event){ 
													 
		event.preventDefault();
			
		$('.hiddenUrl').val(window.location.href);
	
		$(".socialDialogEmail").dialog({
			resizable: false,
			modal: true,
			minWidth: 300,
			minHeight: 300,
			buttons: {
				"Submit": function() {
					$(".socialDialogEmail form").submit();
					$( this ).dialog( "close" );
				}
			}
		});	
	}); 
		
	// Print
	
	$('.socialPrint a').live('click', function(e) {
		e.preventDefault();
		window.print();
	});
	
	// Bookmark
	
	$('.socialBrowser a').live('click', function(e) {
		e.preventDefault();
		
		if(window.opera) {
			if ($(this).attr("rel") != ""){
				$(this).attr("rel","sidebar");
			}
		}
	
		var url = this.href;
		var title = this.title;
		
		if ($.browser.mozilla ) { // Mozilla Firefox Bookmark
			window.sidebar.addPanel(title, url,"");
		}
		else if ( $.browser.msie ) { // IE Favorite
			window.external.AddFavorite( url, title);
		}
		else if (window.opera) { // Opera 7+
			return false; // do nothing
		} 
		else {
			 alert('Unfortunately, this browser does not support the requested action.,' + ' Please bookmark this page manually.');
		}
		
	});	
		
	}	

}

// End Social media
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

// Google custom search
// https://developers.google.com/custom-search/docs/dev_guide
  google.load("search", "1", {"nocss" : true}); 
  google.setOnLoadCallback(function() {
    var customSearchControl = new google.search.CustomSearchControl('015848178315289032903:kous-jano68');
    customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
    var options = new google.search.DrawOptions();
	options.setAutoComplete(true);
    options.enableSearchboxOnly("http://www.hse.gov.uk/search/search-results.htm");
	//can be relative URL - absolute for testing purposes
    customSearchControl.draw('cse-search-form', options);
  }, true);


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