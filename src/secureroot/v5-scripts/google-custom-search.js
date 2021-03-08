// Google Custom Search
function addGoogleAlt() {
  $("img.gsc-branding-img").attr("alt", "Google")
}

!function () {
  var a = document.createElement("script");
  a.type = "text/javascript", a.async = !0, a.src = "https://cse.google.com/cse.js?cx=015848178315289032903:hqkynptgd1o";
  var t = document.getElementsByTagName("script")[0];
  t.parentNode.insertBefore(a, t)
}(),


// Replaces default Google custom search placeholder text

window.onload = function(){

addGoogleAlt()

searchInput = document.querySelector('#gs_tti50'),
searchLabel = document.createElement('label');


searchLabel.innerHTML = 'Search hse.gov.uk';
searchLabel.classList.add('hide');
searchLabel.setAttribute('for', 'gsc-i-id1');

searchInput.prepend(searchLabel);

document.getElementById('gsc-i-id1').placeholder = 'Search hse.gov.uk';





};



