// Notification bar
$(document).ready(function () {
	
var notificationBar = Cookies.get('notification-bar');
	
if ( notificationBar == 'yes') {
      $('#notification-bar').addClass('hide-notification');
    }

$('.notification-hide-button').click(function() {
 $.cookie('notification-bar', 'yes', {expires: 7, path: '/' });
 $("#notification-bar").remove();
});

});

