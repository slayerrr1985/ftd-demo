Rem SplitStory.vbs
Rem An InDesign VBScript
Rem
Rem Splits the selected story into separate (i.e., unthreaded) text frames.
Rem To use this script, select a text frame, then run the script.
Rem
Rem Note: Any overset text at the end of the story will be deleted.
Rem Note: Hyphenation points between text frames will not be retained.
Rem
Rem For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
Rem available at http://www.adobe.com/devnet/indesign/sdk.html
Rem or visit the InDesign Scripting User to User forum at http://www.adobeforums.com
Rem
main
Function main()
	Set myInDesign = CreateObject("InDesign.Application.CC.2015")
	Rem Set the user interaction level to allow the display of dialog boxes and alerts.
	myInDesign.ScriptPreferences.UserInteractionLevel = idUserInteractionLevels.idInteractWithAll
	Rem Script does nothing if no documents are open or if no objects are selected.
	If myInDesign.Documents.Count <> 0 Then
	    If myInDesign.Selection.Count <> 0 Then
	        Rem Get the first item in the selection.
	        Select Case TypeName(myInDesign.Selection.Item(1))
	            Case "InsertionPoint", "Character", "Word", "TextStyleRange", "Line", "Paragraph", "TextColumn", "TextFrame", "Text", "InsertionPoint":
	                Set myStory = myInDesign.Selection.Item(1).ParentStory
	                Rem If the text frame is the only text frame in the story, do nothing.
	                If myStory.TextContainers.Count > 1 Then
	                    Rem Splitting the story is a two-step process: first, duplicate
	                    Rem the text frames, second, delete the original text frames.
	                    mySplitStory myStory
	                    myRemoveFrames myStory
	                End If
	        End Select
	    End If
	End If
End Function
Function mySplitStory(myStory)
    Rem Duplicate each text frame in the story.
    For myCounter = myStory.TextContainers.Count To 1 Step -1
        Set myTextFrame = myStory.TextContainers.Item(myCounter)
        myTextFrame.Duplicate
    Next
End Function
Function myRemoveFrames(myStory)
    Rem Remove each text frame in the story. Iterate backwards to avoid invalid references.
    For myCounter = myStory.TextContainers.Count To 1 Step -1
        myStory.TextContainers.Item(myCounter).Delete
    Next
End Function
