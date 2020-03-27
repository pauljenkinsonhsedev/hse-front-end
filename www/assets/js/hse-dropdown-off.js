// Local override to switch off drop down function. To be used on Site Map and similar pages. Langauge drop down uneffected.
// Based on @version 3.14.4

var _local_preferences = {
		ddm: function () {
	
			hse_dropdownmenu_switch_init( {dropdownsToEnhance: 'ul.separateLabel' } );
			
			//extra function for styling, so not squashed inside a div
			$('ul.ddmswitch:not(".separateLabel")').addClass('linkList ddmRemoveFirstChild').removeClass('ddmswitch');
			//Note class 'ddmRemoveFirstChild' only added to allow next funtion to run.
			
			//now remove first child so that "Industries" does not appear as a link on the Industries page. 
			$('ul.ddmRemoveFirstChild li:first-child').remove(); 
		}
	}
