Rem TabUtilities.vbs
Rem An InDesign VBScript
Rem
Rem Adds a right tab stop at the right column edge, or a tab stop at the current
Rem cursor position, or sets the left indent at the current cursor position.
Rem Demonstrates getting page layout coordinates from text objects, setting tab stops,
Rem working with multi-column text frames.
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
	If myInDesign.Documents.Count > 0 Then
	    If myInDesign.Selection.Count > 0 Then
	    Select Case TypeName(myInDesign.Selection.Item(1))
	        Case "InsertionPoint", "Character", "Word", "TextStyleRange", "Line", "Paragraph", "TextColumn", "Text", "TextFrame"
	                myDisplayDialog myInDesign
	        Case Else
	                MsgBox ("Please select some text (or a text frame) try again.")
	    End Select
	    Else
	        MsgBox ("Nothing is selected. Please select some text (or a text frame) try again.")
	    End If
	Else
	    MsgBox ("No documents are open. Please open a document and try again.")
	End If
End function
Rem Display a dialog box.
Function myDisplayDialog(myInDesign)
    Set myDialog = myInDesign.Dialogs.Add
    myDialog.Name = "TabUtilities"
    With myDialog.DialogColumns.Add
        With .BorderPanels.Add
            With .StaticTexts.Add
                .StaticLabel = "Set a Tab Stop At:"
            End With
            Set myTabButtons = .RadiobuttonGroups.Add
            With myTabButtons
                With .RadiobuttonControls.Add
                    .StaticLabel = "Right Column Edge"
                    .CheckedState = True
                End With
                With .RadiobuttonControls.Add
                    .StaticLabel = "Current Cursor Position"
                End With
                With .RadiobuttonControls.Add
                    .StaticLabel = "Left Indent"
                End With
                With .RadiobuttonControls.Add
                    .StaticLabel = "Hanging Indent at Cursor"
                End With
            End With
        End With
        With .BorderPanels.Add
            With .StaticTexts.Add
                .StaticLabel = "Tab Leader"
            End With
            With .DialogColumns.Add
                Set myTabLeaderField = .TextEditboxes.Add
                myTabLeaderField.EditContents = ""
            End With
        End With
    End With
    myResult = myDialog.Show
    If myResult = True Then
        myTabType = myTabButtons.SelectedButton
        myTabLeader = myTabLeaderField.EditContents
        myDialog.Destroy
        myAddTabStop myInDesign, myTabType, myTabLeader
    Else
       myDialog.Destroy
    End If
End Function
Rem Add the tab stop.
Function myAddTabStop(myInDesign, myTabType, myLeader)
    Select Case (myTabType)
        Case 0:
            Set myParagraphs = myInDesign.Selection.Item(1).Paragraphs
            For myCounter = 1 To myParagraphs.Count
                Set myParagraph = myParagraphs.Item(myCounter)
                myTabPosition = myParagraph.InsertionPoints.Item(1).ParentTextFrames.Item(1).TextFramePreferences.TextColumnFixedWidth
                myTabAlignment = idTabStopAlignment.idRightAlign
                Set myTabStop = myParagraph.TabStops.Add
                myTabStop.Alignment = myTabAlignment
                myTabStop.Leader = myLeader
                myTabStop.Position = myTabPosition
            Next
        Case 1:
            Rem Get the first insertion point in the selection.
            Set myInsertionPoint = myInDesign.Selection.Item(1).InsertionPoints.Item(1)
            Rem Work out which column it's in and get the left edge of that column.
            myTabPosition = myInsertionPoint.HorizontalOffset - myFindColumnEdge(myInsertionPoint)
            myTabAlignment = idTabStopAlignment.idLeftAlign
            Set myTabStop = myInsertionPoint.Paragraphs.Item(1).TabStops.Add
            myTabStop.Alignment = myTabAlignment
            myTabStop.Leader = myLeader
            myTabStop.Position = myTabPosition
        Case 2:
            Set myParagraphs = myInDesign.Selection.Item(1).Paragraphs
            For myCounter = 1 To myParagraphs.Count
                Set myParagraph = myParagraphs.Item(myCounter)
                myTabPosition = myParagraph.LeftIndent
                myTabAlignment = idTabStopAlignment.idLeftAlign
                Set myTabStop = myParagraph.TabStops.Add
                myTabStop.Alignment = myTabAlignment
                myTabStop.Leader = myLeader
                myTabStop.Position = myTabPosition
            Next
        Case 3:
            Set myParagraphs = myInDesign.Selection.Item(1).Paragraphs
            Rem Get the first insertion point in the selection.
            Set myInsertionPoint = myInDesign.Selection.Item(1).InsertionPoints.Item(1)
            Rem Work out which column it's in and get the left edge of that column.
            myTabPosition = myInsertionPoint.HorizontalOffset - myFindColumnEdge(myInsertionPoint)
            myTabAlignment = idTabStopAlignment.idLeftAlign
            For myCounter = 1 To myParagraphs.Count
                Set myParagraph = myParagraphs.Item(myCounter)
                myParagraph.LeftIndent = myTabPosition
                myParagraph.FirstLineIndent = -myTabPosition
                Set myTabStop = myParagraph.TabStops.Add
                myTabStop.Alignment = myTabAlignment
                myTabStop.Leader = myLeader
                myTabStop.Position = myTabPosition
            Next
    End Select
End Function
Rem This function returns the left edge of the text column containing the insertion point,
Rem in page coordinates. It could be modified to return the index of the column, as well.
Function myFindColumnEdge(myInsertionPoint)
    Dim myArray
    ReDim myArray(0)
    myPagePosition = myInsertionPoint.HorizontalOffset
    Set myTextFrame = myInsertionPoint.ParentTextFrames.Item(1)
    myColumnWidth = myTextFrame.TextFramePreferences.TextColumnFixedWidth
    myGutterWidth = myTextFrame.TextFramePreferences.TextColumnGutter
    myTextFrameWidth = myTextFrame.GeometricBounds(3) - myTextFrame.GeometricBounds(1)
    Rem Get the distance from the insertion point to the left edge of the text frame.
    myXOffset = myPagePosition - myTextFrame.GeometricBounds(1)
    For myCounter = 1 To myTextFrame.TextFramePreferences.TextColumnCount
        If myCounter = 1 Then
            Rem If the text frame is rectangular, the insetSpacing array will
            Rem have four values if it's not rectangular, insetSpacing will have one value.
            If UBound(myTextFrame.TextFramePreferences.InsetSpacing) = 4 Then
                myLeftInset = myTextFrame.TextFramePreferences.InsetSpacing(1)
                myRightInset = myTextFrame.TextFramePreferences.InsetSpacing(3)
            Else
                myLeftInset = myTextFrame.TextFramePreferences.InsetSpacing(0)
                myRightInset = myTextFrame.TextFramePreferences.InsetSpacing(0)
            End If
            myX1 = myTextFrame.GeometricBounds(1) + myLeftInset
            myX2 = myX1 + myColumnWidth
        Else
            If myCounter = myTextFrame.TextFramePreferences.TextColumnCount Then
                myX2 = myTextFrame.GeometricBounds(1) - myRightIndent
                myX1 = myX2 - myTextWidth
            Else
                myX1 = myTextFrame.GeometricBounds(1) + (myColumnWidth * myCounter) + (myGutterWidth * myCounter)
                myX2 = myX1 + myColumnWidth
            End If
        End If
        If IsEmpty(myArray(0)) Then
            myArray(0) = Array(myX1, myX2)
        Else
            ReDim Preserve myArray(UBound(myArray) + 1)
            myArray(UBound(myArray)) = Array(myX1, myX2)
        End If
    Next
    For myCounter = 0 To UBound(myArray)
        If (myPagePosition >= myArray(myCounter)(0)) And (myPagePosition <= myArray(myCounter)(1)) Then
            myColumnEdge = myArray(myCounter)(0)
        End If
    Next
    myFindColumnEdge = myColumnEdge
End Function
