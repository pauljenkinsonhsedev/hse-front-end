/* v4.2.7 */ 

/** 
* ----------------------------------------------------------------------------------------------------------
* Image map
* ----------------------------------------------------------------------------------------------------------
* Create a rollover effect on image maps which use rectangular areas. See Dev Guide for usage.
*/
function hse_image_map() {
	
	// Look for images with the imageMap class
	var _images = $('img.imageMap');
	
	// If we have some...
	if (_images.length) {
		
		_images.each( function() {
							   
							 
							 // Find the matching image map name (without the hash, if it exists)
							 var _mapName = $(this).attr('usemap').match(/#?(.*)/);
							 _mapName = _mapName[1];
							 
							 // Get the actual map
							 var $map = $('map[name="'+_mapName+'"]');
							 
							 // Get the areas of the map
							 var $areas = $map.children('area');
							 
							 // If the rollover detail is to be moved somewhere else, look for it...
							 var $output = $('#' + _mapName + 'Output').eq(0); 						
							 
							 // Are we drawing highlights over the image?
							 var _highlights = $(this).eq(0).hasClass('noHighlights') ? false : true;
							 
							 // Wrap the image in a DIV, and make it's position relative	
							 if (_highlights) {
								 var _container =   $('<div />').css('position', 'relative').attr('id', _mapName+'Container') ;
								 $(this).wrap(_container);
							 }


							// For each area of the map
							 $areas.each( function() {
											
												   
												 $this = $(this); 
												 var _href = $this.attr('href').match(/#?(.*)/)[1];
												 var _linkedEl = false;
												   
												  // Move each output box to its destination if there is one, and hide it
												  if ($output.length) {
												 		_linkedEl = $( '#'+_href  ).appendTo($output).addClass('imageMapOutput').hide(); 
												  } else {
														_linkedEl = $( '#'+_href  ).addClass('imageMapOutput').hide(); 
												  }
												  
												 
												 
												 $this.bind('mouseover focus',  function() {
																		$('.imageMapOutput').hide();
																		$( $(this).attr('href') ).show();
																		
																		if (_highlights) {
																			$('.areaIndicator').hide();
																			$(this.indicator).show();
																		}
																		
																	 });
	 
	 
												 // Draw boxes over each area (if they are rects)
												if (_highlights && $this.attr('shape').toLowerCase() == 'rect') {
													var _coords = $this.attr('coords').split(',');
													var _l = _coords[0];
													var _w = _coords[2] - _coords[0];
													var _t = _coords[1];
													var _h = _coords[3] - _coords[1];
													
													this.indicator = $('<div />').css({	position: 'absolute',
																	  	left: _l + 'px',
																		top: _t + 'px',
																		width: _w + 'px',
																		height: _h + 'px',
																		opacity: 0.25
																		})
													 				.hide()
																	.addClass('areaIndicator')
																	.attr('id', _href + 'Rollover')
																	.appendTo( '#'+_mapName+'Container');
												 }
									  });
							 
							 });	
	}

}





/** 
* ----------------------------------------------------------------------------------------------------------
* Tabbed panels
* ----------------------------------------------------------------------------------------------------------
* Initialise tabbed panels
*/

/*	
	4.0.0 tabs plugin change.

	Modified tabs title code to only use the first header:
	FROM: var title = jQuery(this).find(args.head).text();
	TO: var title = jQuery(this).find(args.head).first().text();
*/

function hse_tabs_init (){
		
	$(".tabContainer").semantictabs({
		panel:'.tabPanel',         //-- Selector of individual panel body
		head:'h2,h3,h4,h5,h6',           //-- Selector of element containing panel header
		active:':first'              //-- Which panel to activate by default
	});		
		
}

/**
* Vertical tabbed panels (e.g. news homepage)
* Create the tabbed panel widget, if the appropriate element exists on the page
*/
function hse_tabbed_panel_init() {	

	// Changes layout css from non-js to js versions
	$("#focusSwitcher").removeClass('noScript');
	
	// On mouseover add and removes active class
	$("#focusSwitcher h2").mouseover( function() {
		$(".newsItem").removeClass('active');
		$(this).parent().addClass('active')
		
	});
	
	// Do it when focussed too, for keyboard navigation
	$("#focusSwitcher h2 a").focus( function() {
		$(".newsItem").removeClass('active');
		$(this).parents('div.newsItem').addClass('active');
	});
	
}

/*
jquery.semantictabs.js
Creates semantic tabs from nested divs
Chris Yates

Inspired by Niall Doherty's jQuery Coda-Slider v1.1 - http://www.ndoherty.com/coda-slider

Copyright (C) 2007-2011 Chris Yates

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Usage:
$("#mycontainer").semantictabs({
  panel:'.mypanelclass',         //-- Selector of individual panel body
  head:'headelement',           //-- Selector of element containing panel header
  active:':first',              //-- Which panel to activate by default
  activate:':eq(2)'             //-- Argument used to activate panel programmatically
});

1 Nov 2007

Bug fixes 15 Dec 2009:
http://plugins.jquery.com/node/11834
http://plugins.jquery.com/node/8486
(thanks zenmonkey)

Feature update 4 Jan 2010:
Now works with arbitrary jQuery selectors, not just 'class' attribute.

*/

jQuery.fn.semantictabs = function(passedArgsObj) {
  /* defaults */
  var defaults = {panel:'.panel', head:'h3', active:':first', activate:false};

  /* override the defaults if necessary */
  var args = jQuery.extend(defaults,passedArgsObj);
  
  // Allow activation of specific tab, by index
	if (args.activate) {
	  return this.each(function(){
	    var container = jQuery(this);
			container.find(args.panel).hide();
			container.find("ul.tabs li").removeClass("active");
			container.find(args.panel + ":eq(" + args.activate + ")").show();
			container.find("ul.tabs li:eq(" + args.activate + ")").addClass("active");      
	  });
	} else {
    return this.each(function(){
  		// Load behavior
  		var container = jQuery(this);
      container.find(args.panel).hide();
  		container.find(args.panel + args.active).show();
  		container.prepend("<ul class=\"tabs semtabs\"></ul>");
  		container.find(args.panel).each( function() {
  		  var title = jQuery(this).find(args.head).first().text();
  		  this.title = title;
  			container.find("ul.tabs").append("<li><a href=\"javascript:void(0);\">"+title+"</a></li>");
  		});
  		container.find("ul li" + args.active).addClass("active");
  		// Tab click behavior
  		container.find("ul.tabs li").click(function(){
  			container.find(args.panel).hide();
  			container.find("ul.tabs li").removeClass("active");
  			container.find(args.panel + "[title='"+jQuery(this).text()+"']").show();
  			jQuery(this).addClass("active");
  		});                                
  		container.find("#remtabs").click(function(){
  			container.find("ul.tabs").remove();
  			container.find(args.container + " " + args.panel).show();
  			container.find("#remtabs").remove();
  		});
  	});
	}
		
};

// ------------------------------------------------------------------------
// Forms
// ------------------------------------------------------------------------
function hse_prettyForms_init() {	

	if($('.hseform').length){

		$('form.hseform fieldset').on({
				focusin: function(){
					$(this).addClass('current');
			},
				focusout: function(){
					$(this).removeClass('current');
			}
		});

		$('.clear-value').each(function(){
			if ($(this).val()){
				// do nothing
				var default_value = this.value;
				} else {
					var default_value = ''; // enter a default value here
					this.value = default_value;
				}

				$(this).focus(function(){
					if(this.value == default_value){
					this.value = '';}
				}
				);
				$(this).blur(function(){
					if(this.value == ''){
					this.value = default_value;}
				}
			);
		});

		// For use with HSE forms to toggle list of checkboxes
		$(".togglecheckbox").each(function(e){

			// find all other checkboxes
			$checkbox = $(this).closest("ul.radio-check").find("input[type=checkbox]:not(.togglecheckbox)");

			// on click toggle other checkboxes
			$(this).click(function(e){
				if($(this).attr('checked')){
					$checkbox.attr('checked', 'checked');
					// submit form
					//$(this).closest("form").submit();
				} else {
					$checkbox.removeAttr('checked');
				}
			});

			// on click remove checked from .togglecheckbox
			$checkbox.click(function(){
				if($(this).attr('checked')){
					$(".togglecheckbox").attr('checked');
				} else {
					$(".togglecheckbox").removeAttr('checked');
				}
			});
		});

		// reset checkbox and radio buttons
		$(".checkradio-reset").each(function(e){
			$(this).click(function(e){
			   if($(this).attr("checked")){			
				$(this).closest(".hseform").find("input[type=checkbox]:not(.checkradio-reset), input[type=radio]:checked").prop("checked", false);
			   }
			   $(this).attr("checked");
			});
			
			// on click remove checked from .checkradio-reset
			$reset = $(this).closest(".hseform").find("input[type=checkbox]:not(.checkradio-reset), input[type=radio]:checked");
			$reset.click(function(){
				if($(this).attr('checked')){
					$(".checkradio-reset").prop("checked", false);
				}
			});
		});
	}
};
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

// Split list polyfill for IE
$.fn.extend({
    list2Columns: function(numCols){
        $(this).each(function(){
		
		var num_cols = numCols,
		container = $('.splitList2, .splitList3, .splitList4'),
		listItem = 'li',
		listClass = 'sub-list';
		container.each(function() {
			var items_per_col = new Array(),
			items = $(this).find(listItem),
			min_items_per_col = Math.floor(items.length / num_cols),
			difference = items.length - (min_items_per_col * num_cols);
			for (var i = 0; i < num_cols; i++) {
				if (i < difference) {
					items_per_col[i] = min_items_per_col + 1;
				} else {
					items_per_col[i] = min_items_per_col;
				}
			}
			for (var i = 0; i < num_cols; i++) {
				$(this).append($('<ul ></ul>').addClass(listClass));
				for (var j = 0; j < items_per_col[i]; j++) {
					var pointer = 0;
					for (var k = 0; k < i; k++) {
						pointer += items_per_col[k];
					}
					$(this).find('.' + listClass).last().append(items[j + pointer]);
				}
			}
		});
		});
    }

});

// Split list

function hse_splitList_init() {	
if ($('html').hasClass('ie')){
		if($('.splitList2').length != 0){
			$('.splitList2 ul').list2Columns(2);
		}
		if($('.splitList3').length != 0){
			$('.splitList3 ul').list2Columns(3);
		}
		if($('.splitList4').length != 0){
			$('.splitList4 ul').list2Columns(4);
		}
	}
}

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
