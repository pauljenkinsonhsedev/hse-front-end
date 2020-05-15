/* P Jenkinson 21/11/2018 - yes/no user feedback */
$("#userYes").click(function(e){
	$(".feedback-links, .feedback-message").remove();
	$(".feedback-container").prepend("<p>Thank you for your feedback.</p>");
	e.preventDefault();
});
$("#userNo").click(function(e){
	$(".feedback-links, .feedback-message").remove();
	$(".feedback-container").prepend("<p>Thank you for your feedback.</p>");
	/*
	$(".feedback-links, .feedback-message").remove();
	$(".feedback-container").append('<div class="help-improve"><h3>Help us improve hse.gov.uk</h3><p>To help us improve hse.gov.uk, we’d like to know more about your visit today. <a href="#">Feedback form</a></p></div>');
	$(".help-improve").css("margin-top", "0");
	
	$(".help-improve p, .help-improve a, .help-improve h3").css({
	"color" : "white"});
	
	$(".help-improve a").css({
	"text-decoration" : "underline"});
	
	$(".help-improve").css({
	"margin-top": "0", 
	"background" : "#a70632"});
	
	$(".feedback-container").css({
	"padding": "5px 5px 0px 5px", 
	"border-radius": "5px",
	"margin-bottom" : "5px",
	"border-bottom" : "5px solid #a70632"});
	$("#feedback").css("border-bottom", "none");
	*/
	e.preventDefault();
});