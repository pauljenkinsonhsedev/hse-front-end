	$(document).ready(function () {	
		
	function gtmFunction() {

	    // Function adds script	
		// Get the first script element on the page
	var ref = document.getElementsByTagName( 'head' )[0];

	// var refBody = document.getElementsByTagName( 'body')[0];

	// Create a new script element
	// var gtmAsync = document.createElement( 'script' );
	var gtm = document.createElement( 'script' );
			
	// Set attributes	
	// gtmAsync.setAttribute("id", "gtm-Async");
	gtm.setAttribute("id", "gtm");


	// Set the script element `src`

	// gtmAsync.src = '../assets/v5-js/gtm-async.js';
			
	gtm.src = '/assets/v5-js/gtm.js';
			

	// Inject the script into the DOM
			
	// ref.insertBefore( gtmAsync, ref.childNodes[0] );		
    ref.insertBefore( gtm, ref.childNodes[0] );

			
	$('head').prepend('<style id="gtm-async-hide">.async-hide { opacity: 0 !important} </style>');
		
	$('body').prepend('<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJPWMNL" height="0" width="0" style="display:none;visibility:hidden" aria-hidden="true"></iframe></noscript>');
		
	}	
		
	$('#acceptAllCookies').click(function() {
		
	gtmFunction();

	});

		
	if (usageSet == true )  {
	gtmFunction();
	} 
		
	else {
	Cookies.remove('_ga');
    Cookies.remove('_gid');
	Cookies.remove('_gali');
	Cookies.remove('_dc_gtm_UA-324220-1');
	}
	
	
	}); 