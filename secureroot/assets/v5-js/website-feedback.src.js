/* P Jenkinson 21/11/2018 - yes/no user feedback */

$("#userYes").click(function(e){
	$(".feedback-links, .feedback-message").remove();
	$(".feedback-container").prepend("<p>Thank you for your feedback.</p>");
	e.preventDefault();
});
$("#userNo").click(function(e){
	$(".feedback-links, .feedback-message").remove();
	$(".feedback-container").prepend("<p>Thank you for your feedback.</p>");
	e.preventDefault();
});
	
