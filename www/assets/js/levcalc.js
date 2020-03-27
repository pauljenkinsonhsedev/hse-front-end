// JavaScript Document
     AvMin = 0;
     AvMax = 0;
     MinVal = 0;
     MaxVal = 0;

     function Convert(Conv) {
	 var Conv = document.getElementById(Conv);
     var number = document.getElementById('num1').value;
     
     var Inm = eval(number * 0.0254);
     var InwgPa = eval(number * 249.089);
     var InwgkPa = eval(number * 0.249089);
     var Inwgmmwg = eval(number * 25.4);
     var kPaInwg = eval(number * 4.014629);
     var Pammwg = eval(number * 0.102);
     var cfmmcps = eval(number * 0.0004719);
     
     var fpmmps = eval(number * 0.00508);
     var cuftmcu = eval(number * 0.028317);
     
     document.getElementById('cInm').value = Inm.toFixed(2);
     document.getElementById('cInwgPa').value = InwgPa.toFixed(2);
     document.getElementById('cInwgkPa').value = InwgkPa.toFixed(2);
     document.getElementById('cInwgmmwg').value = Inwgmmwg.toFixed(2);
     document.getElementById('ckPaInwg').value = kPaInwg.toFixed(2);
     document.getElementById('cPammwg').value = Pammwg.toFixed(2);
     document.getElementById('ccfmmcps').value = cfmmcps.toFixed(2);
     document.getElementById('cfpmmps').value = fpmmps.toFixed(2);
     document.getElementById('ccuftmcu').value = cuftmcu.toFixed(2);
     
     //number.focus();
     
     return false;
    }
	
	
    function calc5() { 
     var x0 = 0;
     var x1 = eval(document.getElementById('molWt').value);
     var x2 = eval(document.getElementById('temp1').value) + 273;
     var x3 = eval(document.getElementById('vapPress').value);
     var x4 = eval(document.getElementById('conPpm').value);
     var x5 = eval(document.getElementById('conMgm').value);

     var x6 = 0;
     var x7 = 0;
     var x8 = 0;
     var f0 = 0;

     if (x1 == 0) {
      window.alert("Fill in the Molecular Weight!")
     }

     if (x3 > 0) {
      (x6 = x3);
      (x7 = (x6 * 9.869));
      (x8 = ((x7 * x1)/(22.4 * x2 / 273)));
     }
     else if (x4 > 0) {
      (x6 = (x4 / 9.869));
      (x7 = x4);
      (x8 = ((x7 * x1)/(22.4 * x2 / 273)));
     }
     else if (x5 > 0) {
      (x8 = x5);
      (x7 = ((x8 * 22.4 * x2 / 273) / (x1)));
      (x6 = (x7 / 9.869));
     }

     x6 = (Math.round(x6 * 10) / 10);
     x7 = (Math.round(x7 * 100) / 100);
     x8 = (Math.round(x8 * 100) / 100);

     document.getElementById('vapPress').value = x6;
     document.getElementById('conPpm').value = x7;
     document.getElementById('conMgm').value = x8;
    } 

    var AvEntries = 0 ;
    var AvList = 0 ;
    var AvTotal = 0 ;
    	
    function ClearAvForm() {
     document.getElementById('NewAvEntry').value="";
     document.getElementById('AvValue').value="";
     document.getElementById('AvNumEntries').value="";
     document.getElementById('AvEntryList').value="";
     document.getElementById('TotalAvEntries').value="";
	 document.getElementById("minVar").innerHTML = "-";
     document.getElementById("maxVar").innerHTML = "-";
     document.getElementById("minVal").innerHTML = "-";
     document.getElementById("maxVal").innerHTML = "-";
     document.getElementById("outOfRange").innerHTML = "- <br /><br />";
     
     AvEntries = 0 ;
     AvList = 0 ;
     AvTotal = 0 ;
	 AvMin = 0;
     AvMax = 0;
     MinVal = 0;
     MaxVal = 0;
     
     //document.Averages.NewAvEntry.focus();
    }
    document.getElementById("difVal").value="20";
    function AddAvEntry() {
     var AvNewLine = "\r" + "\n";
     var AvList = document.getElementById('AvEntryList').value;
	 
     
     AvEntries = (AvEntries) + 1 ;
     x=eval(document.getElementById('NewAvEntry').value) ;
     p=document.getElementById('Precision').value;
     y=(x/p);
     
     AvTotal=(AvTotal + y) ;
     
     document.getElementById('NewAvEntry').value="";
     document.getElementById('AvEntryList').value=AvList + (y) + AvNewLine;
     if (y > MaxVal) {
      MaxVal = y;
     }

     if (MinVal == 0) {
      MinVal = y;
     }

     if (y < MinVal) {
      MinVal = y;
     }

     document.getElementById("minVal").innerHTML = MinVal;
     document.getElementById("maxVal").innerHTML = MaxVal;

     CalculateAv();
     
     return false;
    }
    
    function CalculateAv() {
     z=(AvTotal / AvEntries);
     
     document.getElementById('AvValue').value=z.toFixed(2);
     document.getElementById('TotalAvEntries').value=AvTotal.toFixed(2);
     document.getElementById('AvNumEntries').value=AvEntries;
     document.getElementById('vel').value = z.toFixed(2);
     
	 d = document.getElementById('difVal').value;

     AvMin = z - ((z / 100) * d);
     AvMax = z + ((z / 100) * d);

     document.getElementById('minVar').innerHTML = AvMin.toFixed(2);
     document.getElementById('maxVar').innerHTML = AvMax.toFixed(2); 
	 
     var lL = parseFloat(document.getElementById('minVar').innerHTML);
     var uL = parseFloat(document.getElementById('maxVar').innerHTML);
     var lV = parseFloat(document.getElementById('minVal').innerHTML);
     var uV = parseFloat(document.getElementById('maxVal').innerHTML);
	 if (uV > uL || lV < lL) {
      document.getElementById('outOfRange').innerHTML = "One or more values are beyond the range of" + "<br />" + "&plusmn; " + document.getElementById('difVal').value + "% of the average value.";
     }
	 
     //document.Averages.NewAvEntry.focus();
     
     return false;
    }


    function ClearCircForm() {
     document.getElementById('num1').value="";
     document.getElementById('vel').value="";
     document.getElementById('rad').value="";
     document.getElementById('dia').value="";
     document.getElementById('circ').value="";
     document.getElementById('area').value="";
     document.getElementById('vol').value="";
     document.getElementById('wid1').value="";
     document.getElementById('len1').value="";
     document.getElementById('rArea').value="";
     document.getElementById('rVol').value="";     

     //document.Circ.vel.focus();
    }


    function Circle(Circ) {
     var number = document.getElementById('num2').value;
     //var val = document.Circ.dim.selectedIndex;
     //var dim = document.Circ.dim.options[val].value;
     var vel = document.getElementById('vel').value;
	 
	 var dim = document.getElementById('dim').value;

     var Pi = 3.142;
     var square = eval(number * number);
          
     if (dim == 'rad') {
      var rad = eval(number);
      document.getElementById('rad').value = rad.toFixed(2);
      
      var dia = eval(2 * number);
      document.getElementById('dia').value = dia.toFixed(2);
      
	  
      var circ = eval(Pi * dia);
      //alert(circ);
	  document.getElementById('circ').value = circ.toFixed(2);
      
      var area = eval(Pi * square);
      document.getElementById('area').value = area.toFixed(3);
      
      var vol = eval(area * vel);
      document.getElementById('vol').value = vol.toFixed(2);

      document.getElementById('ext').value = vol.toFixed(2);
     }
     
     if (dim == 'dia') {
      var rad = eval(number / 2);
      document.getElementById('rad').value = rad.toFixed(2);
     
      var dia = eval(number);
      document.getElementById('dia').value = dia.toFixed(2);
     
      
	  var circ = eval(Pi * dia);
      //alert(circ);
	  document.getElementById('circ').value = circ.toFixed(2);
     
      var area = eval((Pi * square) / 4);
      document.getElementById('area').value = area.toFixed(3);
      
      var vol = eval(area * vel);
      document.getElementById('vol').value = vol.toFixed(2);

      document.getElementById('ext').value = vol.toFixed(2);
     }
     
     if (dim == 'circ') {
      var rad = eval((number / Pi) / 2);
      document.getElementById('rad').value = rad.toFixed(2);
     
      var dia = eval(number / Pi);
      document.getElementById('dia').value = dia.toFixed(2);
     
      
	  var circ = eval(number);
	  //alert(circ);
      document.getElementById('circ').value = circ.toFixed(2);
     
      var area = eval(Pi * rad * rad);
      document.getElementById('area').value = area.toFixed(3);
      
      var vol = eval(area * vel);
      document.getElementById('vol').value = vol.toFixed(2);

      document.getElementById('ext').value = vol.toFixed(2);
     }
 
     //document.Circ.vel.focus();
     
     return false;
    }


    function Rectangle(Rect) {
     var vel = document.getElementById('vel').value;

     var wid = document.getElementById('wid1').value;
     var len = document.getElementById('len1').value;

     var rArea = eval(wid * len);
     var rVol = eval(wid * len * vel);
      
     document.getElementById('rArea').value = rArea.toFixed(2); 
     document.getElementById('rVol').value = rVol.toFixed(2);
      
     document.getElementById('ext').value = rVol.toFixed(2);

     //document.getElementById('vel').focus();
     
     return false;
    }


    function AirChange(Room) {
     var high = document.getElementById('high').value;
     var wid = document.getElementById('wid2').value;
     var len = document.getElementById('len2').value;
     var ext = document.getElementById('ext').value;
     
     var vol = eval(ext * 60 * 60);

     var rate = eval(vol / (high * wid * len));
     
     document.getElementById('rate').value = rate.toFixed(2);

     //document.getElementById('.high').focus();
     
     return false;
    }


    function airDensity() {
     var w0 = 0;
     var w1 = eval(document.getElementById('temp2').value) + 273;
     var w2 = eval(document.getElementById('barPress').value);

     w2 = (1.2 * 293 * w2);
     w1 = (1013 * w1);
     w0 = (w2 / w1);
     w0 = (Math.round(w0 * 1000) / 1000);

     document.getElementById('airDen1').value = w0;

     document.getElementById('airDen2').value = w0;

     //document.getElementById('temp').focus();

     return false;
    }



    function AirVel() {

     var v0 = 0;
     var v1 = eval(document.getElementById('totPress').value);
     var v2 = eval(document.getElementById('statPress').value);
     var v3 = eval(document.getElementById('airDen2').value);

     v1 = (v1 - v2);
     v1 = (2 * v1 / v3)
     v0 = (Math.sqrt(v1));
     v0 = (Math.round(v0 * 1000) / 1000);

     document.getElementById('airVel').value = v0;

     document.getElementById('vel').value = v0;

     //document.getElementById('totPress').focus();

     return false;
    }
