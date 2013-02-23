define(['jquery'], function($) {
  'use strict';

  var player;
  var videoIds;

  return {
    init: function() {
      window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('player', {
          videoId: 'jA7Ldui-q8c',
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showInfo: 0
          }
        });
      };

      $.getScript('//www.youtube.com/iframe_api');
    },

    play: function() {
      if (player) {
        player.playVideo();
      }
    },

    pause: function() {
      if (player) {
        player.pauseVideo();
      }
    },

    playNext: function() {
      if (player) {
        player.loadVideoById('F33aPc5FjVo');
      }
    },

    skipBack: function() {
      if (player) {
        var time = player.getCurrentTime();
        time -= 10;
        if (time < 0) {
          time = 0;
        }

        player.seekTo(time);
      }
    }
  };
});