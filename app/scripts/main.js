require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    bootstrap: 'vendor/bootstrap',
    headtrackr: '../components/headtrackr/headtrackr',
    imagediff: '../components/js-imagediff/imagediff'
  },
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  }
});

require(['app', 'jquery', 'constants', 'headtrackr', 'bootstrap'], function (app, $, constants, headtrackr) {
  'use strict';

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
          console.log('double right');
          lastDirection = constants.DIRECTIONS.CENTER;
        } else {
          lastDirection = constants.DIRECTIONS.RIGHT;
        }
      } else if (zoneCounter < (0 - constants.ZONE_THRESHOLD)) {
        if (lastDirection == constants.DIRECTIONS.LEFT) {
          console.log('double left');
          lastDirection = constants.DIRECTIONS.CENTER;
        } else {
          lastDirection = constants.DIRECTIONS.LEFT;
        }
      }

      zoneCounter = 0;
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
});