// V5 Aria roles

$(document).ready(function () {
  $('#cookieContainer').attr('aria-label','Cookie banner');
  $('#breadCrumb li:last-of-type').attr('aria-current','page');

  // remove after 1.2.1 applied
  $('#printBanner').attr('aria-label','Print banner');
  $('#lastUpdated').attr('aria-label','Last updated');
  $('#top').attr('aria-label','Skip to content');
  $('#pagination')
	.attr('role','navigation')
	.attr('aria-label','Pagination Navigation');
  $('#multistepNav').attr('role','navigation').attr('aria-label','Secondary');
});
