Rem SortParagraphs.vbs
Rem An InDesign VBScript
Rem
Rem Sorts the paragraphs in the selection in alphabetical order.
Rem
Rem For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
Rem available at http://www.adobe.com/devnet/indesign/sdk.html
Rem Or visit the InDesign scripting forum at http://www.adobeforums.com.
Rem
main
Function main()
	Set myInDesign = CreateObject("InDesign.Application.CC.2015")
	Rem Set the user interaction level to allow the display of dialog boxes and alerts.
	myInDesign.ScriptPreferences.UserInteractionLevel = idUserInteractionLevels.idInteractWithAll
	If myInDesign.documents.Count <> 0 Then
	    If myInDesign.selection.Count > 0 Then
		Select Case TypeName(myInDesign.Selection.Item(1))
			Case "Text", "TextColumn", "TextFrame"
				If myInDesign.Selection.Item(1).Paragraphs.Count > 1 Then
					myDisplayDialog myInDesign
				Else
					MsgBox("Please select at least two paragraphs of text (or a text frame) try again.")
				End If
		    Case "Cell", "Row", "Column", "Table"
				MsgBox ("This script cannot sort table rows, columns, or cells." & vbCr & "Try converting the table to text, sorting" & vbCr & "the text, and then converting back to a table.")
			Case Else
				MsgBox ("Please select some text (or a text frame) try again.")
		End Select
	    Else
	        MsgBox ("Nothing is selected. Please select some text (or a text frame) try again.")
	    End If
	Else
	    MsgBox ("No documents are open. Please open a document and try again.")
	End If
End Function
Function myDisplayDialog(myInDesign)
	Set myDialog = myInDesign.Dialogs.Add
	myDialog.Name = "Sort Options"
	With myDialog.DialogColumns.Add
		With .DialogRows.Add
			With .DialogColumns.Add
				With .StaticTexts.Add
					.StaticLabel = "Sort Method:"
				End With
			End With
			with .DialogColumns.Add
				Set mySortMethodDropdown = .Dropdowns.Add
				mySortMethodDropdown.stringList = Array("Ignore Formatting (faster)", "Retain Formatting (slower)")
				mySortMethodDropdown.selectedIndex = 0
			End With
		End With
		With .DialogRows.Add
			Set myIgnoreSpacesCheckbox = .checkboxControls.Add
			myIgnoreSpacesCheckbox.staticLabel = "Ignore Spaces"
			myIgnoreSpacesCheckbox.checkedState = True
		End With
		With .DialogRows.Add
			Set myReverseSortCheckbox = .checkboxControls.Add
			myReverseSortCheckbox.staticLabel = "Reverse Sort"
			myReverseSortCheckbox.checkedState = False
		End With
	End With
	myResult = myDialog.Show
	If myResult = True Then
		mySortMethod = mySortMethodDropdown.selectedIndex
		myIgnoreSpaces = myIgnoreSpacesCheckbox.checkedState
		myReverseSort = myReverseSortCheckbox.checkedState
		myDialog.Destroy
		mySortParagraphs myInDesign, mySortMethod, myIgnoreSpaces, myReverseSort
	Else
		myDialog.Destroy
	End If
End Function
Function mySortParagraphs(myInDesign, mySortMethod, myIgnoreSpaces, myReverseSort)
	Set myRegExp = New RegExp
	myRegExp.Pattern = "\s"
	myRegExp.IgnoreCase = True
    Set mySelection = myInDesign.selection.Item(1)
    If mySelection.Characters.Count <> 0 Then
        Set myParagraphs = mySelection.Paragraphs
    Else
        Set myParagraphs = mySelection.parentTextFrame.Paragraphs
    End If
    Rem If the last paragraph in the selection is the last paragraph of the story,
    Rem and if the last paragraph does not end in a carriage return character,
    Rem then add a carriage return character at the end of the last paragraph.
    If myParagraphs.Item(-1).Characters.Item(-1).Contents <> vbCr Then
        myParagraphs.Item(-1).insertionPoints.Item(-1).Contents = vbCr
        myCleanUp = True
    Else
        myCleanUp = False
    End If
	Rem Select Case statement added here to allow for others to add custom sort methods. To do this,
	Rem add another item to the dropdown menu in the dialog function, then add a corresponding
	Rem case in the Select Case block below.    
    Select Case mySortMethod
    	Case 0
    		Rem Convert the contents of the paragraphs to a single string.
    		myString = ""
    		For myCounter = 1 To myParagraphs.Count
    			myString = myString & myParagraphs.Item(myCounter).Contents
    		Next
    		Rem Pass the string to a JavaScript and get back a string.
    		myArray = Array(myString, myIgnoreSpaces, myReverseSort)
    		myJavaScript = myMakeJavaScript
    		myString = myInDesign.DoScript(myJavaScript, idScriptLanguage.idJavaScript, myArray)
    		Rem Replace the text range with the returned string.
			Set myStartCharacter = myParagraphs.Item(1).Characters.item(1)
			Set myEndCharacter = myParagraphs.Item(-1).Characters.Item(-1)
			Set myText = myParagraphs.Item(1).ParentStory.Texts.ItemByRange(myStartCharacter, myEndCharacter).Item(1)
			Rem Replace the contents with the string
			myText.Contents = myString
    	Case 1
		    Rem Simple bubble sort
		    If myReverseSort = False Then
			    Do
			        myItemMoved = False
			        myCounter = 1
			        Do While myCounter < myParagraphs.Count
			        	myStringA = LCase(myParagraphs.Item(myCounter).Contents)
			        	myStringB = LCase(myParagraphs.Item(myCounter + 1).Contents)
			        	If myIgnoreSpaces = True Then
							myStringA = myRegExp.Replace(myStringA, "")
							myStringB = myRegExp.Replace(myStringB, "")
			            End If
			            If myStringA > myStringB Then
			                myParagraphs.Item(myCounter).Move idAfter, myParagraphs.Item(myCounter + 1)
			                myItemMoved = True
			            End If
			            myCounter = myCounter + 1
			        Loop
			        myCounter = myEnd
			        Do While myCounter > 1
			        	myStringA = LCase(myParagraphs.Item(myCounter).Contents)
			        	myStringB = LCase(myParagraphs.Item(myCounter - 1).Contents)
			        	If myIgnoreSpaces = True Then
							myStringA = myRegExp.Replace(myStringA, "")
							myStringB = myRegExp.Replace(myStringB, "")
			            End If
			            If myStringA < myStringB Then
			                myParagraphs.Item(myCounter).Move idBefore, myParagraphs.Item(myCounter - 1)
			                myItemMoved = True
			            End If
			            myCounter = myCounter - 1
			        Loop
			        If myItemMoved = False Then
			            Exit Do
			        End If
			    Loop
		    Else
			    Do
			        myItemMoved = False
			        myCounter = 1
			        Do While myCounter < myParagraphs.Count
			        	myStringA = LCase(myParagraphs.Item(myCounter).Contents)
			        	myStringB = LCase(myParagraphs.Item(myCounter + 1).Contents)
			        	If myIgnoreSpaces = True Then
							myStringA = myRegExp.Replace(myStringA, "")
							myStringB = myRegExp.Replace(myStringB, "")
			            End If
			            If myStringA < myStringB Then
			                myParagraphs.Item(myCounter).Move idAfter, myParagraphs.Item(myCounter + 1)
			                myItemMoved = True
			            End If
			            myCounter = myCounter + 1
			        Loop
			        myCounter = myEnd
			        Do While myCounter > 1
			        	myStringA = LCase(myParagraphs.Item(myCounter).Contents)
			        	myStringB = LCase(myParagraphs.Item(myCounter - 1).Contents)
			        	If myIgnoreSpaces = True Then
							myStringA = myRegExp.Replace(myStringA, "")
							myStringB = myRegExp.Replace(myStringB, "")
			            End If
			            If myStringA > myStringB Then
			                myParagraphs.Item(myCounter).Move idBefore, myParagraphs.Item(myCounter - 1)
			                myItemMoved = True
			            End If
			            myCounter = myCounter - 1
			        Loop
			        If myItemMoved = False Then
			            Exit Do
			        End If
			    Loop		    
		    End If
    End Select
    Rem If we added a return at the end of the story, we should now
    Rem remove the extra return at the end of the story.
    If myCleanUp = True Then
        myParagraphs.Item(1).parentStory.Characters.Item(-1).Delete
    End If
End Function
Function myMakeJavaScript()
	myJavaScript = "myString = main(arguments[0], arguments[1], arguments[2]);" & vbCr
	myJavaScript = myJavaScript & "function main(myString, myIgnoreSpaces, myReverse){" & vbCr
	myJavaScript = myJavaScript & "	//JavaScript sort:" & vbCr
	myJavaScript = myJavaScript & "	var myArray = myString.split(""\r"");" & vbCr
	myJavaScript = myJavaScript & "	myString = """";" & vbCr
	myJavaScript = myJavaScript & "	if(myIgnoreSpaces != true){" & vbCr
	myJavaScript = myJavaScript & "		if(myReverse != true){" & vbCr
	myJavaScript = myJavaScript & "			myArray = myArray.sort(mySort);" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "		else{" & vbCr
	myJavaScript = myJavaScript & "			myArray = myArray.sort(myReverseSort);" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "	}" & vbCr
	myJavaScript = myJavaScript & "	else{" & vbCr
	myJavaScript = myJavaScript & "		if(myReverse != true){" & vbCr
	myJavaScript = myJavaScript & "			myArray = myArray.sort(mySortIgnoringSpaces);" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "		else{" & vbCr
	myJavaScript = myJavaScript & "			myArray = myArray.sort(myReverseSortIgnoringSpaces);" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "	}" & vbCr
	myJavaScript = myJavaScript & "	for(myCounter = 0; myCounter < myArray.length; myCounter ++){" & vbCr
	myJavaScript = myJavaScript & "		if(myArray[myCounter] != """"){" & vbCr
	myJavaScript = myJavaScript & "			myString += myArray[myCounter] + ""\r"";" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "	}" & vbCr
	myJavaScript = myJavaScript & "	return myString;" & vbCr
	myJavaScript = myJavaScript & "	//Sort functions." & vbCr
	myJavaScript = myJavaScript & "	function mySort(a, b){" & vbCr
	myJavaScript = myJavaScript & "		a = a.toLowerCase();" & vbCr
	myJavaScript = myJavaScript & "		b = b.toLowerCase();" & vbCr
	myJavaScript = myJavaScript & "		if(a > b){" & vbCr
	myJavaScript = myJavaScript & "			return 1;" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "		if(a < b){" & vbCr
	myJavaScript = myJavaScript & "			return -1;" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "		return 0;" & vbCr
	myJavaScript = myJavaScript & "	}" & vbCr
	myJavaScript = myJavaScript & "	function mySortIgnoringSpaces(a, b){" & vbCr
	myJavaScript = myJavaScript & "		var myRegExp = /\s/gi;" & vbCr
	myJavaScript = myJavaScript & "		a = a.toLowerCase().replace(myRegExp, """");" & vbCr
	myJavaScript = myJavaScript & "		b = b.toLowerCase().replace(myRegExp, """");" & vbCr
	myJavaScript = myJavaScript & "		if(a > b){" & vbCr
	myJavaScript = myJavaScript & "			return 1;" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "		if(a < b){" & vbCr
	myJavaScript = myJavaScript & "			return -1;" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "		return 0;" & vbCr
	myJavaScript = myJavaScript & "	}" & vbCr
	myJavaScript = myJavaScript & "	function myReverseSort(a, b){" & vbCr
	myJavaScript = myJavaScript & "		a = a.toLowerCase();" & vbCr
	myJavaScript = myJavaScript & "		b = b.toLowerCase();" & vbCr
	myJavaScript = myJavaScript & "		if(a > b){" & vbCr
	myJavaScript = myJavaScript & "			return -1;" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "		if(a < b){" & vbCr
	myJavaScript = myJavaScript & "			return 1;" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "		return 0;" & vbCr
	myJavaScript = myJavaScript & "	}" & vbCr
	myJavaScript = myJavaScript & "	function myReverseSortIgnoringSpaces(a, b){" & vbCr
	myJavaScript = myJavaScript & "		var myRegExp = /\s/gi;" & vbCr
	myJavaScript = myJavaScript & "		a = a.toLowerCase().replace(myRegExp, """");" & vbCr
	myJavaScript = myJavaScript & "		b = b.toLowerCase().replace(myRegExp, """");" & vbCr
	myJavaScript = myJavaScript & "		if(a > b){" & vbCr
	myJavaScript = myJavaScript & "			return -1;" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "		if(a < b){" & vbCr
	myJavaScript = myJavaScript & "			return 1;" & vbCr
	myJavaScript = myJavaScript & "		}" & vbCr
	myJavaScript = myJavaScript & "		return 0;" & vbCr
	myJavaScript = myJavaScript & "	}	" & vbCr
	myJavaScript = myJavaScript & "}" & vbCr
	myMakeJavaScript = myJavaScript
End Function