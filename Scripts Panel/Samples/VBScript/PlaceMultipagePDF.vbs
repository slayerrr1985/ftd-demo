Rem PlaceMultipagePDF.vbs
Rem An InDesign script
Rem
Rem Places all of the pages of a multi-page PDF.
Rem
main
Function main()
	Set myInDesign = CreateObject("InDesign.Application.CC.2015")
	Rem Set the user interaction level to allow the display of dialog boxes and alerts.
	myInDesign.ScriptPreferences.UserInteractionLevel = idUserInteractionLevels.idInteractWithAll
	Rem Use JavaScript to display a standard Open File dialog box.
	myJavaScript = "myPDFFile = File.openDialog(""Choose a PDF File"");if(myPDFFile != null){myFileName = myPDFFile.fsName}else{myFileName = """"};"
	myFileName = myInDesign.DoScript(myJavaScript, idScriptLanguage.idJavascript)
	If myFileName <> "" Then
	    myNewDocument = True
	    If myInDesign.Documents.Count <> 0 Then
	        Set myDocument = myChooseDocument(myInDesign, myNewDocument)
	    Else
	        Set myDocument = myInDesign.Documents.Add
	    End If
	    If myNewDocument = False Then
	        Set myPage = myChoosePage(myInDesign, myDocument)
	    Else
	        Set myPage = myDocument.Pages.Item(1)
	    End If
	    myPlacePDF myInDesign, myDocument, myPage, myFileName
	End If
End function
Function myChooseDocument(myInDesign, myNewDocument)
    ReDim myDocumentNames(0)
    myDocumentNames(0) = "New Document"
    Rem Get the names of the documents
    For myDocumentCounter = 1 To myInDesign.Documents.Count
        ReDim Preserve myDocumentNames(UBound(myDocumentNames) + 1)
        myDocumentNames(myDocumentCounter) = myInDesign.Documents.Item(myDocumentCounter).Name
    Next
    Set myChooseDocumentDialog = myInDesign.Dialogs.Add
    myChooseDocumentDialog.Name = "Choose a Document"
    myChooseDocumentDialog.CanCancel = False
    With myChooseDocumentDialog.DialogColumns.Add
        With .DialogRows.Add
            With .DialogColumns.Add
                With .StaticTexts.Add
                    .StaticLabel = "Place PDF in:"
                End With
            End With
            With .DialogColumns.Add
                Set myChooseDocumentDropdown = .Dropdowns.Add
                myChooseDocumentDropdown.StringList = myDocumentNames
                myChooseDocumentDropdown.SelectedIndex = 0
            End With
        End With
    End With
    myChooseDocumentDialog.Show
    If myChooseDocumentDropdown.SelectedIndex = 0 Then
        Set myDocument = myInDesign.Documents.Add
    Else
        Set myDocument = myInDesign.Documents.Item(myChooseDocumentDropdown.SelectedIndex)
        myNewDocument = False
    End If
    myChooseDocumentDialog.Destroy
    Set myChooseDocument = myDocument
End Function
Function myChoosePage(myInDesign, myDocument)
    ReDim myPageNames(0)
    Rem Get the names of the pages in the document
    For myCounter = 1 To myDocument.Pages.Count
        If Not (IsEmpty(myPageNames(0))) Then
            ReDim Preserve myPageNames(UBound(myPageNames) + 1)
        End If
        myPageNames(myCounter - 1) = myDocument.Pages.Item(myCounter).Name
    Next
    Set myChoosePageDialog = myInDesign.Dialogs.Add
    myChoosePageDialog.Name = "Choose a Page"
    myChoosePageDialog.CanCancel = False
    With myChoosePageDialog.DialogColumns.Add
        With .DialogRows.Add
            With .DialogColumns.Add
                With .StaticTexts.Add
                    .StaticLabel = "Place PDF on:"
                End With
            End With
            With .DialogColumns.Add
                Set myChoosePageDropdown = .Dropdowns.Add
                myChoosePageDropdown.StringList = myPageNames
                myChoosePageDropdown.SelectedIndex = 0
            End With
        End With
    End With
    myChoosePageDialog.Show
    Set myPage = myDocument.Pages.Item(myChoosePageDropdown.SelectedIndex + 1)
    myChoosePageDialog.Destroy
    Set myChoosePage = myPage
End Function
Function myPlacePDF(myInDesign, myDocument, myPage, myFileName)
    myInDesign.PDFPlacePreferences.PDFCrop = idPDFCrop.idCropMedia
    myCounter = 1
    myBreak = False
    Do While myBreak = False
        If myCounter > 1 Then
            myDocument.Pages.Add
        End If
        myInDesign.PDFPlacePreferences.PageNumber = myCounter
        Set myPDFPage = myDocument.Pages.Item(-1).Place(myFileName, Array(0, 0))
      	Set myPDFPage = myPDFPage.Item(1)
        If myCounter = 1 Then
            myFirstPage = myPDFPage.PDFAttributes.PageNumber
        Else
            If myPDFPage.PDFAttributes.PageNumber = myFirstPage Then
                myDocument.Pages.Item(-1).Delete
                myBreak = True
            End If
        End If
        myCounter = myCounter + 1
    Loop
End Function