Rem CreateCharacterStyle.vbs
Rem An InDesign VBScript
Rem
Rem Creates a complete character style based on the first insertion point of the selected text.
Rem When you create a character style "by example" using InDesign's user interface, only those
Rem formatting attributes of the selection which differ from the underlying formatting are
Rem defined in the character style. While this makes InDesign's character styles very flexible, it
Rem differs from the way that other applications define character styles. By defining every attribute,
Rem this script creates character styles that more closely resemble those found in other applications.
Rem
Rem For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
Rem available at http://www.adobe.com/devnet/indesign/sdk.html
Rem or visit the InDesign Scirpting User to User forum as http://www.adobeforums.com.
Rem
main
Function main()
	Set myInDesign = CreateObject("InDesign.Application.CC.2015")
	Rem Set the user interaction level to allow the display of dialog boxes and alerts.
	myInDesign.ScriptPreferences.UserInteractionLevel = idUserInteractionLevels.idInteractWithAll
	If myInDesign.Documents.Count <> 0 Then
	    If myInDesign.Selection.Count = 1 Then
	        Select Case TypeName(myInDesign.Selection.Item(1))
		    Case "InsertionPoint"
	                Set myInsertionPoint = myInDesign.Selection.Item(1)
	                myDisplayDialog myInDesign, myInsertionPoint
		    Case "Character", "Word", "TextStyleRange", "Line", "Paragraph", "TextColumn", "Text", "TextFrame"
	                Set myInsertionPoint = myInDesign.Selection.Item(1).InsertionPoints.Item(1)
	                myDisplayDialog myInDesign, myInsertionPoint
	            Case Else
	                MsgBox "The selected object is not a text object. Select some text and try again."
	        End Select
	    Else
	         MsgBox "Please select some text and try again."
	    End If
	Else
	    MsgBox "No documents are open. Please open a document, select some text, and try again."
	End If
End Function
Rem Display a dialog box.
Function myDisplayDialog(myInDesign, myInsertionPoint)
    Set myDialog = myInDesign.Dialogs.Add
    myDialog.Name = "CreateCharacterStyle"
    With myDialog.DialogColumns.Add
        With .BorderPanels.Add
            With .StaticTexts.Add
                .StaticLabel = "Character Style Name:"
            End With
            With .DialogColumns.Add
                Set myCharacterStyleNameField = .TextEditboxes.Add
                myCharacterStyleNameField.EditContents = "myNewCharacterStyle"
            End With
        End With
    End With
    myResult = myDialog.Show
    If myResult = True Then
        myCharacterStyleName = myCharacterStyleNameField.EditContents
        myDialog.Destroy
        myDefineCharacterStyle myInDesign, myInsertionPoint, myCharacterStyleName
    Else
       myDialog.Destroy
    End If
End Function
Function myDefineCharacterStyle(myInDesign, myInsertionPoint, myCharacterStyleName)
    Set myDocument = myInDesign.ActiveDocument
    Rem Create the character style if it does not already exist. If the character style
    Rem already exists, it will be redefined based on the current selection.
    Err.Clear
    On Error Resume Next
    Set myCharacterStyle = myDocument.CharacterStyles.Item(myCharacterStyleName)
    If Err.Number <> 0 Then
        Set myCharacterStyle = myDocument.CharacterStyles.Add
        myCharacterStyle.Name = myCharacterStyleName
        Err.Clear
    End If
    On Error Goto 0
    myCharacterStyle.AppliedFont = myInsertionPoint.AppliedFont
    myCharacterStyle.FontStyle = myInsertionPoint.FontStyle
    myCharacterStyle.PointSize = myInsertionPoint.PointSize
    myCharacterStyle.Leading = myInsertionPoint.Leading
    myCharacterStyle.AppliedLanguage = myInsertionPoint.AppliedLanguage
    myCharacterStyle.KerningMethod = myInsertionPoint.KerningMethod
    myCharacterStyle.Tracking = myInsertionPoint.Tracking
    myCharacterStyle.Capitalization = myInsertionPoint.Capitalization
    myCharacterStyle.Position = myInsertionPoint.Position
    myCharacterStyle.Ligatures = myInsertionPoint.Ligatures
    myCharacterStyle.NoBreak = myInsertionPoint.NoBreak
    myCharacterStyle.HorizontalScale = myInsertionPoint.HorizontalScale
    myCharacterStyle.VerticalScale = myInsertionPoint.VerticalScale
    myCharacterStyle.BaselineShift = myInsertionPoint.BaselineShift
    myCharacterStyle.Skew = myInsertionPoint.Skew
    myCharacterStyle.FillColor = myInsertionPoint.FillColor
    myCharacterStyle.FillTint = myInsertionPoint.FillTint
    myCharacterStyle.StrokeTint = myInsertionPoint.StrokeTint
    myCharacterStyle.StrokeWeight = myInsertionPoint.StrokeWeight
    myCharacterStyle.OverprintStroke = myInsertionPoint.OverprintStroke
    myCharacterStyle.OverprintFill = myInsertionPoint.OverprintFill
    myCharacterStyle.OTFFigureStyle = myInsertionPoint.OTFFigureStyle
    myCharacterStyle.OTFOrdinal = myInsertionPoint.OTFOrdinal
    myCharacterStyle.OTFFraction = myInsertionPoint.OTFFraction
    myCharacterStyle.OTFDiscretionaryLigature = myInsertionPoint.OTFDiscretionaryLigature
    myCharacterStyle.OTFTitling = myInsertionPoint.OTFTitling
    myCharacterStyle.OTFContextualAlternate = myInsertionPoint.OTFContextualAlternate
    myCharacterStyle.OTFSwash = myInsertionPoint.OTFSwash
    myCharacterStyle.OTFSlashedZero = myInsertionPoint.OTFSlashedZero
    myCharacterStyle.OTFHistorical = myInsertionPoint.OTFHistorical
    myCharacterStyle.OTFStylisticSets = myInsertionPoint.OTFStylisticSets
    myCharacterStyle.StrikeThru = myInsertionPoint.StrikeThru
    If myInsertionPoint.StrikeThru = True Then
        myCharacterStyle.StrikeThroughColor = myInsertionPoint.StrikeThroughColor
        myCharacterStyle.StrikeThroughGapColor = myInsertionPoint.StrikeThroughGapColor
        myCharacterStyle.StrikeThroughGapOverprint = myInsertionPoint.StrikeThroughGapOverprint
        myCharacterStyle.StrikeThroughGapTint = myInsertionPoint.StrikeThroughGapTint
        myCharacterStyle.StrikeThroughOffset = myInsertionPoint.StrikeThroughOffset
        myCharacterStyle.StrikeThroughOverprint = myInsertionPoint.StrikeThroughOverprint
        myCharacterStyle.StrikeThroughTint = myInsertionPoint.StrikeThroughTint
        myCharacterStyle.StrikeThroughType = myInsertionPoint.StrikeThroughType
        myCharacterStyle.StrikeThroughWeight = myInsertionPoint.StrikeThroughWeight
    End If
    myCharacterStyle.StrokeColor = myInsertionPoint.StrokeColor
    myCharacterStyle.StrokeTint = myInsertionPoint.StrokeTint
    myCharacterStyle.StrokeWeight = myInsertionPoint.StrokeWeight
    myCharacterStyle.Tracking = myInsertionPoint.Tracking
    myCharacterStyle.Underline = myInsertionPoint.Underline
    If myInsertionPoint.Underline = True Then
        myCharacterStyle.UnderlineColor = myInsertionPoint.UnderlineColor
        myCharacterStyle.UnderlineGapColor = myInsertionPoint.UnderlineGapColor
        myCharacterStyle.UnderlineGapOverprint = myInsertionPoint.UnderlineGapOverprint
        myCharacterStyle.UnderlineGapTint = myInsertionPoint.UnderlineGapTint
            myCharacterStyle.UnderlineOffset = myInsertionPoint.UnderlineOffset
        myCharacterStyle.UnderlineOverprint = myInsertionPoint.UnderlineOverprint
        myCharacterStyle.UnderlineTint = myInsertionPoint.UnderlineTint
        myCharacterStyle.UnderlineType = myInsertionPoint.UnderlineType
        myCharacterStyle.UnderlineWeight = myInsertionPoint.UnderlineWeight
    End If
    myCharacterStyle.VerticalScale = myInsertionPoint.VerticalScale
End Function
