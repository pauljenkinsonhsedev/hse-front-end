/*
***************************************************************************************
***************************************************************************************
*
* Contents
*
***************************************************************************************
***************************************************************************************
*/

$(function() { 
	// on document ready
	trackClicksGeneric();
	trackScrolling();
	trackEngagement();
	trackAccordion();
	// and on window load
	//$(window).load(trackSearchBoxUse);
});


/*
***************************************************************************************
***************************************************************************************
*
* Google Analytics tracking
*
***************************************************************************************
***************************************************************************************
*/

// Global variables
	// List all the properties, by name, that we wish to send these events to:
	var genericSend = ['newView.send']; 
	// not sending to default view 'send'

// Track clicks to downloads, external and email
// inspired by http://www.carronmedia.com/extend-google-analytics-with-jquery/
function trackClicksGeneric() {
   var filetypes = /\.(zip|pdf|doc|docx|odt|xls|xlsx|ppt|pptx|mp3)$/i;
	   $('a[href]').each(function(){
			var href = $(this).attr('href');
			// External 
			if ((href.match(/^https?\:/i)) && (!href.match(document.domain))){
				 $(this).click(function() {
				   var extLink = href.replace(/^https?\:\/\//i, '');
					  for (i = 0; i < genericSend.length; i++) {
					  ga(genericSend[i],  {
						  hitType: 'event',
						  eventCategory: 'External',
						  eventAction: 'Click',
						  eventLabel: extLink
						  });
					  };
				});
			}
			// Emails
			else if (href.match(/^mailto\:/i)){
				$(this).click(function() {
					var mailLink = href.replace(/^mailto\:/i, '');
					   for (i = 0; i < genericSend.length; i++) {
					   ga(genericSend[i],  {
						  hitType: 'event',
						  eventCategory: 'Email',
						  eventAction: 'Click',
						  eventLabel: mailLink
						  });
					   };
				});
			}
			// Downloads
			else if (href.match(filetypes)){
				var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
				$(this).click(function() {
					//var filePath = href.replace(/^https?\:\/\/www(\.hse\.gov\.uk)\//i, '');
					// Changed as the above was collecting relative path so possible to have same document listed multiple times
					// e.g. once as ../path/file.ext and once as ../../path/file.ext
					var filePath = this.pathname;
					   for (i = 0; i < genericSend.length; i++) {
					   ga(genericSend[i],  {
						  hitType: 'event',
						  eventCategory: 'Download',
						  eventAction: 'Click - ' + extension,
						  eventLabel: filePath
						  });
					   };
				});
			}
		});

}

// Track what is typed and on what pages
// collect onsubmit
// usual form events such as submit, focus or blur appear not to regsiter
// .click does, but that only works if user clicks Search button
// Presume Google is using some other (non-standard) method
/*
function trackSearchBoxUse(){
	// page = window.location.pathname
	// form $('.gsc-search-box')
	// search text = $('#gsc-i-id1').val();
	$('form.gsc-search-box').submit(function(){ 
	 alert ('You pressed submit');
	var searchText = $('#gsc-i-id1').val(); // must be collected onsubmit, otherwise will display placeholder text
	var pageURL = window.location.pathname;
		alert ("You searched for " + searchText + " on the page " + pageURL);
		if (pageURL.match("\/index\.htm$")) { // does pageURL end with "/index.htm"
		var cleanPageURL = pageURL.slice(0,-9); // if so, remove "/index.htm" the last 9 digits
   		//alert (cleanPageURL);
			for (i = 0; i < genericSend.length; i++) {
			ga(genericSend[i],  {
			  hitType: 'event',
			  eventCategory: 'Search',
			  eventAction: 'Searched page: ' + cleanPageURL,
			  eventLabel: 'Search term: ' + searchText
			  });
			};
		}
		else {
			//alert (pageURL);
			for (i = 0; i < genericSend.length; i++) {
			ga(genericSend[i],  {
			  hitType: 'event',
			  eventCategory: 'Search',
			  eventAction: 'Searched page: ' + pageURL,
			  eventLabel: 'Search term: ' + searchText
			  });
			};
		}
	});
}
*/

// Track scrolling
// inspired by: https://www.e-nor.com/blog/google-analytics/measuring-page-scroll-in-universal-analytics
// Read above post BEFORE editing
function trackScrolling() {

	Frequency = 50; // This variable determines the Frequency the event will be fired, (10 means each 10 precent the event will fire)
	
	var _frequency = Frequency;
	var _repentance = 100 / Frequency;
	var _scrollMatrix = new Array();
	for (ix = 0; ix < _repentance; ix++) {
		_scrollMatrix[ix] = [_frequency, 'false'];
		_frequency = Frequency + _frequency;
	}
	$(document).scroll(function (e) {
		for (iz = 0; iz < _scrollMatrix.length; iz++) {
			if (($(window).scrollTop() + $(window).height() >= $(document).height() * _scrollMatrix[iz][0] / 100)  && (_scrollMatrix[iz][1]== 'false')) {
				_scrollMatrix[iz][1] = 'true';
				for (i = 0; i < genericSend.length; i++) {
				ga(genericSend[i], 'event', 'Page Interaction', 'Scroll Down', _scrollMatrix[iz][0]+'%',{nonInteraction: true})
				// Note: I am NOT using scroll to effect bounce rates
				};  
			}
		}
	});
}

// Event tracking engagement

function trackEngagement() {
  start = new Date().getTime();           // collect time page opened
  // cannot use data atributes in XHTML so using meta data
  // if meta data does not exist assume HTML5 with correct data attribute 
  
  var typeOfPageMeta = $('meta[name="HSE.contentType"]').attr('content');
  var typeOfPageData = $('body').attr('data-content-type');
  
 // alert (typeOfPageMeta + " from metadata")
 // alert (typeOfPageData + " from data attribute")
  
// if (typeOfPageMeta === 'Navigation' || 'Content'){	// This works, but a little clunky
  if (typeOfPageMeta != undefined){
	 var typeOfPage = typeOfPageMeta;
	 // var from = ' from VAR meta';
		}
  else {
	  var typeOfPage = typeOfPageData;	
	  // var from = ' from VAR data';
		}
  // alert (typeOfPage + from);
   
   

  window.onbeforeunload = function() {    // just before we leave the page
      end = new Date().getTime();         // collect page ‘close’ time
      var time = end - start;             // ‘end’ time minus ‘start’ time = time on page
      var timeSpent = (Math.round(time / 1000)); 
	  // convert milliseconds to seconds and round to a whole number
        if (timeSpent >= 1801) {
           timeSpent = 1800};            // if on page more than 30 minutes, assume end-of-session and set to 30 minutes
      
      $(window).unload(function() {       // when we leave the page send the data to GA
			for (i = 0; i < genericSend.length; i++) {
		 	ga(genericSend[i],  {
			  hitType: 'event',
			  eventCategory: 'Timings',
			  eventAction: 'Time on page',
			  eventLabel: typeOfPage + ' type page',
			  eventValue: timeSpent,
			  nonInteraction: true  // Note: I am NOT using this event to effect bounce rates
          });
		  };
			
// Was using Timing Events - data being pushed but cannot see it in reports.					
           // ga('send', 'timing', {
           // 'timingCategory': 'Time on page', // Our generic category in which to store this report
           // 'timingVar': typeOfPage,      // Our page type, eg Navigation
           // 'timingValue': timeSpent      // Time spent on page in seconds
           // });
      });
};
};


// events tracking use of accordion
function trackAccordion() {
	$('.accordion h2 a, .accordion h3 a').click(function(){  
	   var accordionText = $(this).text();
       for (i = 0; i < genericSend.length; i++) {
		 ga(genericSend[i],  {
          hitType: 'event',
          eventCategory: 'Page Interaction',
          eventAction: 'Accordion',
          eventLabel: accordionText
          });
		  };
	});
};



