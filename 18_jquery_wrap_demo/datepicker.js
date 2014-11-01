(function() {
  var module = angular.module('datepicker', []);

  module.directive('datepicker', function() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs,ngModel) {
        elm.addClass("datepicker");

        // apply the jQuery/bootstrap datepicker
        elm.datepicker({format: "dd/mm/yyyy", weekStart: 1});

        // when the value rendered to the dom, we must
        // notify the datepicker, so we replace the $render
        // function on ngModel
        ngModel.$render = function() {
          elm.val(ngModel.$viewValue);
          elm.data('datepicker').update();
        };

        scope.$on('$destroy', function() {
          elm.data('datepicker').remove();
        });
      }
    };
  });
})();
