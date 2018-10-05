Rem ImageCatalog.vbs
Rem An InDesign VBScript
Rem
Rem Creates an image catalog from the graphic files in a selected folder.
Rem Each file can be labeled with the file name, and the labels are placed on
Rem a separate layer and formatted using a paragraph style ("label") you can
Rem modify to change the appearance of the labels.
Rem
Rem For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
Rem available at http://www.adobe.com/devnet/indesign/sdk.html
Rem Or visit the InDesign Scripting User to User forum at http://www.adobeforums.com .
Rem
Rem The myExtensions array contains the extensions of the graphic file types you want
Rem to include in the catalog. You can remove extensions from or add extensions to this list.
myExtensions = Array(".jpg", ".jpeg", ".eps", ".ps", ".pdf", ".tif", ".tiff", ".gif", ".psd", ".ai")
main
Function main()
	ReDim myFileList(0)
	Set myInDesign = CreateObject("InDesign.Application.CC.2015")
	Rem Set the user interaction level to allow the display of dialog boxes and alerts.
	myInDesign.ScriptPreferences.UserInteractionLevel = idUserInteractionLevels.idInteractWithAll	
	Set myFileSystemObject = CreateObject("Scripting.FileSystemObject")
	Rem Creating a folder browser in VBScript can be a problem (relying on either Windows API calls
	Rem or use of ActiveX controls which may not be present on a given system). Instead, we'll use
	Rem InDesign's built-in JavaScript to display a file browser. DoScript can return a value;
	Rem in this example, it's the name of the folder.
	myJavaScript = "myFolder = Folder.selectDialog(""Choose a Folder""); myFolderName = myFolder.fsName;"
	Rem The following line shows how to return a value from a script called with the DoScript method.
	myFolderName = myInDesign.doScript(myJavaScript, idScriptLanguage.idJavascript)
	If myFileSystemObject.FolderExists(myFolderName) Then
		Set myFolder = myFileSystemObject.GetFolder(myFolderName)
		For Each File In myFolder.Files
			myFilePath = File.Path
			If myCheckFileType(myFilePath, myExtensions) = True Then
				Rem Add the file to the list of files to be placed.
				If Not (IsEmpty(myFileList(0))) Then
					ReDim Preserve myFileList(UBound(myFileList) + 1)
				End If
				myFileList(UBound(myFileList)) = myFilePath
			End If
		Next
		If Not (IsEmpty(myFileList(0))) Then
			myDisplayDialog myInDesign, myFileList, myFolderName
		Else
			MsgBox "No files found to place in the specified folder."
		End If
	End If
End Function
Function myDisplayDialog(myInDesign, myFileList, myFolderName)
    myLabelWidth = 130
    Set myDialog = myInDesign.dialogs.Add
    myDialog.Name = "Image Catalog"
    myStyleNames = myGetStyleNames(myInDesign)
    myLabelTypes = Array("File Name", "File Path", "XMP Description", "XMP Author")
    myLayerNames = Array("Layer 1", "Labels")
    With myDialog.DialogColumns.Add
        With .DialogRows.Add
            With .DialogColumns.Add
                With .StaticTexts.Add
                    .staticLabel = "Information"
                End With
            End With
        End With
        With .BorderPanels.Add
            With .DialogColumns.Add
                With .DialogRows.Add
                    With .StaticTexts.Add
                        .staticLabel = "Source Folder:"
                        .MinWidth = myLabelWidth
                    End With
                    With .StaticTexts.Add
                        .staticLabel = myFolderName
                    End With
                End With
                With .DialogRows.Add
                    With .StaticTexts.Add
                        .staticLabel = "Number of Images:"
                        .MinWidth = myLabelWidth
                    End With
                    With .StaticTexts.Add
                        .staticLabel = CStr(UBound(myFileList)+1)
                    End With
                End With
            End With
        End With
        With .DialogRows.Add
            With .StaticTexts.Add
                .staticLabel = "Options"
            End With
        End With
        With .BorderPanels.Add
            With .DialogColumns.Add
                With .DialogRows.Add
                    With .StaticTexts.Add
                        .staticLabel = "Number of Rows:"
                        .MinWidth = myLabelWidth
                    End With
                    Set myNumberOfRowsField = .integerEditboxes.Add
                    myNumberOfRowsField.editValue = 3
                End With
                With .DialogRows.Add
                    With .StaticTexts.Add
                        .staticLabel = "Number of Columns:"
                        .MinWidth = myLabelWidth
                    End With
                    Set myNumberOfColumnsField = .integerEditboxes.Add
                    myNumberOfColumnsField.editValue = 3
                End With
                With .DialogRows.Add
                    With .StaticTexts.Add
                        .staticLabel = "Horizontal Offset:"
                        .MinWidth = myLabelWidth
                    End With
                    Set myHorizontalOffsetField = .measurementEditboxes.Add
                    myHorizontalOffsetField.editValue = 12
                    myHorizontalOffsetField.EditUnits = idMeasurementUnits.idPoints
                End With
                With .DialogRows.Add
                    With .StaticTexts.Add
                        .staticLabel = "Vertical Offset:"
                        .MinWidth = myLabelWidth
                    End With
                    Set myVerticalOffsetField = .measurementEditboxes.Add
                    myVerticalOffsetField.editValue = 12
                    myVerticalOffsetField.EditUnits = idMeasurementUnits.idPoints
                End With
                With .DialogRows.Add
                    With .DialogColumns.Add
                        With .StaticTexts.Add
                            .staticLabel = "Fitting:"
                            .MinWidth = myLabelWidth
                        End With
                    End With
                    With .DialogColumns.Add
                        Set myFitProportionalCheckbox = .checkboxControls.Add
                        myFitProportionalCheckbox.staticLabel = "Proportional"
                        myFitProportionalCheckbox.checkedState = True
                        Set myFitCenterContentCheckbox = .checkboxControls.Add
                        myFitCenterContentCheckbox.staticLabel = "Center Content"
                        myFitCenterContentCheckbox.checkedState = True
                        Set myFitFrameToContentCheckbox = .checkboxControls.Add
                        myFitFrameToContentCheckbox.staticLabel = "Frame to Content"
                        myFitFrameToContentCheckbox.checkedState = True
                    End With
                End With
                With .DialogRows.Add
                    Set myRemoveEmptyFramesCheckbox = .checkboxControls.Add
                    myRemoveEmptyFramesCheckbox.staticLabel = "Remove Empty Frames"
                    myRemoveEmptyFramesCheckbox.checkedState = True
                End With
			End With
		End With
		Rem "Spacer" line to separate Labels group from the border.
		With .StaticTexts.Add
			.StaticLabel = ""
		End With
        Set myLabelsGroup = .EnablingGroups.Add
        With myLabelsGroup
        	.StaticLabel = "Labels"
        	.CheckedState = True
        	With .DialogColumns.Add
        		Rem Label type dropdown and associated static text.
        		With .DialogRows.Add
        			With .DialogColumns.Add
        				With .StaticTexts.Add
        					.StaticLabel = "Label Type:"
        					.MinWidth = myLabelWidth
        				End With
        			End With
        			With .DialogColumns.Add
        				Set myLabelTypeDropdown = .Dropdowns.Add
        				With myLabelTypeDropdown
        					.StringList = myLabelTypes
        					.SelectedIndex = 0
        				End With
        			End With
        		End With
        		Rem Label text frame height and associated static text.
        		With .DialogRows.Add
        			With .DialogColumns.Add
        				With .StaticTexts.Add
        					.StaticLabel = "Label Height:"
        					.MinWidth = myLabelWidth
        				End With
        			End With
        			With .DialogColumns.Add
        				Set myLabelHeightField = .MeasurementEditboxes.Add
        				With myLabelHeightField
        					.EditValue = 24
        					.EditUnits = idMeasurementUnits.idPoints
        				End With
        			End With
        		End With
        		Rem Label text frame offset and associated static text.
        		With .DialogRows.Add
        			With .DialogColumns.Add
        				With .StaticTexts.Add
        					.StaticLabel = "Label Offset:"
        					.MinWidth = myLabelWidth
        				End With
        			End With
        			With .DialogColumns.Add
        				Set myLabelOffsetField = .MeasurementEditboxes.Add
        				With myLabelOffsetField
        					.EditValue = 0
        					.EditUnits = idMeasurementUnits.idPoints
        				End With
        			End With
        		End With
        		Rem Label paragraph style and associated static text.
        		With .DialogRows.Add
        			With .DialogColumns.Add
        				With .StaticTexts.Add
        					.StaticLabel = "Label Style:"
        					.MinWidth = myLabelWidth
        				End With
        			End With
        			With .DialogColumns.Add
        				Set myLabelStyleDropdown = .Dropdowns.Add
        				With myLabelStyleDropdown
        					.StringList = myStyleNames
        					.SelectedIndex = 0
        				End With
        			End With
        		End With
        		Rem Label layer and associated static text.
        		With .DialogRows.Add
        			With .DialogColumns.Add
        				With .StaticTexts.Add
        					.StaticLabel = "Label Layer:"
        					.MinWidth = myLabelWidth
        				End With
        			End With
        			With .DialogColumns.Add
        				Set myLabelLayerDropdown = .Dropdowns.Add
        				With myLabelLayerDropdown
        					.StringList = myLayerNames
        					.SelectedIndex = 0
        				End With
        			End With
        		End With
        	End With
		End With
    End With
    myResult = myDialog.Show
    If myResult = True Then
        myNumberOfRows = myNumberOfRowsField.editValue
        myNumberOfColumns = myNumberOfColumnsField.editValue
        myRemoveEmptyFrames = myRemoveEmptyFramesCheckbox.checkedState
        myFitProportional = myFitProportionalCheckbox.checkedState
        myFitCenterContent = myFitCenterContentCheckbox.checkedState
        myFitFrameToContent = myFitFrameToContentCheckbox.checkedState
        myHorizontalOffset = myHorizontalOffsetField.editValue
        myVerticalOffset = myVerticalOffsetField.editValue
        Rem Label options.
        myMakeLabels = myLabelsGroup.CheckedState
        myLabelHeight = myLabelHeightField.EditValue
        myLabelOffset = myLabelOffsetField.EditValue
        myLabelType = myLabelTypes(myLabelTypeDropdown.SelectedIndex)
        myLabelStyleName = myStyleNames(myLabelStyleDropdown.SelectedIndex)
        myLabelLayerName = myLayerNames(myLabelLayerDropdown.SelectedIndex)
        myDialog.destroy
        myMakeImageCatalog myInDesign, myFileList, myNumberOfRows, myNumberOfColumns, myRemoveEmptyFrames, myFitProportional, myFitCenterContent, myFitFrameToContent, myHorizontalOffset, myVerticalOffset, myMakeLabels, myLabelHeight, myLabelOffset, myLabelType, myLabelStyleName, myLabelLayerName
        MsgBox "Done!"
    Else
        myDialog.destroy
    End If
End Function
Function myMakeImageCatalog(myInDesign, myFileList, myNumberOfRows, myNumberOfColumns, myRemoveEmptyFrames, myFitProportional, myFitCenterContent, myFitFrameToContent, myHorizontalOffset, myVerticalOffset, myMakeLabels, myLabelHeight, myLabelOffset, myLabelType, myLabelStyleName, myLabelLayerName)
    Set myFileSystemObject = CreateObject("Scripting.FileSystemObject")
    Set myDocument = myInDesign.documents.Add
    myDocument.viewPreferences.horizontalMeasurementUnits = idMeasurementUnits.idPoints
    myDocument.viewPreferences.verticalMeasurementUnits = idMeasurementUnits.idPoints
    Set myDocumentPreferences = myDocument.documentPreferences
    myFramesPerPage = myNumberOfRows * myNumberOfColumns
    myNumberOfFrames = UBound(myFileList)+1
    myNumberOfPages = Round(myNumberOfFrames / myFramesPerPage)
    If (myNumberOfPages * myFramesPerPage) < myNumberOfFrames Then
        myNumberOfPages = myNumberOfPages + 1
    End If
    myDocumentPreferences.pagesPerDocument = CInt(myNumberOfPages)
    myDocumentPreferences.facingPages = False
    Set myPage = myDocument.Pages.Item(1)
    Set myMarginPreferences = myPage.marginPreferences
    myLeftMargin = myMarginPreferences.Left
    myTopMargin = myMarginPreferences.Top
    myRightMargin = myMarginPreferences.Right
    myBottomMargin = myMarginPreferences.bottom
    myLiveWidth = (myDocumentPreferences.pageWidth - (myLeftMargin + myRightMargin)) + myHorizontalOffset
    myLiveHeight = myDocumentPreferences.pageHeight - (myTopMargin + myBottomMargin)
    myColumnWidth = myLiveWidth / myNumberOfColumns
    myFrameWidth = myColumnWidth - myHorizontalOffset
    myRowHeight = myLiveHeight / myNumberOfRows
    myFrameHeight = myRowHeight - myVerticalOffset
    Set myPages = myDocument.Pages
    If myMakeLabels = True Then
        Rem Create the label paragraph style if it does not already exist.
        Err.Clear
        On Error Resume Next
        Set myLabelStyle = myDocument.paragraphStyles.Item(myLabelStyleName)
        If Err.Number <> 0 Then
            Set myLabelStyle = myDocument.paragraphStyles.Add
            myLabelStyle.Name = myLabelStyleName
            Err.Clear
        End If
        On Error GoTo 0
        Rem Create the label layer if it does not already exist.
        Err.Clear
        On Error Resume Next
        Set myLabelLayer = myDocument.layers.Item(myLabelLayerName)
        If Err.Number <> 0 Then
            Set myLabelLayer = myDocument.layers.Add
            myLabelLayer.Name = myLabelLayerName
            Err.Clear
        End If
        On Error GoTo 0
    End If
    Rem Construct the frames in reverse order. Don't laugh--this will
    Rem save us time later (when we place the graphics).
    For myCounter = myDocument.Pages.Count To 1 Step -1
        Set myPage = myPages.Item(CInt(myCounter))
        For myRowCounter = myNumberOfRows To 1 Step -1
            myY1 = myTopMargin + (myRowHeight * (myRowCounter - 1))
            myY2 = myY1 + myFrameHeight
            For myColumnCounter = myNumberOfColumns To 1 Step -1
                myX1 = myLeftMargin + (myColumnWidth * (myColumnCounter - 1))
                myX2 = myX1 + myFrameWidth
                Set myRectangle = myPage.Rectangles.Add
                myRectangle.GeometricBounds = Array(myY1, myX1, myY2, myX2)
                myRectangle.strokeWeight = 0
                myRectangle.strokeColor = myDocument.Swatches.Item("None")
            Next
        Next
    Next
    Rem Because we constructed the frames in reverse order, rectangle 1
    Rem is the first rectangle on page 1, so we can simply iterate through
    Rem the rectangles, placing a file in each one in turn. myFiles = myFolder.Files;
    For myCounter = 1 To myNumberOfFrames
        myFile = myFileList(myCounter-1)
        Set myRectangle = myDocument.Rectangles.Item(myCounter)
        myRectangle.place myFile
        myRectangle.Label
        Rem Apply fitting options as specified.
        If myFitProportional Then
            myRectangle.fit idFitOptions.idProportionally
        End If
        If myFitCenterContent Then
            myRectangle.fit idFitOptions.idCenterContent
        End If
        If myFitFrameToContent Then
            myRectangle.fit idFitOptions.idFrameToContent
        End If
        Rem Add the label, if necessary.
        If myMakeLabels = True Then
        	Set myRegExp = New RegExp
			myRegExp.Pattern = "^\s*$"
			myRegExp.IgnoreCase = True
			myX1 = myRectangle.GeometricBounds(1)
			myY1 = myRectangle.GeometricBounds(2) + myLabelOffset
			myX2 = myRectangle.GeometricBounds(3)
			myY2 = myY1 + myLabelHeight
			Select Case myLabelType
				Case "File Name":
					myString = myFileSystemObject.GetFileName(myFile)
				Case "File Path":
					myString = myFileSystemObject.GetAbsolutePathName(myFile)
				Case "XMP Author":
					On Error Resume Next
						myString = myLink.LinkXmp.Author
						If myRegExp.Replace(myString, "") = "" Then
							Error
						End If
					If Err.Number <> 0 Then
						myString = "No author available."
						Err.Clear
					End If
					On Error Goto 0
				Case "XMP Description":
					On Error Resume Next
						myString = myLink.LinkXmp.Description
						If myRegExp.Replace(myString, "") = "" Then
							Error
						End If
					If Err.Number <> 0 Then
						myString = "No description available."
						Err.Clear
					End If
					On Error Goto 0
			End Select
			Set myTextFrame = myRectangle.Parent.textFrames.Add
			myTextFrame.ItemLayer = myLabelLayer
			myTextFrame.GeometricBounds = Array(myY1, myX1, myY2, myX2)
			myTextFrame.Contents = myString
			myTextFrame.textFramePreferences.firstBaselineOffset = idFirstBaseline.idLeadingOffset
			myTextFrame.ParentStory.Texts.Item(1).appliedParagraphStyle = myLabelStyle
        End If
    Next
    If myRemoveEmptyFrames = True Then
		For myCounter = myDocument.Rectangles.Count To 1 Step -1
			If myDocument.Rectangles.Item(myCounter).contentType = idContentType.idUnassigned Then
				myDocument.Rectangles.Item(myCounter).Delete
			Else
				Rem As soon as you encounter a rectangle with content, exit the loop.
				Exit For
			End If
		Next
    End If
End Function
Function myCheckFileType(myFilePath, myExtensions)
	myFilePath = LCase(myFilePath)
    For Each myExtension In myExtensions
        If InStr(myFilePath, myExtension) <> 0 Then
            myCheckFileType = True
            Exit Function
        End If
    Next
    myCheckFileType = False
End Function
Rem Return an array of paragraph style names.
Function myGetStyleNames(myInDesign)
	myAddLabelStyle = True
	ReDim myStyleNames(0)
	For myCounter = 1 To myInDesign.ParagraphStyles.Count
		If Not (IsEmpty(myStyleNames(0))) Then
	    	ReDim Preserve myStyleNames(UBound(myStyleNames) + 1)
	    End If
		myStyleNames(UBound(myStyleNames)) = myInDesign.ParagraphStyles.Item(myCounter).Name
		If myInDesign.ParagraphStyles.Item(myCounter).Name = "Labels" Then
			myAddLabelStyle = False
		End If
	Next
	If myAddLabelStyle = True Then
		ReDim Preserve myStyleNames(UBound(myStyleNames)+1)
		myStyleNames(UBound(myStyleNames)) = "Labels"		
	End If
	myGetStyleNames = myStyleNames
End Function