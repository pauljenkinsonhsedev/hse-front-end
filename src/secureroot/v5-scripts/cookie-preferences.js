// // Cookie prefers [hse.gov.uk/cookies.htm]

// // Submit form function
// $( "#cookies-settings" ).submit(function( event ) {
//     event.preventDefault(); // Prevents normal form behaviour

//     var dataArray = $("#cookies-settings").serializeArray(), // Creates array of objects

//     dataObj = {};
//     $(dataArray).each(function(i, field){
//         const fieldValue = field.value;
//         let value;
//         if (fieldValue === 'on') { // make values boolean
//             value = true;
//         } else if (fieldValue === 'off') {
//             value = false;
//         } else {
//             value = fieldValue;
//         }
//         dataObj[field.name] = value;
//     });

//     var analytics = dataObj['cookie-usage-analytics'];

//     var preferences = {
//         'essential':true,
//         'usage': analytics,
//         'campaigns':false,
//         'settings':false
//     };

//     var stringPreferences = JSON.stringify(preferences);
//     var encodedPreferences = window.btoa(stringPreferences);

//     Cookies.set(cookiePolicy, encodedPreferences, {path: '/', domain: '.localhost', secure: false , expires: 365})
// });

// // On click handling
// $(document).ready(function () {
//     // If user accepts all cookies (Cookie banner) while on cookie preferences page
//     $('#acceptAllCookies, #acceptAll').click(function() {
//         document.getElementById('cookie-usage-analytics').checked = 'checked';
//         // Jump to top of content
//         location.href = "#contentContainer";
//         document.getElementById('cookieContainer').classList.add('accepted');
//     });

//     $('#rejectAllCookies').click(function() {
//         // Jump to top of content
//         location.href = "#contentContainer";

//         document.getElementById('cookieContainer').classList.add('rejected');

//     });

//     // Checks cookie preferences and sets radio buttons
//     // Analytics

//     if (usageSet == true ) {
//         document.getElementById('cookie-usage-analytics').checked = 'checked';
//     }
// });