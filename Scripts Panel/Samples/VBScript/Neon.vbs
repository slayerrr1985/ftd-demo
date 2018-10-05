Rem Neon.vbs
Rem An InDesign VBScript
Rem
Rem This script creates a "blend" or "graduation" from the selected object or objects.
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
	myInDesign.Activate
	If myInDesign.Documents.Count <> 0 Then
	    If myInDesign.Selection.Count <> 0 Then
	        For myCounter = 1 To myInDesign.Selection.Count
	            Select Case TypeName(myInDesign.Selection.Item(myCounter))
	                Case "Rectangle", "Oval", "Polygon", "GraphicLine"
	                    If Not (IsEmpty(myObjectList(0))) Then
	                        ReDim Preserve myObjectList(UBound(myObjectList) + 1)
	                    End If
	                    Set myObjectList(UBound(myObjectList)) = myInDesign.Selection.Item(myCounter)
	            End Select
	        Next
	        If Not (IsEmpty(myObjectList(0))) Then
	            myDisplayDialog myInDesign, myObjectList
	        Else
	            MsgBox ("Please select a rectangle, oval,polygon, or graphic line and try again.")
	        End If
	    Else
	        MsgBox ("Please select an object and try again.")
	    End If
	Else
	    MsgBox ("Please open a document, select an object, and try again.")
	End If
End Function
Function myDisplayDialog(myInDesign, myObjectList)
	ReDim mySwatchNamesList(0)
	ReDim myLayerNamesList(0)
	For myCounter = 1 To myInDesign.ActiveDocument.Colors.Count
	    Rem Do not add unnamed colors.
	    If myInDesign.ActiveDocument.Colors.Item(myCounter).Name <> "" Then
	    	Select Case myInDesign.ActiveDocument.Colors.Item(myCounter).Name
	    		Case "Cyan", "Magenta", "Yellow", "Registration", "Paper"
	    			Rem Do not add these default colors.
		        Case Else
		        	If Not (IsEmpty(mySwatchNamesList(0))) Then
		            	ReDim Preserve mySwatchNamesList(UBound(mySwatchNamesList) + 1)
		        	End If
		        	mySwatchNamesList(UBound(mySwatchNamesList)) = myInDesign.ActiveDocument.Colors.Item(myCounter).Name
	        End Select
	    End If
	Next
	Rem Add mixed ink swatches.
	For myCounter = 1 To myInDesign.ActiveDocument.MixedInks.Count
	    Rem Do not add unnamed colors.
	    If myInDesign.ActiveDocument.MixedInks.Item(myCounter).Name <> "" Then
	        If Not (IsEmpty(mySwatchNamesList(0))) Then
	            ReDim Preserve mySwatchNamesList(UBound(mySwatchNamesList) + 1)
	        End If
	        mySwatchNamesList(UBound(mySwatchNamesList)) = myInDesign.ActiveDocument.MixedInks.Item(myCounter).Name
	    End If
	Next
	For myCounter = 1 To myInDesign.ActiveDocument.Layers.Count
	    If Not (IsEmpty(myLayerNamesList(0))) Then
	        ReDim Preserve myLayerNamesList(UBound(myLayerNamesList) + 1)
	    End If
	    myLayerNamesList(UBound(myLayerNamesList)) = myInDesign.ActiveDocument.Layers.Item(myCounter).Name
	Next
	ReDim Preserve myLayerNamesList(UBound(myLayerNamesList) + 1)
	myLayerNamesList(UBound(myLayerNamesList)) = "New Layer"
	Set myDialog = myInDesign.Dialogs.Add
	With myDialog
	    .Name = "Neon"
	    With .DialogColumns.Add
	        With .BorderPanels.Add
	            With .DialogColumns.Add
	                With .StaticTexts.Add
	                    .StaticLabel = "Number of Steps:"
	                End With
	            End With
	            With .DialogColumns.Add
	                Set myNumberOfStepsField = .IntegerEditboxes.Add
	                myNumberOfStepsField.EditValue = 12
	            End With
	        End With
	        With .BorderPanels.Add
	            With .DialogColumns.Add
	                With .StaticTexts.Add
	                    .StaticLabel = "From:"
	                    .MinWidth = 36
	                End With
	            End With
	            With .DialogColumns.Add
	                With .DialogRows.Add
	                    With .DialogColumns.Add
	                        With .StaticTexts.Add
	                            .StaticLabel = "Stroke Color:"
	                            .MinWidth = 100
	                        End With
	                    End With
	                    With .DialogColumns.Add
	                        Set myFromStrokeColorMenu = .Dropdowns.Add
	                        myFromStrokeColorMenu.StringList = mySwatchNamesList
	                        myFromStrokeColorMenu.SelectedIndex = 0
	                    End With
	                End With
	                With .DialogRows.Add
	                    With .DialogColumns.Add
	                        With .StaticTexts.Add
	                            .StaticLabel = "Stroke Weight:"
	                            .MinWidth = 100
	                        End With
	                    End With
	                    With .DialogColumns.Add
	                        Set myFromStrokeWeightField = .RealEditboxes.Add
	                        myFromStrokeWeightField.EditValue = 12
	                    End With
	                End With
	                With .DialogRows.Add
	                    With .DialogColumns.Add
	                        With .StaticTexts.Add
	                            .StaticLabel = "Stroke Tint:"
	                            .MinWidth = 100
	                        End With
	                    End With
	                    With .DialogColumns.Add
	                        Set myFromStrokeTintField = .PercentEditboxes.Add
	                        myFromStrokeTintField.EditValue = 100
	                    End With
	                End With
	            End With
	        End With
	        With .BorderPanels.Add
	            With .DialogColumns.Add
	                With .StaticTexts.Add
	                    .StaticLabel = "To:"
	                    .MinWidth = 36
	                End With
	            End With
	            With .DialogColumns.Add
	                With .DialogRows.Add
	                    With .DialogColumns.Add
	                        With .StaticTexts.Add
	                            .StaticLabel = "Stroke Weight:"
	                            .MinWidth = 100
	                        End With
	                    End With
	                    With .DialogColumns.Add
	                        Set myToStrokeWeightField = .RealEditboxes.Add
	                        myToStrokeWeightField.EditValue = 0.25
	                    End With
	                End With
	                With .DialogRows.Add
	                    With .DialogColumns.Add
	                        With .StaticTexts.Add
	                            .StaticLabel = "Stroke Tint:"
	                            .MinWidth = 100
	                        End With
	                    End With
	                    With .DialogColumns.Add
	                        Set myToStrokeTintField = .PercentEditboxes.Add
	                        myToStrokeTintField.EditValue = 0
	                    End With
	                End With
	            End With
	        End With
	        With .BorderPanels.Add
	            With .DialogColumns.Add
	                With .StaticTexts.Add
	                    .StaticLabel = "Destination Layer:"
	                End With
	            End With
	            With .DialogColumns.Add
	                Set myLayersMenu = .Dropdowns.Add
	                myLayersMenu.StringList = myLayerNamesList
	                myLayersMenu.SelectedIndex = 0
	            End With
	        End With
	    End With
	End With
	myResult = myDialog.Show
	If myResult = True Then
	    Rem Get the values from the dialog box controls
	    myNumberOfSteps = myNumberOfStepsField.EditValue
	    myFromStrokeColor = mySwatchNamesList(myFromStrokeColorMenu.SelectedIndex)
	    myFromStrokeWeight = myFromStrokeWeightField.EditValue
	    myToStrokeWeight = myToStrokeWeightField.EditValue
	    myFromStrokeTint = myFromStrokeTintField.EditValue
	    myToStrokeTint = myToStrokeTintField.EditValue
	    myLayerName = myLayerNamesList(myLayersMenu.SelectedIndex)
	    myDialog.Destroy
	    myNeon myInDesign, myObjectList, myNumberOfSteps, myFromStrokeColor, myFromStrokeWeight, myToStrokeWeight, myFromStrokeTint, myToStrokeTint, myLayerName
	Else
	    myDialog.Destroy
	End If
End Function
Function myNeon(myInDesign, myObjectList, myNumberOfSteps, myFromStrokeColor, myFromStrokeWeight, myToStrokeWeight, myFromStrokeTint, myToStrokeTint, myLayerName)
	Set myDocument = myInDesign.ActiveDocument
	If myLayerName = "New Layer" Then
	    Set myLayer = myDocument.Layers.Add
	Else
	    Set myLayer = myDocument.Layers.Item(myLayerName)
	End If
	myTintIncrement = (myFromStrokeTint - myToStrokeTint) / myNumberOfSteps
	myStrokeIncrement = (myFromStrokeWeight - myToStrokeWeight) / myNumberOfSteps
	For myObjectCounter = 0 To UBound(myObjectList)
	    ReDim myNeonItems(0)
	    Set myObject = myObjectList(myObjectCounter)
	    Rem Apply the "From" properties to the original object.
	    myObject.StrokeWeight = myFromStrokeWeight
	    myObject.StrokeColor = myDocument.Swatches.Item(myFromStrokeColor)
	    myObject.StrokeTint = myFromStrokeTint
	    If myObject.StrokeTint = -1 Then
	        myStrokeTint = 100
	    Else
	        myStrokeTint = myObject.StrokeTint
	    End If
	    Set myNeonItems(0) = myObject
	    For myCounter = 1 To myNumberOfSteps
	        Set myClone = myObject.Duplicate
	        myClone.BringToFront
	        myClone.StrokeWeight = myObject.StrokeWeight - (myStrokeIncrement * myCounter)
	        myClone.StrokeTint = myStrokeTint - (myTintIncrement * myCounter)
	        ReDim Preserve myNeonItems(UBound(myNeonItems) + 1)
	        Set myNeonItems(UBound(myNeonItems)) = myClone
	    Next
	    Rem Group the blend items.
	    Set myGroup = myInDesign.ActiveWindow.ActiveSpread.Groups.Add(myNeonItems)
	    Rem Assign the group to a layer.
	    myGroup.ItemLayer = myLayer
	Next
End Function
