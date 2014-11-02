(function() {
  var module = angular.module('animationsDemo', ['ngAnimate']);

  module.animation('.fade-in-js', function() {
    return {
      enter: function(element, done) {
        element.css('opacity', 0);

        $(element).animate({
          opacity: 1
        }, 1000, function() {
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
})();