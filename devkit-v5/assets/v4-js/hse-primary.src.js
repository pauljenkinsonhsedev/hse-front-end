/* v4.2.7 */

/**
* @fileoverview
* HSE Core Javascript 
*
*	NOTES ON THIS RELEASE
* 	Notes pertaining to the structure and override approach to the
* 	the javascript can be found at:
*	http://blogs.hse.gov.uk/wiki/developers/New_javascript_widget_process
*
*/


/** 
* ----------------------------------------------------------------------------------------------------------
* Preferences - for ease of setting
* ----------------------------------------------------------------------------------------------------------
*/
_hse = {
	
	// Which domains do we allow news feeds to be loaded from?
/*	permittedFeedDomains: ['vocuspr.com'], */
	
	// Which domains DON'T count as external? (apart from *.hse.gov.uk). 
	// We will automatically try with and without the www
	// These are used for adding external link icons to links, and determining whether to show
	// an interstitial when performing redirects
	notExternal: ['hsebooks.com', 'hsesat.info','vbtlwb16'], 
	
	// URL of the JSON proxy
/*	jsonProxy: 'http://news.hse.gov.uk/rss2json/', */
		
	// Path to secondary functions, which are loaded on demand
	secondaryScripts: hse_url('/assets/v4-js/hse-secondary.min.js'),
	
	// Path to table functions, which are loaded on demand
	tableScripts: hse_url('/assets/v4-js/hse-tables.min.js'),
		
	// Path to lightbox functions, which are loaded on demand
	lightboxScripts: hse_url('/assets/v4-js/hse-lightbox.min.js'),
	
		// Path to colorbox functions, which are loaded on demand
	colorboxScripts: hse_url('/assets/v4-js/hse-colorbox.min.js')
		
};


/** 
* ----------------------------------------------------------------------------------------------------------
* Default behaviours
* ----------------------------------------------------------------------------------------------------------
* Define the default behaviour for the page. Note that what you see here is a shorthand which is addressed 
* by the 'preprocess' function and turned into more verbose code. This is to help html developers.
*   relative_path:hse_sniff_relative_path,
* becomes
*   relative_path:{ready:hse_sniff_relative_path}
* and will run on document ready
*/
_defaults = {				
			
			// In this file (primary)
			aria_roles:				hse_aria_landmark_roles,
			aria_load_role: 		{ load: hse_aria_landmark_load_roles},
			navigation:				hse_subnav_init,
			ddm:					hse_dropdownmenu_switch_init,
			link_icons:				hse_link_icons_init,
			link_icons_positioning: { load: hse_link_icons_position},
			interface_tweaks:		hse_interface_tweaks_init,
			footnote_links:			{ load: hse_footnote_link_init },
			footnote_abbreviations:	{ load: hse_footnote_abbr_init },
			equal_heights:			hse_equaliseHeights,
			
			// In secondary file			
			tab_boxes:				_hse_load('.tabContainer', _hse.secondaryScripts, 'hse_tabs_init'),
			tabbed_panels:			_hse_load('#focusSwitcher', _hse.secondaryScripts, 'hse_tabbed_panel_init'),	
			image_maps:				_hse_load('img.imageMap', _hse.secondaryScripts, 'hse_image_map'),
			pretty_forms:			_hse_load('.hseform',  _hse.secondaryScripts, 'hse_prettyForms_init'),
			split_lists:			_hse_load('.splitList2, .splitList3, .splitList4', _hse.secondaryScripts, 'hse_splitList_init'),
			
			// In other files			
			lightbox:				_hse_load('.lightbox', _hse.lightboxScripts, 'hse_lightbox_init'),
			colorbox:				_hse_load('.colorbox', _hse.colorboxScripts, 'hse_colorbox_init'),
			striped_tables:			_hse_load('table:not(.noStripes)', _hse.tableScripts, 'hse_striped_tables'),
			sortable_tables:		_hse_load('table.tablesortable, table.sortable', _hse.tableScripts, 'hse_sortable_tables_init'),
			expandable_tables: 		_hse_load('table:has(tbody):not(.noProgressiveEnhancement):not(.noExpanding)', _hse.tableScripts, 'hse_expandable_tables_init')
						
		};
		// In platform specific JS
		//google_search:		hse_enhance_global_search,




	

/** 
* ----------------------------------------------------------------------------------------------------------
* ENGINE CODE
*	This is the engine that delivers the cascaded settings for the individual page. You really, really 
*	really, really won't need to alter the code here (until you see "END OF ENGINE CODE") in order to 
*	make things work. See the documentation above about how you make this stuff work, and why it is a good
* 	idea. 
*	If you're looking to add a function to document.ready or load then you must place your invocation into the
* 	cascade. However, before this you should read the process documentation for alterations to the HSE 
*	javascript.
* ----------------------------------------------------------------------------------------------------------
*/ 
$(function(){
	// detect old (2005) or new (2009) design and apply relevant settings. 
	// note that we always merge the settings for the older_version over the top of 
	// the settings for the new version.

/*	if (typeof(_old_defaults) == 'object') { // If the legacy script has been loaded
		var settings = $.extend (true,preprocess(_defaults),preprocess(_old_defaults));
	} else {
		var settings = preprocess(_defaults);		
	}*/
	
	/* Legacy script has been removed - PL */
	
	var settings = preprocess(_defaults);
	
		   
	// Now to set difference preferences (or the 'preference cascade')	
	// This is like a CSS style cascade of page configuration.
	// _local_preferences - designed to be implemented in assets/js/site.js (or whereever)
	// _page_preferences - reads from in page javascript preferences
	// _html_preferences - reads from <meta tag /> based configuration, for non-techie designers
	// _user_preferences - are read via the persistent preferences object (stores in cookie as json) declared here 

	// make sure _local_preferences is defined. We can't just declare var foo = , because 
	// that would overwrite any locally set values.
	if('undefined' == typeof _local_preferences) _local_preferences = {}; 
	_local_preferences = preprocess (_local_preferences);
	
	// make sure _preferences is defined
	if('undefined' == typeof _page_preferences) _page_preferences = {}; 	
	_page_preferences = preprocess(_page_preferences);
	
	var _html_preferences = preprocess(hse_read_html_preferences());
	//var	_user_preferences = preprocess($.persistentData.get('hse_user_preferences'));
		
	// and merge the settings together in reverse order of the cascade: defaults->older_version->page prefs->html prefs->cookie prefs
	settings = $.extend (true,settings,_local_preferences,_page_preferences,_html_preferences/*,_user_preferences*/);
	
	// store the settings in the body for others to use later on
	$('body').data('settings', settings);
	execute (settings, "ready");
});

$(window).load(function(){
	
	execute($('body').data('settings'),'load');
	
});

/** 
*	Prepocesses shorthand settings definitions "foo:bar" to be fully expanded
*	as ready functions: foo:{ready:bar}.
*	See explanation above for full description of why this is necessary.
*	The short explanation is that this allows us to have a fairly friendly
*	system for expressing preferences and changes to default behaviour
*/
function preprocess(props){
	for(member in props){
		if (typeof props[member] == 'function') {				
			props[member] = {'ready': props[member]};			
		}		
	}
	return props;
} 

/**
*	Dummy function with a nice name which represents a keyword in the cascading preferences
*	system. Allows us to declare "foo:off" in order to, well, switch something off.
*
*/
function off(){
	// do nothing - the function is off!
}

/**
*	Function to iterate the supplied (settings) object and 
*	execute the functions indicated. 
*	means that {ready:foo,load:bar} will execute foo on 'ready'
* 	'bar' on load. 
* 	To do: investigate using 'bind' in order that we can
*	a) drop the evt specification and just run this once, and 
*	b) to support user defined events.	
*	c) remove recursion	
*	@param obj Properties object containing the list of functions to processed
*	@param evt Name of the event to be triggered. Supported values 'ready', 'load'.
*/
function execute(obj, evt){
	for (member in obj){		
		if (member==evt && typeof obj[member]=='function'){
			// execute now
			obj[member](obj.properties);			
		} else if (typeof obj[member]=='object'){
			execute(obj[member], evt);
		}
	}		
}

/**
*	Creates a preferences object from html meta tags
*	*	The overloading mechansim (or 'preferences cascade') then
*	allows for xhtml developers to switch off specific page functions
*	without technical knowledge.
*	@returns A properties object which is compatible with the execution cascade
*/
function hse_read_html_preferences(){
	var ret_val=[];
	$("head meta[name^='hse.preferences.']").each(function(){
		var t = $(this);										
		j = t.attr('name').replace(/hse\.preferences\./,"");
		ret_val[j] = t.attr('content');
	});
	return ret_val;
}

/** 
* ----------------------------------------------------------------------------------------------------------
* END OF ENGINE CODE
* ----------------------------------------------------------------------------------------------------------
*/




/**
* ----------------------------------------------------------------------------------------------------------
* Misc site-wide interface and accessibility / usability tweaks
* ----------------------------------------------------------------------------------------------------------
*/
function hse_interface_tweaks_init() {
	
	// Let it be known that JS is here
	$('body').addClass('hasScript');
	
	// Auto select the contents of form fields with the autoSelect class
	$('.autoSelect').autoSelect();
	
	// Auto clear the contents of form fields with the autoClear class
	$('.autoClear').toggleVal();
	


// Temperory function for transition to modular CSS code.
// This function will add the 'hasMore' class to the "old" pre-modular CSS box classes. 'box' is left alone as the new code doesn't need it.
	
//$('div.box-1col p.more, div.box-1col-last p.more, div.box-2col p.more, div.box-2col-last p.more, div.box-3col p.more, div.box-3col-last p.more').each(function() {
//	$(this).parent('div, form').addClass('hasMore');
//});						

 //If a homepage box has a "more" box which is absolutely positioned, tell it's parent DIV, so it can accomodate it
$('p.more').parent('div, form').addClass('hasMore');
	
	
	
	
	// Add a link to a favicon for iPhones / iPod touches
	//$('head').append('<link rel="apple-touch-icon" href="'+hse_url('/assets/images/framework/apple-touch-icon.png')+'"/>');
	
	// Add the current URL to the mobile version link
	/*$('#mobileVersion').attr('href',  $('#mobileVersion').attr('href') + location.pathname );*/
	
	// Bind some [custom] events to ensure heights are always equalised after certain events	
	$(document).bind('fontresize feedloaded', hse_equaliseHeights);
	
}


/** 
* ----------------------------------------------------------------------------------------------------------
* Utility functions
* ----------------------------------------------------------------------------------------------------------
*/



/**
* Is the page being run locally, or online?
* This makes a difference because of security restrictions / different URL results 
* from different browsers when local vs online
*/
function isLocal() {	
	try { // This throws a JS error in IE8 when run locally, since default security settings don't let you access location in intranet security zone
		return (location.host == '' || location.host == 'localhost'	);
	}
	catch(err) {}	
}



/** 
* Load an external script, based on the criteria (a CSS selector).
* Loads from a URL and runs the callback when the script is ready.
* The dominoes library takes care of caching and queuing the external files.
* This is a private function, which returns a function to enable it to work with
* the engine code.
*/
function _hse_load(criteria, url, callback) {
	return function() {  // Return a function to remain compatible with engine code
		if ($(criteria).length) {  // If the criteria are present on this page	
			dominoes( url , function() {
				if (typeof(callback) == 'function') {
					callback();	
				} else {
					window[callback]();
				}
			} ); // Load the external file, and when it's done, execute the callback					 
		}
	}
}
/**
* This is a wrapper for the private _hse_load so it doesn't return a function, and can be called directly without having to use 
* unusual _hse_load()() syntax
*/
function hse_load(criteria, url, callback) {
	_hse_load(criteria, url, callback)();
}


/** 
* Extract the hostname from a URL which is passed
* Private function
* @params
* 	url - a valid URL (string)
* @returns
* 	false (if no valid hostname could be found)
*	or hostname (string)
*/
function _getHostnameFromUrl(url) {
			
	// Find the host of the URL that has been supplied
	var matches = url.match( new RegExp('^(.+)\://([^/]+)', 'im') );
	
	// If we have a URL without a protocol (://) then the regexp will not match,
	// we will have to assume it is a site relative URL eg not external
	if (matches == null) return false;
	
	// Retrieve the URL hostname from the Regexp
	return matches[2];
}




/** 
* Checks if a URL is allowed for linking, redirecting etc
*
* Parameters
*  @ url - the URL (eg of a link) you wish to test
*  @hostnamesWhiteList - an array of hostnames (strings) which should be allowed to link to. 
*    		The domains will be checked both with and without www. These can be supplied arbitarily,
*			or use one of the collections specified in preferences eg _hse.notExternal
* Returns
*  true - the URL is from one of the whitelisted domains (or www. variant)
*  false - the URL is not from one of the whitelisted domains.
*/
function hse_is_allowed_host(url, hostnamesWhitelist) {
		
	var	hostname = _getHostnameFromUrl(url),
		found = false;
		
	// If a hostname could not be found (eg a relative URL)	
	if (hostname === false) return false;	
	
	// Is hostname ANYTHING under *.hse.gov.uk ?
	if (hostname.match(/^([A-Za-z0-9\-]*\.)?hse\.gov\.uk$/) != null) return true;	
	
	// Loop through each of the permitted domains, and try it with and without the www.
	$.each(hostnamesWhitelist, function() {
		if (this == hostname || 'www.'+this == hostname) {
		 found = true;
		 return false; // Don't do any more loops
		}
	});
	
	return found;	
}









/** 
* URL builder
*
* Frequently we need to convert a relative URL to a site root or absolute URL.
* This function provides a combined interface to achive this.
* If a site relative URL is used (the preferred option) eg /assets/js/file.js
* it will automatically be rewritten to accommodate the current URL path
* Params:
*  @ url: the URL, either relative or absolute, which we wish to correct for HSE use
*  @ fullURL: (boolean) - return a URL with a full hostname, or just site relative. Deafults to false
* Returns:
*  url (string)
*/
function hse_url (url, fullURL) {
			
	// Return a full URL, or keep it as site relative?
	// Default to false (keep as it is)
	var l = location;		
	
	// Fully qualified, no need to do anything
	// Using string methods is dramatically quicker than regexps
	if ( url.indexOf('://') > -1 ) return url;	
	
	// If it begins with a slash, it's a root relative URL
	// but since sometimes (eg on local or testing servers) the site root isn't
	// always at the server root (eg http://localhost/development/hsesite/index.htm)
	// we need to add a relative path modifier 
	if (url.indexOf ('/') === 0) {
				
		// If the page is in the hse template (which it should be) then this should be straightforward	
		// This looks at the href of the first link with rel attribute "home"
		var	_firstHref = $("link[rel='home']").attr('href');		
		if (_firstHref && _firstHref.match) {
				
				// How many directory levels does the link tag traverse (count ../'s)
			var levels = _firstHref.match(/\.\.\//g),
				depthCount = (levels) ? levels.length : 0,  
				// Split the current URL into an array of directory levels
				pathParts = l.pathname.split('/'), 
				// Ignore the filename (the -1) and remove the depthCount number of directory levels
				modifier = pathParts.slice(0, (pathParts.length - depthCount - 1)).join('/'),
				// Do we need a hostname?
				host = (fullURL) ? l.protocol + '//' + l.host + '/' : ''; 
			
			return host + modifier + url;
		}
		
	// If we've been supplied a relative URL	
	} else {
		
		// If we're returning a full URL, we need to work out what this should be
		if (fullURL) {
			var loc = l.href.substring(0, l.toString().lastIndexOf('/'));
			while (/^\.\./.test(url)){		 
				loc = loc.substring(0, loc.lastIndexOf('/'));
				url = url.substring(3);
			}
			return loc + '/' + url;
		} else {
			
			// Otherwise, just return as is
			return url;	
		}		
	}
}




/**
* ----------------------------------------------------------------------------------------------------------
* Equalise heights
* ----------------------------------------------------------------------------------------------------------
* Used to equalise the heights of columns on section homepages
* We look for matching class names, ending with an ascending index
* eg all elements with the class equalHeight1 will have their heights matched,
* then all elements with the class equalHeight2, etc.
* All class names must begin with the keyword defined - but they can have any ending, eg equalHeightBanner
*/

$(document).ready(function() {
    // run test on initial page load
    checkSize();

    // run test on resize of the window
    $(window).resize(checkSize);
});

//Function to the css rule
function checkSize(){
    if ($(".sampleClass").css("float") == "none" ){
        // your code here
		function hse_equaliseHeights() {
	var 	_keyword = 'equalHeight',
			_uniqueIndexes = {};	

	// Get a collection of all elements with a class which talk about equalHeight
	$('[class*= '+_keyword+']').each(function() {
										// Go through each element, and look at it's class names	
										var _classes = this.className.split(' ');
										$.each(_classes, function() {
														// If one of the class names begins with the keyword, 
														// add it to the list of unique indexes		  
														if (this.indexOf(_keyword) === 0) _uniqueIndexes[this] = 1; 
														});
										 });
	
	// Now we have our object of unique classes, let's make them into a jQuery collection and equalise them
	$.each(_uniqueIndexes, function(theClass) {
							var row = $('.'+theClass).equaliseCols();
							//row.height('auto').height( row.maxHeight() );
						});	
}
/**
* maxHeight jQuery plugin
* Find the maximum height of a jQuery collection of elements
*/
(function($) {	 
	$.fn.maxHeight = function(){		
		var _max = 0;		
		this.each( function() {
			_max = 	Math.max(_max, $(this).height());			
		} );		
		return _max;			
	};	
})(jQuery);

// End code
    }
}



/**
 * Column equalisation (renamed for the UK)
 * Copyright (c) 2007 Tom Deater (http://www.tomdeater.com)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */ 
(function($) {	 
	$.fn.equaliseCols = function(){
		var height = 0,
			reset = $.browser.msie ? "1%" : "auto";
  
		return this
			.css("height", reset)
			.each(function() {
				height = Math.max(height, this.offsetHeight);
			})
			.css("height", height)
			.each(function() {
				var h = this.offsetHeight;
				if (h > height) {
					$(this).css("height", height - (h - height));
				};
			});
			
	};
	
})(jQuery);


	
/**
* ----------------------------------------------------------------------------------------------------------
*  Enhance the global search box
   Removed by PM 2013-01-28 - Local search has not been used for over a year, not missed.
   Not required with new google custom search
   Unfortunately cannot run new custom search inside a jQuery function and it should not run on all platforms. Therefore moved to platform specific JS
* ----------------------------------------------------------------------------------------------------------
*/


/**
* 
----------------------------------------------------------------------------------------------------------
* Add Aria landmark roles 
*
----------------------------------------------------------------------------------------------------------
* Add following Aria Landmarks to main page elements
* Element					Role			aria-label 
*
* #headerContainer			banner
* #contentContainer			main
* #navigationContainer		navigation		Primary
* #navSecondary				navigation		Secondary
* form.gsc-search-box		search (web and ONR)	(deferred to onload)
* #search					search 			Primary	(intranet)
* #localsearch				search			Local	(intranet only)
* #sideBar					complementary
* #footerContainer			contentinfo

Note: aria-label is only required where same role used more than once

*
*/
function hse_aria_landmark_roles (){
	$('#headerContainer').attr('role','banner');
	$('#contentContainer').attr('role','main');
	$('#navigationContainer')
		.attr('role','navigation')
		.attr('aria-label','Main menu');
	$('#navSecondary')
		.attr('role','navigation')
		.attr('aria-label','Secondary');
	$('#search')
		.attr('role','search')
		.attr('aria-label','Primary');
	$('#localsearch')
		.attr('role','search')
		.attr('aria-label','Secondary');
	$('#sideBar').attr('role','complementary');
	$('#footerContainer').attr('role','contentinfo');
}

function hse_aria_landmark_load_roles (){
// These roles are deferred to onload event
// search is deferred until google search applied
$('form.gsc-search-box').attr('role','search');
}

/**
* ----------------------------------------------------------------------------------------------------------
*  Add icons to links
* ----------------------------------------------------------------------------------------------------------
* 	Adds icons and 'open in new window' behaviour to links of selected filetypes
*	@param	opts, as a property list with options
*		filetypes, itself a property list in the format {xls : 'excelIcon',...}
*		selector	a function which returns the set of xhtml elements to attach icons to. 
*					*All* returned links will be operated on, so do your filters here. The function will
*					be run for each filetype, and will be passed the extension as the first argument
*/
function hse_link_icons_init(opts) {
	// Links to certain filetypes may have an additional icon added to them, and be forced to open in a new window
	// We define these as an object with file extension
	 var _defaults = {
	   filetypes:{ doc : 'Word document',
		  DOC : 'Word document',
		  docx: 'Word document',
		  DOCX : 'Word document',
		  ppt: 'Powerpoint presentation',
		  PPT: 'Powerpoint presentation',
		  pptx: 'Powerpoint presentation',
		  PPTX: 'Powerpoint presentation',
		  pps: 'Powerpoint presentation',
		  ppsx: 'Powerpoint presentation',
		  PPSX: 'Powerpoint presentation',
		  xls : 'Excel spreadsheet',
		  XLS : 'Excel spreadsheet',
		  xlsx : 'Excel spreadsheet',
		  xlsm : 'Excel spreadsheet',
		  XLSM : 'Excel spreadsheet',
		  pdf : 'PDF',
		  PDF : 'PDF',
		  rtf : 'RTF',
		  zip : 'ZIP'
		 }
	 },

	
	_settings = $.extend(true,_defaults,opts),
	_targetAreas = $('#pageContainer a, #navSecondary a').not(":not([href]), .noIcon, .shareBox a, div.downloadBox a, #navsub a, .socialMedia a"); // PL - Added not blank href selector to ensure that a tags without href (anchor tags) are ignored by this script
		
	// Links to external website pages should have an "external" class 
	// (except those ones specifically marked not to have one)	
	_targetAreas.each( function() {
								

		
			var 	$this = $(this);
					thisLinkUrl = $this.attr('href'); // Get the URL of this link
				
				var thisHostname = _getHostnameFromUrl(thisLinkUrl),	// Extract the hostname from it
					thisExt = thisLinkUrl.split('.').pop(); // Get the file extension (if applicable)							
			
			// Is it a file download?			
			// Original line listed below, edit KM, inserted by PM 2013-01-21
			// Removes 'exclude this rule working in #sideBar'
			//if ( _settings.filetypes[thisExt] && $this.parents('#sideBar, ul.itemThumbBook').length == 0) {
				if ( _settings.filetypes[thisExt]) {
				
				// Add a note to the tooltip
				var altText = _settings.filetypes[thisExt]	;												 
				this.title += altText;
				
				// Add the icon
				$this.append(' <img class="fileIcon" src="'+hse_url('/assets/v4-images/icons/'+thisExt+'.gif')+'" alt="'+altText+'" />');			

// PL - Temp fix for secureroot icons not working - hse_url has been disabled until logic flaw has been fixed
//$this.append(' <img class="fileIcon" src="'+('/assets/images/framework/icons/'+thisExt+'.gif')+'" alt="'+altText+'" />');

}			
			
			// Is it external?			
			
			// Does the link point to a URL on the same same server, 
			// or is it a relative link (no protocol),
			// or is it on the notExternal list?
			if (thisHostname === false || thisHostname == location.hostname ||  hse_is_allowed_host(thisLinkUrl, _hse.notExternal) ) return;
					
			$this.append(' <img class="fileIcon" src="'+hse_url('/assets/v4-images/icons/external.gif')+'" alt="link to external website" />');
			
	 });
	// Hide images until document loaded so that positioning is correct.
	// See 'hse_link_icons_position' for positioning rules.
	// Created KW.
	$(".itemThumbBook li .fileIcon").css("visibility", "hidden");
}

// An addition to the above function that runs onload. 
// Requires images in place for positioning calculation to work.
// Positions icons over thumbnails.
// Created KW.

function hse_link_icons_position(){
/*	$(".itemThumbBook li img").not(".fileIcon").each(function() {
		var imageHeight = $(this).height();
		var imageWidth = $(this).width();
		
		var numberIcons = $(this).siblings(".fileIcon").length;
		
		$(this).siblings(".fileIcon").each(function(i) {
			
			var iconHeight = $(this).outerHeight();
			var iconWidth = $(this).outerWidth();
			
			var iconTop = imageHeight - iconHeight;
			var iconLeft = imageWidth - (iconWidth * (numberIcons - i)) - i;
			
			$(this).css("top", iconTop + "px");
			$(this).css("left", iconLeft + "px");
			$(this).css("visibility", "visible");
			
			//alert(iconTop + ", " + iconLeft);
		});
	});	*/
}



/**
* ----------------------------------------------------------------------------------------------------------
* Create footnotes for links, to display when printed
* ----------------------------------------------------------------------------------------------------------
*	@param a properties object with the following properties allowable:
*		selector: 	a string in the jquery style which provides the source set of links to be reviewed.
*					by default this includes all links from the main content part of the site,
* 					and excludes #, javascript, and mailto links
*		append: 	a function which returns the jquery element or elements to which to apppend the footnotes.
*/
function hse_footnote_link_init(opts) {
	
	var _defaults = {
		append:function(){return $('#contentContainer');},
		selector:function(selector){return $("#contentContainer a:not([href^='javascript:']):not([href^='mailto:']):not(:empty):not([href^='#'])").not( $('body.blog .metadata a') );}
	},
	
	_settings = $.extend (true, _defaults,opts),
	_linkset = _settings.selector(),
	_appendTo = _settings.append();
		
	// Do we have any links to treat?
	if (!_linkset.length) return;
	
	// Start to build the HTML to insert by building a heading
	var _HTMLtoInsert = '<h2 class="hideFromScreen footnotes">Link URLs in this page</h2><ol class="hideFromScreen">',
		_footnoteCount = 0;
		
	// Go through each link...
	_linkset.each( function() {			
							
					var	_href = this.href, // What's the URL?
						$this = $(this),
						_thisText =  $.trim($this.text());
						_title = _thisText.length ? _thisText : $this.find("img").attr("alt"); // What's the title
						
					_footnoteCount++;	
					
					// Add this URL to the footnote. Build a string and insert it at the end, rather than
					// inserting elements on the fly, as this is more efficient				
					_HTMLtoInsert += (_title == _href) ? '<li>'+_title+'</li>' : '<li>'+_title+'<br />'+_href+'</li>';
					
					// Add a reference to the link
					$(this).after('<sup class="hideFromScreen">['+_footnoteCount+']</sup>');								 
	 });
	 
	 // Insert the footnotes to the content of the document
	_appendTo.append('</ol>' + _HTMLtoInsert);
}





/*
* ----------------------------------------------------------------------------------------------------------
* Make abbreviation/acronym definitions visible for printing
* ----------------------------------------------------------------------------------------------------------
*/
function hse_footnote_abbr_init() {
	
	// Main content area is called....
	var content = $('#contentContainer'),
		_allAAs = content.find('acronym, abbr'),
		HTMLtoInsert = '';
		
	// Do we have any a/as to display?
	if (!_allAAs.length) { return; }

	// Insert a heading
	HTMLtoInsert = '<h2 class="hideFromScreen footnotes">Glossary of abbreviations/acronyms on this page</h2><dl class="hideFromScreen">';
	
	// Go through each a/a ...
	_allAAs.each( function() {
						   					
					// What's the URL?
					var $this = $(this),
						_term = $this.text(),
						_definition = $this.attr('title');
					
					// Add this URL to the footnote
					$(HTMLtoInsert).append('<dt>'+_term+'</dt><dd>'+_definition+'</dd>');
								 
	 });	 
	 
	 // Insert the footnotes to the content of the document
	content.append('</dl>' + HTMLtoInsert);
}



	
	
/* Dropdown removed */

	
					
						
					
					
/**
* Initiate subnavigation
* Produces collapsible menus
* @param opts. A property object to overload the defaults.
*	The following settings are exposed
*	root_selector: a string jQuery selector to find the starting point for the navigation. By default 'ul#navSub'
*	active_class: The current page is highlighted with this class. By default 'active'
*	expands_active_class: What class to put onto the element which will expand a subtree when this tree also contains the active page. By default 'expandsActive'.
*	first_active_class: What class to put onto the element which is both 'first' and 'active'. By default 'firstActive'.
*	expands_class: What class to put onto the element which will expand a subtree. By default 'expands'.
*	first_class: if someone has forgotten to put a class on the first list item. By default, put the class 'first'
*	open_class: if a subtree is open, give it class... by default 'open'
*	open_active_class: if a subtree is open AND active , give it class... by default 'openActive'
*	closed_class: if a subtree is closed, give class... by default 'closed'
*/				
function hse_subnav_init(opts) {
	// default settings are for the new design.
	var settings = $.extend(true,{ 	
						root_selector: 'ul#navSub', 
						active_class: 'active', 
						expands_active_class: 'expandsActive',
						first_active_class: 'firstActive',
						expands_class:'expands',
						first_class:'first',
						open_class:'open',
						open_active_class:'openActive',
						closed_class:'closed'
					},opts);	

	// if someone has forgotten to put the class of "first" on the first item, let's do it now
	$(settings.root_selector+' li:eq(0):not(.first)').addClass(settings.first_class);
	
	/* This is a fix for a very specific bug in IE6/7 on XP SP3 - the subnav layout is completely broken 
	without it, and putting it in the CSS doesn't help.  It's giving it hasLayout, but other hasLayout fixes don't seem to work */
	if ($.browser.msie && $.browser.majorVersion < 8) { 
		$(settings.root_selector).find('ul, li').andSelf().css({ 'zoom': '1'} );
	}
		
	
	$(settings.root_selector+' li:has(ul)').each( function() {
	//add ARIA roles 
	// $(settings.root_selector).attr ('role','tree'); // Make left navigation a tree
	// $(settings.root_selector).find('a').attr ('role','treeitem'); // Add treeitem to links
	// $(settings.root_selector).find('ul').attr ('role','group'); // Make nested lists groups
	// the above but chained to improve efficiency
	$(settings.root_selector)
		.attr ('role','tree')
		.find('a').attr ('role','treeitem')
		.end()
		.find('ul').attr ('role','group');
	//end add ARIA roles
		
			var theNavItem = this,
			$theNavItem = $(theNavItem);
															 
			// First of all define some functions which are attached to the menu item
						
					// Open this nav item (if immediate is true, there will be no animation)						
					theNavItem.open = function(immediate) {
						// set ARIA expanded=true
						$theNavItem.children('a').attr('aria-expanded','true');
						if (theNavItem.isOpen === true) {
							return;
						} else {
							theNavItem.isOpen = true;
							if (immediate) {
								$theNavItem.children('ul').show();							
								theNavItem.updateClass();
								} else {
								$theNavItem.children('ul').slideDown('normal', function() { theNavItem.updateClass(); });
								
							}
							
							// If there are ancestors, ensure these are opened too
							$theNavItem.parents('ul li').each(function() {	if (this.open) { this.open(immediate);} });
							
						}				
					}
										
					// Close this nav item (if immediate is true, there will be no animation)	
					theNavItem.close = function(immediate) {
						// If it's already closed
						// set ARIA expanded=false
						$theNavItem.children('a').attr('aria-expanded','false');
						if (theNavItem.isOpen === false) {return;}		
											
						if (immediate) {
							$theNavItem.children('ul').hide();
							theNavItem.updateClass();
						} else {
							$theNavItem.children('ul').slideUp('normal', function() { theNavItem.updateClass(); });
						}
						theNavItem.isOpen = false;
												
					}					
									
					// Toggle this nav item (if immediate is true, there will be no animation)				
					theNavItem.toggle = function(immediate) {
						if (theNavItem.isOpen) {
							theNavItem.close(immediate);
						} else {
							theNavItem.open(immediate);
						}
					}
					
					//Move to the previous item in the list - allows up and down keys to behave as tab/shift+tab
					movePrev = function(theItem) {
						
						if(theItem.parent().prev().hasClass('open')){
							// If the previous item is open, jump to the last of its children
							// .find('li:visible') stops it from trying to jump into closed items
							theItem.parent().prev('li.open').find('li:visible').last().children('a').focus();
							
						} else if(theItem.parent().prev().html() ===  null){
							// If it's the first item in the list, move to its parent 
							theItem.parent().parents('li').first().children('a').focus();
							
						} else {	
							// If none of the above conditions are true, just move to the previous item
							theItem.parent().prev().children('a').focus();
							
						}
					}
										
					//Move to the previous item in the list - allows up and down keys to behave as tab/shift+tab
					moveNext = function(theItem) {			
					
						if(theItem.parent().hasClass('open')){
							// If the item is open, jump to the first of its children
							theItem.parent().find('li').first().children('a').focus();
							
						} else if(theItem.parent().next().html() ===  null){
							// If it's the last item in the list, jump to the next item in the previous level
							for(i = 0; i < theItem.parent().parents('li').length; i++){
								// Check if it's not the last item in the level above
								 if(theItem.parent().parents('li').eq(i).next().html() !==  null)
									{
										theItem.parent().parents('li').eq(i).next().children('a').focus();
										break;
									}
							}
							
							
						} else {
							// If none of the above conditions are true, just move to the next item
							theItem.parent().next().children('a').focus();
							
						}
					}			
					
					// Update the class names to reflect the current status of a menu item	
					theNavItem.updateClass = function() {
						if (theNavItem.isOpen) {							
							var newClasses = ($theNavItem.hasClass(settings.active_class)) ? settings.open_active_class + ' ' + settings.open_class : settings.open_class;
							$theNavItem.addClass(newClasses).removeClass(settings.closed_class);
						} else  {
							$theNavItem.addClass(settings.closed_class).removeClass(settings.open_class + ' '+ settings.open_active_class);
						}
					}
					
																						 
					// Indicate this item expands					 
					$theNavItem.addClass(settings.expands_class);
					
					// Attach an event for when the open/close button is clicked				
					$theNavItem.click( function(e) {	
										theNavItem.toggle();
										e.stopPropagation(); // Stop it happening to upstream 
									});
					// **First successful attempt **
					/*
					// Make available to keyboard users
					// Open items
					$theNavItem.keydown( function(e) {	
										if (e.which == 39) { // 39 = right arrow
										theNavItem.open();
										e.stopPropagation(); // 
										}
									});
					// Close items
					$theNavItem.keydown( function(e) {	
										if (e.which == 37) { // 37 = left left arrow
										theNavItem.close();
										e.stopPropagation(); //  
										}
									});
					*/
					// ** end of first attempt **/
					
					
					// ** Second successful attempt - this code is more succinct **
					$theNavItem.keydown(function(e){
						switch(e.which) {
							// Left = .close; Right = .open;
							case 37: // left = close
							theNavItem.close();
							// Gives the item focus to stop the menu losing focus when closed from a child item
							$theNavItem.children('a').focus();
							e.stopPropagation(); 
							// Stop it happening to upstream. 
							// Prevents the closing children also closing grandparents.
							// Unfortunately the means if a parent is also a child it cannot be used to close its own parent. 
							break;
					
							case 39: // right = open
							theNavItem.open();
							break;
					
							default: return; // exit this handler for other keys
						}
						e.preventDefault();
					});
					
					// Added by KWebb
					// Make up and down keys to behave as tab/shift+tab
					// This has to act on $('ul#navSub li a') rather than $theNavItem
					// as $theNavItem only works on expandable items
					$('ul#navSub li a').keydown(function(e){
						switch(e.which) {
							// Up = movePrev; Down = moveNext;
					
							case 38: // up = ShiftTab
							movePrev($(e.target));
							break;
							
							case 40: // down = Tab ;
							moveNext($(e.target));
							break;
					
							default: return; // exit this handler for other keys
						}
						e.preventDefault();
					});
				}
								 
			);
	
			
	
	// Close all top level menu items
	// and those on lower levels which aren't below an active item
	var inactiveExpandersSelector = 'li.'+settings.expands_class+':not(.'+settings.active_class+')'; 
	$(settings.root_selector+'>'+inactiveExpandersSelector)
	.add(settings.root_selector+' .'+settings.expands_class+' '+inactiveExpandersSelector)
	.each( function() {
	this.close(true);
}); 
	
	
	
	// For nav items which do not expand, catch any click events, otherwise they will be picked up by the parent LI's container
	// Also change the cursor to indicate that nothing will happen here
	// Add in A tags (but don't change their cursor), otherwise they trigger the 'open' animation, before changing page
	$(settings.root_selector+'  li:not(.'+settings.expands_class+')').css('cursor', 'auto').add(settings.root_selector+'  a').click( function(e) {	e.stopPropagation(); });
	
	
	// Add events to each link
	$(settings.root_selector+' a').each( function() {
							
							var $this = $(this);
									
							this.activate = function() {
								
								// adds the 'active' class to the parent
								var _theParent = $(this).parent('li');
								_theParent.addClass(settings.active_class);
																								
								// For IE's benefit, make a single class
								
								//SAS NOTE - I think the 'else' is incorrect
								// a) because the implication is that IE only wants one class, and the else applies two
								// b) because there is no css for Active and there is CSS for firstActive
								if (_theParent.hasClass(settings.expands_class)) {
									_theParent.addClass(settings.expands_active_class);	
								} else if (_theParent.hasClass(settings.first_class)) {
									_theParent.addClass(settings.first_active_class);	
								}
								
								// expand the menu to reveal the page we're on
								_expandingParents = $(this).parents('li.'+settings.expands_class);	
																					
								if (_expandingParents.length && _expandingParents[0].open) {
										_expandingParents[0].open(true);
								} 
								
							}
						});
	
	
	
	// Do we have any LIs with an active class in the markup? 
	var actives = $(settings.root_selector+'  li.'+settings.active_class+' a');	
	
	// If there are, activate the first one, and forget about doing anything else
	if (actives.length && actives[0].activate) {
		actives[0].activate();
		return;
	}  
	
	
	
	// Do we have a LINK tag with an alternative item to use as the active item?
	var links = $('link[rel=index]');
	
		
	// If so, search through all the links in the subnav til we find one which matches the URL
	if (links.length) {	
		var link_found = false;
		$(settings.root_selector+' a').each( function() {
									if (link_found) { return };
									if ($(this).attr('href') == links.attr('href') ) { // This matches the exact string in both HREFs, since IE6 normalises the value of .href in A tags, but not in LINK tags
										this.activate(); // Then activate it
										link_found = true;
									}
								});
	} else {
		
		
		
		// We haven't been told what is active, so let's try and work it out	
		// Go through each link...
		var link_found = false;
		$(settings.root_selector+' a').each(function(){
			
			if (link_found) { return };
			
			// What's the href of the link we're looking at?
			var t = decodeURI(this.href);
			
			// If it ends in a trailing slash, append index.htm, just like the server will do [steady]
			var loc = new String(decodeURI(document.location));
			loc = (loc.charAt(loc.length-1) == '/') ? loc + 'index.htm' : loc; 
			
			// Remove the query string
			loc = loc.split('?')[0];
			
			// Remove any hash anchors
			loc = loc.split('#')[0];
			
			
			// If it's the same as the current URL (and we don't have a URL ending in #, which would imply we're testing)
			if ((t == document.location || t == loc) && t.lastIndexOf('#') != (t.length-1)) {
				this.activate();			
				found = link_found;
			}
		});	
		
	}
	

	
		
}
// --------------------------------------	



/** 
* ----------------------------------------------------------------------------------------------------------
* jQuery plugins /  extensions 
* ----------------------------------------------------------------------------------------------------------
*/



/**
* autoSelect
* Automatically select the contents of a form field when clicked - just add the autoSelect method to any jQuery object
*/
(function($) {	 
	$.fn.autoSelect = function(){		
		return this
			.each(function() {
				$(this).click( function() { this.select(); });
			})			
	};	
})(jQuery);












/**
* toggleVal
* Have auto clearing text in a form field
*/
(function($) {
	
	$.fn.toggleVal = function(focusClass) {
		
	var f = focusClass || 'hasFocus';
		
	return this.each(function() {
		
		var theEl = 	this, 	// The element with the focus class
		 	theField = 	$(this),	// Extend it for Jquery
			theDefaultTitle = theField.attr('title'),	// What is the title?	
			theVal = theField.val();	// What is the value?
		
		// If the form field is initially empty, insert the title as a label
		//if (!$("div#globalSearch")&&(theVal == '')) theField.val(theDefaultTitle); //added by Dave Walker but superceded by commenting out of q.toggleVal()
		if (theVal == '') theField.val(theDefaultTitle);
		
		// Attach events to focus and blur events
		theField.focus( function() {	
			var $this = $(this);	
			// clear value if current value is the title
			if ($this.val() == theDefaultTitle) { theField.val(""); }  	
					
			// if focusClass is set, add the class
			$this.addClass(f);
		})
		.blur(function() {
			var $this = $(this);
			// restore to the default value if current value is empty
			if($this.val() == "") theField.val(theDefaultTitle); 	
					
			// if focusClass is set, remove class
			$this.removeClass(f); 
		});
		
		// If the form is submitted but the value is the default, clear it so it isn't submittted
		theField.parents('form').submit(function() {	
													if(theVal == theDefaultTitle) theField.val(""); 
												 });
	});
	};
})(jQuery);




/**
 * ID factory - for use when an element id is necessary but currently unknown. The factory retains an internal counter of id's distributed, so by using this then you can easily generate id's. ?why isn't this able to operate as a selector? $('blah').id().click ?
 *	@param	el An xhtml element
 *	@returns the id of the xhtml element. If the element exists then the id attribute is set. If the element doesn't exist yet, the string returned is usable as the id.
 * @addon
*/
jQuery.id = function(el){		
	if(el && el.id) return el.id;
	
	var _seed = $(document).data('seed');
	if(!_seed) _seed = Math.round(Math.random()*10000);
	
	$(document).data('seed', ++_seed);
	var _id = 'id_'+$(document).data('seed');
	
	if (el) el.id = _id;
	return _id;
};




/** 
* ----------------------------------------------------------------------------------------------------------
* jQuery extensions (3rd party)
* used site-wide (rather than widget specific), therefore loaded on every page to reduce HTTP request
* and optimise minification
* ----------------------------------------------------------------------------------------------------------
*/

/**
 *
 * Copyright (c) 2008 Tom Deater (http://www.tomdeater.com)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * uses an iframe, sized in ems, to detect font size changes then trigger a "fontresize" event
 * heavily based on code by Hedger Wang: http://www.hedgerwow.com/360/dhtml/js-onfontresize.html
 *
 * "fontresize" event is triggered on the document object
 * subscribe to event using: $(document).bind("fontresize", function (event, data) {});
 * "data" contains the current size of 1 em unit (in pixels)
 * 
 */
 
 /* Appended iframe tag .attr with "src javascript false" to counteract IE6 non-secure bug */
 
jQuery.onFontResize = (function ($) {
	// initialize
	$(document).ready(function () {
		var $resizeframe = $("<iframe />")
			.attr({
      			id:"frame-onFontResize" + Date.parse(new Date),
      			title:"Ignore this frame",
				src:"javascript:false;"
      			})
			.addClass("div-onfontresize")
			.css({width: "100em", height: "10px", position: "absolute", borderWidth: 0, top: "-5000px", left: "-5000px"})
			.appendTo("body");
			
		if ($.browser.msie) {
			// use IE's native iframe resize event
			$resizeframe.bind("resize", function () {
				$.onFontResize.trigger($resizeframe[0].offsetWidth / 100);
			});
		} else {
			// everyone else uses script inside the iframe to detect resize
			var doc = $resizeframe[0].contentWindow || $resizeframe[0].contentDocument || $resizeframe[0].document;
			doc = doc.document || doc; 
			doc.open();
			doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery(".div-onfontresize")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
			doc.close();
		}
		
		jQuery.onFontResize.initialSize = $resizeframe[0].offsetWidth / 100;
	});
	
	return {
		// public method, so it can be called from within the iframe
		trigger: function (em) {
			$(document).trigger("fontresize", [em]);
		}
	};
}) (jQuery);
















/*-------------------------------------------------------------------- 
 * jQuery plugins: toEm() 
 * by Scott Jehl (scott@filamentgroup.com), http://www.filamentgroup.com
 * Copyright (c) Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * Article: http://www.filamentgroup.com/lab/update_jquery_plugin_for_retaining_scalable_interfaces_with_pixel_to_em_con/
 * Options:  	 								
 		scope: string or jQuery selector for font-size scoping		  
 * Usage Example: $(myPixelValue).toEm(); or $(myEmValue).toPx();
--------------------------------------------------------------------*/

$.fn.toEm = function(settings){
	settings = jQuery.extend({
		scope: 'body'
	}, settings);
	var that = parseInt(this[0],10);
	var scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;"> </div>').appendTo(settings.scope);
	var scopeVal = scopeTest.height();
	scopeTest.remove();
	return (that / scopeVal).toFixed(8) + 'em';
};


/* Dominoes plugin replaced with uncompressed version so the script isn't minified twice.
For managing the loading, queuing and caching of external scripts */

/**
 * Dominoes v.1.0 (rc2) [2/3/10 01:04:06.934 - CET]
 * Copyright 2010, Julian Aubourg
 * Dual licensed under the MIT and GPL Version 2 licenses
 */
(function(
	window ,
	document ,
	TRUE ,
	FALSE ,
	NULL ,
	STR_APPLY,

	STR_DOMINOES,
	undefined ) {

if ( ! window[ STR_DOMINOES ] )
		
(function(
	STR_ASYNC,
	STR_CACHE,
	STR_CALL,
	STR_CHAIN,
	STR_CHARSET,
	STR_CREATE_ELEMENT,
	STR_GET_ELEMENTS_BY_TAG_NAME,
	STR_HREF,
	STR_LENGTH,
	STR_ON_LOAD,
	STR_ON_READY_STATE_CHANGE,
	STR_PLUS,
	STR_PUSH,
	STR_READY_STATE,
	STR_URL ) {

// Throw an exception
function error( type , msg ) {
	
	throw [ STR_DOMINOES , type , msg ].join( ": " );  
	
}

// Main function
function dominoes() {
	execute ( slice[ STR_CALL ]( arguments , 0 ) , {} , {} , noop );
	return dominoes;
}

dominoes.run = dominoes;

var	// Head node
	head = document[ STR_GET_ELEMENTS_BY_TAG_NAME ]( "head" )[ 0 ] || document.documentElement,

	// References
	toString = {}.toString,
	slice = [].slice,
	
	// RegExp
	loadedCompleteRegExp = /loaded|complete/,
	
	// Temp var
	temp;
	
// noop
function noop() {}

// Defer execution
function later( func , self ) {
	setTimeout( function() {
		func[ STR_APPLY ]( self || window , slice[ STR_CALL ]( arguments , 2 ) );
	} , 0 );
	return dominoes;
}

dominoes.later = later;

// Utilities
for ( temp in { Array:1 , Function:1 , String:1 } ) {
	( function( name , str ) {
		str = "[object " + name + "]";
		dominoes[ "is" + name ] = function( object ) {
			return toString[ STR_CALL ]( object ) === str;
		};
	} )( temp );
}

var isArray = dominoes.isArray,
	isFunction = dominoes.isFunction,
	isString = dominoes.isString;

function pollFunction() {
	
	var tmp = [],
		args;
	
	while( pollTasks[ STR_LENGTH ] ) {
		
		args = pollTasks.shift();
		
		try {
		
			if ( args[ 0 ][ STR_APPLY ]( slice[ STR_CALL ]( args , 1 ) ) !== FALSE ) {
				
				tmp[ STR_PUSH ]( args );
				
			}
			
		} catch ( _ ) {}
	}
		
	pollTasks = tmp;
	
	if ( ! pollTasks[ STR_LENGTH ] ) {
		
		clearInterval( pollTimer );
		
	}
	
}

var pollTimer,
	pollTasks = [],
	poll = dominoes.poll = function( func ) {
		
		if ( isFunction( func ) ) {
			
			if ( ! pollTasks[ STR_LENGTH ] ) {
				pollTimer = setInterval( pollFunction , 13 );
			}
			
			pollTasks[ STR_PUSH ]( arguments );
		}
		
		return dominoes;
	};
	
var readyCallbacks = [],
	readyListenedTo = FALSE,
	readyAcknowledged = FALSE,
	readyFireing = FALSE;
	
function fireReady() {
	
	while ( readyCallbacks[ STR_LENGTH ] ) {
			args = readyCallbacks.shift();
			args[ 0 ][ STR_APPLY ]( document , slice[ STR_CALL ]( args , 1 ) );
	}
	
	readyFireing = FALSE;
	
}

function testReady() {
					
	if ( ( ! document[ STR_READY_STATE ] || document[ STR_READY_STATE ] === "complete" ) 
		&& document.body ) {
	
		readyAcknowledged = readyFireing = TRUE;
		later( fireReady );
		
		return FALSE;	
	}
	
}
	
function ready( func ) {
	
	if ( isFunction ( func ) ) {
		
		readyCallbacks[ STR_PUSH ]( arguments );
		
		if ( ! readyListenedTo ) {
			
			readyListenedTo = TRUE;
			
			if ( ! testReady() ) {
				poll( testReady );
			}
			
		} else if ( readyAcknowledged && ! readyFireing ) {
			
			readyFireing = TRUE;
			fireReady();
			
		}
		
	}
	
	return FALSE;
}

// Generic data holder
function dataHolder( create ) {
	
	var data = {};
	
	return function( id , del ) {
		
		var length = arguments[ STR_LENGTH ];
		
		if ( length > 1 ) {
			
			if ( del === FALSE ) {
				
				if ( data[ id ] ) {
					
					delete data[ id ];
				
				}
				
			} else if (create) {
				
				create[ STR_APPLY ]( data , arguments );
				
			} else {
				
				data[ id ] = del;
				
			}
				
			
		} else if ( id === FALSE ) {
			
			data = {};
	
		} else if ( length ) {
			
			return data[ id ];
	
		}
		
		return dominoes;
	};

}

var	property = dominoes.property = dataHolder();

var // Predefined functors
	predefinedFunctors = {},

	
	// Make predefined
	predefinedFunctor = function( name , types , action ) {
		
		functor( name + "(" + types + ")" , function( arg ) {
			
			return function( callback ) {
				
				action( arg , callback );
				return FALSE;
				
			}
			
		} );
		
		predefinedFunctors[ name ] = functor( name );
		
		functor( name , FALSE );
		
	},

	// Declare a functor
	functor = dominoes.functor = dataHolder( function( _id , func ) {
	
		var parts = /^([^$()]+)(?:\(([|SOF+]*)\))?$/.exec( _id );
		
		if ( parts ) {
				
			if ( isFunction( func ) ) {
			
				var functors = this,
					id = parts[ 1 ],
					functor = functors[ id ] = functors[ id ] || function( _data , thread ) {
						
						var data = _data,
							context = this;
	
						if ( data ) {
							
							if ( subFunctors[ STR_PLUS ] && isString( data ) ) {
								
								if ( subFunctors[ STR_PLUS ] !== plus ) {
									plus = subFunctors[ STR_PLUS ];
									accu = accumulator( plus );
								}
								
								data = function( callback ) {
									accu( { url : _data } , callback );
									return FALSE;
								};
								
							} else if ( isString( data ) && ( subFunctors.S || subFunctors.O ) ) {
								
								if ( subFunctors.S ) {
	
									data = subFunctors.S[ STR_CALL ]( context , data , thread );
								
								} else if ( subFunctors.O ) {
	
									data = subFunctors.O[ STR_CALL ]( context , { url : data } , thread );
								
								}
							
							} else if ( data.url && subFunctors.O ) {
								
								data = subFunctors.O[ STR_CALL ]( context , data , thread );
							
							} else if ( subFunctors.F ) {
								
								data = subFunctors.F[ STR_CALL ]( context , isFunction( data ) ? data : function ( callback , thread ) {
									execute( _data , this , thread , callback );
									return FALSE;
								} , thread );
							
							}
							
						}
						
						return data;
						
					},
					accu = functor.A,
					subFunctors = functor.S = functor.S || {},
					plus = subFunctors[ STR_PLUS ],
					types = ( parts[ 2 ] || "F|S|O" ).split( /\|/ ),
					i = types[ STR_LENGTH ];
					
				while( i-- ) {
					subFunctors[ types[ i ] ] = func;
				}
					
			}
			
		}
		
	} );

var rule = dominoes.rule = dataHolder( function( id ) {

	var rules = this,
		running = FALSE,
		callbacks = [],
		rule = rules[ id ] = rules[ id ] || function( callback , thread ) {
			
			if ( callback && callback !== noop ) {
				
				callbacks[ STR_PUSH ]( callback );
				
			}
			
			if ( ! running ) {
				
				running = TRUE;
				
				var context = this;
				
				( function internal() {

					if ( list[ STR_LENGTH ] ) {
						
						execute( list.splice( 0 , list[ STR_LENGTH ] ) , context , thread , internal );
						
					} else if ( callbacks[ STR_LENGTH ] ) {
						
						while( callbacks[ STR_LENGTH ] ) {
							( callbacks.shift() )();
						}
						
						internal();
						
					} else {
						
						running = FALSE;
						
					}
					
				} )();						
			}
			
			return FALSE;
		},
		list = rule.A = rule.A || [];
	
	list[ STR_PUSH ]( slice[ STR_CALL ]( arguments , 1 ) );

} );

// Execute an item
function execute( item , context , thread , callback ) {
	
	var url,
		length;
	
	if ( item ) {
		
		if ( item.O && callback ) {
			callback();
			callback = noop;
		}

		if ( item[ STR_CHAIN ] ) {
			context = item;
			item = item[ STR_CHAIN ];
		}
		
		if ( item[ STR_URL ] ) {
			
			url = item[ STR_URL ];
			
		} else if ( isString( item ) ) {
			
			url = item;
			
		}
		
		if ( url ) {
			
			url = parse( url , context , thread );
			
			if ( isString( url ) ) {
				
				if ( isString( item ) ) {
					
					item = {
						url: url
					};
					
				} else {
					
					item[ STR_URL ] = url;
					
				}
				
				loadScript( item , callback );
					
			} else {
				
				execute( url , context , thread , callback );
				
			}
			
		} else if ( isFunction( item ) ) {
			
			if ( item[ STR_CALL ]( context , callback , thread ) !== FALSE ) {
				callback();
			}
		
		} else if ( isArray( item ) && ( length = item[ STR_LENGTH ] ) ) {
			
			if ( item.P ) {
				
				var i = 0,
					num = length;
		

				while ( i < length ) {
					
					execute( item[ i++ ] , context , thread , function() {
						
						if ( ! --num ) {
							callback();
						}
						
					} );
					
				}
				
			} else {
			
				function iterate( i ) {
					
					if ( i < length ) {
						execute( item[ i++ ] , context , thread , function() {
							iterate( i );
						} );
					} else {
						callback();
					}
					
				}
				
				iterate( 0 );
				
			}
			
		} else {
			
			callback();
			
		}
		
	} else {
		
		callback();
		
	}
}

var	// Regular expressions
	/** @const */ R_DELIM = /\s+/,
	
	// Symbols
	SYMBOLS = {},
	/** @const */ SYM_WAIT =		1,
	/** @const */ SYM_READY =		2,
	/** @const */ SYM_BEGIN =		3,
	/** @const */ SYM_END =			4,
	/** @const */ SYM_BEGIN_OPT =	5,
	/** @const */ SYM_END_OPT =		6,
	
	// Miscellaneous
	symbolsArray = "0 > >| ( ) (( ))".split( R_DELIM ),
	i = symbolsArray[ STR_LENGTH ];

// Initialize symbols
for (; --i ; SYMBOLS[ symbolsArray[ i ] ] = i ) {}

// Parse a chain
function parseChain( chain ) {
	
	chain = chain.split( R_DELIM );
	
	var i = 0,
		length = chain[ STR_LENGTH ],
		stack = [],
		root = [],
		current = root,
		tmp,
		item;
	
	current.P = TRUE;
	
	for( ; i < length ; i++ ) {
		
		if ( item = chain[ i ] ) {
		
			if ( SYMBOLS[ item ] ) {
			
				item = SYMBOLS[ item ];
			
				if ( item === SYM_WAIT || item === SYM_READY ) {
					
					if ( item === SYM_READY ) {
						current[ STR_PUSH ]( ready );
					}
					
					if ( current[ STR_LENGTH ] ) {
						
						tmp = current.splice( 0 , current[ STR_LENGTH ] );
						tmp.P = current.P; 
						current[ STR_PUSH ]( tmp , [] );
						current.P = FALSE;
						current = current[ 1 ];
						current.P = TRUE;
						
					}
					
				} else if ( item === SYM_BEGIN || item === SYM_BEGIN_OPT ) {
					
					tmp = [];
					current[ STR_PUSH ]( tmp );
					stack[ STR_PUSH ]( current );
					current = tmp;
					current.P = TRUE;
					current.O = item === SYM_BEGIN_OPT;
					
				} else if ( item === SYM_END || item === SYM_END_OPT ) {
					
					if ( stack[ STR_LENGTH ] ) {
						current = stack.pop();
					} else {
						error( "unexpected symbol" , chain[i] );
					}
				}
					
			} else {
			
				current[ STR_PUSH ]( item );
				
			}
		}
		
	}
		
	return root;
}

// Parse a string item
function parseStringItem( string , context , thread ) {

	var done,
		func,
		data = {},
		id = 0,
		tmp;
		
	function parseTemp( string ) {
		
		tmp = /^ { ([0-9]+) } $/.exec( string );
		
		return tmp ? data[ 1 * tmp[ 1 ] ] : string.replace( / { ([0-9]+) } /g , function( _ , key ) {
			
			tmp = data[ 1 * key ];
			
			if ( ! isString( tmp ) ) {
				error( "type mismatch" , "string expected" );
			}

			return tmp;
			
		} );
		
	}
	
	while ( ! done ) {
	
		done = TRUE;
		
		string = string.replace( /\$([^$()]*)\(([^$()]*)\)/g , function( _ , name , args ) {
			
			done = FALSE;
			
			if ( name && ! ( func = predefinedFunctors[ name ] || functor( name ) ) ) {
				error( "unknown functor" , name );
			}
			
			args = parseTemp( args );
			
			if ( isString( args ) ) {
				args = parse ( args , context , thread );
			}
			
			data[ ++ id ] = name ? func[ STR_CALL ]( context , args , thread ) : property( args );
			
			if ( isString( data[ id ] ) ) {
				data[ id ] = parse( data[ id ] , context , thread );
			}
			
			return " { " + id + " } ";
			
		});
	}
	
	return parseTemp( string );
}

// Parse a string
function parse( string , context , thread ) {
	
	var parsed;
	
	if ( R_DELIM.test( string ) ) {
		
		parsed = parseChain( string );
		
	} else if ( parsed = context[ string ] || rule( string ) ) {
			
		parsed = isString( parsed ) ? parse( parsed , context , thread ) : parsed;
			
	} else {
		
		parsed = parseStringItem( string , context , thread );
			
	}
	
	return parsed;
}

function loader( loadFunction ) {
	
	var loaded = {},
		loading = {};

	return function( options , callback ) {
		

		var _options = {},
			callbacks,
			url = options[ STR_URL ],
			key;
			
		if ( options[ STR_CACHE ] === FALSE ) {
			
			for ( key in options ) {
				_options[ key ] = options[ key ];
			}
			
			options = _options;
		
			options[ STR_URL ] += ( /\?/.test( url ) ? "&" : "?" ) + "_=" + ( new Date() ).getTime();
			
			loadFunction( options , callback );
			
		} else if ( loaded[ url ] ) {
			
			callback();
			
		} else if ( callbacks = loading[ url ] ) {
			
			callbacks[ STR_PUSH ]( callback );
			
		} else {
			
			loading[ url ] = callbacks = [ callback ];
			
			loadFunction( options , function() {
				
				while( callbacks[ STR_LENGTH ] ) {
					
					( callbacks.shift() )();
					
				}
				
				delete loading[ url ];
				loaded[ url ] = TRUE;
				
			} );
			
		}
		
	};
}

function accumulator( functor ) {
	
	var callbacks = {},
		launched = FALSE;
	
	return loader ( function( options , callback ) {
		
		callbacks[ options[ STR_URL ] ] = callback;
		
		if ( ! launched ) {
			
			launched = TRUE;
			
			later( function() {
				
				var array = [],
					string,
					_callbacks = callbacks;
				
				callbacks = {};
				launched = FALSE;
				
				for ( string in _callbacks ) {
					array[ STR_PUSH ]( string );
				}
				
				execute( functor( array ) , {} , {} , function() {
					for ( string in _callbacks ) {
						_callbacks[ string ]();
					}
				} );
				
			} );
			
		}
		
	} );
	
}

var loadScript = loader( function ( options , callback ) {
	
	var script = document[ STR_CREATE_ELEMENT ]( "script" ),
		readyState;
	
	script[ STR_ASYNC ] = STR_ASYNC;
	
	if ( options[ STR_CHARSET ] ) {
		script[ STR_CHARSET ] = options[ STR_CHARSET ];
	}
	
	script.src = options[ STR_URL ];
	
	// Attach handlers for all browsers
	script[ STR_ON_LOAD ] = script[ STR_ON_READY_STATE_CHANGE ] = function() {
		
		if ( ! ( readyState  = script[ STR_READY_STATE ] ) || loadedCompleteRegExp.test( readyState ) ) {

			// Handle memory leak in IE
			script[ STR_ON_LOAD ] = script[ STR_ON_READY_STATE_CHANGE ] = NULL;
			
			head.removeChild( script );

			if ( callback ) {
				// Give time for execution (thank you so much, Opera devs!)
				later( callback );
			}
		}
	};
	
	// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
	// This arises when a base node is used (jQuery #2709 and #4378).
	head.insertBefore( script, head.firstChild );
	
} );


var loadStyleSheet = loader( function( options , callback ) {
		
		var link = document[ STR_CREATE_ELEMENT ]( "link" ),
			title = options.title;
	
		link.rel = "stylesheet";
		link.type = "text/css";
		link.media = options.media || "screen";
		link[ STR_HREF ] = options[ STR_URL ];
			
		if ( options[ STR_CHARSET ] ) {
			link[ STR_CHARSET ] = options[ STR_CHARSET ];
		}
		
		// Watch the link
		cssPoll( link , function() {
			
			if ( title ) {
				link.title = title;
			}
			callback();
			
		} );
		
		// Add it to the doc
		head.appendChild( link );
	
	} ),

	// Number of css being polled
	cssPollingNb = 0,
	
	// Polled css callbacks
	cssCallbacks = {},
	
	// Main poller function
	cssPollFunction = function () {
		
		var callback,
			stylesheet,
			stylesheets = document.styleSheets,
			href,
			i = stylesheets[ STR_LENGTH ];
			
		while ( i-- ) {
			
			stylesheet = stylesheets[ i ];
			
			if ( ( href = stylesheet[ STR_HREF ] )
				&& ( callback = cssCallbacks[ href ] ) ) {
					
				try {
					
					// We store so that minifiers don't remove the code
					callback.r = stylesheet.cssRules;
					
					// Webkit:
					// Webkit browsers don't create the stylesheet object
					// before the link has been loaded.
					// When requesting rules for crossDomain links
					// they simply return nothing (no exception thrown)
					
					// Gecko:
					// NS_ERROR_DOM_INVALID_ACCESS_ERR thrown if the stylesheet is not loaded
					// If the stylesheet is loaded:
					//  * no error thrown for same-domain
					//  * NS_ERROR_DOM_SECURITY_ERR thrown for cross-domain

					throw "SECURITY";
			
				} catch(e) {
					
					// Gecko: catch NS_ERROR_DOM_SECURITY_ERR
					// Webkit: catch SECURITY
					if ( /SECURITY/.test( e ) ) {
						
						later( callback );
						
						delete cssCallbacks[ href ];
					
						if ( ! --cssPollingNb ) {
							return FALSE;
						}
						
					}
				}
			}
		}
	},
	
	// Poll / Unpoll
	cssPoll = function ( link , callback ) {
		
		// onreadystatechange
		if ( link[ STR_READY_STATE ] ) {
			
			link[ STR_ON_READY_STATE_CHANGE ] = function() {
				
				if ( loadedCompleteRegExp.test( link[ STR_READY_STATE ] ) ) {
					link[ STR_ON_READY_STATE_CHANGE ] = NULL;
					callback();
				}
			};
		
		// If onload is available, use it
		} else if ( link[ STR_ON_LOAD ] === NULL /* exclude Webkit => */ && link.all ) {
			
			link[ STR_ON_LOAD ] = function() {
				link[ STR_ON_LOAD ] = NULL;
				callback();
			}
			
		// In any other browser, we poll
		} else {
			
			cssCallbacks[ link[ STR_HREF ] ] = callback;
			
			if ( ! cssPollingNb++ ) {
				poll( cssPollFunction );
			}
			
		}
		
	};

// Create the associated predefined functor
predefinedFunctor( "css" , "O" , loadStyleSheet );

// EXPOSE

window[ STR_DOMINOES ] = dominoes;

})[ STR_APPLY ](
	window ,
	"async cache call chain charset createElement getElementsByTagName href length onload onreadystatechange + push readyState url".split( " " )
);

})(
	window ,
	document ,
	!0 ,
	!1 ,
	null,
	"apply",
	"dominoes"
);