// Health and Safety Made Simple and Toolbox pop-up


$("html:not(.ie7)").each(function() {

if ($.cookie('hseToolboxPopup') == null) {


	$(function() {
		$( "#toolboxDialog" ).dialog({
			resizable: false,
			modal: true,
			minWidth: 850,
			minHeight: 400,
			buttons: [{
				id:"toolboxDialogClose",
				text: "Hide",
				click: function() {
					var $buttonId = $("#toolboxDialogClose");
					//console.log($buttonId);
					if (typeof(SiTrackLink) == 'function') SiTrackLink($buttonId);
					//console.log(SiTrackLink($buttonId));
					//console.log('Link id: '+$($buttonId).attr('id'));		
					$(this).dialog("close");
				}
			}, 
			{
				id:"toolboxDialogCloseDontShow",
				text: "Don't show again",
				click: function() {
					var $buttonId = $("#toolboxDialogCloseDontShow");
					//console.log($buttonId);
					if (typeof(SiTrackLink) == 'function') SiTrackLink($buttonId);
					//console.log(SiTrackLink($buttonId));
					//console.log('Link id: '+$($buttonId).attr('id'));	
					$.cookie('hseToolboxPopup','off', { path: '/', expires: 365 }); // Set the cookie to off so it doesn't display again (365 days)					
					$(this).dialog("close");
				}
			}]
		});
		
		$(".ui-dialog-titlebar-close").attr('id', 'toolboxDialogCloseX');
		$("#toolboxDialogCloseX").attr('onclick','return SiTrackLink(this)');
		$("#toolboxDialogClose").attr('onclick','return SiTrackLink(this)');
		$("#toolboxDialogCloseDontShow").attr('onclick','return SiTrackLink(this)');
		
		$('#toolboxDialogSite a').click(function(event) {
			event.preventDefault();
			$( "#toolboxDialog" ).dialog( "close" );									 
		});
	}); 
}


$(window).resize(function() {
	$("#toolboxDialog").dialog("option", "position", "center");
});

$(window).load(function(){
 $('a.ui-dialog-titlebar-close').click(function(){
  $.cookie('hseToolboxPopup','off', { path: '/', expires: 365 });
  //alert ('Cookie set');
 });
});
}); // end ie7 if statement