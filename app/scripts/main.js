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

require(['face_detection'], function(faceDetection) {
  'use strict';

  faceDetection.init();
});