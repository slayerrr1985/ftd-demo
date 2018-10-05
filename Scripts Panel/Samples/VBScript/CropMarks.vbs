Rem CropMarks.vbs
Rem An InDesign VBScript
Rem
Rem Draws crop marks and/or registration marks around the selected object or objects.
Rem
Rem For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
Rem available at http://www.adobe.com/devnet/indesign/sdk.html
Rem or drop by the InDesign scripting user to user forum at http://www.adobeforums.com.
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
End function
Function myDisplayDialog(myInDesign, myObjectList)
Set myDialog = myInDesign.Dialogs.Add
myDialog.Name = "CropMarks"
With myDialog.DialogColumns.Add
    Set myCropMarksGroup = .EnablingGroups.Add
    myCropMarksGroup.StaticLabel = "Crop Marks"
    myCropMarksGroup.CheckedState = True
    With myCropMarksGroup.DialogColumns.Add
        With .StaticTexts.Add
            .StaticLabel = "Options:"
        End With
    End With
    With myCropMarksGroup.DialogColumns.Add
        With .StaticTexts.Add
            .StaticLabel = "Length:"
        End With
        With .StaticTexts.Add
            .StaticLabel = "Offset:"
        End With
        With .StaticTexts.Add
            .StaticLabel = "Stroke Weight:"
        End With
    End With
    With myCropMarksGroup.DialogColumns.Add
        Set myCropMarkLengthField = .MeasurementEditboxes.Add
        myCropMarkLengthField.EditUnits = idMeasurementUnits.idPoints
        myCropMarkLengthField.EditValue = 6
        Set myCropMarkOffsetField = .MeasurementEditboxes.Add
        myCropMarkOffsetField.EditUnits = idMeasurementUnits.idPoints
        myCropMarkOffsetField.EditValue = 3
        Set myCropMarkStrokeWeightField = .MeasurementEditboxes.Add
        myCropMarkStrokeWeightField.EditUnits = idMeasurementUnits.idPoints
        myCropMarkStrokeWeightField.EditValue = 0.25
    End With
    Set myRegMarksGroup = .EnablingGroups.Add
    myRegMarksGroup.StaticLabel = "Registration Marks"
    myRegMarksGroup.CheckedState = True
    With myRegMarksGroup.DialogColumns.Add
        With .StaticTexts.Add
            .StaticLabel = "Options:"
        End With
    End With
    With myRegMarksGroup.DialogColumns.Add
        With .StaticTexts.Add
            .StaticLabel = "Inside Target Radius:"
        End With
        With .StaticTexts.Add
            .StaticLabel = "Outside Target Radius:"
        End With
        With .StaticTexts.Add
            .StaticLabel = "Outside Radius:"
        End With
        With .StaticTexts.Add
            .StaticLabel = "Offset:"
        End With
        With .StaticTexts.Add
            .StaticLabel = "Stroke Weight:"
        End With
    End With
    With myRegMarksGroup.DialogColumns.Add
        Set myRegMarkInnerRadiusField = .MeasurementEditboxes.Add
        myRegMarkInnerRadiusField.EditUnits = idMeasurementUnits.idPoints
        myRegMarkInnerRadiusField.EditValue = 2
        Set myRegMarkOuterRadiusField = .MeasurementEditboxes.Add
        myRegMarkOuterRadiusField.EditUnits = idMeasurementUnits.idPoints
        myRegMarkOuterRadiusField.EditValue = 4
        Set myRegMarkRadiusField = .MeasurementEditboxes.Add
        myRegMarkRadiusField.EditUnits = idMeasurementUnits.idPoints
        myRegMarkRadiusField.EditValue = 6
        Set myRegMarkOffsetField = .MeasurementEditboxes.Add
        myRegMarkOffsetField.EditUnits = idMeasurementUnits.idPoints
        myRegMarkOffsetField.EditValue = 3
        Set myRegMarkStrokeWeightField = .MeasurementEditboxes.Add
        myRegMarkStrokeWeightField.EditUnits = idMeasurementUnits.idPoints
        myRegMarkStrokeWeightField.EditValue = 0.25
    End With
    With .BorderPanels.Add
        With .StaticTexts.Add
            .StaticLabel = "Draw Marks Around:"
        End With
        Set myRangeButtons = .RadiobuttonGroups.Add
        With myRangeButtons.RadiobuttonControls.Add
            .StaticLabel = "Each Object"
            .CheckedState = True
        End With
        With myRangeButtons.RadiobuttonControls.Add
            .StaticLabel = "Entire Selection"
        End With
    End With
End With
myReturn = myDialog.Show
If myReturn = True Then
    Rem Get the values from the dialog box.
    myDoCropMarks = myCropMarksGroup.CheckedState
    myDoRegMarks = myRegMarksGroup.CheckedState
    myCropMarkLength = myCropMarkLengthField.EditValue
    myCropMarkOffset = myCropMarkOffsetField.EditValue
    myCropMarkStrokeWeight = myCropMarkStrokeWeightField.EditValue
    myRegMarkInnerRadius = myRegMarkInnerRadiusField.EditValue
    myRegMarkOuterRadius = myRegMarkOuterRadiusField.EditValue
    myRegMarkRadius = myRegMarkRadiusField.EditValue
    myRegMarkOffset = myRegMarkOffsetField.EditValue
    myRegMarkStrokeWeight = myRegMarkStrokeWeightField.EditValue
    myRange = myRangeButtons.SelectedButton
    myDialog.Destroy
    If ((myDoCropMarks <> False) Or (myDoRegMarks <> False)) Then
    Rem Store the current measurement units.
    myOldXUnits = myInDesign.ActiveDocument.ViewPreferences.HorizontalMeasurementUnits
    myOldYUnits = myInDesign.ActiveDocument.ViewPreferences.VerticalMeasurementUnits
    Rem Set the measurement units to points.
    myInDesign.ActiveDocument.ViewPreferences.HorizontalMeasurementUnits = idMeasurementUnits.idPoints
    myInDesign.ActiveDocument.ViewPreferences.VerticalMeasurementUnits = idMeasurementUnits.idPoints
    Rem Draw the printers marks.
        myDrawPrintersMarks myInDesign, myRange, myDoCropMarks, myDoRegMarks, myCropMarkLength, myCropMarkOffset, myCropMarkStrokeWeight, myRegMarkInnerRadius, myRegMarkOuterRadius, myRegMarkRadius, myRegMarkOffset, myRegMarkStrokeWeight, myObjectList
    Rem Reset the measurement units.
    myInDesign.ActiveDocument.ViewPreferences.HorizontalMeasurementUnits = myOldXUnits
    myInDesign.ActiveDocument.ViewPreferences.VerticalMeasurementUnits = myOldYUnits
    Else
        myDialog.Destroy
    End If
End If
End Function

Function myDrawPrintersMarks(myInDesign, myRange, myDoCropMarks, myDoRegMarks, myCropMarkLength, myCropMarkOffset, myCropMarkStrokeWeight, myRegMarkInnerRadius, myRegMarkOuterRadius, myRegMarkRadius, myRegMarkOffset, myRegMarkStrokeWeight, myObjectList)
    Set myDocument = myInDesign.ActiveDocument
    myOldRulerOrigin = myDocument.ViewPreferences.RulerOrigin
    myDocument.ViewPreferences.RulerOrigin = idRulerOrigin.idSpreadOrigin
    Rem Create a layer to hold the printers marks (if it does not already exist).
    Err.Clear
    On Error Resume Next
    Set myLayer = myDocument.Layers.Item("CropMarks")
    If Err.Number <> 0 Then
        Set myLayer = myDocument.Layers.Add
        myLayer.Name = "CropMarks"
        Err.Clear
    End If
    On Error GoTo 0
    Rem Get references to the Registration color, Paper color, and the None swatch.
    Set myRegistrationSwatch = myDocument.Swatches.Item("Registration")
    Set myPaperSwatch = myDocument.Swatches.Item("Paper")
    Set myNoneSwatch = myDocument.Swatches.Item("None")
    Rem Process the objects in the selection.
    For myCounter = 0 To UBound(myObjectList)
        Set myObject = myObjectList(myCounter)
	myBounds = myObject.VisibleBounds
        Rem Set up some initial bounding box values.
        If myCounter = 0 Then
            myX1 = myBounds(1)
            myY1 = myBounds(0)
            myX2 = myBounds(3)
            myY2 = myBounds(2)
        End If
        If myRange = 0 Then
            If myDoCropMarks = True Then
                myDrawCropMarks myInDesign, myBounds(1), myBounds(0), myBounds(3), myBounds(2), myCropMarkLength, myCropMarkOffset, myCropMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
            End If
            If myDoRegMarks = True Then
                myDrawRegMarks myInDesign, myBounds(1), myBounds(0), myBounds(3), myBounds(2), myRegMarkOffset, myRegMarkInnerRadius, myRegMarkOuterRadius, myRegMarkRadius, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myPaperSwatch, myLayer
            End If
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
            If myDoCropMarks = True Then
                myDrawCropMarks myInDesign, myX1, myY1, myX2, myY2, myCropMarkLength, myCropMarkOffset, myCropMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
            End If
            If myDoRegMarks = True Then
                myDrawRegMarks myInDesign, myX1, myY1, myX2, myY2, myRegMarkOffset, myRegMarkInnerRadius, myRegMarkOuterRadius, myRegMarkRadius, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myPaperSwatch, myLayer
            End If
    End If
    myDocument.ViewPreferences.RulerOrigin = myOldRulerOrigin
End Function
Function myDrawCropMarks(myInDesign, myX1, myY1, myX2, myY2, myCropMarkLength, myCropMarkOffset, myCropMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer)
    Rem Upper left crop mark pair.
    myDrawLine myInDesign, Array(myY1, myX1 - myCropMarkOffset, myY1, myX1 - (myCropMarkOffset + myCropMarkLength)), myCropMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myDrawLine myInDesign, Array(myY1 - myCropMarkOffset, myX1, myY1 - (myCropMarkOffset + myCropMarkLength), myX1), myCropMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    Rem Lower left crop mark pair.
    myDrawLine myInDesign, Array(myY2, myX1 - myCropMarkOffset, myY2, myX1 - (myCropMarkOffset + myCropMarkLength)), myCropMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myDrawLine myInDesign, Array(myY2 + myCropMarkOffset, myX1, myY2 + myCropMarkOffset + myCropMarkLength, myX1), myCropMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    Rem Upper right crop mark pair.
    myDrawLine myInDesign, Array(myY1, myX2 + myCropMarkOffset, myY1, myX2 + myCropMarkOffset + myCropMarkLength), myCropMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myDrawLine myInDesign, Array(myY1 - myCropMarkOffset, myX2, myY1 - (myCropMarkOffset + myCropMarkLength), myX2), myCropMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    Rem Lower left crop mark pair.
    myDrawLine myInDesign, Array(myY2, myX2 + myCropMarkOffset, myY2, myX2 + myCropMarkOffset + myCropMarkLength), myCropMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myDrawLine myInDesign, Array(myY2 + myCropMarkOffset, myX2, myY2 + myCropMarkOffset + myCropMarkLength, myX2), myCropMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
End Function

Function myDrawRegMarks(myInDesign, myX1, myY1, myX2, myY2, myRegMarkOffset, myRegMarkInnerRadius, myRegMarkOuterRadius, myRegMarkRadius, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myPaperSwatch, myLayer)
    myXCenter = myX1 + ((myX2 - myX1) / 2)
    myYCenter = myY1 + ((myY2 - myY1) / 2)
    myTargetCenter = myRegMarkOffset + (myRegMarkOuterRadius)
    Rem Top registration target.
    myBounds = Array((myY1 - myTargetCenter) - myRegMarkOuterRadius, myXCenter - myRegMarkOuterRadius, (myY1 - myTargetCenter) + myRegMarkOuterRadius, myXCenter + myRegMarkOuterRadius)
    myDrawTarget myInDesign, myBounds, myRegMarkStrokeWeight, myNoneSwatch, myRegistrationSwatch, myLayer
    myBounds = Array(myY1 - (myTargetCenter + myRegMarkRadius), myXCenter, (myY1 - myTargetCenter) + myRegMarkRadius, myXCenter)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myBounds = Array(myY1 - myTargetCenter, myXCenter - myRegMarkRadius, myY1 - myTargetCenter, myXCenter + myRegMarkRadius)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myBounds = Array((myY1 - myTargetCenter) - myRegMarkInnerRadius, myXCenter - myRegMarkInnerRadius, (myY1 - myTargetCenter) + myRegMarkInnerRadius, myXCenter + myRegMarkInnerRadius)
    myDrawTarget myInDesign, myBounds, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myBounds = Array((myY1 - myTargetCenter) - myRegMarkInnerRadius, myXCenter, (myY1 - myTargetCenter) + myRegMarkInnerRadius, myXCenter)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myPaperSwatch, myNoneSwatch, myLayer
    myBounds = Array(myY1 - myTargetCenter, myXCenter - myRegMarkInnerRadius, myY1 - myTargetCenter, myXCenter + myRegMarkInnerRadius)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myPaperSwatch, myNoneSwatch, myLayer
    Rem Left registration target.
    myBounds = Array(myYCenter - myRegMarkOuterRadius, (myX1 - myTargetCenter) - myRegMarkOuterRadius, myYCenter + myRegMarkOuterRadius, (myX1 - myTargetCenter) + myRegMarkOuterRadius)
    myDrawTarget myInDesign, myBounds, myRegMarkStrokeWeight, myNoneSwatch, myRegistrationSwatch, myLayer
    myBounds = Array(myYCenter, (myX1 - myTargetCenter) - myRegMarkRadius, myYCenter, (myX1 - myTargetCenter) + myRegMarkRadius)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myBounds = Array(myYCenter - myRegMarkRadius, myX1 - myTargetCenter, myYCenter + myRegMarkRadius, myX1 - myTargetCenter)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myBounds = Array(myYCenter - myRegMarkInnerRadius, myX1 - (myTargetCenter + myRegMarkInnerRadius), myYCenter + myRegMarkInnerRadius, (myX1 - myTargetCenter) + myRegMarkInnerRadius)
    myDrawTarget myInDesign, myBounds, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myBounds = Array(myYCenter, (myX1 - myTargetCenter) - myRegMarkInnerRadius, myYCenter, (myX1 - myTargetCenter) + myRegMarkInnerRadius)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myPaperSwatch, myNoneSwatch, myLayer
    myBounds = Array(myYCenter - myRegMarkInnerRadius, myX1 - myTargetCenter, myYCenter + myRegMarkInnerRadius, myX1 - myTargetCenter)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myPaperSwatch, myNoneSwatch, myLayer
    Rem Bottom registration target.
    myBounds = Array((myY2 + myTargetCenter) - myRegMarkOuterRadius, myXCenter - myRegMarkOuterRadius, (myY2 + myTargetCenter) + myRegMarkOuterRadius, myXCenter + myRegMarkOuterRadius)
    myDrawTarget myInDesign, myBounds, myRegMarkStrokeWeight, myNoneSwatch, myRegistrationSwatch, myLayer
    myBounds = Array((myY2 + myTargetCenter) - myRegMarkRadius, myXCenter, (myY2 + myTargetCenter) + myRegMarkRadius, myXCenter)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myBounds = Array(myY2 + myTargetCenter, myXCenter - myRegMarkRadius, myY2 + myTargetCenter, myXCenter + myRegMarkRadius)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myBounds = Array((myY2 + myTargetCenter) - myRegMarkInnerRadius, myXCenter - myRegMarkInnerRadius, (myY2 + myTargetCenter) + myRegMarkInnerRadius, myXCenter + myRegMarkInnerRadius)
    myDrawTarget myInDesign, myBounds, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myBounds = Array((myY2 + myTargetCenter) - myRegMarkInnerRadius, myXCenter, (myY2 + myTargetCenter) + myRegMarkInnerRadius, myXCenter)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myPaperSwatch, myNoneSwatch, myLayer
    myBounds = Array(myY2 + myTargetCenter, myXCenter - myRegMarkInnerRadius, myY2 + myTargetCenter, myXCenter + myRegMarkInnerRadius)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myPaperSwatch, myNoneSwatch, myLayer
    Rem Right registration target.
    myBounds = Array(myYCenter - myRegMarkOuterRadius, (myX2 + myTargetCenter) - myRegMarkOuterRadius, myYCenter + myRegMarkOuterRadius, (myX2 + myTargetCenter) + myRegMarkOuterRadius)
    myDrawTarget myInDesign, myBounds, myRegMarkStrokeWeight, myNoneSwatch, myRegistrationSwatch, myLayer
    myBounds = Array(myYCenter, (myX2 + myTargetCenter) - myRegMarkRadius, myYCenter, (myX2 + myTargetCenter) + myRegMarkRadius)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myBounds = Array(myYCenter - myRegMarkRadius, myX2 + myTargetCenter, myYCenter + myRegMarkRadius, myX2 + myTargetCenter)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myBounds = Array(myYCenter - myRegMarkInnerRadius, (myX2 + myTargetCenter) - myRegMarkInnerRadius, myYCenter + myRegMarkInnerRadius, (myX2 + myTargetCenter) + myRegMarkInnerRadius)
    myDrawTarget myInDesign, myBounds, myRegMarkStrokeWeight, myRegistrationSwatch, myNoneSwatch, myLayer
    myBounds = Array(myYCenter, (myX2 + myTargetCenter) - myRegMarkInnerRadius, myYCenter, (myX2 + myTargetCenter) + myRegMarkInnerRadius)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myPaperSwatch, myNoneSwatch, myLayer
    myBounds = Array(myYCenter - myRegMarkInnerRadius, myX2 + myTargetCenter, myYCenter + myRegMarkInnerRadius, myX2 + myTargetCenter)
    myDrawLine myInDesign, myBounds, myRegMarkStrokeWeight, myPaperSwatch, myNoneSwatch, myLayer
End Function
Function myDrawLine(myInDesign, myBounds, myStrokeWeight, myStrokeColor, myFillColor, myLayer)
    Set myGraphicLine = myInDesign.ActiveWindow.ActiveSpread.GraphicLines.Add
    myGraphicLine.Move , Array(1, 1)
    myGraphicLine.GeometricBounds = myBounds
    myGraphicLine.ItemLayer = myLayer
    myGraphicLine.StrokeWeight = myStrokeWeight
    myGraphicLine.FillColor = myFillColor
    myGraphicLine.StrokeColor = myStrokeColor
End Function
Function myDrawTarget(myInDesign, myBounds, myStrokeWeight, myFillColor, myStrokeColor, myLayer)
    Set myOval = myInDesign.ActiveWindow.ActiveSpread.Ovals.Add
    myOval.Move , Array(1, 1)
    myOval.ItemLayer = myLayer
    myOval.StrokeWeight = myStrokeWeight
    myOval.FillColor = myFillColor
    myOval.StrokeColor = myStrokeColor
    myOval.GeometricBounds = myBounds
End Function
