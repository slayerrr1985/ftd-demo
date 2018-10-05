Rem CornerEffects.vbs
Rem An InDesign VBScript
Rem
Rem Applies corner effects by redrawing the object.
Rem
Rem For more information on InDesign scripting, go to http://www.adobe.com/products/indesign/scripting/index.html
Rem Or visit the InDesign Scripting User to User forum at http://www.adobeforums.com.
Rem
main
Function main()
	Set myInDesign = CreateObject("InDesign.Application.CC.2015")
	Rem Set the user interaction level to allow the display of dialog boxes and alerts.
	myInDesign.ScriptPreferences.UserInteractionLevel = idUserInteractionLevels.idInteractWithAll
	If myInDesign.Documents.Count > 0 Then
	    If myInDesign.Selection.Count > 0 Then
	        Set mySelection = myInDesign.Selection
	        ReDim myObjectList(0)
	        For myCounter = 1 To mySelection.Count
	            Select Case TypeName(mySelection.Item(myCounter))
	                Case "Rectangle", "Oval", "Polygon", "GraphicLine", "TextFrame"
	                    If Not (IsEmpty(myObjectList(0))) Then
	                        ReDim Preserve myObjectList(UBound(myObjectList) + 1)
	                    End If
	                    Set myObjectList(UBound(myObjectList)) = mySelection.Item(myCounter)
	                Case Else
	            End Select
	        Next
	        If Not (IsEmpty(myObjectList(0))) Then
	            myDisplayDialog myInDesign, myObjectList
	        Else
	            MsgBox "Nothing is selected. Please select a rectangle, oval, polygon, text frame, or graphic line and try again."
	        End If
	    Else
	        MsgBox "Nothing is selected. Please select a rectangle, oval, polygon, text frame, or graphic line and try again."
	    End If
	Else
	    MsgBox "Please open a document, select an object, and try again."
	End If
End function
Function myDisplayDialog(myInDesign, myObjectList)
    myStringList = Array("all points", "first point", "last point", "second point", "third point", "fourth point", "first two", "second and third", "last two", "odd points", "even points")
    Rem Store the current measurement units.
    myOldXUnits = myInDesign.ActiveDocument.ViewPreferences.HorizontalMeasurementUnits
    myOldYUnits = myInDesign.ActiveDocument.ViewPreferences.VerticalMeasurementUnits
    Rem Set the measurement units to points.
    myInDesign.ActiveDocument.ViewPreferences.HorizontalMeasurementUnits = idMeasurementUnits.idPoints
    myInDesign.ActiveDocument.ViewPreferences.VerticalMeasurementUnits = idMeasurementUnits.idPoints
    Set myDialog = myInDesign.Dialogs.Add
    myDialog.Name = "CornerEffects"
    With myDialog
        With .DialogColumns.Add
            With .BorderPanels.Add
                With .StaticTexts.Add
                    .StaticLabel = "Corner Type:"
                End With
                Set myCornerEffectButtons = .RadiobuttonGroups.Add
                With myCornerEffectButtons
                    With .RadiobuttonControls.Add
                        .StaticLabel = "Rounded"
                        .CheckedState = True
                    End With
                    With .RadiobuttonControls.Add
                        .StaticLabel = "Inverse Rounded"
                    End With
                    With .RadiobuttonControls.Add
                        .StaticLabel = "Bevel"
                    End With
                    With .RadiobuttonControls.Add
                        .StaticLabel = "Inset"
                    End With
                    With .RadiobuttonControls.Add
                        .StaticLabel = "Fancy"
                    End With
                End With
            End With
            With .BorderPanels.Add
                With .DialogColumns.Add
                    With .StaticTexts.Add
                        .StaticLabel = "Options:"
                    End With
                End With
                With .DialogColumns.Add
                    With .DialogRows.Add
                        With .DialogColumns.Add
                            With .StaticTexts.Add
                                .StaticLabel = "Offset:"
                                .MinWidth = 60
                            End With
                        End With
                        With .DialogColumns.Add
                            Set myOffsetEditbox = .MeasurementEditboxes.Add
                            With myOffsetEditbox
                                .EditValue = 12
                            End With
                        End With
                    End With
                    With .DialogRows.Add
                        With .DialogColumns.Add
                            With .StaticTexts.Add
                                .StaticLabel = "Pattern:"
                                .MinWidth = 60
                            End With
                        End With
                        With .DialogColumns.Add
                            Set myPatternDropdown = .Dropdowns.Add
                            With myPatternDropdown
                                .StringList = myStringList
                                .SelectedIndex = 0
                            End With
                        End With
                    End With
                End With
            End With
        End With
    End With
    myReturn = myDialog.Show
    If myReturn = True Then
        Rem Get the values from the dialog box.
        myCornerType = myCornerEffectButtons.SelectedButton
        myOffset = myOffsetEditbox.EditValue
        myPattern = myStringList(myPatternDropdown.SelectedIndex)
        myDialog.Destroy
        Rem Iterate through the objects.
        For myCounter = 0 To UBound(myObjectList)
            myChangeCorners myObjectList(myCounter), myCornerType, myOffset, myPattern
        Next
        Rem Reset the measurement units.
        myInDesign.ActiveDocument.ViewPreferences.HorizontalMeasurementUnits = myOldXUnits
        myInDesign.ActiveDocument.ViewPreferences.VerticalMeasurementUnits = myOldYUnits
    Else
        myDialog.Destroy
    End If
End Function
Function myChangeCorners(myObject, myCornerType, myOffset, myPattern)
    For myPathCounter = 1 To myObject.Paths.Count
        Set myPath = myObject.Paths.Item(myPathCounter)
        ReDim myPointArray(0)
        For myPathPointCounter = 1 To myPath.PathPoints.Count
            Rem Is the point a qualifying point?
            If myPointTest(myPathPointCounter, myPath, myPattern) = False Then
                myX1 = myPath.PathPoints.Item(myPathPointCounter).LeftDirection(0)
                myY1 = myPath.PathPoints.Item(myPathPointCounter).LeftDirection(1)
                myX2 = myPath.PathPoints.Item(myPathPointCounter).Anchor(0)
                myY2 = myPath.PathPoints.Item(myPathPointCounter).Anchor(1)
                myX3 = myPath.PathPoints.Item(myPathPointCounter).RightDirection(0)
                myY3 = myPath.PathPoints.Item(myPathPointCounter).RightDirection(1)
                myPoint = Array(Array(myX1, myY1), Array(myX2, myY2), Array(myX3, myY3))
                If Not (IsEmpty(myPointArray(0))) Then
                    ReDim Preserve myPointArray(UBound(myPointArray) + 1)
                End If
                myPointArray(UBound(myPointArray)) = myPoint
            Else
                Set myPointA = myPath.PathPoints.Item(myPathPointCounter)
                myAnchor = myPointA.Anchor
                myX1 = myAnchor(0)
                myY1 = myAnchor(1)
                Rem myPointB is the *next* point on the path. If myPathPoint is the last point on the path, then
                Rem myPointB is the first point on the path.
                If myPathPointCounter = (myPath.PathPoints.Count) Then
                    Set myPointB = myPath.PathPoints.Item(1)
                Else
                    Set myPointB = myPath.PathPoints.Item(myPathPointCounter + 1)
                End If
                myAnchor = myPointB.Anchor
                myX2 = myAnchor(0)
                myY2 = myAnchor(1)
                Rem myPointC is the *previous* point on the path. If myPathPoint is the first point on the path,
                Rem then myPointC is the last point on the path.
                If myPathPointCounter = 1 Then
                    Set myPointC = myPath.PathPoints.Item(myPath.PathPoints.Count)
                Else
                    Set myPointC = myPath.PathPoints.Item(myPathPointCounter - 1)
                End If
                myAnchor = myPointC.Anchor
                myX3 = myAnchor(0)
                myY3 = myAnchor(1)
                myPoints = myAddPoints(myX1, myY1, myX2, myY2, myX3, myY3, myOffset)
                myNewX1 = myPoints(0)
                myNewY1 = myPoints(1)
                myNewX2 = myPoints(2)
                myNewY2 = myPoints(3)
                Rem Calculate new path point values based on the path effect type.
                Rem We won't add the points to the path one at a time instead, we'll
                Rem create an array that holds all of the point locations and curve
                Rem handle positions, and we will then
                Select Case myCornerType
                    Case 0
                        Rem Rounded corner effect.
                        myPoint = Array(Array(myNewX2, myNewY2), Array(myNewX2, myNewY2), Array(myX1, myY1))
                        myAddToArray myPointArray, myPoint
                        myPoint = Array(Array(myNewX1, myNewY1), Array(myNewX1, myNewY1), Array(myNewX1, myNewY1))
                        myAddToArray myPointArray, myPoint
                    Case 1:
                        Rem Inverse Rounded corner effect.
                        myPoint = Array(Array(myNewX2, myNewY2), Array(myNewX2, myNewY2), Array(myNewX2 + myNewX1 - myX1, myNewY2 + myNewY1 - myY1))
                        myAddToArray myPointArray, myPoint
                        myPoint = Array(Array(myNewX1, myNewY1), Array(myNewX1, myNewY1), Array(myNewX1, myNewY1))
                        myAddToArray myPointArray, myPoint
                    Case 2:
                        Rem Bevel corner effect.
                        myPoint = Array(Array(myNewX2, myNewY2), Array(myNewX2, myNewY2), Array(myNewX2, myNewY2))
                        myAddToArray myPointArray, myPoint
                        myPoint = Array(Array(myNewX1, myNewY1), Array(myNewX1, myNewY1), Array(myNewX1, myNewY1))
                        myAddToArray myPointArray, myPoint
                    Case 3:
                        Rem Inset corner effect.
                        myPoint = Array(Array(myNewX2, myNewY2), Array(myNewX2, myNewY2), Array(myNewX2, myNewY2))
                        myAddToArray myPointArray, myPoint
                        myPoint = Array(Array(myNewX2 + myNewX1 - myX1, myNewY2 + myNewY1 - myY1), Array(myNewX2 + myNewX1 - myX1, myNewY2 + myNewY1 - myY1), Array(myNewX2 + myNewX1 - myX1, myNewY2 + myNewY1 - myY1))
                        myAddToArray myPointArray, myPoint
                        myPoint = Array(Array(myNewX1, myNewY1), Array(myNewX1, myNewY1), Array(myNewX1, myNewY1))
                        myAddToArray myPointArray, myPoint
                    Case 4:
                        Rem Fancy corner effect.
                        myOneThird = 0.33333333332
                        myTwoThirds = 0.666666666667
                        myPointZX = myNewX2 + myNewX1 - myX1
                        myPointZY = myNewY2 + myNewY1 - myY1
                        myTemp1X = (myX1 - myNewX2) * myTwoThirds
                        myTemp1Y = (myY1 - myNewY2) * myTwoThirds
                        myTemp2X = (myX1 - myNewX1) * myTwoThirds
                        myTemp2Y = (myY1 - myNewY1) * myTwoThirds
                        myPointDX = myPointZX + myOneThird * (myNewX1 - myPointZX)
                        myPointDY = myPointZY + myOneThird * (myNewY1 - myPointZY)
                        myPointEX = myPointZX + myOneThird * (myNewX2 - myPointZX)
                        myPointEY = myPointZY + myOneThird * (myNewY2 - myPointZY)
                        myPointFX = myPointDX + myTwoThirds * (myX1 - myTemp1X - myPointDX)
                        myPointFY = myPointDY + myTwoThirds * (myY1 - myTemp1Y - myPointDY)
                        myPointGX = myPointEX + myTwoThirds * (myX1 - myTemp2X - myPointEX)
                        myPointGY = myPointEY + myTwoThirds * (myY1 - myTemp2Y - myPointEY)
                        myPointHX = myPointZX + myTemp1X + myTemp2X
                        myPointHY = myPointZY + myTemp1Y + myTemp2Y
                        myPoint = Array(Array(myNewX2, myNewY2), Array(myNewX2, myNewY2), Array(myNewX2, myNewY2))
                        myAddToArray myPointArray, myPoint
                        myPoint = Array(Array(myPointEX, myPointEY), Array(myPointEX, myPointEY), Array(myPointEX, myPointEY))
                        myAddToArray myPointArray, myPoint
                        myPoint = Array(Array(myPointGX, myPointGY), Array(myPointGX, myPointGY), Array(myPointGX, myPointGY))
                        myAddToArray myPointArray, myPoint
                        myPoint = Array(Array(myPointHX, myPointHY), Array(myPointHX, myPointHY), Array(myPointHX, myPointHY))
                        myAddToArray myPointArray, myPoint
                        myPoint = Array(Array(myPointFX, myPointFY), Array(myPointFX, myPointFY), Array(myPointFX, myPointFY))
                        myAddToArray myPointArray, myPoint
                        myPoint = Array(Array(myPointDX, myPointDY), Array(myPointDX, myPointDY), Array(myPointDX, myPointDY))
                        myAddToArray myPointArray, myPoint
                        myPoint = Array(Array(myNewX1, myNewY1), Array(myNewX1, myNewY1), Array(myNewX1, myNewY1))
                        myAddToArray myPointArray, myPoint
                End Select
            End If
        Next
        myPath.EntirePath = myPointArray
    Next
End Function
Function myAddPoints(myX1, myY1, myX2, myY2, myX3, myY3, myOffset)
    myHypotenuse = Sqr(((myX1 - myX2) ^ 2) + ((myY1 - myY2) ^ 2))
    If myY1 <> myY2 Then
        myXAdjust = ((myX1 - myX2) / myHypotenuse) * myOffset
        myYAdjust = ((myY1 - myY2) / myHypotenuse) * myOffset
        myNewX1 = myX1 - myXAdjust
        myNewY1 = myY1 - myYAdjust
    Else
        myXAdjust = myOffset
        myYAdjust = 0
        If myX1 < myX2 Then
            myNewX1 = myX1 + myXAdjust
            myNewY1 = myY1 + myYAdjust
        Else
            myNewX1 = myX1 - myXAdjust
            myNewY1 = myY1 - myYAdjust
        End If
    End If
    myHypotenuse = Sqr(((myX1 - myX3) ^ 2) + ((myY1 - myY3) ^ 2))
    If myY1 <> myY3 Then
        myXAdjust = ((myX1 - myX3) / myHypotenuse) * myOffset
        myYAdjust = ((myY1 - myY3) / myHypotenuse) * myOffset
        myNewX2 = myX1 - myXAdjust
        myNewY2 = myY1 - myYAdjust
    Else
        myXAdjust = myOffset
        myYAdjust = 0
        If myX1 < myX3 Then
            myNewX2 = myX1 + myXAdjust
            myNewY2 = myY1 + myYAdjust
        Else
            myNewX2 = myX1 - myXAdjust
            myNewY2 = myY1 - myYAdjust
        End If
    End If
    myAddPoints = Array(myNewX1, myNewY1, myNewX2, myNewY2)
End Function
Function myPointTest(myPathPointCounter, myPath, myPattern)
    Rem Do not apply the corner effect to the first or last point in an open path
    Rem (this is the way that InDesign's corner effects work).
    If ((myPath.PathType = idPathType.idOpenPath) And ((myPathPointCounter = 0) Or (myPathPointCounter = myPath.PathPoints.Count))) Then
        myPointTest = False
        Exit Function
    Else
        Select Case myPattern
            Case "all points"
                myPointTest = True
                Exit Function
            Case "first point":
                If myPathPointCounter = 0 Then
                    myPointTest = True
                    Exit Function
                Else
                    myPointTest = False
                    Exit Function
                End If
            Case "last point":
                If myPathPointCounter = myPath.PathPoints.Count Then
                    myPointTest = True
                    Exit Function
                Else
                    myPointTest = False
                    Exit Function
                End If
            Case "second point":
                If myPathPointCounter = 2 Then
                    myPointTest = True
                    Exit Function
                Else
                    myPointTest = False
                    Exit Function
                End If
            Case "third point":
                If myPathPointCounter = 3 Then
                    myPointTest = True
                    Exit Function
                Else
                    myPointTest = False
                    Exit Function
                End If
            Case "fourth point":
                If myPathPointCounter = 4 Then
                    myPointTest = True
                    Exit Function
                Else
                    myPointTest = False
                    Exit Function
                End If
            Case "first two":
                If ((myPathPointCounter = 1) Or (myPathPointCounter = 2)) Then
                    myPointTest = True
                    Exit Function
                Else
                    myPointTest = False
                    Exit Function
                End If
            Case "second and third":
                If ((myPathPointCounter = 2) Or (myPathPointCounter = 3)) Then
                    myPointTest = True
                    Exit Function
                Else
                    myPointTest = False
                    Exit Function
                End If
            Case "last two":
                If ((myPathPointCounter = myPath.PathPoints.Count) Or (myPathPointCounter = (myPath.PathPoints.Count - 1))) Then
                    myPointTest = True
                    Exit Function
                Else
                    myPointTest = False
                    Exit Function
                End If
            Case "even points":
                If myPathPointCounter Mod 2 = 0 Then
                    myPointTest = True
                    Exit Function
                Else
                    myPointTest = False
                    Exit Function
                End If
            Case "odd points":
                If myPathPointCounter Mod 2 <> 0 Then
                    myPointTest = True
                    Exit Function
                Else
                    myPointTest = False
                    Exit Function
                End If
        End Select
    End If
End Function
Function myAddToArray(myArray, myItem)
    If Not (IsEmpty(myArray(0))) Then
        ReDim Preserve myArray(UBound(myArray) + 1)
    End If
    If Not (IsObject(myItem)) Then
        myArray(UBound(myArray)) = myItem
    Else
        Set myArray(UBound(myArray)) = myItem
    End If
End Function