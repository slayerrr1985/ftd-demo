Rem AdjustLayout.vbs
Rem An InDesign VBScript
Rem
Rem Moves the content of even/odd pages by specified amounts; attempts to get
Rem objects back into the correct position after a master page margin change
Rem and/or page insertion.
Rem
Rem For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
Rem available at http://www.adobe.com/devnet/indesign/sdk.html
Rem Or visit the InDesign Scripting User to User forum at http://www.adobeforums.com.
Rem
main
Function main()
	Set myInDesign = CreateObject("InDesign.Application.CC.2015")
	Rem Set the user interaction level to allow the display of dialog boxes and alerts.
	myInDesign.ScriptPreferences.UserInteractionLevel = idUserInteractionLevels.idInteractWithAll	
	If myInDesign.Documents.Count <> 0 Then
	    If myInDesign.ActiveDocument.PageItems.Count <> 0 Then
	        myDisplayDialog myInDesign
	    End If
	End If
End Function
Function myDisplayDialog(myInDesign)
    myLabelWidth = 70
    Set myDialog = myInDesign.Dialogs.Add
    myDialog.name = "Adjust Layout"
    myPageNames = myGetPageNames(myInDesign.ActiveDocument)
    With myDialog.DialogColumns.Add
        With .BorderPanels.Add
            With .DialogColumns.Add
                With .DialogRows.Add
                    With .DialogColumns.Add
                        With .StaticTexts.Add
                            .staticLabel = "Start Page:"
                            .MinWidth = myLabelWidth
                        End With
                    End With
                    With .DialogColumns.Add
                        Set myStartPageDropdown = .Dropdowns.Add
                        With myStartPageDropdown
                            .StringList = myPageNames
                            .selectedIndex = 0
                        End With
                    End With
                End With
                With .DialogRows.Add
                    With .DialogColumns.Add
                        With .StaticTexts.Add
                            .staticLabel = "End Page:"
                            .MinWidth = myLabelWidth
                        End With
                    End With
                    With .DialogColumns.Add
                        Set myEndPageDropdown = .Dropdowns.Add
                        With myEndPageDropdown
                            .StringList = myPageNames
                            .selectedIndex = UBound(myPageNames)
                        End With
                    End With
                End With
            End With
        End With
        With .BorderPanels.Add
            With .DialogColumns.Add
                With .DialogRows.Add
                    With .DialogColumns.Add
                        With .StaticTexts.Add
                            .staticLabel = "Even Pages"
                            .MinWidth = myLabelWidth
                        End With
                        With .StaticTexts.Add
                            .staticLabel = "Horizontal"
                            .MinWidth = myLabelWidth
                        End With
                        With .StaticTexts.Add
                            .staticLabel = "Vertical"
                            .MinWidth = myLabelWidth
                        End With
                    End With
                    With .DialogColumns.Add
                        With .StaticTexts.Add
                            .staticLabel = ""
                        End With
                        Set myEvenXField = .MeasurementEditboxes.Add
                        With myEvenXField
                            .editValue = -12
                            .EditUnits = idMeasurementUnits.idPoints
                        End With
                        Set myEvenYField = .MeasurementEditboxes.Add
                        With myEvenYField
                            .editValue = 12
                            .EditUnits = idMeasurementUnits.idPoints
                        End With
                    End With
                End With
            End With
        End With
        With .BorderPanels.Add
            With .DialogColumns.Add
                With .DialogRows.Add
                    With .DialogColumns.Add
                        With .StaticTexts.Add
                            .staticLabel = "Odd Pages"
                            .MinWidth = myLabelWidth
                        End With
                        With .StaticTexts.Add
                            .staticLabel = "Horizontal:"
                            .MinWidth = myLabelWidth
                        End With
                        With .StaticTexts.Add
                            .staticLabel = "Vertical:"
                            .MinWidth = myLabelWidth
                        End With
                    End With
                    With .DialogColumns.Add
                        With .StaticTexts.Add
                            .staticLabel = ""
                        End With
                        Set myOddXField = .MeasurementEditboxes.Add
                        With myOddXField
                            .editValue = 12
                            .EditUnits = idMeasurementUnits.idPoints
                        End With
                        Set myOddYField = .MeasurementEditboxes.Add
                        With myOddYField
                            .editValue = 12
                            .EditUnits = idMeasurementUnits.idPoints
                        End With
                    End With
                End With
            End With
        End With
    End With
    myResult = myDialog.Show
    If myResult = True Then
        myStartPageName = myPageNames(myStartPageDropdown.selectedIndex)
        myEndPageName = myPageNames(myEndPageDropdown.selectedIndex)
        If myCheckPageRange(myInDesign, myStartPageName, myEndPageName) = True Then
            myEvenX = myEvenXField.editValue
            myEvenY = myEvenYField.editValue
            myOddX = myOddXField.editValue
            myOddY = myOddYField.editValue
            myDialog.Destroy
            myAdjustPages myInDesign, myEvenX, myEvenY, myOddX, myOddY, myStartPageName, myEndPageName
        Else
            myDialog.Destroy
            MsgBox "Invalid page range."
        End If
    Else
        myDialog.Destroy
    End If
End Function
Function myCheckPageStart(myDocument)
    Set mySection = myDocument.Sections.Item(1)
    If mySection.ContinueNumbering = True Then
        Rem Starting page number is defined by other documents in the book
        myCheckPageStart = True
    End If
    If mySection.PageNumberStart Mod 2 = 0 Then
        Rem Starting page number is an even page.
        myCheckPageStart = False
    Else
        Rem Starting page number is an odd page.
        myCheckPageStart = True
    End If
End Function
Function myAdjustPages(myInDesign, myEvenX, myEvenY, myOddX, myOddY, myStartPageName, myEndPageName)
    myOldXUnits = myInDesign.ActiveDocument.ViewPreferences.HorizontalMeasurementUnits
    myOldYUnits = myInDesign.ActiveDocument.ViewPreferences.VerticalMeasurementUnits
    Rem Set the measurement units to points.
    myInDesign.ActiveDocument.ViewPreferences.HorizontalMeasurementUnits = idMeasurementUnits.idPoints
    myInDesign.ActiveDocument.ViewPreferences.VerticalMeasurementUnits = idMeasurementUnits.idPoints
    Rem Save the old page numbering
    myOldPageNumbering = myInDesign.GeneralPreferences.PageNumbering
    myInDesign.GeneralPreferences.PageNumbering = idPageNumberingOptions.idSection
    Set myStartPage = myInDesign.ActiveDocument.Pages.Item(myStartPageName)
    Set myEndPage = myInDesign.ActiveDocument.Pages.Item(myEndPageName)
    Rem Set page numbering to absolute
    myInDesign.GeneralPreferences.PageNumbering = idPageNumberingOptions.idAbsolute
    Rem Does the page start with an even page?
    If myCheckPageStart(myInDesign.ActiveDocument) = False Then
        myPageAdjust = 1
    Else
        myPageAdjust = 0
    End If
    For myCounter = myStartPage.DocumentOffset To myEndPage.DocumentOffset
        Set myPage = myInDesign.ActiveDocument.Pages.Item(myCounter)
        If CInt(myPage.DocumentOffset + myPageAdjust) Mod 2 = 0 Then
            Rem Page is an even page.
            myAdjustPage myInDesign, myPage, myEvenX, myEvenY
        Else
            Rem Page is an odd page.
            myAdjustPage myInDesign, myPage, myOddX, myOddY
        End If
    Next
    Rem Reset the transform content and measurement units to their original values.
    myInDesign.ActiveDocument.ViewPreferences.HorizontalMeasurementUnits = myOldXUnits
    myInDesign.ActiveDocument.ViewPreferences.VerticalMeasurementUnits = myOldYUnits
    myInDesign.GeneralPreferences.PageNumbering = myOldPageNumbering
End Function

Function myAdjustPage(myInDesign, myPage, myX, myY)
    For myCounter = 1 To myPage.PageItems.Count
        myResetItemLock = False
        myResetLayerLock = False
        Set myPageItem = myPage.PageItems.Item(myCounter)
        If myPageItem.Locked = True Then
            myPageItem.Locked = False
            myResetItemLock = True
        End If
        If myPageItem.ItemLayer.Locked = True Then
            myPageItem.ItemLayer.Locked = False
            myResetLayerLock = True
        End If
        myPageItem.Move , Array(myX, myY)
        If myResetItemLock = True Then
            myPageItem.Locked = True
        End If
        If myResetLayerLock = True Then
            myPageItem.ItemLayer.Locked = True
        End If
    Next
End Function
Function myGetPageNames(myDocument)
    ReDim myPageNames(0)
    For myCounter = 1 To myDocument.Pages.Count
        If myCounter > 1 Then
            ReDim Preserve myPageNames(UBound(myPageNames) + 1)
        End If
        myPageNames(UBound(myPageNames)) = myDocument.Pages.Item(myCounter).name
    Next
    myGetPageNames = myPageNames
End Function
Function myCheckPageRange(myInDesign, myStartPageName, myEndPageName)
    myStartIndex = myInDesign.ActiveDocument.Pages.Item(myStartPageName).DocumentOffset
    myEndIndex = myInDesign.ActiveDocument.Pages.Item(myEndPageName).DocumentOffset
    If myStartIndex <= myEndIndex Then
        myCheckPageRange = True
    Else
        myCheckPageRange = False
    End If
End Function
