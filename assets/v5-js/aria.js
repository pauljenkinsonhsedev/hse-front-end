// V5 Aria roles

$(document).ready(function () {
  $('#article').attr('role','article');
  $('#breadCrumb li:last-of-type').attr('aria-current','page');
  $('#pagination')
	.attr('role','navigation')
	.attr('aria-label','Pagination Navigation');
  $('#asideBottom').attr('role','complementary');
  $('#multistepNav')
	.attr('role','navigation')
	.attr('aria-label','Secondary');
});

