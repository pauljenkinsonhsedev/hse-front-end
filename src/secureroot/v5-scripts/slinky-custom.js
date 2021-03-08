// SLINKY //


// Set active state

  // Get URL

  var url = window.location.pathname;
  var relHome = $("link[rel$='home']").attr('href') ;
  
  // Get page title
  var urlnew = url.substring(url.lastIndexOf('/') + 1);

  // Custom URL path for orphan pages

  var filenameremoved = url.replace(urlnew, '');

  // Removes filename and replaces with index.htm

  var orphanindex = filenameremoved + 'index.htm';

  if (urlnew === '') {
    urlnew = 'index.htm'
  }; // Important fix for URLs with no index.htm

  $(".slinky-menu ul li a").each(function () {
    if ($(this).attr("href") == urlnew) {
      $(this).parent().parent().addClass("active");
    }
  });

  // Active page

  $(".slinky-menu ul li a").each(function () {
    if ($(this).attr("href") == urlnew) {
      $(this).addClass("active-page");
      $(this).attr('aria-current','page');

    }
    });

  // Orphan page fix
  // Check if menu contains class of active.page

  var numActiveItems = $("#menu .active-page").length;

  console.log(numActiveItems);

  // If not get orphan page url
  
  var segment = url.split("/").length - 1 - (url.indexOf("//")==-1?0:2);
  
  if (numActiveItems == 0) {

        $(".slinky-menu ul li a").each(function (id, element) {
						
	    if($(this).attr("href").includes(orphanindex)) {
			
		// Add active page class to first list item
    $(this).addClass("active-page no-active-style");
    $(this).attr('aria-current','page');
		$(this).parent().parent().addClass("active");
		} 
		
		// If URL is 2 segments
			
		if($(segment == 2) || (this).prop("href").includes(hseonline)) {
    $(".first").addClass("active-page");
    $(".first").attr('aria-current','page');
		$(".first").parent().addClass("active");
		}
		
			
	  });

  }
	

 // Accesibility - CSS taken from slink.min.css
 $(".slinky-menu li ul").css("position", "absolute");



  // Initiate slinky drilldown menu
 "use strict";
  var slinky = $("#menu").slinky({
    animate: false
  });

 $(function() {

  
  // Custom back text


  // Add new classes to handle back text replacement
  $('li.first').addClass('header');
  $('li.first a').addClass('next-new');
  $('li a.next').addClass('next-new');

  // Add attribute to #links for accesibility
  $('#menu li a').each(function (id, element) {
	
	var micrositeTitle = $('#menu ul li.first').text();
	  
		   
	var titleText = $(element).text();
	  
	if (titleText == micrositeTitle) {
	var titleText = 'Overview';
	}
	  
    $(element).attr("title", micrositeTitle + ': ' + titleText);	



  });

	
  
	
  $('li.header a.back').addClass('back-new');

  $('li.header a.back').each(function (id, element) {

    var text = '';


    // Handle the first replacement differently from the rest

    if (id === 0) {

      text = $(element).parents('.slinky-menu ul').find('li.first a').text();

    } else {

      text = $(element).parent().parent().parent().parent().parent().find('a.next-new').first().text();

    }

    $(element).text(text);
	  
  });
	
	// Back aria label
	
  $('li.header').each(function (id, element) {
	  
	// Takes text of list item with .header class and adds to tutke attribute

    var backAria = $(element).find('a').text();
    $(element).find('a').attr("title", 'Back to ' + backAria);
	  
  });
	
  // Rename title attribute for each overview menu item
	
  $('#menu ul li ul li.header').each(function (id, element) {
	  
  var overviewTitle = $(element).parent().parent().find('a.next').first().text();
  $(element).next('li').find('a').attr("title", "Overview: " + overviewTitle);
  $(element).next('li').find('a').html( "Overview"  + '<span class="hide">: ' + overviewTitle + '</span>');

	  
  });
		
  // Resets first list item in nav to microsite title
	
  var micrositeTitle = $('#menu ul li.first').text();
  $('li.first.header').find('a').attr("title", micrositeTitle);
});
