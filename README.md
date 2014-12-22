Tested with:

<img src="http://www.inmensia.com/files/pictures/external/1001.png" />

How to use?
=============

Create an AR.Detector object:

    var detector = new AR.Detector();

Call detect function:

    var markers = detector.detect(imageData);
    markers result will be an array of AR.Marker objects with detected markers.

AR.Marker objects have two properties:

id: Marker id.
corners: 2D marker corners.
imageData argument must be a valid ImageData canvas object.

    var canvas = document.getElementById("canvas");

    var context = canvas.getContext("2d");

    var imageData = context.getImageData(0, 0, width, height);

3D Pose Estimation
==================
Create an POS.Posit object:

var posit = new POS.Posit(modelSize, canvas.width);
modelSize argument must be the real marker size (millimeters).

Call pose function:

    var pose = posit.pose(corners);
corners must be centered on canvas:

    var corners = marker.corners;

    for (var i = 0; i < corners.length; ++ i){
       var corner = corners[i];

       corner.x = corner.x - (canvas.width / 2);
       corner.y = (canvas.height / 2) - corner.y;
    }

pose result will be a POS.Pose object with two estimated pose (if any):

bestError: Error of the best estimated pose.
bestRotation: 3x3 rotation matrix of the best estimated pose.
bestTranslation: Translation vector of the best estimated pose.
alternativeError: Error of the alternative estimated pose.
alternativeRotation: 3x3 rotation matrix of the alternative estimated pose.
alternativeTranslation: Translation vector of the alternative estimated pose.
Note: POS namespace can be taken from posit1.js or posit2.js.

WebCam Access
==================
To test 100% JavaScript demos use a modern browser like Chrome or Firefox.

THE IDEA HAS BEEN TAKE IT FROM: https://code.google.com/p/js-aruco/