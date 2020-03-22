// Cookie prefers [hse.gov.uk/cookies.htm]


$( "#cookies-settings, #acceptAll" ).submit(function( event ) {
			
  event.preventDefault(); // Prevents normal form behaviour 
		
		var dataArray = $("#cookies-settings").serializeArray(), // Creates array of objects
			
    	dataObj = {};

		$(dataArray).each(function(i, field){
		  dataObj[field.name] = field.value;
		});
		
	var analytics = dataObj['cookies-usage-analytics'];
	var marketing = dataObj['cookies-marketing'];
	var settings = dataObj['cookie-settings'];
			
	// User preference variables (7)
		
	var true_false_false_false = {'essential':true,'usage':false,'campaigns':false,'settings':false,};
	var true_true_true_true = {'essential':true,'usage':true,'campaigns':true,'settings':true};
	var true_true_true_false = {'essential':true,'usage':true,'campaigns':true,'settings':false};
	var true_true_false_false = {'essential':true,'usage':true,'campaigns':false,'settings':false};
	var true_false_true_true = {'essential':true,'usage':false,'campaigns':true,'settings':true};
	var true_true_false_true = {'essential':true,'usage':true,'campaigns':false,'settings':true};
	var true_false_true_false = {'essential':true,'usage':false,'campaigns':true,'settings':false};


    // Conditionals for setting cookie preferences 	
	
	// #1 Only essential cookies
		
	if (analytics == 'off' && marketing == 'off' && settings == 'off' ) {
	document.cookie = cookiePolicy + "=" + JSON.stringify(true_false_false_false) + ";" + "expires=Thu, 18 Dec 2020 12:00:00 UTC" + ";" + " path=/";
  }
		
	// #2 Just analytics
		
	if (analytics == 'on' && marketing == 'off' && settings == 'off' ) {
	document.cookie = cookiePolicy + "=" + JSON.stringify(true_true_false_false) + ";" + "expires=Thu, 18 Dec 2020 12:00:00 UTC" + ";" + " path=/";

	}
		
	// #3 Analytics and marketing
		
	if (analytics == 'on' && marketing == 'on' && settings == 'off' ) {
	document.cookie = cookiePolicy + "=" + JSON.stringify(true_true_true_false) + ";" + "expires=Thu, 18 Dec 2020 12:00:00 UTC" + ";" + " path=/";

	}
	
	// #4 Just marketing
		
	if (analytics == 'off' && marketing == 'on' && settings == 'off' ) {
	document.cookie = cookiePolicy + "=" + JSON.stringify(true_false_true_false) + ";" + "expires=Thu, 18 Dec 2020 12:00:00 UTC" + ";" + " path=/";

	}
		
	// #3 Analytics and settings
		
	if (analytics == 'on' && marketing == 'off' && settings == 'on' ) {
	document.cookie = cookiePolicy + "=" + JSON.stringify(true_true_false_true) + ";" + "expires=Thu, 18 Dec 2020 12:00:00 UTC" + ";" + " path=/";

	}
		
	// #5 Approve all cookies
		
	if (analytics == 'on' && marketing == 'on' && settings == 'on' ) {
	document.cookie = cookiePolicy + "=" + JSON.stringify(true_true_true_true) + ";" + "expires=Thu, 18 Dec 2020 12:00:00 UTC" + ";" + " path=/";
	}
		
	
		
    // #6 Everything but analytics
		
	if (analytics == 'off' && marketing == 'on' && settings == 'on' ) {
	document.cookie = cookiePolicy + "=" + JSON.stringify(true_false_true_true) + ";" + "expires=Thu, 18 Dec 2020 12:00:00 UTC" + ";" + " path=/";
	}
		
	// Check if cookie notice exists and do nothing
  
  if($('#cookie-preferences-update-notice').length){
  } 
	
  // Creates cookie preferences updated notice
		
  else {
	  
  // Jump to top of content
  location.href = "#contentContainer"; 
	
  $( "#contentContainer" ).prepend( '<div id="cookie-preferences-update-notice" class="v5-notice-box"><h2>Cookie settings updated</h2><p>Government services may set additional cookies and, if so, will have their own cookie policy and banner.</p><p><a id="#cookiesBackTo" href="#" onclick="goBack(); return; false;">Go back to the page you were looking at</a></p>');

  }
		

	// Creates cookie to confirm preferences have been set
		
	document.cookie = cookiePreferences + "= true"  + ";" + "expires=Thu, 18 Dec 2020 12:00:00 UTC" + ";" + " path=/";
		
	// Removes cookie banner
		
 	$('#cookieContainer').remove();
				
	});
	
	
	///////////////////////////

	
	$(document).ready(function () {	

	// If user accepts all cookies (Cookie banner) while on cookie preferences page
		
	$('#acceptAllCookies, #acceptAll').click(function() {
		
		// True
		document.getElementById('cookie-usage-analytics-on').checked = 'checked';
		document.getElementById('cookie-usage-marketing-on').checked = 'checked';
		document.getElementById('cookie-settings-on').checked = 'checked';	
		
	});
		
	// Checks cookie preferences and sets radio buttons
		
		
	// Analytics

	if (usageSet == true ) {
		document.getElementById('cookie-usage-analytics-on').checked = 'checked';
	}
	
	else { document.getElementById('cookie-usage-analytics-off').checked = 'checked'; }
		
	// Campaigns
	
	if (campaignsSet == true) {
		document.getElementById('cookie-usage-marketing-on').checked = 'checked';
	}
	
	else { document.getElementById('cookie-usage-marketing-off').checked = 'checked'; }
		
	// Settings
	
	if (settingsSet == true) {
		document.getElementById('cookie-settings-on').checked = 'checked';
	}
	
	else { document.getElementById('cookie-settings-off').checked = 'checked'; }
  	
	});

	// Jump to top of content
	location.href = "#contentContainer"; 

	
	function goBack() {
  		window.history.go(-2);
	}