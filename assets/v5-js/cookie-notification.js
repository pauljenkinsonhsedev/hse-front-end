// Global cookie notification bar

$(document).ready(function () {
			
$('<div id="cookieNotifyClose"><a href="#"><img src="'+platformPath+'/assets/v4-images/shared/cookie-close.png" alt="Close this information" /></a></div>').appendTo("#cookieNotify");
	
	
if ($.cookie('hseCookieNotify') == 'true') {
  $('#cookieContainer').addClass('hide-notification');
}
	
$('#cookieNotifyClose a').click(function() {
 $.cookie('hseCookieNotify', 'true', {expires: 365, path: '/' });
 $("#cookieContainer").remove();
});

});
