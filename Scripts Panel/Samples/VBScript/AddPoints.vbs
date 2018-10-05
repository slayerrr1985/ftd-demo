Rem AddPoints.vbs
Rem An InDesign VBScript
Rem
Rem Adds points to the paths of the selected page item(s). Points are added at the midpoint of
Rem each line segment on curved line segments, the added point may be closer to one end point
Rem than it is to the other. This is because the "midpoint" is determined based on the "velocity"
Rem of the curve.
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
	If myInDesign.Documents.Count <> 0 Then
	    If myInDesign.Selection.Count <> 0 Then
	        For myCounter = 1 To myInDesign.Selection.Count
	            Select Case TypeName(myInDesign.Selection.Item(myCounter))
	                Case "Rectangle", "Oval", "Polygon", "GraphicLine", "TextFrame"
	                    If Not (IsEmpty(myObjectList(0))) Then
	                        ReDim Preserve myObjectList(UBound(myObjectList) + 1)
	                    End If
	                    Set myObjectList(UBound(myObjectList)) = myInDesign.Selection.Item(myCounter)
	            End Select
	        Next
	        If Not (IsEmpty(myObjectList(0))) Then
	            For myCounter = 0 To UBound(myObjectList)
	                Set myObject = myObjectList(myCounter)
	                For myPathCounter = 1 To myObject.Paths.Count
	                	Rem Store current ruler origin, measurement units.
	                	myOldRulerOrigin = myInDesign.Documents.Item(1).ViewPreferences.RulerOrigin
	                	myOldXUnits = myInDesign.Documents.Item(1).ViewPreferences.HorizontalMeasurementUnits
	                	myOldYUnits = myInDesign.Documents.Item(1).ViewPreferences.VerticalMeasurementUnits
	                	Rem Change ruler origin, measurement units.
	                	myInDesign.Documents.Item(1).ViewPreferences.RulerOrigin = idRulerOrigin.idPageOrigin
	                	myInDesign.Documents.Item(1).ViewPreferences.HorizontalMeasurementUnits = idMeasurementUnits.idPoints
	                	myInDesign.Documents.Item(1).ViewPreferences.VerticalMeasurementUnits = idMeasurementUnits.idPoints
	                    myAddPoints myObject.Paths.Item(myPathCounter)
						Rem Reset ruler origin, measurement units.
	                	myInDesign.Documents.Item(1).ViewPreferences.RulerOrigin = myOldRulerOrigin
	                	myInDesign.Documents.Item(1).ViewPreferences.HorizontalMeasurementUnits = myOldXUnits
	                	myInDesign.Documents.Item(1).ViewPreferences.VerticalMeasurementUnits = myOldYUnits
	                Next
	            Next
	        End If
	    Else
	        MsgBox ("Please select a rectangle, ellipse, polygon, graphic line, or text frame and try again.")
	    End If
	Else
	    MsgBox ("Please open a document, select an object, and try again.")
	End If
End function
Function myAddPoints(myPath)
    Dim myPointArray()
    Rem Make the array large enough to hold the points we'll be putting into it.
    If myPath.PathType = idPathType.idClosedPath Then
        ReDim myPointArray((myPath.PathPoints.Count * 2) - 1)
    Else
        ReDim myPointArray((myPath.PathPoints.Count * 2) - 2)
    End If
    For myPathPointCounter = 1 To myPath.PathPoints.Count
        Set myPathPoint = myPath.PathPoints.Item(myPathPointCounter)
        If myPathPointCounter < myPath.PathPoints.Count Then
            Set myNextPathPoint = myPath.PathPoints.Item(myPathPointCounter + 1)
        Else
            Set myNextPathPoint = myPath.PathPoints.Item(1)
        End If
        Rem Get the anchor of the current point.
        myBx0 = myPathPoint.Anchor(0)
        myBy0 = myPathPoint.Anchor(1)
        Rem Get the right direction of the current point.
        myBx1 = myPathPoint.RightDirection(0)
        myBy1 = myPathPoint.RightDirection(1)
        Rem Get the left direction of the *next* point.
        myBx2 = myNextPathPoint.LeftDirection(0)
        myBy2 = myNextPathPoint.LeftDirection(1)
        Rem Get the anchor of the *next* point.
        myBx3 = myNextPathPoint.Anchor(0)
        myBy3 = myNextPathPoint.Anchor(1)
        myPoints = myCalculatePoints(myBx0, myBy0, myBx1, myBy1, myBx2, myBy2, myBx3, myBy3)
        myPointA = myPoints(0)
        myPointB = myPoints(1)
        myPointC = myPoints(2)
        Rem Add the points to the path point array.
        Rem If the point is the first point in the array, set it otherwise
        Rem set the previous point's right direction.
        If myPathPointCounter = 1 Then
            myPointArray(0) = myPointA
            Rem Add the intermediate point.
            myPointArray(1) = myPointB
            Rem Add the end point of the current line segment.
            myPointArray(2) = myPointC
        Else
            If myPathPointCounter = (myPath.PathPoints.Count) Then
                If myPath.PathType = idPathType.idClosedPath Then
                    Rem Adjust the right direction of the preceding point.
                    myPointArray((myPathPointCounter - 1) * 2)(2) = myPointA(2)
                    Rem Add the intermediate point.
                    myPointArray(((myPathPointCounter - 1) * 2) + 1) = myPointB
                    Rem Adjust the left direction of the first point.
                    myPointArray(0)(0) = myPointC(0)
                End If
            Else
                Rem Adjust the right direction of the preceding point.
                myPrecedingPoint = myPointArray(myPathPointCounter * 2)
                myPointArray((myPathPointCounter - 1) * 2)(2) = myPointA(2)
                Rem Add the intermediate point.
                myPointArray(((myPathPointCounter - 1) * 2) + 1) = myPointB
                Rem Add the end point of the current line segment.
                myPointArray(((myPathPointCounter - 1) * 2) + 2) = myPointC
            End If
        End If
    Next
    Rem Now apply the array of triples (left direction, anchor, right direction) to the path.
    myPath.EntirePath = myPointArray
End Function

Function myCalculatePoints(myBx0, myBy0, myBx1, myBy1, myBx2, myBy2, myBx3, myBy3)
    If myBx1 = myBx0 And myBy1 = myBy0 And myBx2 = myBx3 And myBy2 = myBy3 Then
        Rem Anchor of point 1 of segment 1
        myCx0 = myBx0
        myCy0 = myBy0
        Rem Anchor of point 2 of segment 1
        myCx3 = (myBx3 + (3 * myBx2) + (3 * myBx1) + myBx0) * 0.125
        myCy3 = (myBy3 + (3 * myBy2) + (3 * myBy1) + myBy0) * 0.125
        Rem Anchor of point 1 of segment 2 (not really necessary same as ending of segment 1)
        myDx0 = (myBx3 + (3 * myBx2) + (3 * myBx1) + myBx0) * 0.125
        myDy0 = (myBy3 + (3 * myBy2) + (3 * myBy1) + myBy0) * 0.125
        Rem Anchor of point 2 of segment 2
        myDx3 = myBx3
        myDy3 = myBy3
        Rem RightDirection of point 1 of segment 1
        myCx1 = myCx0
        myCy1 = myCy0
        Rem LeftDirection of point 2 of segment 1
        myCx2 = myCx3
        myCy2 = myCy3
        Rem RightDirection of point 2 of segment 1 (i.e., point 1 of segment 2)
        myDx1 = myDx0
        myDy1 = myDy0
        Rem LeftDirection of point 2 of segment 2
        myDx2 = myDx3
        myDy2 = myDy3
    Else
        Rem Anchor of point 1 of segment 1
        myCx0 = myBx0
        myCy0 = myBy0
        Rem RightDirection of point 1 of segment 1
        myCx1 = (myBx1 + myBx0) * 0.5
        myCy1 = (myBy1 + myBy0) * 0.5
        Rem LeftDirection of point 2 of segment 1
        myCx2 = (myBx2 + (2 * myBx1) + myBx0) * 0.25
        myCy2 = (myBy2 + (2 * myBy1) + myBy0) * 0.25
        Rem anchor of point 2 of segment 1
        myCx3 = (myBx3 + (3 * myBx2) + (3 * myBx1) + myBx0) * 0.125
        myCy3 = (myBy3 + (3 * myBy2) + (3 * myBy1) + myBy0) * 0.125
        Rem Anchor of point 1 of segment 2 (not really necessary same as ending of segment 1)
        myDx0 = (myBx3 + (3 * myBx2) + (3 * myBx1) + myBx0) * 0.125
        myDy0 = (myBy3 + (3 * myBy2) + (3 * myBy1) + myBy0) * 0.125
        Rem RightDirection of point 2 of segment 1 (i.e., point 1 of segment 2)
        myDx1 = (myBx3 + (2 * myBx2) + myBx1) * 0.25
        myDy1 = (myBy3 + (2 * myBy2) + myBy1) * 0.25
        Rem LeftDirection of point 2 of segment 2
        myDx2 = (myBx3 + myBx2) * 0.5
        myDy2 = (myBy3 + myBy2) * 0.5
        Rem Anchor of point 2 of segment 2
        myDx3 = myBx3
        myDy3 = myBy3
    End If
    myPointA = Array(Array(myBx0, myBy0), Array(myCx0, myCy0), Array(myCx1, myCy1))
    myPointB = Array(Array(myCx2, myCy2), Array(myCx3, myCy3), Array(myDx1, myDy1))
    myPointC = Array(Array(myDx2, myDy2), Array(myDx3, myDy3), Array(myDx3, myDy3))
    myCalculatePoints = Array(myPointA, myPointB, myPointC)
End Function
