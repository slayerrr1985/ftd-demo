Rem AlignToPage.vbs
Rem An InDesign VBScript
Rem
Rem Aligns the items in the selection to the specified location on the page.
Rem
Rem For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
Rem available at http://www.adobe.com/devnet/indesign/sdk.html
Rem Or visit the InDesign Scripting User to User forum at http://www.adobeforums.com.
Rem
main
Function main()
	ReDim myObjectList(0)
	Set myInDesign = CreateObject("InDesign.Application.CC.2015")
	Rem Set the user interaction level to allow the display of dialog boxes and alerts.
	myInDesign.ScriptPreferences.UserInteractionLevel = idUserInteractionLevels.idInteractWithAll
	If myInDesign.Documents.Count <> 0 Then
	    If myInDesign.Selection.Count <> 0 Then
	        For myCounter = 1 To myInDesign.Selection.Count
	            Select Case TypeName(myInDesign.Selection.Item(myCounter))
	                Case "Rectangle", "Oval", "Polygon", "GraphicLine", "Button", "Group", "TextFrame"
	                    If Not (IsEmpty(myObjectList(0))) Then
	                        ReDim Preserve myObjectList(UBound(myObjectList) + 1)
	                    End If
	                    Set myObjectList(UBound(myObjectList)) = myInDesign.Selection.Item(myCounter)
	            End Select
	        Next
	        If Not (IsEmpty(myObjectList(0))) Then
	            myDisplayDialog myInDesign, myObjectList
	        End If
	    Else
	        MsgBox ("Nothing is selected. Please select an object and try again.")
	    End If
	Else
	    MsgBox ("Please open a document, select an object, and try again.")
	End If
End Function 
Function myDisplayDialog(myInDesign, myObjectList)
    Set myDialog = myInDesign.Dialogs.Add
    myDialog.name = "AlignToPage"
    With myDialog.DialogColumns.Add
        With .DialogRows.Add
            With .DialogColumns.Add
                With .BorderPanels.Add
                    With .StaticTexts.Add
                        .staticLabel = "Vertical"
                    End With
                    Set myVerticalAlignmentButtons = .RadiobuttonGroups.Add
                    With myVerticalAlignmentButtons
                        With .RadiobuttonControls.Add
                            .staticLabel = "Top"
                            .CheckedState = False
                        End With
                        With .RadiobuttonControls.Add
                            .staticLabel = "Center"
                            .CheckedState = True
                        End With
                        With .RadiobuttonControls.Add
                            .staticLabel = "Bottom"
                            .CheckedState = False
                        End With
                        With .RadiobuttonControls.Add
                            .staticLabel = "None"
                            .CheckedState = False
                        End With
                    End With
                End With
            End With
            With .DialogColumns.Add
                With .BorderPanels.Add
                    With .StaticTexts.Add
                        .staticLabel = "Horizontal"
                    End With
                    Set myHorizontalAlignmentButtons = .RadiobuttonGroups.Add
                    With myHorizontalAlignmentButtons
                        With .RadiobuttonControls.Add
                            .staticLabel = "Left"
                            .CheckedState = False
                        End With
                        With .RadiobuttonControls.Add
                            .staticLabel = "Center"
                            .CheckedState = True
                        End With
                        With .RadiobuttonControls.Add
                            .staticLabel = "Right"
                            .CheckedState = False
                        End With
                        With .RadiobuttonControls.Add
                            .staticLabel = "None"
                            .CheckedState = False
                        End With
                    End With
                End With
            End With
        End With
        With .DialogRows.Add
            Set myConsiderMarginsCheckbox = .CheckboxControls.Add
            With myConsiderMarginsCheckbox
                .staticLabel = "Consider Page Margins"
                .CheckedState = False
            End With
        End With
    End With
    myResult = myDialog.Show
    If myResult = True Then
        myVerticalAlignment = myVerticalAlignmentButtons.SelectedButton
        myHorizontalAlignment = myHorizontalAlignmentButtons.SelectedButton
        myConsiderMargins = myConsiderMarginsCheckbox.CheckedState
        myDialog.Destroy
        myAlignObjects myInDesign, myObjectList, myVerticalAlignment, myHorizontalAlignment, myConsiderMargins
    Else
        myDialog.Destroy
    End If
End Function
Function myAlignObjects(myInDesign, myObjectList, myVerticalAlignment, myHorizontalAlignment, myConsiderMargins)
    myPageHeight = myInDesign.ActiveDocument.DocumentPreferences.PageHeight
    myPageWidth = myInDesign.ActiveDocument.DocumentPreferences.PageWidth
    myOldRulerOrigin = myInDesign.ActiveDocument.ViewPreferences.RulerOrigin
    myInDesign.ActiveDocument.ViewPreferences.RulerOrigin = idRulerOrigin.idPageOrigin
    myInDesign.ActiveDocument.ZeroPoint = Array(0, 0)
    Set myPage = myInDesign.ActiveWindow.ActivePage
    Set myMarginPreferences = myPage.MarginPreferences
    If myConsiderMargins = True Then
	    If myPage.Side = idPageSideOptions.idLeftHand Then
		    myOutsideMargin = myMarginPreferences.Left
		    myInsideMargin = myMarginPreferences.Right
		    myXCenter = myOutsideMargin + ((myPageWidth - (myOutsideMargin+myInsideMargin))/2)
	    Else
		    myInsideMargin = myMarginPreferences.Left
		    myOutsideMargin = myMarginPreferences.Right
		    myXCenter = myInsideMargin + ((myPageWidth - (myOutsideMargin+myInsideMargin))/2)
	    End If
	    myTopMargin = myMarginPreferences.Top
	    myBottomMargin = myMarginPreferences.Bottom
	    myYCenter = myTopMargin + ((myPageHeight - (myTopMargin+ myBottomMargin))/2)
        Select Case myHorizontalAlignment
            Case 0:
                myX = myInsideMargin
            Case 1:
                myX = myXCenter
            Case 2:
                myX = myPageWidth - myOutsideMargin
            Case 3:
                myX = "None"
        End Select
        Select Case myVerticalAlignment
            Case 0:
                myY = myTopMargin
            Case 1:
                myY = myYCenter
            Case 2:
                myY = myPageHeight - myBottomMargin
            Case 3:
                myY = "None"
        End Select
    Else
	    myXCenter = myPageWidth / 2
	    myYCenter = myPageHeight / 2
        Select Case myHorizontalAlignment
            Case 0:
                myX = 0
            Case 1:
                myX = myXCenter
            Case 2:
                myX = myPageWidth
            Case 3:
                myX = "None"
        End Select
        Select Case myVerticalAlignment
            Case 0:
                myY = 0
            Case 1:
                myY = myYCenter
            Case 2:
                myY = myPageHeight
            Case 3:
                myY = "None"
        End Select
    End If
    For myCounter = 0 To UBound(myObjectList)
        myAlignObject myObjectList(myCounter), myX, myY, myHorizontalAlignment, myVerticalAlignment
    Next
    myInDesign.ActiveDocument.ViewPreferences.RulerOrigin = myOldRulerOrigin
End Function
Function myAlignObject(myObject, myX1, myY1, myHorizontalAlignment, myVerticalAlignment)
    myBounds = myObject.GeometricBounds
    myWidth = myBounds(3) - myBounds(1)
    myHeight = myBounds(2) - myBounds(0)
    Select Case myHorizontalAlignment
        Case 0:
            myX = myX1
        Case 1:
            myX = myX1 - (myWidth / 2)
        Case 2:
            myX = myX1 - myWidth
        Case 3:
        	myX = myBounds(1)
    End Select
    Select Case myVerticalAlignment
        Case 0:
            myY = myY1
        Case 1:
            myY = myY1 - (myHeight / 2)
        Case 2:
            myY = myY1 - myHeight
        Case 3:
        	myY = myBounds(0)
    End Select
    myObject.Move Array(myX, myY)
End Function
