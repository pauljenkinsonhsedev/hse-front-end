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

/* Only essential */ var essential = {'essential':true,'usage':false,'campaigns':false,'settings':false,};

/* Approve all */    var approve = {'essential':true,'usage':true,'campaigns':true,'settings':true};

/* Analytics and marketing */ var analytics_marketing = {'essential':true,'usage':true,'campaigns':true,'settings':false};

/* Analytics only */ var analytics = {'essential':true,'usage':true,'campaigns':false,'settings':false};

/* Campaigns and settings */ var campaigns_settings = {'essential':true,'usage':false,'campaigns':true,'settings':true};

/* Analytics and settings */ var analytics_settings = {'essential':true,'usage':true,'campaigns':false,'settings':true};

/* Just campaigns */ var campaigns = {'essential':true,'usage':false,'campaigns':true,'settings':false};

/* Cookie settings */ var cookie_settings ={'essential':true,'usage':false,'campaigns':false,'settings':true,};

// Convert JSON to string
var stringOnlyEssential = JSON.stringify(essential);
var stringAcceptAll = JSON.stringify(approve);
var stringAnalyticsMarketing = JSON.stringify(analytics_marketing);
var stringAnalytics = JSON.stringify(analytics);
var stringCampaignsSettings = JSON.stringify(campaigns_settings);
var stringAnalyticsSettings = JSON.stringify(analytics_settings);
var stringCampaigns = JSON.stringify(campaigns);
var stringSettings = JSON.stringify(cookie_settings);

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
Cookies.set(cookiePolicy, encodedOnlyEssential, {path: '/', domain: 'localhost', secure: false , expires: 365})
}

// #2 Approve all cookies

if (analytics == 'on' && marketing == 'on' && settings == 'on' ) {
Cookies.set(cookiePolicy, encodedAcceptAll, {path: '/', domain: 'localhost', secure: false , expires: 365})
}

// #3 Just analytics

if (analytics == 'on' && marketing == 'off' && settings == 'off' ) {
Cookies.set(cookiePolicy, encodedAnalytics, {path: '/', domain: 'localhost', secure: false , expires: 365})
}

// #4 Analytics and marketing

if (analytics == 'on' && marketing == 'on' && settings == 'off' ) {
Cookies.set(cookiePolicy, encodedAnalyticsMarketing, {path: '/', domain: 'localhost', secure: false , expires: 365})
}

// #5 Just marketing/campaigns

if (analytics == 'off' && marketing == 'on' && settings == 'off' ) {
Cookies.set(cookiePolicy, encodedCampaigns, {path: '/', domain: 'localhost', secure: false, expires: 365})

}

// #6 Analytics and settings

if (analytics == 'on' && marketing == 'off' && settings == 'on' ) {
Cookies.set(cookiePolicy, encodedAnalyticsSettings, {path: '/', domain: 'localhost', secure: false, expires: 365})
}

// #7 Campaigns and settings

if (analytics == 'off' && marketing == 'on' && settings == 'on' ) {
Cookies.set(cookiePolicy, encodedCampaignsSettings, {path: '/', domain: 'localhost', secure: false , expires: 365})

}

// #8 Just settings

if (analytics == 'off' && marketing == 'off' && settings == 'on' ) {
Cookies.set(cookiePolicy, encodedSettings, {path: '/', domain: 'localhost', secure: false , expires: 365})

}

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