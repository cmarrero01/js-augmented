var Augmented = (function(){

    /**
     * Canvas video dom object
     * @property video
     * @private
     */
    var video;

    /**
     * Dom Object of canvas
     * @property canvas
     * @private
     */
    var canvas;

    /**
     * Context 2d from canvas
     * @property context
     * @private
     */
    var context;

    /**
     * Image draw object
     * @property imageData
     * @private
     */
    var imageData;

    /**
     * AR.detector instance
     * @property detector
     * @private
     */
    var detector;

    /**
     * Initialization of augmented reality
     * @method init
     */
    function init(){
        video = document.getElementById("video");
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");

        canvas.width = parseInt(canvas.style.width);
        canvas.height = parseInt(canvas.style.height);

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (navigator.getUserMedia){

            function successCallback(stream){
                if (window.webkitURL) {
                    video.src = window.webkitURL.createObjectURL(stream);
                } else if (video.mozSrcObject !== undefined) {
                    video.mozSrcObject = stream;
                } else {
                    video.src = stream;
                }
            }

            function errorCallback(error){
                console.log('Error',error);
            }

            navigator.getUserMedia({video: true}, successCallback, errorCallback);

            detector = new AR.Detector();

            requestAnimationFrame(tick);
        }
    }

    /**
     * Each Frame
     * @method tick
     */
    function tick(){
        requestAnimationFrame(tick);

        if (video.readyState === video.HAVE_ENOUGH_DATA){
            snapshot();

            var markers = detector.detect(imageData);
            drawCorners(markers);
            drawId(markers);
        }
    }

    /**
     * Each Snapshot frame
     * @method snapshot
     */
    function snapshot(){
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    /**
     * Image augmented.
     * @method drawCorners
     */
    function drawCorners(markers){
        var corners, corner, i, j;

        context.lineWidth = 3;

        for (i = 0; i !== markers.length; ++ i){
            corners = markers[i].corners;

            context.strokeStyle = "red";
            context.beginPath();

            for (j = 0; j !== corners.length; ++ j){
                corner = corners[j];
                context.moveTo(corner.x, corner.y);
                corner = corners[(j + 1) % corners.length];
                context.lineTo(corner.x, corner.y);
            }

            context.stroke();
            context.closePath();

            context.strokeStyle = "green";
            context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
        }
    }

    /**
     * Get corners and change positions.
     * @method drawId
     */
    function drawId(markers){
        var corners, corner, x, y, i, j;

        context.strokeStyle = "blue";
        context.lineWidth = 1;

        for (i = 0; i !== markers.length; ++ i){
            corners = markers[i].corners;

            x = Infinity;
            y = Infinity;

            for (j = 0; j !== corners.length; ++ j){
                corner = corners[j];

                x = Math.min(x, corner.x);
                y = Math.min(y, corner.y);
            }

            context.strokeText(markers[i].id, x, y)
        }
    }

    return {
        init:init
    }
})();


window.onload = Augmented.init;