



// Getting form values
function myCheckedFunction() {
	
 var radioButtons = document.getElementsByName("cookies-usage-analytics");
    for(var i = 0; i < radioButtons.length; i++)
    {
       	
			if(radioButtons[i].value == 'off') { 
				var a = true; 
			} 
			
			else { 
			
			var a = false;
			
			}
			
		document.write(a);
			
 }
	
}