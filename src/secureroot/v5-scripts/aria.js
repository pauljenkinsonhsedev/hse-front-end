// V5 Aria roles

$(document).ready(function () {
  $('#breadCrumb').attr('aria-label','Previous pages:');
  $('#cookieContainer').attr('aria-label','Cookie banner');
  $('#printBanner').attr('aria-label','Print banner');
  $('#lastUpdated').attr('aria-label','Last updated');
  $('#top').attr('aria-label','Skip to content');
  $('#beta-user-testing').attr('aria-label','Beta feedback');
  $('#feedback p.feedback-message').attr('id','feedback-message');
  $('#feedback').attr('aria-describedby','feedback-message');
  $('#feedback').attr('aria-label','Is this page useful');
  $('#breadCrumb li:last-of-type').attr('aria-current','page');
  $('#pagination')
	.attr('role','navigation')
	.attr('aria-label','Pagination Navigation');
  $('#multistepNav').attr('role','navigation').attr('aria-label','Secondary');
});
