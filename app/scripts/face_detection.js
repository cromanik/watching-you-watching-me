define(['jquery', 'constants', 'headtrackr', 'youtube', 'imagediff'], function($, constants, headtrackr, youtube, imagediff) {
  'use strict';

  var flag = true;
  var previousImage, height, width;

  return {
    init: function() {
      var zoneCounter = 0;
      var lastDirection = constants.DIRECTIONS.CENTER;

      $(document).on('facetrackingEvent', function(e) {
        var angle = e.originalEvent.angle;

        if (angle < (Math.PI / 2 - constants.ANGLE_THRESHOLD)) {
          zoneCounter++;
        } else if (angle > (Math.PI / 2 + constants.ANGLE_THRESHOLD)) {
          zoneCounter--;
        } else {
          if (zoneCounter > constants.ZONE_THRESHOLD) {
            if (lastDirection == constants.DIRECTIONS.RIGHT) {
              youtube.playNext();

              lastDirection = constants.DIRECTIONS.CENTER;
            } else {
              lastDirection = constants.DIRECTIONS.RIGHT;
            }
          } else if (zoneCounter < (0 - constants.ZONE_THRESHOLD)) {
            if (lastDirection == constants.DIRECTIONS.LEFT) {
              youtube.skipBack();

              lastDirection = constants.DIRECTIONS.CENTER;
            } else {
              lastDirection = constants.DIRECTIONS.LEFT;
            }
          }

          if (flag) {
            flag = false;

            height = height ? height : e.originalEvent.height;
            width = width ? width : e.originalEvent.width;
            var x = e.originalEvent.x;
            var y = e.originalEvent.y;
            x -= width / 2;
            y -= height / 2;

            var canvas = document.getElementById('inputCanvas');
            var faceImageData = canvas.getContext('2d').getImageData(x, y, width, height);
            var buffer = document.createElement('canvas');
            buffer.width = width;
            buffer.height = height;
            buffer.getContext('2d').putImageData(faceImageData, 0, 0);

            if (previousImage == null) {
              previousImage = buffer;
            } else {
              var currentImage = buffer;

              console.log(imagediff.equal(previousImage, currentImage, 150) ? 'Welcome back!' : 'Who are you?');

              previousImage = currentImage;
            }
          }

          zoneCounter = 0;
        }
      });

      $(document).on('headtrackrStatus', function(e) {
        switch(e.originalEvent.status) {
          case 'camera found':
            //youtube.init();
          break;

          case 'found':
            youtube.play();
            flag = true;
          break;

          case 'redetecting':
            youtube.pause();
          break;
        }
      });

      var videoInput = document.getElementById('inputVideo');
      var canvasInput = document.getElementById('inputCanvas');

      var htracker = new headtrackr.Tracker({
        ui: false,
        calcAngles: true,
        headPosition: false
      });
      htracker.init(videoInput, canvasInput);
      htracker.start();
    }
  };
});