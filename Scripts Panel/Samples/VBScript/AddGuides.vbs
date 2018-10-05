Rem AddGuides.vbs
Rem An InDesign VBScript
Rem
Rem Adds guides around the selected object or objects.
Rem
Rem Choose Visible Bounds to consider the stroke weight of the paths when placing the guides,
Rem or choose Geometric Bounds to ignore the stroke weight when placing the guides
Rem Choose Each Item to position the guides around individual items in the selection,
Rem or Entire Selection to position the guides around the selection as a whole.
Rem
Rem For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
Rem available at http://www.adobe.com/devnet/indesign/sdk.html
Rem or visit the InDesign scripting user to user forum at http://www.adobeforums.com.
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
myDialog.Name = "AddGuides"
With myDialog.DialogColumns.Add
    With .BorderPanels.Add
            With .DialogColumns.Add
                With .StaticTexts.Add
                    .StaticLabel = "Add Guides at:"
                End With
            End With
            With .DialogColumns.Add
                Set myTopCheckbox = .CheckboxControls.Add
                myTopCheckbox.StaticLabel = "&Top"
                myTopCheckbox.CheckedState = True
                Set myLeftCheckbox = .CheckboxControls.Add
                myLeftCheckbox.StaticLabel = "&Left"
                myLeftCheckbox.CheckedState = True
                Set myBottomCheckbox = .CheckboxControls.Add
                myBottomCheckbox.StaticLabel = "&Bottom"
                myBottomCheckbox.CheckedState = True
                Set myRightCheckbox = .CheckboxControls.Add
                myRightCheckbox.StaticLabel = "&Right"
                myRightCheckbox.CheckedState = True
                Set myXCenterCheckbox = .CheckboxControls.Add
                myXCenterCheckbox.StaticLabel = "&Horizontal Center"
                myXCenterCheckbox.CheckedState = True
                Set myYCenterCheckbox = .CheckboxControls.Add
                myYCenterCheckbox.StaticLabel = "&Vertical Center"
                myYCenterCheckbox.CheckedState = True
                Set myXPointCheckbox = .CheckboxControls.Add
                myXPointCheckbox.StaticLabel = "Path Point Hori&zontal Center"
                myXPointCheckbox.CheckedState = False
                Set myYPointCheckbox = .CheckboxControls.Add
                myYPointCheckbox.StaticLabel = "Path Point Verti&cal Center"
                myYPointCheckbox.CheckedState = False
            End With
    End With
    With .BorderPanels.Add
            With .DialogColumns.Add
                With .StaticTexts.Add
                    .StaticLabel = "Add Guides Around:"
                End With
            End With
            With .DialogColumns.Add
                Set myRangeButtons = .RadiobuttonGroups.Add
                With myRangeButtons
                    With .RadiobuttonControls.Add
                        .StaticLabel = "Each &Object"
                        .CheckedState = True
                    End With
                    With .RadiobuttonControls.Add
                        .StaticLabel = "Entire &Selection"
                    End With
                End With
            End With
    End With
    With .BorderPanels.Add
            With .DialogColumns.Add
                With .StaticTexts.Add
                    .StaticLabel = "Guides Based On:"
                End With
            End With
            With .DialogColumns.Add
                Set myBasedOnButtons = .RadiobuttonGroups.Add
                With myBasedOnButtons
                    With .RadiobuttonControls.Add
                        .StaticLabel = "&Geometric Bounds"
                        .CheckedState = True
                    End With
                    With .RadiobuttonControls.Add
                        .StaticLabel = "V&isible Bounds"
                    End With
                End With
            End With
    End With
End With
myReturn = myDialog.Show
If myReturn = True Then
    Rem Get the values from the dialog box.
    myTop = myTopCheckbox.CheckedState
    myLeft = myLeftCheckbox.CheckedState
    myBottom = myBottomCheckbox.CheckedState
    myRight = myRightCheckbox.CheckedState
    myXCenter = myXCenterCheckbox.CheckedState
    myYCenter = myYCenterCheckbox.CheckedState
    myXPoint = myXPointCheckbox.CheckedState
    myYPoint = myYPointCheckbox.CheckedState
    myRange = myRangeButtons.SelectedButton
    myBasedOn = myBasedOnButtons.SelectedButton
    myDialog.Destroy
    If (myTop + myLeft + myBottom + myRight + myXCenter + myYCenter + myXPoint + myYPoint) <> 0 Then
        myAddGuides myInDesign, myTop, myLeft, myBottom, myRight, myXCenter, myYCenter, myRange, myBasedOn, myXPoint, myYPoint, myObjectList
    End If
End If
End Function
Function myAddGuides(myInDesign, myTop, myLeft, myBottom, myRight, myXCenter, myYCenter, myRange, myBasedOn, myXPoint, myYPoint, myObjectList)
    Set myDocument = myInDesign.ActiveDocument
    myOldRulerOrigin = myDocument.ViewPreferences.RulerOrigin
    myDocument.ViewPreferences.RulerOrigin = idRulerOrigin.idSpineOrigin
    Rem Create a layer to hold the guides (if it does not already exist).
    Err.Clear
    On Error Resume Next
    Set myLayer = myDocument.Layers.Item("Guides")
    If Err.Number <> 0 Then
        Set myLayer = myDocument.Layers.Add
        myLayer.Name = "Guides"
        Err.Clear
    End If
    On Error GoTo 0
    'Set mySpread = myInDesign.ActiveWindow.ActiveSpread
    Rem Process the objects in myObjectList.
    For myCounter = 0 To UBound(myObjectList)
        Set myObject = myObjectList(myCounter)
        If myXPoint = True Or myYPoint = True Then
        	myDrawGuidesAtPathPoints myObject, myXPoint, myYPoint, myLayer
        End If
        Rem Use geometric bounds or visible bounds.
        If myBasedOn = 0 Then
            myBounds = myObject.GeometricBounds
        Else
            myBounds = myObject.VisibleBounds
        End If
        Rem If we're at the first object, set up some initial bounding box values.
        If myCounter = 0 Then
            myX1 = myBounds(1)
            myY1 = myBounds(0)
            myX2 = myBounds(3)
            myY2 = myBounds(2)
        End If
        If myRange = 0 Then
            If TypeName(myObject.Parent) = "Page" Or TypeName(myObject.Parent) = "Spread" Then
                Set myPage = myObject.Parent
            Else
                Set myPage = myInDesign.ActiveWindow.ActiveSpread
            End If
            myDrawGuides myPage, myBounds(1), myBounds(0), myBounds(3), myBounds(2), myTop, myLeft, myBottom, myRight, myXCenter, myYCenter, myLayer
        Else
            Rem Compare the bounds values to the stored bounds.
            Rem If a given bounds value is less than (for x1 and y1) or
            Rem greater than (for x2 and y2) the stored value,
            Rem then replace the stored value with the bounds value.
            If myBounds(0) < myY1 Then
                myY1 = myBounds(0)
            End If
            If myBounds(1) < myX1 Then
                myX1 = myBounds(1)
            End If
            If myBounds(2) > myY2 Then
                myY2 = myBounds(2)
            End If
            If myBounds(3) > myX2 Then
                myX2 = myBounds(3)
            End If
        End If
    Next
    If myRange <> 0 Then
        If ((TypeName(myObject.Parent) = "Page") Or (TypeName(myObject.Parent) = "Spread")) Then
            Set myPage = myObject.Parent
        Else
            Set myPage = myInDesign.ActiveWindow.ActiveSpread
        End If
        myDrawGuides myPage, myX1, myY1, myX2, myY2, myTop, myLeft, myBottom, myRight, myXCenter, myYCenter, myLayer
    End If
    myDocument.ViewPreferences.RulerOrigin = myOldRulerOrigin
End Function
Function myDrawGuidesAtPathPoints(myObject, myXPoint, myYPoint, myLayer)
	For myPathCounter = 1 To myObject.Paths.Count
		for myPointCounter = 1 To myObject.Paths.Item(myPathCounter).PathPoints.Count
			If myXPoint = True Then
				myDrawGuide myObject.parent, myObject.Paths.Item(myPathCounter).PathPoints.Item(myPointCounter).Anchor(0), 1, myLayer
			End If
			If myYPoint = True Then
				myDrawGuide myObject.parent, myObject.Paths.Item(myPathCounter).PathPoints.Item(myPointCounter).Anchor(1), 0, myLayer
			End If
		Next
	Next
End Function
Function myDrawGuides(myPage, myX1, myY1, myX2, myY2, myTop, myLeft, myBottom, myRight, myXCenter, myYCenter, myLayer)
    If myTop = True Then
        myDrawGuide myPage, myY1, 0, myLayer
    End If
    If myLeft = True Then
        myDrawGuide myPage, myX1, 1, myLayer
    End If
    If myBottom = True Then
        myDrawGuide myPage, myY2, 0, myLayer
    End If
    If myRight = True Then
        myDrawGuide myPage, myX2, 1, myLayer
    End If
    If myXCenter = True Then
        myDrawGuide myPage, myX1 + ((myX2 - myX1) / 2), 1, myLayer
    End If
    If myYCenter = True Then
        myDrawGuide myPage, myY1 + ((myY2 - myY1) / 2), 0, myLayer
    End If
End Function
Function myDrawGuide(myPage, myLocation, myGuideOrientation, myLayer)
    Set myGuide = myPage.Guides.Add(myLayer)
    If myGuideOrientation = 0 Then
        myGuide.Orientation = idHorizontalOrVertical.idHorizontal
    Else
        myGuide.Orientation = idHorizontalOrVertical.idVertical
    End If
    myGuide.Location = myLocation
End Function
