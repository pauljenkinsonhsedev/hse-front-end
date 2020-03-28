/* v4.2.7 */ 

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

$(document).ready(function() {
			
	textResizer(); // From core.js file
	cookieNotify(); // From core.js file
	rssEngine(); // From core.js file
	
	// Analytics overlay
	// Called once document has finishing loading dynamic content
	
	// genericId: This is for the main page content.
	// specificId: Areas where we want to specifically distinguish where the link is to avoid id duplicaton.
	// noOverlay: Areas we want to specifically not include in the overlay
	
	// IMPORTANT: All parent div containers should be in one of the above 3 options.
	// IMPORTANT: Ajax stop function commented out as onr doesn't use ajax at the moment.	
		
	//$(document).ajaxStop(function() {
		$('a').analyticsOverlay({
	//		noOverlay: '',								
	    	genericId: '#contentContainer',
			specificId:'#top, #cookieContainer, #headerContainer, #navSecondary, #accessibilityTab, #textTab, #sideBar, #breadCrumb, #socialMediaTop, #socialMediaBottom, #dynamicFooter, #baseStrip'
		})
	//});
		
	// Function from core file to fix multiple CSS class selectors for IE6 only	
	if ($.browser.msie && $.browser.majorVersion < 7) {
		multipleClassFix(); // From core.js file	
	}
	
	// ### Function to attach CSS3Pie so CSS3 properties can be rendered in IE6 - 9 ###
	// Note: F4.1.0 has removed TH as there is a conflict between accordion and TH
	
	$(function() {
		if (window.PIE) {
			$('#cookieContainer, #headerContainer, #accessibilityTab, #textTab, #baseStrip, #footerContainer, .box, .boxPromoImage img, .more, .moreAboveSplit, ul.semtabs li, .tabPanel, .icapsl, .icapml, .icapll, .icapsr, .icapmr, .icaplr, .navDropdown ul li, .downloadBox, #newsItemFirst, #newsItemLast').each(function() {
				PIE.attach(this);
			});
		}
	});		
	
});
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