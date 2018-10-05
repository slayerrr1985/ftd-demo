Rem MakeGrid.vbs
Rem An InDesign example script.
Rem
Rem Divides the selected frame (or frames) into grid(s) of frames.
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
	If myInDesign.Documents.Count > 0 Then
	    If myInDesign.Selection.Count > 0 Then
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
    myLabelWidth = 90
    myFrameTypes = Array("Unassigned", "Text", "Graphic")
    Set myDialog = myInDesign.dialogs.Add
    myDialog.Name = "MakeGrid"
    With myDialog.dialogColumns.Add
        With .dialogRows.Add
            With .dialogColumns.Add
                With .staticTexts.Add
                    .staticLabel = "Rows:"
                    .MinWidth = myLabelWidth
                End With
                With .staticTexts.Add
                    .staticLabel = "Columns:"
                    .MinWidth = myLabelWidth
                End With
            End With
            With .dialogColumns.Add
                Set myNumberOfRowsField = .integerEditboxes.Add
                myNumberOfRowsField.editValue = 2
                Set myNumberOfColumnsField = .integerEditboxes.Add
                myNumberOfColumnsField.editValue = 2
            End With
        End With
        With .dialogRows.Add
            With .dialogColumns.Add
                With .staticTexts.Add
                    .staticLabel = "Row Gutter:"
                    .MinWidth = myLabelWidth
                End With
            End With
            With .dialogColumns.Add
                Set myRowGutterField = .measurementEditboxes.Add
                myRowGutterField.editValue = 12
                myRowGutterField.editUnits = idMeasurementUnits.idpoints
            End With
        End With
        With .dialogRows.Add
            With .dialogColumns.Add
                With .staticTexts.Add
                    .staticLabel = "Column Gutter:"
                    .MinWidth = myLabelWidth
                End With
            End With
            With .dialogColumns.Add
                Set myColumnGutterField = .measurementEditboxes.Add
                myColumnGutterField.editValue = 12
                myColumnGutterField.editUnits = idMeasurementUnits.idpoints
            End With
        End With
        With .dialogRows.Add
            With .dialogColumns.Add
                With .staticTexts.Add
                    .staticLabel = "Frame Type:"
                    .MinWidth = myLabelWidth
                End With
            End With
            With .dialogColumns.Add
                Set myFrameTypeDropdown = .dropdowns.Add
                myFrameTypeDropdown.stringList = myFrameTypes
                myFrameTypeDropdown.selectedIndex = 0
            End With
        End With
        Set myRetainFormattingCheckbox = .checkboxControls.Add
        myRetainFormattingCheckbox.staticLabel = "Retain Formatting and Contents"
        myRetainFormattingCheckbox.checkedState = True
        Set myDeleteObjectCheckbox = .checkboxControls.Add
        myDeleteObjectCheckbox.staticLabel = "Delete Original Object"
        myDeleteObjectCheckbox.checkedState = True
    End With
    myResult = myDialog.Show
    If myResult = True Then
        myNumberOfRows = myNumberOfRowsField.editValue
        myNumberOfColumns = myNumberOfColumnsField.editValue
        myRowGutter = myRowGutterField.editValue
        myColumnGutter = myColumnGutterField.editValue
        myRetainFormatting = myRetainFormattingCheckbox.checkedState
        myDeleteObject = myDeleteObjectCheckbox.checkedState
        Select Case myFrameTypeDropdown.selectedIndex
            Case 0:
                myFrameType = idContentType.idunassigned
            Case 1:
                myFrameType = idContentType.idtextType
            Case 2:
                myFrameType = idContentType.idgraphicType
        End Select
        myDialog.destroy
        mySplitFrames myInDesign, myObjectList, myNumberOfRows, myNumberOfColumns, myRowGutter, myColumnGutter, myFrameType, myRetainFormatting, myDeleteObject
    Else
        myDialog.destroy
    End If
End Function
Function mySplitFrames(myInDesign, myObjectList, myNumberOfRows, myNumberOfColumns, myRowGutter, myColumnGutter, myFrameType, myRetainFormatting, myDeleteObject)
    myOldXUnits = myInDesign.activeDocument.viewPreferences.horizontalMeasurementUnits
    myOldYUnits = myInDesign.activeDocument.viewPreferences.verticalMeasurementUnits
    myInDesign.activeDocument.viewPreferences.horizontalMeasurementUnits = idMeasurementUnits.idpoints
    myInDesign.activeDocument.viewPreferences.verticalMeasurementUnits = idMeasurementUnits.idpoints
    For myCounter = 0 To UBound(myObjectList)
        mySplitFrame myObjectList(myCounter), myNumberOfRows, myNumberOfColumns, myRowGutter, myColumnGutter, myFrameType, myRetainFormatting, myDeleteObject
    Next
    myInDesign.activeDocument.viewPreferences.horizontalMeasurementUnits = myOldXUnits
    myInDesign.activeDocument.viewPreferences.verticalMeasurementUnits = myOldYUnits
End Function
Function mySplitFrame(myObject, myNumberOfRows, myNumberOfColumns, myRowGutter, myColumnGutter, myFrameType, myRetainFormatting, myDeleteObject)
    myBounds = myObject.geometricBounds
    myWidth = myBounds(3) - myBounds(1)
    myHeight = myBounds(2) - myBounds(0)
    Rem Don't bother making the frames if the width/height of the frame is too small
    Rem to accomodate the row/column gutter values.
    If ((myRowGutter * (myNumberOfRows - 1) < myHeight) And (myColumnGutter * (myNumberOfColumns - 1) < myWidth)) Then
        myColumnWidth = (myWidth - (myColumnGutter * (myNumberOfColumns - 1))) / myNumberOfColumns
        myRowHeight = (myHeight - (myRowGutter * (myNumberOfRows - 1))) / myNumberOfRows
        For myRowCounter = 0 To (myNumberOfRows - 1)
            myY1 = myBounds(0) + (myRowHeight * myRowCounter) + (myRowGutter * myRowCounter)
            myY2 = myY1 + myRowHeight
            For myColumnCounter = 0 To (myNumberOfColumns - 1)
                myX1 = myBounds(1) + (myColumnWidth * myColumnCounter) + (myColumnGutter * myColumnCounter)
                myX2 = myX1 + myColumnWidth
                If myRetainFormatting = True Then
                    Set myNewObject = myObject.duplicate
                    myNewObject.geometricBounds = Array(myY1, myX1, myY2, myX2)
                Else
                    Set myNewObject = myObject.Parent.rectangles.Add
                    myNewObject.geometricBounds = Array(myY1, myX1, myY2, myX2)
                    myNewObject.contentType = myFrameType
                End If
                If myRetainFormatting = False Then
                    myNewObject.contentType = myFrameType
                End If
            Next
        Next
        If myDeleteObject = True Then
            myObject.Delete
        End If
    End If
End Function
