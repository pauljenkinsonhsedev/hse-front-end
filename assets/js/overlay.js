// Overlay version 3.14.6

/**
* Additional stats tracking - Added by Phillip Roberts-Jones 21/07/09
* Created unique and persistant id tags for body tag, and all contents links
*/

$(document).ready(function() {
		 
	//Add an id to the body tag based on the last 32 characters of the current URL (note: if an anchor link it includes these as part of the URL)
	//Strips out possible invalid characters from the id
	$('body').attr("si:pageID", document.URL.replace("index.htm","").replace(/[^a-zA-Z 0-9]/g,"").slice(-32));
	


	//Find all of the links in the content area
	$('body a').each(
		function linkTest(){
			
			//use the link's url and the modified text content to form a variable
			var validId = this + $(this).text();
			
			//use the url+text as the id for the link, up to the last 255 characters, and strip out all special characters and spaces to make the id valid
			$(this).attr("id", validId.replace(/[^a-zA-Z 0-9]/g,"").replace(/\s/g,"").slice(-255)); 
			
			//run the additional stats tracking as an onclick event for the link
			$(this).click(function runMe2(){SiTrackLink(this)});
		});
	
});

