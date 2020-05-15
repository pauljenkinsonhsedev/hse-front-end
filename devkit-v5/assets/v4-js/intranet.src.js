/* v4.2.7 */

// Begin Alert Bar
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
// Listeners

// Initiate alert bar 
function alertBarInit(){

	// Read from our include file to listen for changes to the '.datetime'
	$.get(platformPath+'/assets/v4-includes/alert-bar.htm', function(data) {

		var $alertDateTime = $(data).find(".datetime").text();

		if($.cookie('hseCookieAlertDateTime') == null){
			$.cookie('hseCookieAlertDateTime', $alertDateTime, { path: '/', expires: 1 });
		}
		
		// Check for changes against stored cookie
		if($.cookie('hseCookieAlertDateTime') != $alertDateTime){
			// delete existing cookie
			//$.removeCookie('hseCookieAlertDateTime', { path: '/'});
			// reinstate cookie with new value
			$.cookie('hseCookieAlertDateTime', $alertDateTime, { path: '/', expires: 1 });
			// switch alert bar back on
			if($.cookie('hseCookieAlertBar') == 'off'){
				$.cookie('hseCookieAlertBar','on', { path: '/', expires: 365 });
			}
		}
	});

	// If cookies are enabled and we want to display the notification
	if ($.cookie('hseCookieAlertBar') == 'on') {

		if($('#alertBarContainer').length) { // Checking if alert bar container div exists in the HTML (Dreamweaver template property)

			$.get(platformPath+'/assets/v4-includes/alert-bar.htm', function(data){
				$('#alertHolder').html(data);
				$('<div id="alertBarClose"><a href="#"><img src="'+platformPath+'/assets/v4-images/shared/cookie-close.png" alt="Close this information" /></a></div>').appendTo('#alertHolder');
			});

			$('#alertBarClose').live('click', function(e) {
				e.preventDefault();
				$("#alertBarContainer").slideUp('500');
				$.cookie('hseCookieAlertBar','off', { path: '/', expires: 365 }); // Set the cookie to off so it doesn't display again (365 days)
			});
		
		}
		setTimeout(function(){
			if($("#alerts").hasClass("alert-activated")){
				$('#alertBarContainer').delay('3000').slideDown('500');
			} else {
				$('#alertBarContainer').hide();
			}
		}, 1000); // 1 second to allow for ajax to load in
	}
}

function alertBar(){
	
	// ------------------------------------------------------------------------
	// Notification
	if ($.cookie('hseCookieAlertBar') == null) {
		$.cookie('hseCookieAlertBar','on', { path: '/', expires: 365 });
	}

	// Show alert bar when page first loads
	setTimeout(function(){
		alertBarInit();
	}, 2000); // 2 seconds

	// Set interval to refresh alert information every 20 mins
	//setInterval(function(){
//		alertBarInit();
//	}, 1200000); // 1200000 = 20 minutes
}

// End Alert Bar
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------



// Clear Intranet search input on focus
function autoClearSearch(){
$('#q,#qsearch').click(
// uses .click as opposed to seemingly more accessible .focus. Using .focus empties search box after using back button
//keyboard users automatically clear input by applying focus
    function(){
		if (this.value === "Search") {// clear search in banner
        this.value = '';
    	}
		if (this.value === "Local search") { // clear local search
        this.value = '';
    	}
    });
}

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------


$(document).ready(function() {

	alertBar();
	autoClearSearch();
	textResizer(); // From core.js file
	rssEngine(); // From core.js file

	// Analytics overlay
	// Called once document has finishing loading dynamic content

	// genericId: This is for the main page content.
	// specificId: Areas where we want to specifically distinguish where the link is to avoid id duplicaton.
	// noOverlay: Areas we want to specifically not include in the overlay

	// IMPORTANT: All parent div containers should be in one of the above 3 options.
	// IMPORTANT: Ajax stop function commented out as the intranet doesn't use ajax at the moment.

	//$(document).ajaxStop(function() {
		$('a').analyticsOverlay({
	//		noOverlay: '',
	    	genericId: '#contentContainer',
			specificId:'#top, #headerContainer, #navSecondary, #accessibilityTab, #textTab, #sideBar, #breadCrumb'
		})
	//});

	// ### Function to fix multiple CSS class selectors for IE6 only ###

	if ($.browser.msie && $.browser.majorVersion < 7) {
		multipleClassFix(); // From core.js file
	}

	// ### Function to attach CSS3Pie so CSS3 properties can be rendered in IE6 - 9 ###
	// Note: F4.1.0 has removed TH as there is a conflict between accordion and TH

	$(function() {
		if (window.PIE) {
			$('#headerContainer, #accessibilityTab, #textTab, #baseStrip, #footerContainer, .box, .boxPromoImage img, .more, .moreAboveSplit, ul.semtabs li, .tabPanel, .icapsl, .icapml, .icapll, .icapsr, .icapmr, .icaplr, #navMain ul li, .downloadBox, #newsItemFirst, #newsItemLast').each(function() {
				PIE.attach(this);
			});
		}
	});
});