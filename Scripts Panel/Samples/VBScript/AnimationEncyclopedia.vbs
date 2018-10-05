Rem AnimationEncyclopedia.vbs
Rem An InDesign VBScript
Rem 
Rem Author:  Brenda Burden
Rem Creates a 6-page sample doc demonstrating the new InDesign Animation feature

Rem  Search Reference
Rem  PAGE ONE - Sample of Animation Properties 
Rem  PAGE TWO - Sample of all Animation Events
Rem  PAGE THREE - Sample of Additional Animation Properties and Settings, including Duration, Play count, Loop, Speed and Origin
Rem  PAGE FOUR - Sample of Animate To, Animate From, To Current location
Rem  PAGE FIVE - Sample of creating Timing Groups, setting Delays, and looping a Timing Group
Rem  PAGE SIX - Complex A-B-C-D animation that can be created only through scripting (cannot be created in the UI)
main
function main()
	Set myInDesign = CreateObject("InDesign.Application.CC.2015")
	mySetSWFExportPreferences myInDesign
	Set myDocument = myInDesign.documents.add
	mySetUnits myInDesign, idMeasurementUnits.idInches
	myDocument.transparencyPreferences.blendingSpace = idBlendingSpace.idRGB
	myDocument.documentPreferences.facingPages = false
	myDocument.documentPreferences.pageWidth = 11.111
	myDocument.documentPreferences.pageHeight = 8.333
	Set myRed = myMakeColor(myInDesign, "Red", idColorSpace.idRGB, idColorModel.idProcess, Array(255, 0, 0))
	Set myGreen = myMakeColor(myInDesign, "Green", idColorSpace.idRGB, idColorModel.idProcess, Array(0, 255, 0))
	Set myBlue = myMakeColor(myInDesign, "Blue", idColorSpace.idRGB, idColorModel.idProcess, Array(0, 0, 255))
	Set myPurple = myMakeColor(myInDesign, "Purple", idColorSpace.idRGB, idColorModel.idProcess, Array(200, 0, 255))
	Set myLightGray = myMakeColor(myInDesign, "Light Gray", idColorSpace.idRGB, idColorModel.idProcess, Array(200, 200, 200))
	Set myNoneSwatch = myDocument.swatches.item("None")
	Rem 
	Rem Page 1
	Rem 
	Rem Create a motion path using motionPathPoints. This is similar to drawing a regular path using the
	Rem entirePath property. If you wish to set keyframes to correspond to points in the path, use motionPath 
	Rem instead of motionPathPoints. See example on Page 6.
	mySetUnits myInDesign, idMeasurementUnits.idPoints
	myMotionPath = Array(Array(Array(Array(0,0),Array(0,0),Array(0,0)),Array(Array(565, 0),Array(565, 0),Array(565, 0)) ),true)
	myCurvedMotionPath = Array(Array(Array(Array(0,0),Array(0,0),Array(0,0)),Array(Array(565,0),Array(565,-150),Array(565,0)) ),true) 
	mySetUnits myInDesign, idMeasurementUnits.idInches
	Rem Create a background rectangle.
	myMakeRectangle myDocument.pages.item(1), Array(0,0,8.333,11.111), "Background Rectangle", myLightGray, myNoneSwatch, 0
	Rem Create a headline text frame.
	myMakeTextFrame myInDesign, myDocument.pages.item(1), Array(.25,0,1,11.111), "Animation Properties", "Myriad Pro", 28, idJustification.idCenterAlign, False
	Rem Add text labels.
	myMakeTextFrame myInDesign, myDocument.pages.item(1), Array(1.25,1,1.625,10.5), "Motion Path", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.pages.item(1), Array(2.25,1,2.625,10.5), "Rotation", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.pages.item(1), Array(3.25,1,3.625,10.5), "Opacity", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.pages.item(1), Array(4.25,1,4.625,10.5), "Scale", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.pages.item(1), Array(5.25,1,5.625,10.5), "Combination", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.pages.item(1), Array(6.25,1,6.625,10.5), "Color Fade", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.pages.item(1), Array(7.25,1,7.625,10.5), "Motion Path with Curve", "Myriad Pro", 18, idJustification.idLeftAlign, True
	Rem Add rectangles.
	Set myRectangle1P1 = myMakeRectangle(myDocument.pages.item(1), Array(1.625,1,2,2), "Motion Path Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle2P1 = myMakeRectangle(myDocument.pages.item(1), Array(2.625,1,3,2), "Rotation Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle3P1 = myMakeRectangle(myDocument.pages.item(1), Array(3.625,1,4,2), "Opacity Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle4P1 = myMakeRectangle(myDocument.pages.item(1), Array(4.625,1,5,2), "Scale Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle5P1 = myMakeRectangle(myDocument.pages.item(1), Array(5.625,1,6,2), "Combination Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle6P1 = myMakeRectangle(myDocument.pages.item(1), Array(6.625,1,7,2), "Color Fade Rectangle Blue", myBlue, myNoneSwatch, 0)
	Set myRectangle7P1 = myMakeRectangle(myDocument.pages.item(1), Array(6.625,1,7,2), "Color Fade Rectangle Purple", myPurple, myNoneSwatch, 0)
	Set myRectangle8P1 = myMakeRectangle(myDocument.pages.item(1), Array(7.625,1,8,2), "Motion Path with Curve Rectangle", myPurple, myNoneSwatch, 0)
	Rem Add animation properties.
	myRectangle1P1.animationSettings.motionPathPoints = myMotionPath
	myRectangle2P1.animationSettings.motionPathPoints = myMotionPath
	myRectangle2P1.animationSettings.rotationArray = Array(Array(0, 0), Array(23, 270))
	myRectangle3P1.animationSettings.motionPathPoints = myMotionPath
	myRectangle3P1.animationSettings.opacityArray = Array(Array(0,100),Array(23,10))  
	myRectangle4P1.animationSettings.motionPathPoints = myMotionPath
	myRectangle4P1.animationSettings.scaleXArray = Array(Array(0,100),Array(23,20))  
	myRectangle4P1.animationSettings.scaleYArray = Array(Array(0,100.0),Array(23,20))  
	myRectangle5P1.animationSettings.motionPathPoints = myMotionPath
	myRectangle5P1.animationSettings.scaleXArray = Array(Array(0,100),Array(23,120))  
	myRectangle5P1.animationSettings.scaleYArray = Array(Array(0,100),Array(23,10))  
	myRectangle5P1.animationSettings.rotationArray = Array(Array(0,0),Array(23,-270))  
	myRectangle5P1.animationSettings.opacityArray = Array(Array(0,100),Array(23,25))  
	myRectangle6P1.animationSettings.motionPathPoints = myMotionPath
	myRectangle6P1.animationSettings.opacityArray = Array(Array(0,0),Array(23,100)) 
	myRectangle7P1.animationSettings.motionPathPoints = myMotionPath
	myRectangle7P1.animationSettings.opacityArray = Array(Array(0,100),Array(23, 50)) 
	myRectangle8P1.animationSettings.motionPathPoints = myCurvedMotionPath
	Set myPageOneTimingSettings = myDocument.spreads.item(1).timingSettings
	Rem Remove the default On Page Load timing list.
	myPageOneTimingSettings.timingLists.item(1).delete
	Rem Add an On Page Click timing list.
	Set p1TimingOnPageClickList = myPageOneTimingSettings.timingLists.add(idDynamicTriggerEvents.idOnPageClick)
	Rem Add Animations as separate On Page Click Timing Groups
	Set p1timingGroup1 = p1TimingOnPageClickList.timingGroups.add(myRectangle1P1, 0)
	Set p1timingGroup2 = p1TimingOnPageClickList.timingGroups.add(myRectangle2P1, 0) 
	Set p1timingGroup3 = p1TimingOnPageClickList.timingGroups.add(myRectangle3P1, 0) 
	Set p1timingGroup4 = p1TimingOnPageClickList.timingGroups.add(myRectangle4P1, 0) 
	Set p1timingGroup5 = p1TimingOnPageClickList.timingGroups.add(myRectangle5P1, 0) 
	Set p1timingGroup6 = p1TimingOnPageClickList.timingGroups.add(myRectangle6P1, 0) 
	Rem Link Rectangle 6 and 7
	p1timingGroup6.timingTargets.add myRectangle7P1,0
	Set p1timingGroup7 = p1TimingOnPageClickList.timingGroups.add(myRectangle8P1, 0)
	Rem 
	Rem Page 2
	Rem 
	Set myMotionPreset = myInDesign.MotionPresets.Item("twirl")
	myDocument.Pages.Add
	Rem Create a background rectangle.
	myMakeRectangle myDocument.Pages.Item(2), Array(0,0,8.333,11.111), "Background Rectangle", myLightGray, myNoneSwatch, 0
	Rem Create a headline text frame.
	myMakeTextFrame myInDesign, myDocument.pages.item(2), Array(.25,0,1,11.111), "Animation Events", "Myriad Pro", 28, idJustification.idCenterAlign, False
	Rem Add text labels.
	myMakeTextFrame myInDesign, myDocument.pages.item(2), Array(1.25,1,1.625,10.5), "On Page Load", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.pages.item(2), Array(2.25,1,2.625,10.5), "On Page Click", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.pages.item(2), Array(3.25,1,3.625,10.5), "On Click (Self)", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.pages.item(2), Array(4.25,1,4.625,10.5), "On Roll Over (Self)", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.pages.item(2), Array(5.25,1,5.625,10.5), "On Button Event (On Click)", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.pages.item(2), Array(6.25,1,6.625,10.5), "On State Load of Multi-State Object", "Myriad Pro", 18, idJustification.idLeftAlign, True
	Rem Add rectangles.
	Set myRectangle1P2 = myMakeRectangle(myDocument.pages.item(2), Array(1.625,1,2,2), "On Page Load Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle2P2 = myMakeRectangle(myDocument.pages.item(2), Array(2.625,1,3,2), "On Page Click Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle3P2 = myMakeRectangle(myDocument.pages.item(2), Array(3.625,1,4,2), "Self Click Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle4P2 = myMakeRectangle(myDocument.pages.item(2), Array(4.625,1,5,2), "Self Roll Over Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle5P2 = myMakeRectangle(myDocument.pages.item(2), Array(5.625,1,6,2), "On Button Event (On Click) Rectangle", myPurple, myNoneSwatch, 0)
	Rem Apply the motion preset to the rectangles.
	myRectangle1P2.AnimationSettings.Preset = myMotionPreset
	myRectangle2P2.AnimationSettings.Preset = myMotionPreset
	myRectangle3P2.AnimationSettings.Preset = myMotionPreset
	myRectangle4P2.AnimationSettings.Preset = myMotionPreset
	myRectangle5P2.AnimationSettings.Preset = myMotionPreset
	Rem Add a button to control the animation of myRectangle5P2.
	Set myPlayAnimationButton = myDocument.Pages.Item(2).Buttons.Add
	myPlayAnimationButton.GeometricBounds = Array(5.625,3,6,4)
	myPlayAnimationButton.Name = "Play Animation Button"
	myPlayAnimationButton.FillColor = myGreen
	myPlayAnimationButton.StrokeColor = myNoneSwatch
	Set myAnimationBehavior = myPlayAnimationButton.AnimationBehaviors.Add
	myAnimationBehavior.BehaviorEvent = idBehaviorEvents.idMouseDown
	myAnimationBehavior.EnableBehavior = True
	myAnimationBehavior.AnimatedPageItem = myRectangle5P2
	myAnimationBehavior.Operation = idAnimationPlayOperations.idPlay
	Rem Add a Multi-State Object (MSO).
	Set myMSO = myDocument.Pages.Item(2).multiStateObjects.add
	myMSO.GeometricBounds = Array(6.625,1,7,2)
	myMSO.Name = "Simple MSO"
	myMSO.InitiallyHidden = True
	Rem Name default states.
	myMSO.states.item(1).Name = "Top State"
	Set myTopState = myMSO.States.Item(1)
	myMSO.states.item(2).Name = "Second State"
	Set mySecondState = myMSO.States.Item(2)
	Set myThirdState = myMSO.States.Add
	myThirdState.Name = "Third State"
	Rem Add page items to the states.
	Set myRectangleMSO = myMakeRectangle(myTopState, Array(6.625,1,7,2), "Top State Rectangle", myPurple, myNoneSwatch, 0)
	myRectangleMSO.AnimationSettings.Preset = myMotionPreset
	Set myOvalMSO = myMakeRectangle(mySecondState, Array(6.625,1,7,2), "Second State Oval", myPurple, myNoneSwatch, 0)
	myOvalMSO.ConvertShape idConvertShapeOptions.idConvertToOval
	myOvalMSO.AnimationSettings.Preset = myMotionPreset
	Set myPolygonMSO = myMakeRectangle(myThirdState, Array(6.625,1,7,2), "Third State Polygon", myPurple, myNoneSwatch, 0)
	myPolygonMSO.ConvertShape idConvertShapeOptions.idConvertToPolygon
	myPolygonMSO.AnimationSettings.Preset = myMotionPreset
	Rem Add a button to control the animation of myMSO.
	Set myPlayMSOButton = myDocument.pages.item(2).buttons.add
	myPlayMSOButton.GeometricBounds = Array(6.625,3,7,4)
	myPlayMSOButton.Name = "Go to Next State of MSO Button"
	myPlayMSOButton.FillColor = myGreen
	myPlayMSOButton.StrokeColor = myNoneSwatch
	Set myMSOBehavior = myPlayMSOButton.GotoNextStateBehaviors.Add
	myMSOBehavior.AssociatedMultiStateObject = myMSO
	myMSOBehavior.LoopsToNextOrPrevious = True
	myMSOBehavior.BehaviorEvent = idBehaviorEvents.idMouseDown
	Rem Page 2 timing section:
	Set mySecondSpreadTimingSettings = myDocument.spreads.item(2).timingSettings
	Rem Remove the default timing list.
	mySecondSpreadTimingSettings.TimingLists.Item(1).Delete
	Rem Create On Page Load
	Set mySecondPageLoadTimingList = mySecondSpreadTimingSettings.TimingLists.add(idDynamicTriggerEvents.idOnPageLoad)
	Set secondSpreadTimingG1 = mySecondPageLoadTimingList.TimingGroups.Add(myRectangle1P2, 0)
	Rem Create On Page Click
	Set mySecondPageClickTimingList = mySecondSpreadTimingSettings.TimingLists.add(idDynamicTriggerEvents.idOnPageClick)
	Set secondSpreadTimingG2 = mySecondPageClickTimingList.TimingGroups.Add(myRectangle2P2, 0)
	Rem Create Self Click
	Set myRectangle3P2TimingList = myRectangle3P2.TimingSettings.TimingLists.Add(idDynamicTriggerEvents.idOnSelfClick)
	Rem Create Self Roll Over
	Set myRectangle4P2TimingList = myRectangle4P2.TimingSettings.TimingLists.Add(idDynamicTriggerEvents.idOnSelfRollover)	
	Rem 
	Rem Page 3
	Rem 
	myDocument.Pages.Add
	Rem Create a background rectangle.
	myMakeRectangle myDocument.Pages.Item(3), Array(0,0,8.333,11.111), "Background Rectangle", myLightGray, myNoneSwatch, 0
	Rem Create a headline text frame.
	myMakeTextFrame myInDesign, myDocument.pages.item(3), Array(.25,0,1,11.111), "Additional Animation Properties and Settings", "Myriad Pro", 28, idJustification.idCenterAlign, False
	Rem Add text labels.
	myMakeTextFrame myInDesign, myDocument.Pages.Item(3), Array(1.25,1,1.625,10.5), "Duration: 2 seconds", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(3), Array(2.25,1,2.625,10.5), "Duration: .5 seconds", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(3), Array(3.25,1,3.625,10.5), "Speed: Ease In", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(3), Array(4.25,1,4.625,10.5), "Speed: Ease Out", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(3), Array(5.25,1,5.625,10.5), "Speed: Ease In and Out", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(3), Array(6.25,1,6.625,10.5), "Play Twice", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(3), Array(7.25,1,7.625,10.5), "Loop", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(3), Array(1.25,5,1.625,10.5), "Hide Until Animated", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(3), Array(2.25,5,2.625,10.5), "Hide After Animating", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(3), Array(3.25,5,3.625,10.5), "Origin Upper Left Corner", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(3), Array(4.25,5,4.625,10.5), "Origin Right, Vertical Center", "Myriad Pro", 18, idJustification.idLeftAlign, True
	Rem Add rectangles.
	Set myRectangle1P3 = myMakeRectangle(myDocument.Pages.Item(3), Array(1.625,1,2,2), "2-Second Duration Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle2P3 = myMakeRectangle(myDocument.Pages.Item(3), Array(2.625,1,3,2), ".5 Second Duration Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle3P3 = myMakeRectangle(myDocument.Pages.Item(3), Array(3.625,1,4,2), "Ease In Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle4P3 = myMakeRectangle(myDocument.Pages.Item(3), Array(4.625,1,5,2), "Ease Out Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle5P3 = myMakeRectangle(myDocument.Pages.Item(3), Array(5.625,1,6,2), "Ease In and Out Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle6P3 = myMakeRectangle(myDocument.Pages.Item(3), Array(6.625,1,7,2), "Play Twice Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle7P3 = myMakeRectangle(myDocument.Pages.Item(3), Array(7.625,1,8,2), "Loop Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle8P3 = myMakeRectangle(myDocument.Pages.Item(3), Array(1.625,5,2,6), "Hide Until Animated Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle9P3 = myMakeRectangle(myDocument.Pages.Item(3), Array(2.625,5,3,6), "Hide After Animated Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle10P3 = myMakeRectangle(myDocument.Pages.Item(3), Array(3.625,5,4,6), "Origin Upper Left Rectangle", myPurple, myNoneSwatch, 0)
	Set myRectangle11P3 = myMakeRectangle(myDocument.Pages.Item(3), Array(4.625,5,5,6), "Origin Right Center Rectangle", myPurple, myNoneSwatch, 0)
	Rem Set animation properties.
	myRectangle1P3.AnimationSettings.Duration = 2
	myRectangle1P3.AnimationSettings.RotationArray = Array(Array(0,0),Array(47,180))
	myRectangle2P3.AnimationSettings.Duration = 0.5
	myRectangle2P3.AnimationSettings.RotationArray = Array(Array(0,0),Array(11,180))
	myRectangle3P3.AnimationSettings.Duration = 2
	myRectangle3P3.AnimationSettings.RotationArray = Array(Array(0,0),Array(47,180))
	myRectangle3P3.AnimationSettings.EaseType = idAnimationEaseOptions.idEaseIn
	myRectangle4P3.AnimationSettings.Duration = 2
	myRectangle4P3.AnimationSettings.RotationArray = Array(Array(0,0),Array(47,180))
	myRectangle4P3.AnimationSettings.EaseType = idAnimationEaseOptions.idEaseOut
	myRectangle5P3.AnimationSettings.Duration = 2
	myRectangle5P3.AnimationSettings.RotationArray = Array(Array(0,0),Array(47,180))
	myRectangle5P3.AnimationSettings.EaseType = idAnimationEaseOptions.idEaseInOut
	myRectangle6P3.AnimationSettings.Duration = 2
	myRectangle6P3.AnimationSettings.RotationArray = Array(Array(0,0),Array(47,180))
	myRectangle6P3.AnimationSettings.Plays = 2
	myRectangle7P3.AnimationSettings.Duration = 2
	myRectangle7P3.AnimationSettings.RotationArray = Array(Array(0,0),Array(47,180))
	myRectangle7P3.AnimationSettings.PlaysLoop = True
	myRectangle8P3.AnimationSettings.Duration = 2
	myRectangle8P3.AnimationSettings.RotationArray = Array(Array(0,0),Array(47,180))
	myRectangle8P3.AnimationSettings.InitiallyHidden = True
	myRectangle8P3.AnimationSettings.HiddenAfter = False
	myRectangle9P3.AnimationSettings.Duration = 2
	myRectangle9P3.AnimationSettings.RotationArray = Array(Array(0,0),Array(47,180))
	myRectangle9P3.AnimationSettings.InitiallyHidden = False
	myRectangle9P3.AnimationSettings.HiddenAfter = True
	myRectangle10P3.AnimationSettings.Duration = 2
	myRectangle10P3.AnimationSettings.RotationArray = Array(Array(0,0),Array(47,180))
	myRectangle10P3.AnimationSettings.TransformOffsets = Array(0, 0)
	myRectangle11P3.AnimationSettings.Duration = 2
	myRectangle11P3.AnimationSettings.RotationArray = Array(Array(0,0),Array(47,180))
	myRectangle11P3.AnimationSettings.TransformOffsets = Array(1.0,0.5)
	Rem 
	Rem Page 4
	Rem 
	myDocument.Pages.Add
	Rem Create a background rectangle.
	myMakeRectangle myDocument.Pages.Item(4), Array(0,0,8.333,11.111), "Background Rectangle", myLightGray, myNoneSwatch, 0
	Rem Create a headline text frame.
	myMakeTextFrame myInDesign, myDocument.Pages.Item(4), Array(.25,0,1,11.111), "Animate Options", "Myriad Pro", 28, idJustification.idCenterAlign, false
	Rem Add text labels.
	myMakeTextFrame myInDesign, myDocument.Pages.Item(4), Array(1.25,1,1.625,10.5), "Animate: From Current Appearance", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(4), Array(2.25,1,2.625,10.5), "Animate: To Current Appearance", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(4), Array(3.25,1,3.625,10.5), "Animate: To Current Location", "Myriad Pro", 18, idJustification.idLeftAlign, True
	Rem Add rectangles.
	Set myRectangle1P4 = myMakeRectangle(myDocument.Pages.Item(4), Array(1.625,1,2,2), "Animate From Current Appearance", myPurple, myNoneSwatch, 0)
	Set myRectangle2P4 = myMakeRectangle(myDocument.Pages.Item(4), Array(2.625,1,3,2), "Animate To Current Appearance", myPurple, myNoneSwatch, 0)
	set myRectangle3P4 = myMakeRectangle(myDocument.Pages.Item(4), Array(3.625,1,4,2), "Animate To Current Location", myPurple, myNoneSwatch, 0)
	Rem Set animation properties.
	myRectangle1P4.AnimationSettings.Preset = myInDesign.MotionPresets.Item("move-right-grow")
	myRectangle1P4.AnimationSettings.DesignOption = idDesignOptions.idFromCurrentAppearance
	myRectangle2P4.AnimationSettings.Preset =  myInDesign.MotionPresets.Item("move-right-grow")
	myRectangle2P4.AnimationSettings.DesignOption = idDesignOptions.idToCurrentAppearance
	myRectangle3P4.AnimationSettings.Preset = myInDesign.MotionPresets.Item("fly-in-left")
	Rem 
	Rem Page 5
	Rem 
	myDocument.Pages.Add
	Rem Create a background rectangle.
	myMakeRectangle myDocument.Pages.Item(5), Array(0,0,8.333,11.111), "Background Rectangle", myLightGray, myNoneSwatch, 0
	Rem Create a headline text frame.
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(.25,0,1,11.111), "Timing Panel - Timing Groups and Delays", "Myriad Pro", 28, idJustification.idCenterAlign, false
	Rem Add text labels.
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(1.25,1,1.625,10.5), "A-1", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(2.25,1,2.625,10.5), "A-2", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(3.25,1,3.625,10.5), "A-3", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(4.25,1,4.625,10.5), "A-4", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(5.25,1,5.625,10.5), "B-1", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(6.25,1,6.625,10.5), "B-2", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(7.25,1,7.625,10.5), "B-3", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(1.25,5,1.625,10.5), "C-1", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(2.25,5,2.625,10.5), "C-2", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(3.25,5,3.625,10.5), "C-3", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(4.25,5,4.625,10.5), "C-4", "Myriad Pro", 18, idJustification.idLeftAlign, True
	myMakeTextFrame myInDesign, myDocument.Pages.Item(5), Array(5.25,5,5.625,10.5), "C-5", "Myriad Pro", 18, idJustification.idLeftAlign, True
	Rem Add rectangles.
	Set myRectangle1P5 = myMakeRectangle(myDocument.Pages.Item(5), Array(1.625,1,2,2), "A-1", myPurple, myNoneSwatch, 0)
	Set myRectangle2P5 = myMakeRectangle(myDocument.Pages.Item(5), Array(2.625,1,3,2), "A-2", myPurple, myNoneSwatch, 0)
	Set myRectangle3P5 = myMakeRectangle(myDocument.Pages.Item(5), Array(3.625,1,4,2), "A-3", myPurple, myNoneSwatch, 0)
	Set myRectangle4P5 = myMakeRectangle(myDocument.Pages.Item(5), Array(4.625,1,5,2), "A-4", myPurple, myNoneSwatch, 0)
	Set myRectangle5P5 = myMakeRectangle(myDocument.Pages.Item(5), Array(5.625,1,6,2), "B-1", myGreen, myNoneSwatch, 0)
	Set myRectangle6P5 = myMakeRectangle(myDocument.Pages.Item(5), Array(6.625,1,7,2), "B-2", myGreen, myNoneSwatch, 0)
	Set myRectangle7P5 = myMakeRectangle(myDocument.Pages.Item(5), Array(7.625,1,8,2), "B-3", myGreen, myNoneSwatch, 0)
	Set myRectangle8P5 = myMakeRectangle(myDocument.Pages.Item(5), Array(1.625,5,2,6), "C-1", myBlue, myNoneSwatch, 0)
	Set myRectangle9P5 = myMakeRectangle(myDocument.Pages.Item(5), Array(2.625,5,3,6), "C-2", myBlue, myNoneSwatch, 0)
	Set myRectangle10P5 = myMakeRectangle(myDocument.Pages.Item(5), Array(3.625,5,4,6), "C-3", myBlue, myNoneSwatch, 0)
	Set myRectangle11P5 = myMakeRectangle(myDocument.Pages.Item(5), Array(4.625,5,5,6), "C-4", myBlue, myNoneSwatch, 0)
	Set myRectangle12P5 = myMakeRectangle(myDocument.Pages.Item(5), Array(5.625,5,6,6), "C-5", myBlue, myNoneSwatch, 0)
	Rem Animation settings (note that you cannot use a page item as the target of a timing group
	Rem if you have not applied animation settings to the it).
	myRectangle1P5.AnimationSettings.Preset = myMotionPreset
	myRectangle2P5.AnimationSettings.Preset = myMotionPreset
	myRectangle3P5.AnimationSettings.Preset = myMotionPreset
	myRectangle4P5.AnimationSettings.Preset = myMotionPreset
	myRectangle5P5.AnimationSettings.Preset = myMotionPreset
	myRectangle6P5.AnimationSettings.Preset = myMotionPreset
	myRectangle7P5.AnimationSettings.Preset = myMotionPreset
	myRectangle8P5.AnimationSettings.Preset = myMotionPreset
	myRectangle9P5.AnimationSettings.Preset = myMotionPreset
	myRectangle10P5.AnimationSettings.Preset = myMotionPreset
	myRectangle11P5.AnimationSettings.Preset = myMotionPreset
	myRectangle12P5.AnimationSettings.Preset = myMotionPreset
	Rem Page 5 timing section:
	Set myFifthSpreadTimingSettings = myRectangle1P5.parent.TimingSettings
	myFifthSpreadTimingSettings.TimingLists.item(1).Delete
	Set myFifthPageLoadTimingList = myFifthSpreadTimingSettings.TimingLists.Add(idDynamicTriggerEvents.idOnPageLoad)
	Rem A group.
	Set myFifthSpreadTimingG1 = myFifthPageLoadTimingList.TimingGroups.Add(myRectangle1P5, 0)
	myFifthSpreadTimingG1.TimingTargets.Add myRectangle2P5, 0
	myFifthSpreadTimingG1.TimingTargets.Add myRectangle3P5, 0
	myFifthSpreadTimingG1.TimingTargets.Add myRectangle4P5, 0
	Rem B group.
	Set myFifthSpreadTimingG2 = myFifthPageLoadTimingList.TimingGroups.Add(myRectangle5P5, 1)
	myFifthSpreadTimingG2.TimingTargets.Add myRectangle6P5,.5
	myFifthSpreadTimingG2.TimingTargets.Add myRectangle7P5, 1
	Rem Enable Group Loop
	myFifthSpreadTimingG2.PlaysLoop = True
	Rem C group.
	Set myFifthSpreadTimingG3 = myFifthPageLoadTimingList.TimingGroups.Add(myRectangle8P5, .25)
	myFifthSpreadTimingG3.TimingTargets.Add myRectangle9P5, .25
	myFifthSpreadTimingG3.TimingTargets.Add myRectangle10P5, .25
	myFifthSpreadTimingG3.TimingTargets.Add myRectangle11P5, .25
	myFifthSpreadTimingG3.TimingTargets.Add myRectangle12P5, .25
	Rem Enable Group Plays 2
	myFifthSpreadTimingG3.Plays = 2
	Rem 
	Rem Page 6
	Rem 
	myDocument.pages.add()
	Rem Create a background rectangle.
	myMakeRectangle myDocument.Pages.Item(6), Array(0,0,8.333,11.111), "Background Rectangle", myLightGray, myNoneSwatch, 0
	Rem Create a headline text frame.
	myMakeTextFrame myInDesign, myDocument.Pages.Item(6), Array(.25,0,1,11.111), "Scripted Animation with Multiple Property Changes", "Myriad Pro", 28, idJustification.idCenterAlign, false
	Rem Add text label.
	myMakeTextFrame myInDesign, myDocument.Pages.Item(6), Array(1.25,1,1.625,10.5), "6-Second Animation with one or more property changes per second", "Myriad Pro", 18, idJustification.idLeftAlign, True
	Rem Add rectangle.
	Set myRectangle1P6 = myMakeRectangle(myDocument.Pages.Item(6), Array(1.625,1,2,2), "Scripted Animation Rectangle", myPurple, myNoneSwatch, 0)
	Rem Set duration before adding keyframes when scripting animations
	myRectangle1P6.AnimationSettings.duration = 6
	Rem Assumes 24 Frames Per Second (FPS)
	Rem 23 = 1 second, 47 = 2 seconds, 71 = 3 seconds, 95 = 4 seconds, 119 = 5 seconds, 143 = 6 seconds
	mySetUnits myInDesign, idMeasurementUnits.idPoints
	Rem Note that the animation here is created with motionPath, which allows for setting keyframes that correspond to points in the path
	myRectangle1P6.AnimationSettings.MotionPath = Array(Array(0, Array(Array(0, 0), Array(0, 0), Array(0, 0))), Array(23, Array(Array(200, 0), Array(200, 0), Array(200, 0))), Array(47, Array(Array(200, 200), Array(200, 200), Array(200, 200))), Array(119, Array(Array(0, 200), Array(0, 200), Array(0, 200))), Array(143, Array(Array(0, 0), Array(0, 0), Array(0, 0))))
	mySetUnits myInDesign, idMeasurementUnits.idInches
	Rem Note that this animation allows setting multiple changes in opacity, scale and rotation that 
	Rem correspond to points in the motion path.  This functionality is not available in the Animation panel UI.
	myRectangle1P6.AnimationSettings.RotationArray =  Array(Array(0, 0), Array(23, 180), Array(47, 0), Array(71, -180), Array(95, 0), Array(119, 180), Array(143, -360))
	myRectangle1P6.AnimationSettings.ScaleXArray = Array( Array(0, 100.0 ), Array(23, 200.0), Array(47, 100.0), Array(71, 300.0), Array(95, 100.0), Array(119, 200.0), Array(143, 100.0) )
	myRectangle1P6.AnimationSettings.ScaleYArray = Array( Array(0, 100.0 ), Array(23, 0.0), Array(47, 100.0), Array(71, 0.0), Array(95, 100.0), Array(119, 300.0), Array(143, 100.0) )
	myRectangle1P6.AnimationSettings.OpacityArray = Array( Array(0, 100.0 ), Array(23, 0.0), Array(47, 100.0), Array(71, 0.0), Array(95, 100.0), Array(119, 0.0), Array(143, 100.0) ) 
	myRectangle1P6.AnimationSettings.Plays = 1
	myRectangle1P6.AnimationSettings.PlaysLoop = False
	myRectangle1P6.AnimationSettings.EaseType = idAnimationEaseOptions.idNoEase
	myRectangle1P6.AnimationSettings.TransformOffsets = Array(0.5, 0.5)
	myRectangle1P6.AnimationSettings.DesignOption = idDesignOptions.idFromCurrentAppearance 
	myRectangle1P6.AnimationSettings.InitiallyHidden = False
	myRectangle1P6.AnimationSettings.HiddenAfter = False		
End Function
Rem Utility functions.
Function mySetUnits(myInDesign, myUnits)
	myInDesign.Documents.Item(1).ViewPreferences.HorizontalMeasurementUnits = myUnits
	myInDesign.Documents.Item(1).ViewPreferences.VerticalMeasurementUnits = myUnits
End Function
Function myMakeTextFrame(myInDesign, myPage, myBounds, myString, myFontName, myPointSize, myJustification, myFitToContent)
	Set myTextFrame = myPage.TextFrames.Add
	myTextFrame.GeometricBounds = myBounds
	myTextFrame.Texts.Item(1).InsertionPoints.Item(1).Contents = myString
	myTextFrame.Texts.Item(1).ParentStory.AppliedFont = myInDesign.Fonts.Item(myFontName)
	myTextFrame.Texts.Item(1).ParentStory.PointSize = myPointSize
	myTextFrame.Texts.Item(1).ParentStory.FillColor = myInDesign.Documents.Item(1).Swatches.Item("Black")
	myTextFrame.Texts.Item(1).Justification = myJustification
	If myFitToContent = True Then
		myTextFrame.Fit idFitOptions.idFrameToContent
	End If
	Set myMakeTextFrame = myTextFrame
End Function
Function myMakeRectangle(myPage, myBounds, myString, myFillColor,  myStrokeColor, myStrokeWeight)
	Set myRectangle = myPage.rectangles.Add
	myRectangle.GeometricBounds = myBounds
	myRectangle.fillColor = myFillColor
	myRectangle.strokeWeight = myStrokeWeight
	myRectangle.strokeColor = myStrokeColor
	myRectangle.name = myString
	Set myMakeRectangle = myRectangle
End Function
Function myMakeColor(myInDesign, myColorName, myColorSpace, myColorModel, myColorValue)
	Set myDocument = myInDesign.Documents.Item(1)
	Rem Something like a try...catch for VBScript.
    On Error Resume Next
    Set myColor = myDocument.Colors.Item(myColorName)
    If Err.Number <> 0 Then
        Set myColor = myDocument.Colors.Add
    End If
    Err.Clear
    On Error GoTo 0
	myColor.Name = myColorName
	myColor.Space = myColorSpace
	myColor.Model = myColorModel
	myColor.ColorValue = myColorValue
	Set myMakeColor = myColor
End Function
Function mySetSWFExportPreferences(myInDesign)
	myInDesign.swfExportPreferences.rasterizePages= false
	myInDesign.swfExportPreferences.flattenTransparency = false
	myInDesign.swfExportPreferences.dynamicMediaHandling = idDynamicMediaHandlingOptions.idIncludeAllMedia
	myInDesign.swfExportPreferences.frameRate = 24	
End Function
