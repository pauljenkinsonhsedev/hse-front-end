<%
Option Explicit

Const CON_ERROR_REDIRECT = "/senderror.htm"
Const CON_LOGGING_DIR = "D:\websites\feedbacklogs\"
dim g_strAllowedDomain:g_strAllowedDomain = "https:\\hse.gov.uk\;https:\\www.hse.gov.uk\"

'Logging Variables

dim m_strlogentry:m_strlogentry = ""
dim m_strLogPath:m_strLogPath = ""
dim m_strLogFilename:m_strLogFilename = ""

'Request Variables
dim m_strReferer:m_strReferer = ""
dim m_strOmitValues:m_strOmitValues = "mailto,mailfrom,mailredirect,submit,mailsubject,PageURL"
dim m_arrOmit

'Email variables
dim m_strEmailSubject 

'Redirect variables
dim m_strAltReturnURL:m_strAltReturnURL = "https://www.hse.gov.uk/"
dim m_strReturnURL
dim m_strReturnURLDesc:m_strReturnURLDesc = ""

	m_strReferer = Request.ServerVariables("HTTP_REFERER")

if allowReferer(m_strReferer) = true then	
	
	call createFilename	'Createfilename for this day
	call createLogFile      'this is where all submitted data is kept

	if Request.Form("mailredirect") <> "" then
		m_strReturnURL = Request.Form("mailredirect")
	else
		m_strReturnURLDesc = "Error: The [mailredirect] email address on the form is currently blank.  The following has been used: " & m_strAltReturnURL
		m_strReturnURL = CON_ERROR_REDIRECT
	end if	
	

	if Request.Form("mailsubject") <> "" then
		m_strEmailSubject = Request.Form("mailsubject")
	else
		m_strEmailSubject = "Error: The [mailsubject] email address on the form is currently blank."
	end if
	

	Call formatMsgBody

	'Call debugToScreen

	call writelogfile

	response.redirect m_strReturnURL
else
	response.redirect CON_ERROR_REDIRECT
end if

function allowReferer(in_strRefer)
dim intLen
dim arrAllowed
dim strDomain:strDomain = ""
dim blnAllow:blnAllow = false
dim i
dim strReferer:strReferer = ""

	strReferer = in_strRefer

	if trim(strReferer) <> "" then
		
		strReferer = replace(strReferer,"/","\")

		arrAllowed = Split(g_strAllowedDomain,";")

		for i = 0 to ubound(arrAllowed)

			strDomain = arrAllowed(i)
			if Mid(lcase(strReferer),1,len(strDomain)) = lcase(strDomain) then
				blnAllow = true
				exit for
			end if
		next
	end if

allowReferer = blnAllow

end function

function getKey(in_strName)

end function

sub createFilename()
dim strDay, strMonth
	
	strDay = Day(Now())

	if len(strDay) = 1 then strDay = "0" & strDay
	strMonth = Month(Now())
	if len(strMonth) = 1 then strMonth = "0" & strMonth

	m_strLogFilename = strDay & strMonth & Year(Now()) & ".log"
end sub

Sub createLogFile()
   	Const ForReading = 1, ForWriting = 2, ForAppending = 8
   	Dim fso, f
	
	m_strLogPath = CON_LOGGING_DIR & m_strLogFilename

	Set fso = Server.CreateObject("Scripting.FileSystemObject")
	if fso.FileExists(m_strLogPath) = false then
   		
		'create file
   		Set f = fso.CreateTextFile(m_strLogPath, True)
   		f.Close
		Set f = nothing
	end if	

	Set fso = nothing
End Sub

sub formatMsgBody()
dim item
	m_arrOmit = Split(m_strOmitValues,",")

        if m_strReturnURLDesc <> "" then
		log m_strReturnURLDesc
	end if

	log String(32,"-") & "  Feedback Start  " & String(32,"-"),true
	log m_strEmailSubject,false
	
	For Each item In Request.Form
		if omitKey(cstr(item)) = false then
    			log item & ":  " & Request.Form(item),false
		end if
	Next

	log String(32,"-") & "  Feedback End  " & String(34,"-"),true

	log "Success URL Redirect:  " & m_strReturnURL,true
end sub

function omitKey(in_strKey)
dim i
dim blnRet:blnRet = false

	for i = 0 to ubound(m_arrOmit)
		if trim(m_arrOmit(i)) = trim(in_strKey) then
			blnRet = true
			exit for
		end if
	next 

omitKey = blnRet

end function

Sub log(in_strEntry,blnTime)

if blnTime = true then
	m_strlogentry = m_strlogentry & Now() & vbTab & in_strEntry & vbcrlf
else
	m_strlogentry = m_strlogentry & in_strEntry & vbcrlf
end if

End Sub

sub debugToScreen()
dim strHTML
	strHTML = replace(m_strlogentry,vbcrlf,"<br>")
	strHTML = replace(strHTML,vbTab,"    ")

	response.write strHTML
end sub

sub writelogfile()
Const ForReading = 1, ForWriting = 2, ForAppending = 8
Dim fso, f
	Set fso = Server.CreateObject("Scripting.FileSystemObject")
	Set f = fso.OpenTextFile(m_strLogPath, ForAppending, True)
	
	f.Write(m_strlogentry & vbcrlf & vbcrlf)
	f.Close
		
	Set f = nothing
	Set fso = nothing
end sub
%>