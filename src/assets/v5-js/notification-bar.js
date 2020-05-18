// Notification banner (DW template)

$(document).ready(function () {

// Get cookie value
var notificationBanner = Cookies.get('notification-banner');

// If cookie value = true, hide notification banner
if ( notificationBanner == 'yes') {
$('#notificationBanner').addClass('hide-notification');
}

// Set cookie on click 
$('.notification-hide').click(function() {
Cookies.set('notification-banner', 'yes' , { path: '/', expires: 7});
$("#notificationBanner").hide();
});

});


$(document).ready(function() { 

var globalSet = Cookies.get('global_banner');

  $.getJSON('/ajax/this.json', function(global) { 
      var active = global.active;
      var message = global.message;
      var link = global.link;

console.log(message);

// If global message set to active in JSON and banner has not been accepted      

if (active == 'true' && globalSet != 'true') {

var headerContainer = document.querySelector('#headerContainer'),
globalBannerLocation = document.querySelector('#header'),


globalNotification = document.createElement('div');
globalNotification.setAttribute('id', 'global-notification-banner');
globalNotification.classList.add('notification-banner');
globalNotification.classList.add('global');
globalNotification.innerHTML = '<div class="notification-container fixed-container">' + message + '<a href="#hide-message" class="notification-hide global">Hide&nbsp;message</a></div>';

headerContainer.insertBefore(globalNotification, globalBannerLocation.nextSibling);

$('.notification-hide.global').click(function() {

var globalBanner = 'global_banner';

Cookies.set(globalBanner, 'true' , { path: '/', expires: 365});

$('#global-notification-banner').remove();

});

}

  }); 

});  