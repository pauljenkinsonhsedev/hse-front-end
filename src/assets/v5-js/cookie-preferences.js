// Cookie prefers [hse.gov.uk/cookies.htm]


// Submit form function

$( "#cookies-settings" ).submit(function( event ) {

event.preventDefault(); // Prevents normal form behaviour 

var dataArray = $("#cookies-settings").serializeArray(), // Creates array of objects

dataObj = {};

$(dataArray).each(function(i, field){
dataObj[field.name] = field.value;
});

var analytics = dataObj['cookies-usage-analytics'];
var marketing = dataObj['cookies-marketing'];
var settings = dataObj['cookie-settings'];

// User preference variables (8)

/* Only essential */ var true_false_false_false = {'essential':true,'usage':false,'campaigns':false,'settings':false,};

/* Approve all */    var true_true_true_true = {'essential':true,'usage':true,'campaigns':true,'settings':true};

/* Analytics and marketing */ var true_true_true_false = {'essential':true,'usage':true,'campaigns':true,'settings':false};

/* Analytics only */ var true_true_false_false = {'essential':true,'usage':true,'campaigns':false,'settings':false};

/* Campaigns and settings */ var true_false_true_true = {'essential':true,'usage':false,'campaigns':true,'settings':true};

/* Analytics and settings */ var true_true_false_true = {'essential':true,'usage':true,'campaigns':false,'settings':true};

/* Just campaigns */ var true_false_true_false = {'essential':true,'usage':false,'campaigns':true,'settings':false};

/* Cookie settings */ var true_false_false_true ={'essential':true,'usage':false,'campaigns':false,'settings':true,};

// Convert JSON to string
var stringOnlyEssential = JSON.stringify(true_false_false_false);
var stringAcceptAll = JSON.stringify(true_true_true_true);
var stringAnalyticsMarketing = JSON.stringify(true_true_true_false);
var stringAnalytics = JSON.stringify(true_true_false_false);
var stringCampaignsSettings = JSON.stringify(true_false_true_true);
var stringAnalyticsSettings = JSON.stringify(true_true_false_true);
var stringCampaigns = JSON.stringify(true_false_true_false);
var stringSettings = JSON.stringify(true_false_false_true);

// Encode string: btoa

const encodedOnlyEssential = window.btoa(stringOnlyEssential); 
const encodedAcceptAll = window.btoa(stringAcceptAll); 
const encodedAnalyticsMarketing = window.btoa(stringAnalyticsMarketing);
const encodedAnalytics = window.btoa(stringAnalytics);
const encodedCampaignsSettings = window.btoa(stringCampaignsSettings);
const encodedAnalyticsSettings = window.btoa(stringAnalyticsSettings);
const encodedCampaigns = window.btoa(stringCampaigns);
const encodedSettings = window.btoa(stringSettings);



// Conditionals for setting cookie preferences 	

// #1 Only essential cookies

if (analytics == 'off' && marketing == 'off' && settings == 'off' ) {
Cookies.set(cookiePolicy, encodedOnlyEssential, {path: '/', domain: '.hse.gov.uk', secure: true , expires: 365})
}

// #2 Approve all cookies

if (analytics == 'on' && marketing == 'on' && settings == 'on' ) {
Cookies.set(cookiePolicy, encodedAcceptAll, {path: '/', domain: '.hse.gov.uk', secure: true , expires: 365})
}

// #3 Just analytics

if (analytics == 'on' && marketing == 'off' && settings == 'off' ) {
Cookies.set(cookiePolicy, encodedAnalytics, {path: '/', domain: '.hse.gov.uk', secure: true , expires: 365})
}

// #4 Analytics and marketing

if (analytics == 'on' && marketing == 'on' && settings == 'off' ) {
Cookies.set(cookiePolicy, encodedAnalyticsMarketing, {path: '/', domain: '.hse.gov.uk', secure: true , expires: 365})
}

// #5 Just marketing/campaigns

if (analytics == 'off' && marketing == 'on' && settings == 'off' ) {
Cookies.set(cookiePolicy, encodedCampaigns, {path: '/', domain: '.hse.gov.uk', secure: true, expires: 365})

}

// #6 Analytics and settings

if (analytics == 'on' && marketing == 'off' && settings == 'on' ) {
Cookies.set(cookiePolicy, encodedAnalyticsSettings, {path: '/', domain: '.hse.gov.uk', secure: true, expires: 365})
}

// #7 Campaigns and settings

if (analytics == 'off' && marketing == 'on' && settings == 'on' ) {
Cookies.set(cookiePolicy, encodedCampaignsSettings, {path: '/', domain: '.hse.gov.uk', secure: true , expires: 365})

}

// #8 Just settings

if (analytics == 'off' && marketing == 'off' && settings == 'on' ) {
Cookies.set(cookiePolicy, encodedSettings, {path: '/', domain: '.hse.gov.uk', secure: true , expires: 365})

}

// Check if cookie notice exists and do nothing

if($('#cookie-preferences-update-notice').length){

// Do nothing  
} 


else {

// Creates cookie preferences updated notice


// Jump to top of content
location.href = "#contentContainer"; 

$( "#contentContainer" ).prepend( '<div id="cookie-preferences-update-notice" class="v5-notice-box"><h2>Cookie settings updated</h2><p>Government services may set additional cookies and, if so, will have their own cookie policy and banner.</p><p><a id="#cookiesBackTo" href="#" onclick="goBack(); return; false;">Go back to the page you were looking at</a></p>');

}


// Creates cookie to confirm preferences have been set

Cookies.set(cookiePreferences, true , { path: '/', domain: '.hse.gov.uk', secure: true, expires: 365})
// Removes cookie banner
$('#cookieContainer').remove();

});



// On click handling 


$(document).ready(function () {	

// If user accepts all cookies (Cookie banner) while on cookie preferences page

$('#acceptAllCookies, #acceptAll').click(function() {

// True
document.getElementById('cookie-usage-analytics-on').checked = 'checked';
document.getElementById('cookie-usage-marketing-on').checked = 'checked';
document.getElementById('cookie-settings-on').checked = 'checked';	

// Jump to top of content
location.href = "#contentContainer"; 

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

/*
function goBack() {
window.history.go(-2);
}
*/