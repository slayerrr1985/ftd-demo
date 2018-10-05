Rem PathEffects.vbs
Rem An InDesign VBScript
Rem
Rem Effects:
Rem Punk: Pushes the control handles on all of the points on the path toward the geometric center of the path.
Rem Bloat: Pushes the control handles on all of the points on the path away from the geometric enter of the path.
Rem PunkBloat: Pushes the left direction handle toward the center of the path and pushes the
Rem right direction handle away from the center of the path.
Rem BloatPunk: Pushes the right direction handle toward the center of the path and pushes the left
Rem direction handle away from the center of the path.
Rem Twirl: Pushes all right direction handles toward the center of the path and leaves the left direction handle unchanged.
Rem AntiTwirl: Pushes all left direction handles toward the center of the path and leaves the right direction handles unchanged.
Rem Retract All: Retracts all control handles.
Rem MakeRectangle: Converts the selected object to a rectangle.
Rem MakeOval: Converts the selected object to an oval.
Rem Turn on the Copy Path option to apply the effect to a duplicate of the selected path(s).
Rem Note that some settings for some of these effects are mathematically equivalent. For example, choosing Bloat and
Rem setting the Distance from Center Point field to -50 is the same as choosing Punk and setting the Offset from
Rem Center Point field to 50.
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
				MsgBox ("Please select a rectangle, oval, polygon, or graphic line and try again.")
			End If
		Else
			MsgBox ("Please select an object and try again.")
		End If
	Else
		MsgBox ("Please open a document, select an object, and try again.")
	End If
End function
Function myDisplayDialog(myInDesign, myObjectList)
    Set myDialog = myInDesign.Dialogs.Add
    With myDialog
        With .dialogColumns.Add
            With .borderpanels.Add
                With .statictexts.Add
                    .staticLabel = "Effect:"
                End With
                Set myPathEffectButtons = .radiobuttonGroups.Add
                With myPathEffectButtons
                    With .radiobuttonControls.Add
                        .staticLabel = "Punk"
                        .checkedState = True
                    End With
                    With .radiobuttonControls.Add
                        .staticLabel = "Bloat"
                    End With
                    With .radiobuttonControls.Add
                        .staticLabel = "PunkBloat"
                    End With
                    With .radiobuttonControls.Add
                        .staticLabel = "BloatPunk"
                    End With
                    With .radiobuttonControls.Add
                        .staticLabel = "Twirl"
                    End With
                    With .radiobuttonControls.Add
                        .staticLabel = "AntiTwirl"
                    End With
                    With .radiobuttonControls.Add
                        .staticLabel = "RetractAll"
                    End With
                    With .radiobuttonControls.Add
                        .staticLabel = "MakeRectangle"
                    End With
                    With .radiobuttonControls.Add
                        .staticLabel = "MakeOval"
                    End With
                End With
            End With
            With .borderpanels.Add
                With .statictexts.Add
                    .staticLabel = "Options:"
                End With
                With .dialogColumns.Add
                    With .statictexts.Add
                        .staticLabel = "Offset from Center Point:"
                    End With
                    Set myCopyPathCheckbox = .checkboxcontrols.Add
                    myCopyPathCheckbox.staticLabel = "Copy Path"
                    myCopyPathCheckbox.checkedState = False
                End With
                With .dialogColumns.Add
                    Set myOffsetEditbox = .percenteditboxes.Add
                    myOffsetEditbox.editvalue = 60
                End With
            End With
        End With
    End With
    myResult = myDialog.Show
    If myResult = True Then
        myEffect = myPathEffectButtons.selectedbutton
        myOffset = myOffsetEditbox.editvalue
        myCopyPath = myCopyPathCheckbox.checkedState
	myDialog.Destroy
        myPathEffects myInDesign, myEffect, myOffset, myCopyPath, myObjectList
    Else
	myDialog.Destroy
    End If
End Function
Function myPathEffects(myInDesign, myEffect, myOffset, myCopyPath, myObjectList)
For myCounter = 0 to ubound(myObjectList)

	Set myObject = myObjectList(myCounter)

	If myCopyPath = True Then
		Set myObject = myObject.Duplicate
	End If
	myBounds = myObject.geometricBounds
	For myPathCounter = 1 To myObject.Paths.Count
       		myEntirePath = myObject.Paths.Item(myPathCounter).entirePath
		myNewEntirePath = myPathEffect(myEntirePath, myEffect, myBounds, myOffset)
                myObject.Paths.Item(myPathCounter).entirePath = myNewEntirePath
	Next
    Next
End Function
Function myPathEffect(myEntirePath, myEffect, myBounds, myOffset)
    Dim myPoint(2)
    pi = 3.14159265358979
    myAngle = 90*(pi/180)
    myXCenter = myBounds(1) + ((myBounds(3) - myBounds(1)) / 2)
    myYCenter = myBounds(0) + ((myBounds(2) - myBounds(0)) / 2)
    Rem ConvertToRectangle and ConvertToOval are special cases.
    If myEffect < 7 Then
        ReDim myPointArray(UBound(myEntirePath))
        For myPointCounter = 0 To UBound(myEntirePath)
            myPathPoint = myEntirePath(myPointCounter)
            If UBound(myPathPoint) > 1 Then
                myAnchor = myPathPoint(1)
            Else
                myAnchor = myPathPoint
            End If
            myX1 = myAnchor(0)
            myY1 = myAnchor(1)
            myXOffset = myXCenter - myX1
            myYOffset = myYCenter - myY1
            myX = myXOffset * (myOffset * 0.01)
            myY = myYOffset * (myOffset * 0.01)
            Select Case myEffect
                Case 0 'Punk
                    myX2 = myXCenter - myX
                    myY2 = myYCenter - myY
                    myPoint(0) = Array(myX2, myY2)
                    myPoint(1) = myAnchor
                    myPoint(2) = Array(myX2, myY2)
                Case 1 'Bloat
                    myX2 = myX1 - myX
                    myY2 = myY1 - myY
                    myPoint(0) = Array(myX2, myY2)
                    myPoint(1) = myAnchor
                    myPoint(2) = Array(myX2, myY2)
                Case 2 'PunkBloat
                    myX2 = myXCenter - myX
                    myY2 = myYCenter - myY
                    myX3 = myX1 - (myXOffset - myX)
                    myY3 = myY1 - (myYOffset - myY)
                    myPoint(0) = Array(myX2, myY2)
                    myPoint(1) = myAnchor
                    myPoint(2) = Array(myX3, myY3)
                Case 3 'BloatPunk
                    myX2 = myXCenter - myX
                    myY2 = myYCenter - myY
                    myX3 = myX1 - (myXOffset - myX)
                    myY3 = myY1 - (myYOffset - myY)
                    myPoint(0) = Array(myX3, myY3)
                    myPoint(1) = myAnchor
                    myPoint(2) = Array(myX2, myY2)
                Case 4 'Twirl
                    myX2 = myXCenter - myX
                    myY2 = myYCenter - myY
                    myX3 = myX1 - (((myX * Cos(myAngle)) - (myY * Sin(myAngle))))
                    myY3 = myY1 - (((myX * Sin(myAngle)) + (myY * Cos(myAngle))))
                    myPoint(0) = Array(myX3, myY3)
                    myPoint(1) = myAnchor
                    myPoint(2) = Array(myX2, myY2)
                Case 5 'Antitwirl
                    myX2 = myXCenter - myX
                    myY2 = myYCenter - myY
                    myX3 = myX1 + (((myX * Cos(myAngle)) - (myY * Sin(myAngle))))
                    myY3 = myY1 + (((myX * Sin(myAngle)) + (myY * Cos(myAngle))))
                    myPoint(0) = Array(myX2, myY2)
                    myPoint(1) = myAnchor
                    myPoint(2) = Array(myX3, myY3)
                Case 6 'RetractAll
                    myPoint(0) = myAnchor
                    myPoint(1) = myAnchor
                    myPoint(2) = myAnchor
            End Select
            myPointArray(myPointCounter) = myPoint
        Next
    Else
        If myEffect = 7 Then
            Rem Convert to rectangle
            myPointArray = Array(Array(myBounds(1), myBounds(0)), Array(myBounds(3), myBounds(0)), Array(myBounds(3), myBounds(3)), Array(myBounds(1), myBounds(3)))
        Else
            Rem Convert to oval
            ReDim myPointArray(3)
            myMagicConstant = 0.552284746667
            myXOffset = ((myBounds(3) - myBounds(1)) / 2) * myMagicConstant
            myYOffset = ((myBounds(2) - myBounds(0)) / 2) * myMagicConstant
            'myPointArray(0) = Array(Array(myBounds(1), myYCenter - myYOffset), Array(myBounds(1), myYCenter), Array(myBounds(1), myYCenter + myYOffset))
            myPointA = Array(myBounds(1), myYCenter - myYOffset)
            myPointB = Array(myBounds(1), myYCenter)
            myPointC = Array(myBounds(1), myYCenter + myYOffset)
            myPointArray(0) = Array(myPointA, myPointB, myPointC)
            'myPointArray(1) = Array(Array(myXCenter - myXOffset, myBounds(2)), Array(myXCenter, myBounds(2)), Array(myXCenter + myXOffset), Array(myBounds(2)))
            myPointA = Array(myXCenter - myXOffset, myBounds(2))
            myPointB = Array(myXCenter, myBounds(2))
            myPointC = Array(myXCenter + myXOffset, myBounds(2))
            myPointArray(1) = Array(myPointA, myPointB, myPointC)
            'myPointArray(2) = Array(Array(myBounds(3), myYCenter + myYOffset), Array(myBounds(3), myYCenter), Array(myBounds(3), myYCenter - myYOffset))
            myPointA = Array(myBounds(3), myYCenter + myYOffset)
            myPointB = Array(myBounds(3), myYCenter)
            myPointC = Array(myBounds(3), myYCenter - myYOffset)
            myPointArray(2) = Array(myPointA, myPointB, myPointC)
            'myPointArray(3) = Array(Array(myXCenter + myXOffset, myBounds(0)), Array(myXCenter, myBounds(0)), Array(myXCenter - myXOffset, myBounds(0)))
            myPointA = Array(myXCenter + myXOffset, myBounds(0))
            myPointB = Array(myXCenter, myBounds(0))
            myPointC = Array(yXCenter - myXOffset, myBounds(0))
            myPointArray(3) = Array(myPointA, myPointB, myPointC)
        End If
    End If
    myPathEffect = myPointArray
End Function
