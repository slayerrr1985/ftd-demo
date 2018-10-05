Rem SelectObjects.vbs
Rem An InDesign VBScript
Rem
Rem This script selects all objects of a given type or types on the active spread.
Rem When you choose one of the imported graphic types, the script will select
Rem the frame containing the graphic (and not the graphic itself).
Rem
Rem This script also demonstrates a (fairly trivial) use of the Scripting Dictionary object.
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
	If myInDesign.Documents.Count > 0 Then
	    If TypeName(myInDesign.ActiveWindow) = "LayoutWindow" Then
	        If myInDesign.ActiveWindow.ActiveSpread.PageItems.Count > 0 Then
	            myDisplayDialog myInDesign
	        End If
	    End If
	End If
End Function
Function myDisplayDialog(myInDesign)
    Set myDialog = myInDesign.Dialogs.Add
    myDialog.Name = "SelectObjects"
    With myDialog
        With .DialogColumns.Add
            With .BorderPanels.Add
                With .StaticTexts.Add
                    .StaticLabel = "Select:"
                End With
                With .DialogColumns.Add
                    Set myRectanglesCheckbox = .CheckboxControls.Add
                    myRectanglesCheckbox.StaticLabel = "&Rectangles"
                    myRectanglesCheckbox.CheckedState = True
                    Set myOvalsCheckbox = .CheckboxControls.Add
                    myOvalsCheckbox.StaticLabel = "&Ovals"
                    myOvalsCheckbox.CheckedState = True
                    Set myPolygonsCheckbox = .CheckboxControls.Add
                    myPolygonsCheckbox.StaticLabel = "&Polygons"
                    myPolygonsCheckbox.CheckedState = True
                    Set myGraphicLinesCheckbox = .CheckboxControls.Add
                    myGraphicLinesCheckbox.StaticLabel = "&Graphic Lines"
                    myGraphicLinesCheckbox.CheckedState = True
                    Set myTextFramesCheckbox = .CheckboxControls.Add
                    myTextFramesCheckbox.StaticLabel = "&Text Frames"
                    myTextFramesCheckbox.CheckedState = True
                    Set myGroupsCheckbox = .CheckboxControls.Add
                    myGroupsCheckbox.StaticLabel = "G&roups"
                    myGroupsCheckbox.CheckedState = True
                    Set myImagesCheckbox = .CheckboxControls.Add
                    myImagesCheckbox.StaticLabel = "&Images"
                    myImagesCheckbox.CheckedState = True
                    Set myPDFsCheckbox = .CheckboxControls.Add
                    myPDFsCheckbox.StaticLabel = "P&DFs"
                    myPDFsCheckbox.CheckedState = True
                    Set myEPSsCheckbox = .CheckboxControls.Add
                    myEPSsCheckbox.StaticLabel = "EP&Ss"
                    myEPSsCheckbox.CheckedState = True
                End With
            End With
        End With
    End With
    myResult = myDialog.Show
    If myResult = True Then
    Set myDictionary = CreateObject("Scripting.Dictionary")
        If myRectanglesCheckbox.CheckedState = True Then
            myDictionary.Add "Rectangle", "Rectangle"
        End If
        If myOvalsCheckbox.CheckedState = True Then
            myDictionary.Add "Oval", "Oval"
        End If
        If myPolygonsCheckbox.CheckedState = True Then
            myDictionary.Add "Polygon", "Polygon"
        End If
        If myGraphicLinesCheckbox.CheckedState = True Then
            myDictionary.Add "GraphicLine", "GraphicLine"
        End If
        If myTextFramesCheckbox.CheckedState = True Then
            myDictionary.Add "TextFrame", "TextFrame"
        End If
        If myGroupsCheckbox.CheckedState = True Then
            myDictionary.Add "Group", "Group"
        End If
        If myImagesCheckbox.CheckedState = True Then
            myDictionary.Add "Image", "Image"
        End If
        If myPDFsCheckbox.CheckedState = True Then
            myDictionary.Add "PDF", "PDF"
        End If
        If myEPSsCheckbox.CheckedState = True Then
            myDictionary.Add "EPS", "EPS"
        End If
        Rem Remove the dialog from memory.
        myDialog.Destroy
        mySelectObjects myInDesign, myDictionary
    Else
        Rem Remove the dialog from memory.
        myDialog.Destroy
    End If
End Function
Function mySelectObjects(myInDesign, myDictionary)
    ReDim myObjectsToSelect(0)
    Set mySpread = myInDesign.ActiveWindow.ActiveSpread
    For myCounter = 1 To mySpread.PageItems.Count
        Set myPageItem = mySpread.PageItems.Item(myCounter)
        If myDictionary.Exists(TypeName(myPageItem)) Then
            If IsEmpty(myObjectsToSelect(0)) Then
                Set myObjectsToSelect(0) = myPageItem
            Else
                ReDim Preserve myObjectsToSelect(UBound(myObjectsToSelect) + 1)
                Set myObjectsToSelect(UBound(myObjectsToSelect)) = myPageItem
            End If
        Else
            If myPageItem.Graphics.Count > 0 Then
                If myDictionary.Exists(TypeName(myPageItem.Graphics.Item(1))) Then
                    If IsEmpty(myObjectsToSelect(0)) Then
                        Set myObjectsToSelect(0) = myPageItem
                    Else
                        ReDim Preserve myObjectsToSelect(UBound(myObjectsToSelect) + 1)
                        Set myObjectsToSelect(UBound(	myObjectsToSelect)) = myPageItem
                    End If
                End If
            End If
        End If
    Next
    myInDesign.ActiveDocument.Select myObjectsToSelect, idSelectionOptions.idReplaceWith
End Function
