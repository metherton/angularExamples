(function() {
  var module = angular.module('animationsExercise', ['ngAnimate']);

  module.animation('.fade-in-js', function() {
    return {
      enter: function(element, done) {
        // set initial css state
        element.css('opacity', 0);

        // begin the transition
        $(element).animate({
          opacity: 1
        }, 1000, function() {
          // clear css property when animation is done
          element.css('opacity', '');
          done();
        });
        
        return function(cancel) {
          if(cancel) {
            element.stop();
          }
        }
      }
    }
  });
  module.animation('.move-out-js', function() {
    return {
      leave: function(element, done) {
        element.css('left', '0%');

        // begin the transition
        element.animate({
          left: '-100%'
        }, 1000, function() {
          // clear css property when animation is done
          element.css('left', '');
          done();
        });

        return function(cancel) {
          if(cancel) {
            element.stop();
          }
        }
      }
    }
  });
})();