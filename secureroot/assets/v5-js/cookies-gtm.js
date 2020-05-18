// When DOM is ready, create function for dynamically loading GTM scripts

function gtmFunction() {

// Function adds script	

// Get the first script element on the page
var ref = document.getElementsByTagName( 'head' )[0];

// Create a new script element
var gtm = document.createElement( 'script' );

// Set attributes	
gtm.setAttribute("id", "gtm");

// Set the script element `src`

gtm.src = 'https://www.hse.gov.uk/assets/v5-js/gtm.js';


// Inject the script into the DOM

// ref.insertBefore( gtmAsync, ref.childNodes[0] );		
ref.insertBefore( gtm, ref.childNodes[0] );


$('head').prepend('<style id="gtm-async-hide">.async-hide { opacity: 0 !important} </style>');

$('body').prepend('<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJPWMNL" height="0" width="0" style="display:none;visibility:hidden" aria-hidden="true"></iframe></noscript>');

}	

$( document ).ready(function() {

gtmFunction();

});



