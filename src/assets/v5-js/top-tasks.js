// Top Tasks	

  // Top tasks contents, link unwrap on current page.

  var urlpath = window.location.pathname;
  var urlname = urlpath.substring(urlpath.lastIndexOf('/') + 1);
  if (urlname === '') {
    urlname = 'index.htm'
  }; // Important fix for URLs with no index.htm


  $("ol.multistep a").each(function () {
    if ($(this).attr("href") == urlname) {
      $(this).contents().unwrap();
    }
  });

