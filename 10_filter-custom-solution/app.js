(function() {
  var module = angular.module('app', []);

  module.filter('limit', function() {
    return function(array, limit) {
      if(!angular.isArray(array) || !angular.isNumber(limit)) {
        return array;
      }
      return array.slice(0, Math.min(array.length, limit));
    };
  });

  module.filter('offset', function() {
    return function(array, offset) {
      if(!angular.isArray(array) || !angular.isNumber(offset)) {
        return array;
      }
      return array.slice(Math.min(array.length, offset), array.length);
    }
  });

  function uppercase(str) {
    if(angular.isString(str)) {
      return str.toUpperCase();
    }
    else {
      return str;
    }
  }

  module.filter('uppercaseArray', function() {
    return function(arr) {
      var result = [];
      for(var i = 0; i < arr.length; ++i) {
        result.push(uppercase(arr[i]));
      }
      return result;
    };
  });
    module.filter('beginsWith', function() {
      return function(arr, char) {
        var result = [];
        for(var i = 0; i < arr.length; ++i) {
          if (arr[i][0] === char) {
            result.push(arr[i]);
          }
        }
        return result;
      };
    });

  module.filter('uppercaseArrayInplace', function() {
    return function(arr) {
      for(var i = 0; i < arr.length; ++i) {
        arr[i] = uppercase(arr[i]);
      }
      return arr;
    };
  });

  module.controller('AppCtrl', function($scope) {

    $scope.stringArray = ['Alice', 'Bob', 'Charlie'];

    $scope.comments =  [{
      id: 1,
      author: 'Edith',
      title: 'This rocks',
      content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.'
    }, {
      id: 7,
      author: 'Dave',
      title: 'Absolutely horrible car finding service',
      content: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.'
    },{
      id: 2,
      author: 'Bob',
      title: 'I don\'t think so',
      content: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.'
    }, {
      id: 3,
      author: 'Charlie',
      title: 'Cheap Viagra',
      content: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
    }, {
      id: 5,
      author: 'Alice',
      title: 'Re: This rocks',
      content: 'What Bob said'
    }, {
      id: 4,
      author: 'Dave',
      title: 'Where is my car',
      content: 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.'
    }, {
      id: 6,
      author: 'Dave',
      title: 'Still can\'t find my car',
      content: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.'
    }];
  });

})();
